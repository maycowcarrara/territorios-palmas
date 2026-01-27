import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const AdminPanel = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [novoEmail, setNovoEmail] = useState('');
    const [novoWhats, setNovoWhats] = useState('');

    // Estados para edição inline
    const [editandoId, setEditandoId] = useState(null); // Guarda o email do usuario sendo editado
    const [whatsEditado, setWhatsEditado] = useState('');

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

        // Tratamento simples para evitar erros de digitação
        const emailFormatado = novoEmail.trim().toLowerCase();

        try {
            await setDoc(doc(db, "usuarios", emailFormatado), {
                role: 'comum',
                nome: 'Dirigente Novo', // Nome provisório até ele logar
                whatsapp: novoWhats || '',
                criadoEm: new Date()
            });
            setNovoEmail('');
            setNovoWhats('');
            alert("Usuário pré-aprovado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar:", error);
            alert("Erro ao adicionar usuário. Verifique se você tem permissão.");
        }
    };

    const mudarRole = async (email, novaRole) => {
        await updateDoc(doc(db, "usuarios", email), { role: novaRole });
    };

    const remover = async (email) => {
        if (confirm('Tem certeza que deseja remover este usuário?')) {
            await deleteDoc(doc(db, "usuarios", email));
        }
    };

    // --- FUNÇÕES DE EDIÇÃO ---
    const iniciarEdicao = (user) => {
        setEditandoId(user.email);
        setWhatsEditado(user.whatsapp || '');
    };

    const cancelarEdicao = () => {
        setEditandoId(null);
        setWhatsEditado('');
    };

    const salvarEdicao = async (email) => {
        await updateDoc(doc(db, "usuarios", email), { whatsapp: whatsEditado });
        setEditandoId(null);
    };

    const totalUsers = usuarios.length;
    const totalAdmins = usuarios.filter(u => u.role === 'admin').length;
    const totalPendentes = usuarios.filter(u => u.role === 'aguardando').length;

    return (
        <div className="min-h-screen bg-slate-50 p-4 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Admin</h1>
                        <p className="text-slate-500 text-sm">Gerencie o acesso ao sistema.</p>
                    </div>
                    <Link to="/app" className="w-full sm:w-auto text-center px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 text-sm">
                        ← Voltar ao Mapa
                    </Link>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between">
                        <div><p className="text-xs font-bold text-slate-400 uppercase">Dirigentes</p><p className="text-2xl font-bold text-slate-700">{totalUsers}</p></div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between">
                        <div><p className="text-xs font-bold text-slate-400 uppercase">Admins</p><p className="text-2xl font-bold text-slate-700">{totalAdmins}</p></div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between">
                        <div><p className="text-xs font-bold text-slate-400 uppercase">Pendentes</p><p className={`text-2xl font-bold ${totalPendentes > 0 ? 'text-red-600' : 'text-slate-700'}`}>{totalPendentes}</p></div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-slate-700">Cadastrar Novo Dirigente</h2>
                        <form onSubmit={handleAdicionar} className="flex flex-col sm:flex-row gap-2 w-full">
                            <input
                                type="email"
                                placeholder="E-mail..."
                                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={novoEmail}
                                onChange={(e) => setNovoEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="WhatsApp (opcional)..."
                                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={novoWhats}
                                onChange={(e) => setNovoWhats(e.target.value)}
                            />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg w-full sm:w-auto">
                                + Adicionar
                            </button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                                    <th className="px-4 py-3 font-semibold">Dirigente</th>
                                    <th className="px-4 py-3 font-semibold w-48">Contato (WhatsApp)</th>
                                    <th className="px-4 py-3 font-semibold">Função</th>
                                    <th className="px-4 py-3 font-semibold text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {usuarios.map((user) => (
                                    <tr key={user.email} className="hover:bg-blue-50/30 transition-colors">
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

                                        {/* CÉLULA DO WHATSAPP COM EDIÇÃO */}
                                        <td className="px-4 py-3 text-sm">
                                            {editandoId === user.email ? (
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="text"
                                                        value={whatsEditado}
                                                        onChange={(e) => setWhatsEditado(e.target.value)}
                                                        className="w-32 px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                        placeholder="Ex: 46999999999"
                                                        autoFocus
                                                    />
                                                    <button onClick={() => salvarEdicao(user.email)} className="text-green-600 hover:text-green-800 p-1" title="Salvar">
                                                        ✅
                                                    </button>
                                                    <button onClick={cancelarEdicao} className="text-red-500 hover:text-red-700 p-1" title="Cancelar">
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 group">
                                                    {user.whatsapp ? (
                                                        <a href={`https://wa.me/${user.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:underline flex items-center gap-1">
                                                            📱 {user.whatsapp}
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-300 text-xs italic">Sem número</span>
                                                    )}
                                                    {/* Botão de lápis aparece ao passar o mouse ou sempre no mobile se quiser */}
                                                    <button
                                                        onClick={() => iniciarEdicao(user)}
                                                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 transition-opacity p-1"
                                                        title="Editar WhatsApp"
                                                    >
                                                        ✏️
                                                    </button>
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-4 py-3">
                                            {user.role === 'admin' ? (
                                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">🛡️ Admin</span>
                                            ) : user.role === 'aguardando' ? (
                                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse">⏳ Pendente</span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">● Dirigente</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                {user.role === 'aguardando' ? (
                                                    <button onClick={() => mudarRole(user.email, 'comum')} className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">Aprovar</button>
                                                ) : (
                                                    <button onClick={() => mudarRole(user.email, user.role === 'admin' ? 'comum' : 'admin')} className="px-2 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50">
                                                        {user.role === 'admin' ? 'Rebaixar' : 'Promover'}
                                                    </button>
                                                )}
                                                <button onClick={() => remover(user.email)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full" title="Remover Usuário">🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;