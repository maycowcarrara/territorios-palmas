import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const AdminPanel = () => {
    const [usuarios, setUsuarios] = useState([]);

    // Estados para NOVO usuário
    const [novoEmail, setNovoEmail] = useState('');
    const [novoNome, setNovoNome] = useState('');
    const [novoWhats, setNovoWhats] = useState('');
    const [loadingAdd, setLoadingAdd] = useState(false);

    // Estados para EDIÇÃO inline
    const [editandoId, setEditandoId] = useState(null); // ID (email original) do usuário em edição
    const [dadosEditados, setDadosEditados] = useState({}); // Objeto temporário com os dados editados

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "usuarios"), (snapshot) => {
            const lista = snapshot.docs.map(doc => ({
                id: doc.id, // O ID do documento é o email original
                ...doc.data()
            }));
            // Ordenar: Pendentes primeiro, depois Admins, depois resto
            lista.sort((a, b) => {
                if (a.role === 'aguardando' && b.role !== 'aguardando') return -1;
                if (a.role !== 'aguardando' && b.role === 'aguardando') return 1;
                if (a.role === 'admin' && b.role !== 'admin') return -1;
                if (a.role !== 'admin' && b.role === 'admin') return 1;
                return a.nome?.localeCompare(b.nome);
            });
            setUsuarios(lista);
        });
        return () => unsub();
    }, []);

    // --- ADICIONAR NOVO ---
    const handleAdicionar = async (e) => {
        e.preventDefault();
        if (!novoEmail) return;
        setLoadingAdd(true);

        const emailFormatado = novoEmail.trim().toLowerCase();

        try {
            await setDoc(doc(db, "usuarios", emailFormatado), {
                role: 'comum', // Já entra aprovado se o admin criar
                nome: novoNome || 'Novo Dirigente',
                whatsapp: novoWhats || '',
                criadoEm: new Date()
            });
            setNovoEmail('');
            setNovoNome('');
            setNovoWhats('');
            alert("✅ Usuário adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar:", error);
            alert("❌ Erro: Verifique permissões.");
        }
        setLoadingAdd(false);
    };

    // --- AÇÕES RÁPIDAS ---
    const mudarRole = async (email, novaRole) => {
        try {
            await updateDoc(doc(db, "usuarios", email), { role: novaRole });
        } catch (e) { alert("Erro ao mudar permissão."); }
    };

    const remover = async (email) => {
        if (confirm(`Tem certeza que deseja remover ${email}? Essa ação não pode ser desfeita.`)) {
            try {
                await deleteDoc(doc(db, "usuarios", email));
            } catch (e) { alert("Erro ao remover."); }
        }
    };

    // --- LÓGICA DE EDIÇÃO ---
    const iniciarEdicao = (user) => {
        setEditandoId(user.id);
        setDadosEditados({ ...user }); // Copia dados atuais para o estado temporário
    };

    const cancelarEdicao = () => {
        setEditandoId(null);
        setDadosEditados({});
    };

    const salvarEdicao = async () => {
        if (!editandoId) return;

        try {
            // Nota: Não dá para mudar o ID do documento (email) direto no Firestore.
            // Se o email mudou, teríamos que criar um novo doc e apagar o velho.
            // Por segurança e simplicidade, vamos permitir editar apenas Nome e Whats aqui.
            // Se precisar mudar email, remove e cria de novo.

            await updateDoc(doc(db, "usuarios", editandoId), {
                nome: dadosEditados.nome,
                whatsapp: dadosEditados.whatsapp
            });

            setEditandoId(null);
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar alterações.");
        }
    };

    const handleEditChange = (campo, valor) => {
        setDadosEditados(prev => ({ ...prev, [campo]: valor }));
    };

    // --- CONTADORES ---
    const totalUsers = usuarios.length;
    const totalAdmins = usuarios.filter(u => u.role === 'admin').length;
    const totalPendentes = usuarios.filter(u => u.role === 'aguardando').length;

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="bg-blue-600 text-white rounded-lg p-1.5 text-xl">🛡️</span>
                            Painel Admin
                        </h1>
                        <p className="text-gray-500 mt-1">Gerencie usuários e permissões do sistema.</p>
                    </div>
                    <Link to="/app" className="px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center gap-2">
                        ← Voltar ao Mapa
                    </Link>
                </header>

                {/* CARDS DE RESUMO */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Dirigentes</p>
                            <p className="text-3xl font-bold text-gray-700">{totalUsers}</p>
                        </div>
                        <div className="text-3xl opacity-20">👥</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Admins</p>
                            <p className="text-3xl font-bold text-blue-600">{totalAdmins}</p>
                        </div>
                        <div className="text-3xl opacity-20">🛡️</div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Pendentes</p>
                            <p className={`text-3xl font-bold ${totalPendentes > 0 ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>{totalPendentes}</p>
                        </div>
                        <div className="text-3xl opacity-20">⏳</div>
                    </div>
                </div>

                {/* FORMULÁRIO DE CADASTRO */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                            ✨ Cadastrar Novo Usuário
                        </h3>
                    </div>
                    <div className="p-5">
                        <form onSubmit={handleAdicionar} className="flex flex-col md:flex-row gap-3 items-end">
                            <div className="flex-1 w-full">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Nome Completo</label>
                                <input
                                    type="text"
                                    placeholder="Ex: João Silva"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={novoNome}
                                    onChange={e => setNovoNome(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">E-mail (Google)</label>
                                <input
                                    type="email"
                                    placeholder="Ex: joao@gmail.com"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={novoEmail}
                                    onChange={e => setNovoEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full md:w-48">
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">WhatsApp</label>
                                <input
                                    type="text"
                                    placeholder="Só números"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={novoWhats}
                                    onChange={e => setNovoWhats(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingAdd}
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loadingAdd ? 'Salvando...' : '+ Adicionar'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* LISTA DE USUÁRIOS */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                                    <th className="px-6 py-4 font-bold">Usuário / E-mail</th>
                                    <th className="px-6 py-4 font-bold">WhatsApp</th>
                                    <th className="px-6 py-4 font-bold text-center">Permissão</th>
                                    <th className="px-6 py-4 font-bold text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {usuarios.map((user) => (
                                    <tr key={user.id} className={`hover:bg-blue-50/30 transition-colors ${editandoId === user.id ? 'bg-yellow-50' : ''}`}>

                                        {/* COLUNA NOME/EMAIL */}
                                        <td className="px-6 py-4">
                                            {editandoId === user.id ? (
                                                <div className="flex flex-col gap-1">
                                                    <input
                                                        type="text"
                                                        value={dadosEditados.nome || ''}
                                                        onChange={e => handleEditChange('nome', e.target.value)}
                                                        className="px-2 py-1 text-sm border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                                                        placeholder="Nome"
                                                    />
                                                    <span className="text-xs text-gray-400 font-mono pl-1">{user.id} (Fixo)</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm border border-gray-200 shadow-sm">
                                                        {(user.nome || user.id || '?')[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800">{user.nome || 'Sem Nome'}</div>
                                                        <div className="text-xs text-gray-400 font-mono">{user.id}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </td>

                                        {/* COLUNA WHATSAPP */}
                                        <td className="px-6 py-4">
                                            {editandoId === user.id ? (
                                                <input
                                                    type="text"
                                                    value={dadosEditados.whatsapp || ''}
                                                    onChange={e => handleEditChange('whatsapp', e.target.value)}
                                                    className="w-32 px-2 py-1 text-sm border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                                                    placeholder="WhatsApp"
                                                />
                                            ) : (
                                                user.whatsapp ? (
                                                    <a href={`https://wa.me/${user.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors border border-green-100">
                                                        <span className="text-xs">🟢</span> {user.whatsapp}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-300 text-sm italic">--</span>
                                                )
                                            )}
                                        </td>

                                        {/* COLUNA ROLE (PERMISSÃO) */}
                                        <td className="px-6 py-4 text-center">
                                            {user.role === 'admin' ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200 inline-flex items-center gap-1">
                                                    🛡️ Admin
                                                </span>
                                            ) : user.role === 'aguardando' ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 inline-flex items-center gap-1 animate-pulse">
                                                    ⏳ Pendente
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 inline-flex items-center gap-1">
                                                    👤 Dirigente
                                                </span>
                                            )}
                                        </td>

                                        {/* COLUNA AÇÕES */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end items-center gap-2">

                                                {/* MODO EDIÇÃO */}
                                                {editandoId === user.id ? (
                                                    <>
                                                        <button onClick={salvarEdicao} className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors" title="Salvar">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                        </button>
                                                        <button onClick={cancelarEdicao} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors" title="Cancelar">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                                        </button>
                                                    </>
                                                ) : (
                                                    /* MODO VISUALIZAÇÃO */
                                                    <>
                                                        {user.role === 'aguardando' ? (
                                                            <button onClick={() => mudarRole(user.id, 'comum')} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all">
                                                                Aprovar
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => iniciarEdicao(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar Dados">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => mudarRole(user.id, user.role === 'admin' ? 'comum' : 'admin')}
                                                            className={`p-2 rounded-lg transition-colors ${user.role === 'admin' ? 'text-purple-400 hover:text-purple-600 hover:bg-purple-50' : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'}`}
                                                            title={user.role === 'admin' ? "Rebaixar para Dirigente" : "Promover a Admin"}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                                        </button>

                                                        <button onClick={() => remover(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remover Usuário">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {usuarios.length === 0 && (
                        <div className="p-8 text-center text-gray-400 italic">Nenhum usuário encontrado.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;