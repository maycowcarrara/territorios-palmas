import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { useSistema } from './useSistema';
import { getDefaultSistemaConfig, getSistemaTheme, slugifyCampanha } from './sistema';
import { getTerritorioContextCollectionRef } from './territorioContext';
import { useUiFeedback } from './uiFeedback';
import { enviarComunicadoPeloRelay, relayDisponivel } from './notificationRelay';

const AdminPanel = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [campanhas, setCampanhas] = useState([]);
    const [campanhaTitulo, setCampanhaTitulo] = useState('');
    const [campanhaSlug, setCampanhaSlug] = useState('');
    const [salvandoCampanha, setSalvandoCampanha] = useState(false);
    const [campanhaParaExcluir, setCampanhaParaExcluir] = useState(null);
    const [confirmacaoExclusao, setConfirmacaoExclusao] = useState('');
    const [carregandoResumoExclusao, setCarregandoResumoExclusao] = useState(false);
    const [registrosCampanhaParaExcluir, setRegistrosCampanhaParaExcluir] = useState(0);
    const [excluindoCampanha, setExcluindoCampanha] = useState(false);
    const { config: contextoSistema } = useSistema();
    const temaSistema = getSistemaTheme(contextoSistema);
    const { notify, confirm } = useUiFeedback();

    // Estados para NOVO usuário
    const [novoEmail, setNovoEmail] = useState('');
    const [novoNome, setNovoNome] = useState('');
    const [novoWhats, setNovoWhats] = useState('');
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [comunicadoGeral, setComunicadoGeral] = useState('');
    const [enviandoComunicado, setEnviandoComunicado] = useState(false);
    const [destinoComunicado, setDestinoComunicado] = useState('todos');

    // Estados para EDIÇÃO inline
    const [editandoId, setEditandoId] = useState(null);
    const [dadosEditados, setDadosEditados] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "usuarios"), (snapshot) => {
            const lista = snapshot.docs.map(doc => ({
                id: doc.id,
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

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "campanhas"), (snapshot) => {
            const lista = snapshot.docs.map((campanhaDoc) => ({
                id: campanhaDoc.id,
                ...campanhaDoc.data()
            }));

            lista.sort((a, b) => {
                const dataA = a.atualizadaEm?.seconds || a.criadaEm?.seconds || 0;
                const dataB = b.atualizadaEm?.seconds || b.criadaEm?.seconds || 0;
                return dataB - dataA;
            });

            setCampanhas(lista);
        });

        return () => unsub();
    }, []);

    useEffect(() => {
        let ativo = true;

        const carregarResumoExclusao = async () => {
            if (!campanhaParaExcluir) {
                setConfirmacaoExclusao('');
                setRegistrosCampanhaParaExcluir(0);
                setCarregandoResumoExclusao(false);
                return;
            }

            setConfirmacaoExclusao('');
            setCarregandoResumoExclusao(true);

            try {
                const contextoQuery = query(
                    getTerritorioContextCollectionRef(db),
                    where("contextoId", "==", campanhaParaExcluir.id)
                );
                const snapshot = await getDocs(contextoQuery);

                if (ativo) {
                    setRegistrosCampanhaParaExcluir(snapshot.size);
                }
            } catch (error) {
                console.error("Erro ao carregar resumo da campanha para exclusão:", error);
                if (ativo) {
                    setRegistrosCampanhaParaExcluir(0);
                }
            } finally {
                if (ativo) {
                    setCarregandoResumoExclusao(false);
                }
            }
        };

        carregarResumoExclusao();

        return () => {
            ativo = false;
        };
    }, [campanhaParaExcluir]);

    // --- ADICIONAR NOVO ---
    const handleAdicionar = async (e) => {
        e.preventDefault();
        if (!novoEmail) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(novoEmail)) {
            notify({
                title: 'E-mail invalido',
                message: 'Por favor, verifique o formato informado.',
                variant: 'warning'
            });
            return;
        }

        if (!novoEmail.includes('@gmail.com')) {
            notify({
                title: 'Use um Gmail',
                message: 'Use um e-mail @gmail.com para manter a compatibilidade com o login.',
                variant: 'warning'
            });
            return;
        }

        const whatsLimpo = novoWhats.replace(/\D/g, '');
        if (novoWhats && (whatsLimpo.length < 10 || whatsLimpo.length > 11)) {
            notify({
                title: 'WhatsApp invalido',
                message: 'O número deve ter DDD + 8 ou 9 dígitos.',
                variant: 'warning'
            });
            return;
        }

        setLoadingAdd(true);
        const emailFormatado = novoEmail.trim().toLowerCase();

        try {
            await setDoc(doc(db, "usuarios", emailFormatado), {
                role: 'comum',
                nome: novoNome || 'Novo Dirigente',
                whatsapp: whatsLimpo,
                criadoEm: new Date()
            });
            setNovoEmail('');
            setNovoNome('');
            setNovoWhats('');
            notify({
                title: 'Usuario cadastrado',
                message: 'Usuário adicionado com sucesso.',
                variant: 'success'
            });
        } catch (error) {
            console.error("Erro ao adicionar:", error);
            notify({
                title: 'Cadastro bloqueado',
                message: 'Verifique suas permissões e tente novamente.',
                variant: 'error'
            });
        }
        setLoadingAdd(false);
    };

    // --- AÇÕES RÁPIDAS (ATUALIZADO COM CONFIRMAÇÃO) ---
    const mudarRole = async (user, novaRole) => {
        // Define a mensagem baseada na ação
        const alerta = novaRole === 'admin' 
            ? `⚠️ ATENÇÃO: Você está prestes a tornar ${user.nome || user.id} um ADMINISTRADOR.\n\nEle terá acesso total ao sistema, incluindo edição e exclusão de dados.\n\nDeseja continuar?`
            : `Deseja remover as permissões de administrador de ${user.nome || user.id}?`;

        if (!(await confirm({
            title: novaRole === 'admin' ? 'Promover para admin' : 'Remover permissao de admin',
            message: alerta,
            tone: novaRole === 'admin' ? 'warning' : 'danger',
            confirmLabel: novaRole === 'admin' ? 'Promover' : 'Remover'
        }))) {
            return;
        }

        try {
            await updateDoc(doc(db, "usuarios", user.id), { role: novaRole });
        } catch {
            notify({
                title: 'Permissao nao alterada',
                message: 'Não foi possível mudar a permissão agora.',
                variant: 'error'
            });
        }
    };

    const remover = async (email) => {
        if (!(await confirm({
            title: 'Excluir usuario',
            message: `Tem certeza que deseja excluir definitivamente o usuário ${email}?\n\nEssa ação não pode ser desfeita.`,
            tone: 'danger',
            confirmLabel: 'Excluir'
        }))) {
            return;
        }

        try {
            await deleteDoc(doc(db, "usuarios", email));
        } catch {
            notify({
                title: 'Usuario nao removido',
                message: 'Não foi possível remover esse usuário agora.',
                variant: 'error'
            });
        }
    };

    // --- LÓGICA DE EDIÇÃO ---
    const iniciarEdicao = (user) => {
        setEditandoId(user.id);
        setDadosEditados({ ...user });
    };

    const cancelarEdicao = () => {
        setEditandoId(null);
        setDadosEditados({});
    };

    const salvarEdicao = async () => {
        if (!editandoId) return;

        try {
            await updateDoc(doc(db, "usuarios", editandoId), {
                nome: dadosEditados.nome,
                whatsapp: dadosEditados.whatsapp
            });
            setEditandoId(null);
        } catch (error) {
            console.error(error);
            notify({
                title: 'Edicao nao salva',
                message: 'Não foi possível salvar as alterações.',
                variant: 'error'
            });
        }
    };

    const handleEditChange = (campo, valor) => {
        setDadosEditados(prev => ({ ...prev, [campo]: valor }));
    };

    const enviarComunicadoGeral = async (e) => {
        e.preventDefault();

        const mensagem = comunicadoGeral.trim();
        const destinatarios = usuarios.filter((user) => user.role === 'admin' || user.role === 'comum');
        const admins = usuarios.filter((user) => user.role === 'admin');

        if (!mensagem) {
            notify({
                title: 'Mensagem obrigatoria',
                message: 'Digite a mensagem do comunicado.',
                variant: 'warning'
            });
            return;
        }

        if (destinoComunicado === 'admins' && admins.length === 0) {
            notify({
                title: 'Sem destinatarios',
                message: 'Não há administradores para receber o comunicado.',
                variant: 'warning'
            });
            return;
        }

        if (destinoComunicado === 'todos' && destinatarios.length === 0) {
            notify({
                title: 'Sem destinatarios',
                message: 'Não há usuários aprovados para receber o comunicado.',
                variant: 'warning'
            });
            return;
        }

        const totalDestino = destinoComunicado === 'admins' ? admins.length : destinatarios.length;
        const rotuloDestino = destinoComunicado === 'admins' ? 'admin(s)' : 'usuário(s)';

        if (!(await confirm({
            title: 'Enviar comunicado',
            message: `Enviar este comunicado para ${totalDestino} ${rotuloDestino}?`,
            tone: 'warning',
            confirmLabel: 'Enviar'
        }))) {
            return;
        }

        setEnviandoComunicado(true);

        try {
            let resultadoRelay = null;

            if (relayDisponivel()) {
                resultadoRelay = await enviarComunicadoPeloRelay({
                    destino: destinoComunicado,
                    mensagem
                });
            } else {
                const agora = new Date();
                if (destinoComunicado === 'admins') {
                    const notificacaoRef = doc(collection(db, "notificacoes"));
                    await setDoc(notificacaoRef, {
                        para: 'ADMINS',
                        texto: mensagem,
                        data: agora,
                        lida: false,
                        tipo: 'comunicado',
                        origem: 'admin'
                    });
                } else {
                    const batchSize = 400;

                    for (let index = 0; index < destinatarios.length; index += batchSize) {
                        const batch = writeBatch(db);

                        destinatarios
                            .slice(index, index + batchSize)
                            .forEach((user) => {
                                const notificacaoRef = doc(collection(db, "notificacoes"));
                                batch.set(notificacaoRef, {
                                    para: user.id,
                                    texto: mensagem,
                                    data: agora,
                                    lida: false,
                                    tipo: 'comunicado',
                                    origem: 'admin'
                                });
                            });

                        await batch.commit();
                    }
                }
            }

            setComunicadoGeral('');
            notify({
                title: 'Comunicado enviado',
                message: resultadoRelay
                    ? `Comunicado enviado para ${resultadoRelay.destinatarios ?? totalDestino} ${rotuloDestino}. Push ${resultadoRelay.canal ?? 'relay'}: ${resultadoRelay.pushesEnviados ?? 0} enviado(s), ${resultadoRelay.pushesFalharam ?? 0} falha(s).`
                    : `Comunicado enviado para ${totalDestino} ${rotuloDestino}.`,
                variant: 'success'
            });
        } catch (error) {
            console.error("Erro ao enviar comunicado geral:", error);
            notify({
                title: 'Envio indisponivel',
                message: String(error?.message || 'Não foi possível enviar o comunicado geral.'),
                variant: 'error'
            });
        } finally {
            setEnviandoComunicado(false);
        }
    };

    const ativarCampanha = async ({ id, titulo }) => {
        setSalvandoCampanha(true);

        try {
            const agora = new Date();
            await setDoc(doc(db, "campanhas", id), {
                id,
                titulo,
                atualizadaEm: agora,
                criadaEm: agora
            }, { merge: true });

            await setDoc(doc(db, "configuracoes", "sistema"), {
                contextoAtivoId: id,
                contextoAtivoTipo: 'campanha',
                contextoAtivoTitulo: titulo,
                contextoAtivoCor: 'violet',
                campanhaAtiva: true,
                campanha_ativa: id,
                nome_campanha: titulo,
                atualizadaEm: agora
            }, { merge: true });

            setCampanhaTitulo('');
            setCampanhaSlug('');
            notify({
                title: 'Campanha ativada',
                message: `Campanha "${titulo}" ativada com sucesso.`,
                variant: 'success'
            });
        } catch (error) {
            console.error("Erro ao ativar campanha:", error);
            notify({
                title: 'Campanha nao ativada',
                message: 'Não foi possível ativar a campanha.',
                variant: 'error'
            });
        } finally {
            setSalvandoCampanha(false);
        }
    };

    const handleCriarCampanha = async (e) => {
        e.preventDefault();
        const titulo = campanhaTitulo.trim();
        const id = slugifyCampanha(campanhaSlug || titulo);

        if (!titulo) {
            notify({
                title: 'Titulo obrigatorio',
                message: 'Informe o título da campanha.',
                variant: 'warning'
            });
            return;
        }

        if (!id) {
            notify({
                title: 'Identificador invalido',
                message: 'Não consegui gerar um identificador válido para a campanha.',
                variant: 'error'
            });
            return;
        }

        await ativarCampanha({ id, titulo });
    };

    const voltarModoNormal = async () => {
        if (!(await confirm({
            title: 'Desativar campanha',
            message: 'Voltar o sistema para a pregação normal agora?',
            tone: 'warning',
            confirmLabel: 'Voltar ao normal'
        }))) return;

        setSalvandoCampanha(true);
        try {
            const configNormal = getDefaultSistemaConfig();
            await setDoc(doc(db, "configuracoes", "sistema"), {
                ...configNormal,
                campanha_ativa: configNormal.contextoAtivoId,
                nome_campanha: '',
                atualizadaEm: new Date()
            }, { merge: true });
            notify({
                title: 'Modo normal ativo',
                message: 'Sistema voltou para o modo normal.',
                variant: 'success'
            });
        } catch (error) {
            console.error("Erro ao voltar para o modo normal:", error);
            notify({
                title: 'Mudanca nao concluida',
                message: 'Não foi possível voltar para o modo normal.',
                variant: 'error'
            });
        } finally {
            setSalvandoCampanha(false);
        }
    };

    const abrirModalExclusaoCampanha = (campanha) => {
        setCampanhaParaExcluir(campanha);
    };

    const fecharModalExclusaoCampanha = (forcar = false) => {
        if (excluindoCampanha && !forcar) return;
        setCampanhaParaExcluir(null);
        setConfirmacaoExclusao('');
        setRegistrosCampanhaParaExcluir(0);
        setCarregandoResumoExclusao(false);
    };

    const excluirCampanha = async () => {
        if (!campanhaParaExcluir) return;

        if (contextoSistema.contextoAtivoId === campanhaParaExcluir.id) {
            notify({
                title: 'Campanha em uso',
                message: 'Desative a campanha antes de excluir.',
                variant: 'warning'
            });
            return;
        }

        if (confirmacaoExclusao.trim() !== campanhaParaExcluir.id) {
            notify({
                title: 'Confirmacao incompleta',
                message: 'Digite o identificador exato da campanha para confirmar a exclusão.',
                variant: 'warning'
            });
            return;
        }

        setExcluindoCampanha(true);

        try {
            const campanhaExcluida = campanhaParaExcluir;
            const contextoQuery = query(
                getTerritorioContextCollectionRef(db),
                where("contextoId", "==", campanhaParaExcluir.id)
            );
            const contextoSnapshot = await getDocs(contextoQuery);
            const refsParaExcluir = [
                ...contextoSnapshot.docs.map((docSnapshot) => docSnapshot.ref),
                doc(db, "campanhas", campanhaParaExcluir.id)
            ];

            const batchSize = 400;
            for (let index = 0; index < refsParaExcluir.length; index += batchSize) {
                const batch = writeBatch(db);
                refsParaExcluir
                    .slice(index, index + batchSize)
                    .forEach((docRef) => batch.delete(docRef));
                await batch.commit();
            }

            fecharModalExclusaoCampanha(true);
            notify({
                title: 'Campanha excluida',
                message: `Campanha "${campanhaExcluida.titulo || campanhaExcluida.id}" excluída com sucesso.`,
                variant: 'success'
            });
        } catch (error) {
            console.error("Erro ao excluir campanha:", error);
            notify({
                title: 'Exclusao nao concluida',
                message: 'Não foi possível excluir a campanha.',
                variant: 'error'
            });
        } finally {
            setExcluindoCampanha(false);
        }
    };

    // --- CONTADORES ---
    const totalUsers = usuarios.length;
    const totalAdmins = usuarios.filter(u => u.role === 'admin').length;
    const totalPendentes = usuarios.filter(u => u.role === 'aguardando').length;
    const totalAprovados = usuarios.filter(u => u.role === 'admin' || u.role === 'comum').length;
    const totalDestinoComunicado = destinoComunicado === 'admins' ? totalAdmins : totalAprovados;
    const formatarTelefone = (valor) => {
        return valor
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/g, '($1) $2')
            .replace(/(\d)(\d{4})$/, '$1-$2');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
                            <span className="bg-blue-600 text-white rounded-lg p-1.5 text-xl">🛡️</span>
                            Painel Admin
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">Gerencie usuários e permissões do sistema.</p>
                    </div>
                    <Link to="/app" className="px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center gap-2 active:scale-95">
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

                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
                    <div className={`p-4 border-b border-gray-200 ${temaSistema.panelBg}`}>
                        <h3 className={`font-bold flex items-center gap-2 ${temaSistema.panelText}`}>
                            📢 Modo do Sistema
                        </h3>
                    </div>
                    <div className="p-5 space-y-5">
                        <div className={`rounded-xl border p-4 ${temaSistema.panelBorder} ${temaSistema.panelBg}`}>
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Modo atual</p>
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className={`text-xl font-extrabold ${temaSistema.accentText}`}>
                                        {contextoSistema.campanhaAtiva ? contextoSistema.contextoAtivoTitulo : 'Pregação normal'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {contextoSistema.campanhaAtiva
                                            ? `Campanha ativa (${contextoSistema.contextoAtivoId})`
                                            : 'Sem campanha ativa no momento.'}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 md:items-end">
                                    {contextoSistema.campanhaAtiva ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={voltarModoNormal}
                                                disabled={salvandoCampanha}
                                                className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50"
                                            >
                                                Desativar Campanha
                                            </button>
                                            <p className="text-xs text-gray-500">
                                                O sistema volta imediatamente para a pregação normal.
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-xs text-gray-500 md:text-right">
                                            Quando precisar, ative uma campanha abaixo.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleCriarCampanha} className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_auto] gap-3 items-end">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Título da Campanha</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Convite da Celebração"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                                    value={campanhaTitulo}
                                    onChange={(e) => setCampanhaTitulo(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Identificador Interno</label>
                                <input
                                    type="text"
                                    placeholder="ex: celebracao_2026"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                                    value={campanhaSlug}
                                    onChange={(e) => setCampanhaSlug(slugifyCampanha(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={salvandoCampanha}
                                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50"
                            >
                                {salvandoCampanha ? 'Salvando...' : 'Ativar Campanha'}
                            </button>
                        </form>

                        {campanhas.length > 0 && (
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-3">Campanhas cadastradas</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {campanhas.map((campanha) => {
                                        const ativa = contextoSistema.contextoAtivoId === campanha.id;
                                        return (
                                            <div key={campanha.id} className={`rounded-xl border p-4 ${ativa ? 'border-violet-200 bg-violet-50' : 'border-gray-200 bg-gray-50'}`}>
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="font-bold text-gray-800">{campanha.titulo || campanha.id}</p>
                                                        <p className="text-xs text-gray-400 font-mono mt-1">{campanha.id}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${ativa ? 'bg-violet-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
                                                        {ativa ? 'ATIVA' : 'SALVA'}
                                                    </span>
                                                </div>
                                                <div className="mt-4 grid grid-cols-1 gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => ativarCampanha({ id: campanha.id, titulo: campanha.titulo || campanha.id })}
                                                        disabled={salvandoCampanha || ativa}
                                                        className="w-full rounded-lg border border-violet-200 bg-white py-2 text-sm font-bold text-violet-700 hover:bg-violet-50 disabled:opacity-50"
                                                    >
                                                        {ativa ? 'Campanha Atual' : 'Reativar'}
                                                    </button>
                                                    {ativa && (
                                                        <button
                                                            type="button"
                                                            onClick={voltarModoNormal}
                                                            disabled={salvandoCampanha}
                                                            className="w-full rounded-lg bg-red-600 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                                                        >
                                                            Desativar Agora
                                                        </button>
                                                    )}
                                                    {!ativa && (
                                                        <button
                                                            type="button"
                                                            onClick={() => abrirModalExclusaoCampanha(campanha)}
                                                            disabled={salvandoCampanha || excluindoCampanha}
                                                            className="w-full rounded-lg border border-red-200 bg-white py-2 text-sm font-bold text-red-700 hover:bg-red-50 disabled:opacity-50"
                                                        >
                                                            Excluir Campanha
                                                        </button>
                                                    )}
                                                </div>
                                                {ativa && (
                                                    <p className="mt-3 text-xs text-violet-700">
                                                        Para excluir esta campanha, desative primeiro o modo campanha.
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
                    <div className="p-4 bg-amber-50 border-b border-amber-100">
                        <h3 className="font-bold text-amber-900 flex items-center gap-2">
                            🔔 Comunicado Geral
                        </h3>
                    </div>
                    <div className="p-5">
                        <form onSubmit={enviarComunicadoGeral} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Destino</label>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    <label className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all ${destinoComunicado === 'todos' ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                                        <input
                                            type="radio"
                                            name="destino-comunicado"
                                            value="todos"
                                            checked={destinoComunicado === 'todos'}
                                            onChange={(e) => setDestinoComunicado(e.target.value)}
                                        />
                                        <span className="text-sm font-semibold text-gray-700">Todos os aprovados</span>
                                    </label>
                                    <label className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all ${destinoComunicado === 'admins' ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                                        <input
                                            type="radio"
                                            name="destino-comunicado"
                                            value="admins"
                                            checked={destinoComunicado === 'admins'}
                                            onChange={(e) => setDestinoComunicado(e.target.value)}
                                        />
                                        <span className="text-sm font-semibold text-gray-700">Somente admins</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Mensagem para todos os usuários aprovados</label>
                                <textarea
                                    rows={4}
                                    placeholder="Ex: O app foi atualizado. Fechem e abram novamente para carregar a nova versão."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all resize-y"
                                    value={comunicadoGeral}
                                    onChange={(e) => setComunicadoGeral(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <p className="text-sm text-gray-500">
                                    Envia uma notificação interna para <span className="font-bold text-gray-700">{totalDestinoComunicado}</span> {destinoComunicado === 'admins' ? 'admin(s)' : 'usuário(s) aprovados'}.
                                    {relayDisponivel()
                                        ? ' Quem tiver o app com FCM ativo também pode receber push mesmo com o app fechado.'
                                        : ' Quem estiver com o app aberto recebe na hora; quem abrir depois vê no sininho.'}
                                </p>
                                <button
                                    type="submit"
                                    disabled={enviandoComunicado || totalDestinoComunicado === 0}
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {enviandoComunicado ? 'Enviando...' : 'Enviar Comunicado'}
                                </button>
                            </div>
                        </form>
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
                                    placeholder="(46) 99999-9999"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={novoWhats}
                                    maxLength={15}
                                    onChange={e => setNovoWhats(formatarTelefone(e.target.value))}
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

                {/* --- MODO MOBILE: CARDS (RESPONSIVO) --- */}
                <div className="md:hidden space-y-4">
                    {usuarios.map((user) => (
                        <div key={user.id} className={`bg-white p-4 rounded-xl shadow-sm border border-gray-200 ${editandoId === user.id ? 'ring-2 ring-blue-100 bg-blue-50/20' : ''}`}>
                            
                            {/* Cabeçalho do Card */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-sm border border-gray-200">
                                        {(user.nome || user.id || '?')[0].toUpperCase()}
                                    </div>
                                    <div>
                                        {editandoId === user.id ? (
                                            <input
                                                type="text"
                                                value={dadosEditados.nome || ''}
                                                onChange={e => handleEditChange('nome', e.target.value)}
                                                className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                                                placeholder="Nome"
                                            />
                                        ) : (
                                            <h4 className="font-bold text-gray-800 text-base">{user.nome || 'Sem Nome'}</h4>
                                        )}
                                        <p className="text-xs text-gray-500 font-mono truncate max-w-[150px]">{user.id}</p>
                                    </div>
                                </div>
                                
                                {/* Badge de Role */}
                                <div>
                                    {user.role === 'admin' ? (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">ADMIN</span>
                                    ) : user.role === 'aguardando' ? (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 animate-pulse">PENDENTE</span>
                                    ) : (
                                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">DIRIGENTE</span>
                                    )}
                                </div>
                            </div>

                            {/* Corpo do Card (Whatsapp) */}
                            <div className="mb-4 pl-[3.25rem]">
                                {editandoId === user.id ? (
                                    <input
                                        type="text"
                                        value={dadosEditados.whatsapp || ''}
                                        onChange={e => handleEditChange('whatsapp', e.target.value)}
                                        className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                                        placeholder="WhatsApp"
                                    />
                                ) : (
                                    user.whatsapp ? (
                                        <a href={`https://wa.me/${user.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-green-700 font-medium">
                                            <span className="text-xs">🟢</span> {user.whatsapp}
                                        </a>
                                    ) : (
                                        <span className="text-gray-300 text-sm italic">Sem WhatsApp</span>
                                    )
                                )}
                            </div>

                            {/* Botões de Ação Mobile */}
                            <div className="flex gap-2 border-t border-gray-100 pt-3">
                                {editandoId === user.id ? (
                                    <>
                                        <button onClick={salvarEdicao} className="flex-1 py-2 bg-green-600 text-white rounded-lg font-bold text-sm">Salvar</button>
                                        <button onClick={cancelarEdicao} className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold text-sm">Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        {user.role === 'aguardando' ? (
                                            <button onClick={() => mudarRole(user, 'comum')} className="flex-1 py-2 bg-green-600 text-white rounded-lg font-bold text-sm shadow-sm active:scale-95 transition-transform">
                                                Aprovar Acesso
                                            </button>
                                        ) : (
                                            <>
                                                <button onClick={() => iniciarEdicao(user)} className="p-2 bg-gray-50 text-blue-600 rounded-lg border border-gray-200 flex-1 flex justify-center items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                </button>

                                                {/* BOTÃO PROMOVER / REBAIXAR - NOVO ÍCONE */}
                                                <button 
                                                    onClick={() => mudarRole(user, user.role === 'admin' ? 'comum' : 'admin')} 
                                                    className={`p-2 rounded-lg border flex-1 flex justify-center items-center transition-colors ${user.role === 'admin' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}
                                                >
                                                    {user.role === 'admin' ? (
                                                        // ÍCONE DE USUÁRIO (Rebaixar)
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        // ÍCONE DE ESTRELA (Promover a Admin)
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </>
                                        )}
                                        <button onClick={() => remover(user.id)} className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100 flex-1 flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    {usuarios.length === 0 && (
                        <div className="p-8 text-center text-gray-400 italic bg-white rounded-xl border border-gray-200">Nenhum usuário encontrado.</div>
                    )}
                </div>

                {/* --- MODO DESKTOP: TABELA (VISÍVEL APENAS EM TELAS GRANDES) --- */}
                <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
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
                                                            <button onClick={() => mudarRole(user, 'comum')} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all">
                                                                Aprovar
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => iniciarEdicao(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar Dados">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => mudarRole(user, user.role === 'admin' ? 'comum' : 'admin')}
                                                            className={`p-2 rounded-lg transition-colors ${user.role === 'admin' ? 'text-purple-400 hover:text-red-600 hover:bg-red-50' : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'}`}
                                                            title={user.role === 'admin' ? "Remover Admin (Voltar a Dirigente)" : "Promover a Admin"}
                                                        >
                                                            {user.role === 'admin' ? (
                                                                // ÍCONE DE USUÁRIO (REBAIXAR)
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : (
                                                                // ÍCONE DE ESTRELA (PROMOVER)
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            )}
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

            {campanhaParaExcluir && (
                <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={fecharModalExclusaoCampanha}>
                    <div className="w-full max-w-lg rounded-2xl border border-red-100 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-start justify-between gap-4 border-b border-red-100 bg-red-50 px-6 py-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">Exclusão definitiva</p>
                                <h3 className="mt-1 text-xl font-extrabold text-red-700">
                                    Excluir campanha "{campanhaParaExcluir.titulo || campanhaParaExcluir.id}"
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={fecharModalExclusaoCampanha}
                                disabled={excluindoCampanha}
                                className="rounded-lg px-2 py-1 text-red-400 hover:bg-white hover:text-red-600 disabled:opacity-50"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-5 px-6 py-5">
                            <p className="text-sm leading-relaxed text-gray-600">
                                Essa ação apaga a campanha cadastrada e todo o progresso salvo nela. Não existe restauração automática depois da exclusão.
                            </p>

                            <div className="grid gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 md:grid-cols-2">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Título</p>
                                    <p className="mt-1 font-bold text-gray-800">{campanhaParaExcluir.titulo || campanhaParaExcluir.id}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Identificador</p>
                                    <p className="mt-1 font-mono text-xs text-gray-600">{campanhaParaExcluir.id}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">Registros de progresso vinculados</p>
                                    <p className="mt-1 font-bold text-gray-800">
                                        {carregandoResumoExclusao ? 'Carregando...' : `${registrosCampanhaParaExcluir} registro(s) em territorios_contexto`}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                                    Digite <span className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-red-700">{campanhaParaExcluir.id}</span> para confirmar
                                </label>
                                <input
                                    type="text"
                                    value={confirmacaoExclusao}
                                    onChange={(e) => setConfirmacaoExclusao(e.target.value)}
                                    placeholder="Confirme o identificador"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-200"
                                    disabled={excluindoCampanha}
                                />
                            </div>

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={fecharModalExclusaoCampanha}
                                    disabled={excluindoCampanha}
                                    className="rounded-lg border border-gray-300 px-4 py-2.5 font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={excluirCampanha}
                                    disabled={excluindoCampanha || carregandoResumoExclusao || confirmacaoExclusao.trim() !== campanhaParaExcluir.id}
                                    className="rounded-lg bg-red-600 px-4 py-2.5 font-bold text-white hover:bg-red-700 disabled:opacity-50"
                                >
                                    {excluindoCampanha ? 'Excluindo...' : 'Excluir definitivamente'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
