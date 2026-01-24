import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const AdminPanel = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [novoEmail, setNovoEmail] = useState('');

    // Carrega usuários
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "usuarios"), (snapshot) => {
            const lista = snapshot.docs.map(doc => ({
                email: doc.id,
                ...doc.data()
            }));
            setUsuarios(lista);
        });
        return () => unsub();
    }, []);

    const handleAdicionar = async (e) => {
        e.preventDefault();
        if (!novoEmail) return;
        await setDoc(doc(db, "usuarios", novoEmail), {
            role: 'comum',
            nome: 'Adicionado Manualmente',
            criadoEm: new Date()
        });
        setNovoEmail('');
    };

    const mudarRole = async (email, novaRole) => {
        await updateDoc(doc(db, "usuarios", email), { role: novaRole });
    };

    const remover = async (email) => {
        if (confirm('Tem certeza?')) {
            await deleteDoc(doc(db, "usuarios", email));
        }
    };

    // Cálculos
    const totalUsers = usuarios.length;
    const totalAdmins = usuarios.filter(u => u.role === 'admin').length;
    const totalPendentes = usuarios.filter(u => u.role === 'aguardando').length;

    return (
        <div className="min-h-screen bg-slate-50 p-4 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* --- CABEÇALHO (Responsivo: Coluna no mobile, Linha no PC) --- */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Admin</h1>
                        <p className="text-slate-500 text-sm">Gerencie o acesso ao sistema.</p>
                    </div>
                    <Link
                        to="/app"
                        className="w-full sm:w-auto text-center px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-all text-sm"
                    >
                        ← Voltar ao Mapa
                    </Link>
                </header>

                {/* --- CARDS DE ESTATÍSTICAS (Compactos) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {/* Card Total */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Usuários</p>
                            <p className="text-2xl font-bold text-slate-700">{totalUsers}</p>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                    </div>

                    {/* Card Admins */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Admins</p>
                            <p className="text-2xl font-bold text-slate-700">{totalAdmins}</p>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded-full text-yellow-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                    </div>

                    {/* Card Pendentes */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Pendentes</p>
                            <p className={`text-2xl font-bold ${totalPendentes > 0 ? 'text-red-600' : 'text-slate-700'}`}>{totalPendentes}</p>
                        </div>
                        <div className={`p-2 rounded-full ${totalPendentes > 0 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-green-50 text-green-600'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </div>
                </div>

                {/* --- ÁREA PRINCIPAL --- */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">

                    {/* Barra de Ação (Adicionar) */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-slate-700">Usuários</h2>

                        <form onSubmit={handleAdicionar} className="flex flex-col sm:flex-row gap-2 w-full">
                            <input
                                type="email"
                                placeholder="E-mail para convidar..."
                                className="input px-4 py-2 rounded-lg border border-slate-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={novoEmail}
                                onChange={(e) => setNovoEmail(e.target.value)}
                            />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors w-full sm:w-auto flex justify-center items-center gap-2">
                                <span>+</span> Adicionar
                            </button>
                        </form>
                    </div>

                    {/* Tabela com SCROLL HORIZONTAL (A solução mágica para mobile) */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                                    <th className="px-4 py-3 font-semibold">Usuário</th>
                                    <th className="px-4 py-3 font-semibold">Status</th>
                                    <th className="px-4 py-3 font-semibold text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {usuarios.map((user) => (
                                    <tr key={user.email} className="hover:bg-blue-50/30 transition-colors">

                                        {/* Coluna 1: Nome */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">
                                                    {(user.nome || user.email || '?')[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-sm">{user.nome || 'Sem Nome'}</div>
                                                    <div className="text-xs text-slate-400 font-mono">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Coluna 2: Badges */}
                                        <td className="px-4 py-3">
                                            {user.role === 'admin' && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                                                    🛡️ Admin
                                                </span>
                                            )}
                                            {user.role === 'comum' && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                                    ● Publicador
                                                </span>
                                            )}
                                            {user.role === 'aguardando' && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 animate-pulse">
                                                    ⏳ Pendente
                                                </span>
                                            )}
                                        </td>

                                        {/* Coluna 3: Botões */}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end items-center gap-2">

                                                {user.role === 'aguardando' && (
                                                    <button
                                                        onClick={() => mudarRole(user.email, 'comum')}
                                                        className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded shadow-sm hover:bg-green-700"
                                                    >
                                                        Aprovar
                                                    </button>
                                                )}

                                                {user.role !== 'aguardando' && (
                                                    <button
                                                        onClick={() => mudarRole(user.email, user.role === 'admin' ? 'comum' : 'admin')}
                                                        className="px-2 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50"
                                                    >
                                                        {user.role === 'admin' ? 'Rebaixar' : 'Promover'}
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => remover(user.email)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                                    title="Remover"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {usuarios.length === 0 && (
                            <div className="p-8 text-center text-slate-400 text-sm">
                                Nenhum usuário encontrado.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;