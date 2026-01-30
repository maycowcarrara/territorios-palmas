import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Relatorios = () => {
    const [territorios, setTerritorios] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- ESTADO PARA MULTI-EXPANSÃO ---
    const [linhasExpandidas, setLinhasExpandidas] = useState([]);

    // --- ESTADOS DE FILTRO E ORDENAÇÃO ---
    const [busca, setBusca] = useState('');
    const [statusFiltro, setStatusFiltro] = useState('todos');
    const [tempoFiltro, setTempoFiltro] = useState('todos');
    const [sortConfig, setSortConfig] = useState({ key: 'diasParado', direction: 'desc' });

    useEffect(() => {
        const carregarDados = async () => {
            const querySnapshot = await getDocs(collection(db, "territorios"));
            const lista = querySnapshot.docs.map(doc => {
                const data = doc.data();

                let diasParado = 0;
                let dataUltimaStr = '-';
                let dataUltimaObj = null;

                if (data.ultimaConclusao) {
                    dataUltimaObj = data.ultimaConclusao.toDate ? data.ultimaConclusao.toDate() : new Date(data.ultimaConclusao);
                    diasParado = Math.ceil(Math.abs(new Date() - dataUltimaObj) / (1000 * 60 * 60 * 24));
                    dataUltimaStr = dataUltimaObj.toLocaleDateString('pt-BR');
                }

                let diasComDirigente = 0;
                let dataDesigStr = '-';
                let dataDesigObj = null;

                if (data.designadoPara && data.dataDesignacao) {
                    dataDesigObj = data.dataDesignacao.toDate ? data.dataDesignacao.toDate() : new Date(data.dataDesignacao);
                    diasComDirigente = Math.ceil(Math.abs(new Date() - dataDesigObj) / (1000 * 60 * 60 * 24));
                    dataDesigStr = dataDesigObj.toLocaleDateString('pt-BR');
                }

                // --- NOVA LÓGICA DE HISTÓRICO (CICLOS) ---
                let historicoProcessado = [];
                if (data.historico && Array.isArray(data.historico)) {
                    historicoProcessado = data.historico.map(h => {
                        // Data de Início (Tenta pegar dataInicio do ciclo, senão dataRetirada antiga)
                        const inicio = h.dataInicio?.toDate ? h.dataInicio.toDate() : (h.dataRetirada?.toDate ? h.dataRetirada.toDate() : new Date());

                        // Data de Término (Tenta pegar dataTermino do ciclo, senão dataDevolucao antiga)
                        const fim = h.dataTermino?.toDate ? h.dataTermino.toDate() : (h.dataDevolucao?.toDate ? h.dataDevolucao.toDate() : new Date());

                        const inicioStr = !isNaN(inicio) ? inicio.toLocaleDateString('pt-BR') : '?';
                        const fimStr = !isNaN(fim) ? fim.toLocaleDateString('pt-BR') : '?';

                        // Nomes dos Responsáveis (Pode ser Array novo ou String antiga)
                        let listaNomes = "";
                        if (Array.isArray(h.responsaveis)) {
                            listaNomes = h.responsaveis.join(", ");
                        } else {
                            listaNomes = h.responsavel || "Desconhecido"; // Fallback
                        }

                        return {
                            nomes: listaNomes,
                            inicio: inicioStr,
                            termino: fimStr,
                            timestampFim: fim
                        };
                    });

                    // Ordena pelo término mais recente
                    historicoProcessado.sort((a, b) => b.timestampFim - a.timestampFim);
                    historicoProcessado = historicoProcessado.slice(0, 10); // Limita aos últimos 10
                }

                const nomeSeguro = data.nome || `Território ${doc.id}`;
                const numeroId = parseInt(doc.id.replace('t_', '')) || 0;

                return {
                    id: doc.id,
                    numeroId,
                    ...data,
                    nome: nomeSeguro,
                    diasParado,
                    diasComDirigente,
                    dataUltimaStr,
                    dataUltimaObj,
                    dataDesigStr,
                    dataDesigObj,
                    historicoLista: historicoProcessado,
                    status: data.designadoPara ? 'ocupado' : 'livre'
                };
            });

            setTerritorios(lista);
            setLoading(false);
        };

        carregarDados();
    }, []);

    // --- FUNÇÃO DE FORMATAÇÃO DE TEMPO AMIGÁVEL ---
    const formatarTempo = (dias) => {
        if (dias === 0) return "Hoje";
        if (dias < 30) return `${dias} dias`;

        const meses = Math.floor(dias / 30);
        const restoDias = dias % 30;

        let texto = `${meses} ${meses > 1 ? 'meses' : 'mês'}`;
        if (restoDias > 0) {
            texto += ` e ${restoDias} ${restoDias > 1 ? 'dias' : 'dia'}`;
        }
        return texto;
    };

    // --- FUNÇÕES DE EXPANSÃO ---
    const toggleLinha = (id) => {
        setLinhasExpandidas(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const toggleTodas = () => {
        const todosVisiveisIds = dadosProcessados.map(t => t.id);
        const todasAbertas = todosVisiveisIds.every(id => linhasExpandidas.includes(id));

        if (todasAbertas) {
            setLinhasExpandidas([]);
        } else {
            setLinhasExpandidas(todosVisiveisIds);
        }
    };

    // --- FILTROS E LÓGICA ---
    const limparFiltros = () => {
        setBusca('');
        setStatusFiltro('todos');
        setTempoFiltro('todos');
        setSortConfig({ key: 'diasParado', direction: 'desc' });
        setLinhasExpandidas([]);
    };

    const aplicarFiltroRapido = (tipo) => {
        limparFiltros();
        if (tipo === 'livre') setStatusFiltro('livre');
        if (tipo === 'ocupado') setStatusFiltro('ocupado');
        if (tipo === 'criticos') setTempoFiltro('4_meses'); // Atalho para +4 meses
    };

    const dadosProcessados = useMemo(() => {
        let dados = [...territorios];

        // Filtro de Status
        if (statusFiltro !== 'todos') dados = dados.filter(t => t.status === statusFiltro);

        // Filtro de Tempo (Novas opções)
        if (tempoFiltro === '2_meses') dados = dados.filter(t => t.diasParado > 60);
        if (tempoFiltro === '4_meses') dados = dados.filter(t => t.diasParado > 120);
        if (tempoFiltro === '6_meses') dados = dados.filter(t => t.diasParado > 180);

        if (busca) {
            const termo = busca.toLowerCase();
            dados = dados.filter(t => {
                const nomeLower = t.nome ? t.nome.toLowerCase() : '';
                const idString = t.numeroId ? t.numeroId.toString() : '';
                const responsavelLower = t.designadoNome ? t.designadoNome.toLowerCase() : '';
                return nomeLower.includes(termo) || idString.includes(termo) || responsavelLower.includes(termo);
            });
        }

        if (sortConfig.key) {
            dados.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (aValue === null || aValue === undefined || aValue === '-') return 1;
                if (bValue === null || bValue === undefined || bValue === '-') return -1;
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return dados;
    }, [territorios, busca, statusFiltro, tempoFiltro, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <span className="text-gray-300 ml-1 text-[10px]">↕</span>;
        return sortConfig.direction === 'asc' ? <span className="text-blue-600 ml-1 text-[10px]">▲</span> : <span className="text-blue-600 ml-1 text-[10px]">▼</span>;
    };

    // Estatísticas Gerais (Sempre calculadas sobre o total)
    const total = territorios.length;
    const ocupados = territorios.filter(t => t.status === 'ocupado').length;
    const livres = total - ocupados;
    const criticos = territorios.filter(t => t.diasParado > 120).length;

    const getCorTempo = (dias) => {
        if (dias > 180) return 'bg-orange-600 text-white';
        if (dias > 120) return 'bg-orange-500 text-white';
        if (dias > 60) return 'bg-orange-300 text-orange-900';
        if (dias > 0) return 'bg-orange-100 text-orange-800';
        return 'bg-slate-100 text-slate-500';
    };

    // --- PDF ---
    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Relatório de Territórios", 14, 20);
        doc.setFontSize(10);
        doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 26);

        doc.setFontSize(8);
        doc.setTextColor(100);

        // Texto descritivo do filtro de tempo para o PDF
        let textoTempoFiltro = "Todos";
        if (tempoFiltro === '2_meses') textoTempoFiltro = "+2 Meses";
        if (tempoFiltro === '4_meses') textoTempoFiltro = "+4 Meses";
        if (tempoFiltro === '6_meses') textoTempoFiltro = "+6 Meses";

        const textoFiltro = busca ? `Busca: "${busca}"` : "Sem busca";
        doc.text(`Filtros: Status (${statusFiltro}) | Tempo (${textoTempoFiltro}) | ${textoFiltro}`, 14, 31);

        const tableColumn = ["Cód.", "Nome", "Status", "Histórico / Ciclos", "Ult. Conclusão", "Tempo Parado"];
        const tableRows = [];

        dadosProcessados.forEach(t => {
            let textoHistorico = "";

            if (t.status === 'ocupado') {
                // Se tiver ciclo atual acumulado (array), junta os nomes. Senão usa o nome único.
                let atuais = t.designadoNome;
                if (t.cicloAtual && Array.isArray(t.cicloAtual.responsaveis)) {
                    atuais = t.cicloAtual.responsaveis.join(", ");
                }
                textoHistorico += `[EM ANDAMENTO]\nDirigentes: ${atuais}\nDesde: ${t.dataDesigStr}\n\n`;
            } else {
                textoHistorico += "LIVRE\n";
            }

            if (t.historicoLista && t.historicoLista.length > 0) {
                textoHistorico += "-- HISTÓRICO --\n";
                t.historicoLista.forEach(h => {
                    // FORMATO SOLICITADO:
                    // Início: DATA - Dirigentes: Nomes - Término: DATA
                    textoHistorico += `• Início: ${h.inicio} - Dirigentes: ${h.nomes} - Término: ${h.termino}\n`;
                });
            } else {
                textoHistorico += "\n(Sem histórico)";
            }

            const dadosLinha = [
                t.numeroId,
                t.nome,
                t.status === 'ocupado' ? 'Ocupado' : 'Livre',
                textoHistorico,
                t.dataUltimaStr,
                // Usando a nova formatação também no PDF
                t.diasParado > 0 ? formatarTempo(t.diasParado) : 'Nunca'
            ];
            tableRows.push(dadosLinha);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, valign: 'top' }, // valign top para ficar alinhado ao topo
            headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255] },
            columnStyles: {
                3: { cellWidth: 95 } // Coluna de histórico bem larga
            }
        });

        doc.save(`Relatorio_Territorios.pdf`);
    };

    if (loading) return <div className="flex h-screen items-center justify-center text-blue-600 font-bold">Carregando dados...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-4 font-sans">
            <div className="max-w-7xl mx-auto">

                <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-extrabold text-slate-800">Relatório de Territórios</h1>
                        <p className="text-slate-500 text-sm">Gerencie, filtre e veja o histórico.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <button onClick={exportarPDF} className="justify-center px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 text-sm flex items-center gap-2 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Baixar PDF
                        </button>
                        <Link to="/app" className="justify-center px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 text-sm transition-colors text-center">
                            ← Mapa
                        </Link>
                    </div>
                </header>

                {/* CARDS DE RESUMO */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div onClick={() => aplicarFiltroRapido('total')} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-slate-300">
                        <p className="text-xs font-bold text-slate-400 uppercase">Total</p>
                        <p className="text-3xl font-black text-slate-700">{total}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Clique para ver todos</p>
                    </div>
                    <div onClick={() => aplicarFiltroRapido('ocupado')} className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md cursor-pointer transition-all hover:bg-blue-100">
                        <p className="text-xs font-bold text-blue-400 uppercase">Designados</p>
                        <p className="text-3xl font-black text-blue-700">{ocupados}</p>
                        <p className="text-[10px] text-blue-400 mt-1">Clique para filtrar</p>
                    </div>
                    <div onClick={() => aplicarFiltroRapido('livre')} className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm hover:shadow-md cursor-pointer transition-all hover:bg-green-100">
                        <p className="text-xs font-bold text-green-500 uppercase">Disponíveis</p>
                        <p className="text-3xl font-black text-green-700">{livres}</p>
                        <p className="text-[10px] text-green-500 mt-1">Clique para filtrar</p>
                    </div>
                    <div onClick={() => aplicarFiltroRapido('criticos')} className="bg-orange-50 p-4 rounded-xl border border-orange-100 shadow-sm hover:shadow-md cursor-pointer transition-all hover:bg-orange-100">
                        <p className="text-xs font-bold text-orange-500 uppercase">Atrasados (+4 meses)</p>
                        <p className="text-3xl font-black text-orange-700">{criticos}</p>
                        <p className="text-[10px] text-orange-500 mt-1">Clique para ver lista</p>
                    </div>
                </div>

                {/* BARRA DE FILTROS */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                        <div className="relative w-full lg:w-1/3">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </span>
                            <input type="text" placeholder="Buscar nome, código ou dirigente..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" value={busca} onChange={(e) => setBusca(e.target.value)} />
                        </div>
                        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-2 flex-1">
                            <select value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)} className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 cursor-pointer">
                                <option value="todos">Status: Todos</option>
                                <option value="livre">Apenas Livres</option>
                                <option value="ocupado">Apenas Ocupados</option>
                            </select>

                            <select value={tempoFiltro} onChange={(e) => setTempoFiltro(e.target.value)} className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 cursor-pointer">
                                <option value="todos">Tempo: Todos</option>
                                <option value="2_meses">+2 Meses</option>
                                <option value="4_meses">+4 Meses</option>
                                <option value="6_meses">+6 Meses</option>
                            </select>

                            {(busca || statusFiltro !== 'todos' || tempoFiltro !== 'todos') && (
                                <button onClick={limparFiltros} className="w-full sm:w-auto px-3 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-1 font-semibold">✕ Limpar</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* TABELA DE DADOS */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 w-10 text-center cursor-pointer hover:bg-slate-100" onClick={toggleTodas} title="Expandir/Recolher Todos">
                                        <span className="text-lg font-bold">
                                            {linhasExpandidas.length > 0 && linhasExpandidas.length === dadosProcessados.length ? '−' : '+'}
                                        </span>
                                    </th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('numeroId')}>Cód. {getSortIcon('numeroId')}</th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('nome')}>Nome {getSortIcon('nome')}</th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('status')}>Status {getSortIcon('status')}</th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('designadoNome')}>Responsável {getSortIcon('designadoNome')}</th>
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none hidden sm:table-cell" onClick={() => handleSort('dataDesigObj')}>Designado em {getSortIcon('dataDesigObj')}</th>
                                    <th className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 select-none hidden sm:table-cell" onClick={() => handleSort('dataUltimaObj')}>Conclusão {getSortIcon('dataUltimaObj')}</th>
                                    <th className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('diasParado')}>Tempo Parado {getSortIcon('diasParado')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {dadosProcessados.map((t) => (
                                    <React.Fragment key={t.id}>
                                        <tr className={`hover:bg-slate-50 transition-colors cursor-pointer ${linhasExpandidas.includes(t.id) ? 'bg-blue-50' : ''}`} onClick={() => toggleLinha(t.id)}>
                                            <td className="px-4 py-3 text-center text-slate-400">
                                                {t.historicoLista.length > 0
                                                    ? (linhasExpandidas.includes(t.id) ? '▼' : '▶')
                                                    : <span className="opacity-20">●</span>}
                                            </td>
                                            <td className="px-4 py-3 text-xs font-mono text-slate-400 font-bold">{t.numeroId}</td>
                                            <td className="px-4 py-3 font-bold text-slate-700">{t.nome}</td>
                                            <td className="px-4 py-3">
                                                {t.status === 'ocupado' ?
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase">Ocupado</span> :
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">Livre</span>
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {t.designadoNome || '-'}
                                                {t.status === 'ocupado' && t.cicloAtual && t.cicloAtual.responsaveis && t.cicloAtual.responsaveis.length > 1 && (
                                                    <span className="text-[10px] text-blue-500 ml-1">(+ {t.cicloAtual.responsaveis.length - 1} outros)</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 text-xs hidden sm:table-cell">{t.dataDesigStr}</td>
                                            <td className="px-4 py-3 text-right text-slate-500 text-xs hidden sm:table-cell">{t.dataUltimaStr}</td>

                                            <td className="px-4 py-3 text-right">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${getCorTempo(t.diasParado)}`}>
                                                    {formatarTempo(t.diasParado)}
                                                </span>
                                            </td>
                                        </tr>

                                        {/* LINHA DE HISTÓRICO EXPANDIDA */}
                                        {linhasExpandidas.includes(t.id) && (
                                            <tr className="bg-slate-50 animate-fade-in">
                                                <td colSpan="8" className="p-0">
                                                    <div className="p-4 border-b border-slate-200 shadow-inner">
                                                        <div className="bg-white rounded-lg border border-slate-200 p-3">
                                                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-2">
                                                                📜 Histórico de Ciclos
                                                            </h4>
                                                            {t.historicoLista.length > 0 ? (
                                                                <table className="w-full text-xs text-left">
                                                                    <thead>
                                                                        <tr className="text-slate-400 border-b border-slate-100">
                                                                            <th className="py-2 pl-2">Início</th>
                                                                            <th className="py-2">Dirigentes (Ciclo Completo)</th>
                                                                            <th className="py-2">Término</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {t.historicoLista.map((hist, index) => (
                                                                            <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                                                                <td className="py-2 pl-2 text-slate-500">{hist.inicio}</td>
                                                                                <td className="py-2 font-medium text-slate-700">{hist.nomes}</td>
                                                                                <td className="py-2 text-green-600 font-medium">{hist.termino}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            ) : (
                                                                <p className="text-xs text-slate-400 italic p-2">Nenhum histórico registrado para este território ainda.</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                                {dadosProcessados.length === 0 && (
                                    <tr><td colSpan="8" className="p-8 text-center text-slate-400">Nenhum território encontrado com os filtros atuais.</td></tr>
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