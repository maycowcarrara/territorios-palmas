import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const Relatorios = () => {
    const [territorios, setTerritorios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState('todos'); // 'todos', 'livres', 'atrasados'

    useEffect(() => {
        const carregarDados = async () => {
            const querySnapshot = await getDocs(collection(db, "territorios"));
            const lista = querySnapshot.docs.map(doc => {
                const data = doc.data();

                // Cálculo de dias parado
                let diasParado = 0;
                if (data.ultimaConclusao) {
                    const dataUltima = data.ultimaConclusao.toDate ? data.ultimaConclusao.toDate() : new Date(data.ultimaConclusao);
                    diasParado = Math.ceil(Math.abs(new Date() - dataUltima) / (1000 * 60 * 60 * 24));
                }

                // Cálculo de dias com o dirigente (se ocupado)
                let diasComDirigente = 0;
                if (data.designadoPara && data.dataDesignacao) {
                    const dataDesig = data.dataDesignacao.toDate ? data.dataDesignacao.toDate() : new Date(data.dataDesignacao);
                    diasComDirigente = Math.ceil(Math.abs(new Date() - dataDesig) / (1000 * 60 * 60 * 24));
                }

                return {
                    id: doc.id,
                    ...data,
                    diasParado,
                    diasComDirigente,
                    status: data.designadoPara ? 'ocupado' : 'livre'
                };
            });

            // Ordenar: Primeiro os atrasados (mais dias parados), depois por nome
            lista.sort((a, b) => b.diasParado - a.diasParado);
            setTerritorios(lista);
            setLoading(false);
        };

        carregarDados();
    }, []);

    // Estatísticas Gerais
    const total = territorios.length;
    const ocupados = territorios.filter(t => t.status === 'ocupado').length;
    const livres = total - ocupados;
    // Consideramos "Crítico" se não trabalhado há mais de 4 meses (120 dias)
    const criticos = territorios.filter(t => t.diasParado > 120).length;

    // Filtragem da Tabela
    const dadosFiltrados = territorios.filter(t => {
        if (filtro === 'livres') return t.status === 'livre';
        if (filtro === 'atrasados') return t.diasParado > 120;
        return true;
    });

    // Função de cor baseada no tempo parado (Igual ao Mapa)
    const getCorTempo = (dias) => {
        if (dias > 180) return 'bg-orange-600 text-white'; // > 6 meses
        if (dias > 120) return 'bg-orange-500 text-white'; // 4-6 meses
        if (dias > 60) return 'bg-orange-300 text-orange-900';  // 2-4 meses
        if (dias > 0) return 'bg-orange-100 text-orange-800';   // Recente
        return 'bg-slate-100 text-slate-500'; // Nunca feito ou muito recente
    };

    if (loading) return <div className="flex h-screen items-center justify-center text-blue-600 font-bold">Carregando dados...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-4 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-800">Relatório de Territórios</h1>
                        <p className="text-slate-500 text-sm">Visão geral do progresso e designações.</p>
                    </div>
                    <Link to="/app" className="px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 text-sm">
                        ← Voltar ao Mapa
                    </Link>
                </header>

                {/* CARDS DE RESUMO */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase">Total</p>
                        <p className="text-3xl font-black text-slate-700">{total}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                        <p className="text-xs font-bold text-blue-400 uppercase">Designados</p>
                        <p className="text-3xl font-black text-blue-700">{ocupados}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm">
                        <p className="text-xs font-bold text-green-500 uppercase">Disponíveis</p>
                        <p className="text-3xl font-black text-green-700">{livres}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 shadow-sm">
                        <p className="text-xs font-bold text-orange-500 uppercase">Atrasados (+4 meses)</p>
                        <p className="text-3xl font-black text-orange-700">{criticos}</p>
                    </div>
                </div>

                {/* FILTROS E TABELA */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex gap-2 overflow-x-auto">
                        <button
                            onClick={() => setFiltro('todos')}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${filtro === 'todos' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFiltro('livres')}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${filtro === 'livres' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                        >
                            Apenas Livres
                        </button>
                        <button
                            onClick={() => setFiltro('atrasados')}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${filtro === 'atrasados' ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
                        >
                            Prioridade (+ Antigos)
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3">Território</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Responsável</th>
                                    <th className="px-4 py-3 text-center">Tempo com Dirigente</th>
                                    <th className="px-4 py-3 text-right">Última Conclusão</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {dadosFiltrados.map((t) => (
                                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 font-bold text-slate-700">
                                            {t.nome}
                                        </td>
                                        <td className="px-4 py-3">
                                            {t.status === 'ocupado' ?
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">● Ocupado</span> :
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">● Livre</span>
                                            }
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {t.designadoNome || '-'}
                                        </td>
                                        <td className="px-4 py-3 text-center text-slate-500">
                                            {t.status === 'ocupado' ? `${t.diasComDirigente} dias` : '-'}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${getCorTempo(t.diasParado)}`}>
                                                {t.diasParado === 0 ? 'Nunca' : `${t.diasParado} dias atrás`}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {dadosFiltrados.length === 0 && (
                                    <tr><td colSpan="5" className="p-8 text-center text-slate-400">Nenhum território encontrado neste filtro.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Relatorios;