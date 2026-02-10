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
            try {
                // 1. Busca dados do Firebase
                const querySnapshot = await getDocs(collection(db, "territorios"));
                
                // 2. Busca dados do GeoJSON (mapa.json) para calcular bounds e TOTAL DE QUADRAS
                const responseMap = await fetch('./mapa.json');
                const geoData = await responseMap.json();

                const lista = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const numeroId = parseInt(doc.id.replace('t_', '')) || 0;

                    // --- ENCONTRA A FEATURE NO MAPA ---
                    const feature = geoData.features.find(f => {
                        const fId = f.properties.id || (geoData.features.indexOf(f) + 1);
                        return fId === numeroId;
                    });

                    // --- CÁLCULO DE PORCENTAGEM ---
                    let totalQuadras = 0;
                    let porcentagem = 0;
                    let boundsStr = null;

                    if (feature) {
                        const pontos = feature.properties.pontos || [];
                        totalQuadras = pontos.filter(p => !p.tipo || p.tipo === 'quadra' || p.tipo === 'endereco').length;
                        if (totalQuadras === 0) totalQuadras = 1;

                        const feitas = data.quadras_feitas?.length || 0;
                        porcentagem = Math.round((feitas / totalQuadras) * 100);
                        if (porcentagem > 100) porcentagem = 100;

                        if (feature.geometry) {
                            const coords = feature.geometry.type === 'MultiPolygon' 
                                ? feature.geometry.coordinates.flat(2) 
                                : feature.geometry.coordinates[0]; 
                            
                            if (coords) {
                                let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
                                coords.forEach(p => {
                                    const lng = p[0]; const lat = p[1];
                                    if (lat < minLat) minLat = lat; if (lat > maxLat) maxLat = lat;
                                    if (lng < minLng) minLng = lng; if (lng > maxLng) maxLng = lng;
                                });
                                boundsStr = `${minLat},${minLng},${maxLat},${maxLng}`;
                            }
                        }
                    }

                    // --- LÓGICA DE DATAS GERAIS ---
                    let diasParado = 0;
                    let dataUltimaStr = '-';
                    if (data.ultimaConclusao) {
                        const dataUltimaObj = data.ultimaConclusao.toDate ? data.ultimaConclusao.toDate() : new Date(data.ultimaConclusao);
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

                    // --- LÓGICA REFINADA DA ÚLTIMA EDIÇÃO ---
                    let diasSemEdicao = 0;
                    let ultimaEdicaoTexto = "Sem dados";
                    
                    if (data.designadoPara) {
                        // Prioriza 'ultimaAlteracao'. Se não tiver, usa 'dataDesignacao'. Se não tiver, usa 'agora'.
                        let dataRef = null;
                        if (data.ultimaAlteracao) {
                            dataRef = data.ultimaAlteracao.toDate ? data.ultimaAlteracao.toDate() : new Date(data.ultimaAlteracao);
                        } else if (dataDesigObj) {
                            dataRef = dataDesigObj;
                        } else {
                            dataRef = new Date();
                        }
                        
                        const agora = new Date();
                        const diferencaMs = Math.abs(agora - dataRef); // Usa abs para evitar números negativos se dataRef for futuro (erro de relógio)
                        
                        const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
                        const diferencaHoras = Math.floor(diferencaMs / (1000 * 60 * 60));
                        diasSemEdicao = Math.floor(diferencaMs / (1000 * 60 * 60 * 24)); 

                        if (diferencaMinutos < 2) {
                            ultimaEdicaoTexto = "agora mesmo";
                        } else if (diferencaMinutos < 60) {
                            ultimaEdicaoTexto = `há ${diferencaMinutos} min`;
                        } else if (diferencaHoras < 24) {
                            ultimaEdicaoTexto = `há ${diferencaHoras} h`;
                        } else if (diasSemEdicao === 1) {
                            ultimaEdicaoTexto = "ontem";
                        } else {
                            ultimaEdicaoTexto = `há ${diasSemEdicao} dias`;
                        }
                    }

                    // --- HISTÓRICO ---
                    let historicoProcessado = [];
                    if (data.historico && Array.isArray(data.historico)) {
                        historicoProcessado = data.historico.map(h => {
                            const inicio = h.dataInicio?.toDate ? h.dataInicio.toDate() : (h.dataRetirada?.toDate ? h.dataRetirada.toDate() : new Date());
                            const fim = h.dataTermino?.toDate ? h.dataTermino.toDate() : (h.dataDevolucao?.toDate ? h.dataDevolucao.toDate() : new Date());
                            const inicioStr = !isNaN(inicio) ? inicio.toLocaleDateString('pt-BR') : '?';
                            const fimStr = !isNaN(fim) ? fim.toLocaleDateString('pt-BR') : '?';
                            let listaNomes = Array.isArray(h.responsaveis) ? h.responsaveis.join(", ") : (h.responsavel || "Desconhecido");
                            return { nomes: listaNomes, inicio: inicioStr, termino: fimStr, timestampFim: fim };
                        });
                        historicoProcessado.sort((a, b) => b.timestampFim - a.timestampFim);
                        historicoProcessado = historicoProcessado.slice(0, 10);
                    }

                    const nomeSeguro = data.nome || `Território ${doc.id}`;

                    return {
                        id: doc.id,
                        numeroId,
                        ...data,
                        nome: nomeSeguro,
                        diasParado,
                        diasSemEdicao,
                        ultimaEdicaoTexto,
                        totalQuadras,
                        porcentagem,
                        dataUltimaStr,
                        dataDesigStr,
                        dataDesigObj,
                        historicoLista: historicoProcessado,
                        status: data.designadoPara ? 'ocupado' : 'livre',
                        boundsStr
                    };
                });

                setTerritorios(lista);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setLoading(false);
            }
        };

        carregarDados();
    }, []);

    const formatarTempo = (dias) => {
        if (dias === 0) return "Hoje";
        if (dias < 30) return `${dias} dias`;
        const meses = Math.floor(dias / 30);
        const restoDias = dias % 30;
        let texto = `${meses} ${meses > 1 ? 'meses' : 'mês'}`;
        if (restoDias > 0) texto += ` e ${restoDias} ${restoDias > 1 ? 'dias' : 'dia'}`;
        return texto;
    };

    const toggleLinha = (id) => {
        setLinhasExpandidas(prev => {
            if (prev.includes(id)) return prev.filter(item => item !== id);
            else return [...prev, id];
        });
    };

    const toggleTodas = () => {
        const todosVisiveisIds = dadosProcessados.map(t => t.id);
        const todasAbertas = todosVisiveisIds.every(id => linhasExpandidas.includes(id));
        if (todasAbertas) setLinhasExpandidas([]);
        else setLinhasExpandidas(todosVisiveisIds);
    };

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
        if (tipo === 'criticos') setTempoFiltro('4_meses');
    };

    const dadosProcessados = useMemo(() => {
        let dados = [...territorios];
        if (statusFiltro !== 'todos') dados = dados.filter(t => t.status === statusFiltro);
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
        const baseUrl = window.location.href.split('#')[0];

        doc.setFontSize(18);
        doc.text("Relatório de Territórios", 14, 20);
        doc.setFontSize(10);
        doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 26);

        doc.setFontSize(8);
        doc.setTextColor(100);

        let textoTempoFiltro = "Todos";
        if (tempoFiltro === '2_meses') textoTempoFiltro = "+2 Meses";
        if (tempoFiltro === '4_meses') textoTempoFiltro = "+4 Meses";
        if (tempoFiltro === '6_meses') textoTempoFiltro = "+6 Meses";

        const textoFiltro = busca ? `Busca: "${busca}"` : "Sem busca";
        doc.text(`Filtros: Status (${statusFiltro}) | Tempo (${textoTempoFiltro}) | ${textoFiltro}`, 14, 31);

        const tableColumn = ["Cód.", "Nome", "Status / Progresso", "Histórico / Ciclos", "Ult. Conclusão", "Tempo Parado"];
        const tableRows = [];

        dadosProcessados.forEach(t => {
            let textoHistorico = "";
            let statusTexto = t.status === 'ocupado' ? `Ocupado (${t.porcentagem}%) - Ult. Ed: ${t.ultimaEdicaoTexto}` : 'Livre';

            if (t.status === 'ocupado') {
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
                    textoHistorico += `• Início: ${h.inicio} - Dirigentes: ${h.nomes} - Término: ${h.termino}\n`;
                });
            } else {
                textoHistorico += "\n(Sem histórico)";
            }

            const hasLink = !!t.boundsStr;

            const dadosLinha = [
                t.numeroId,
                { content: t.nome, styles: { textColor: hasLink ? [0, 0, 255] : [0, 0, 0] } },
                statusTexto,
                textoHistorico,
                t.dataUltimaStr,
                t.diasParado > 0 ? formatarTempo(t.diasParado) : 'Nunca'
            ];
            tableRows.push(dadosLinha);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, valign: 'top' },
            headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255] },
            columnStyles: {
                3: { cellWidth: 80 }
            },
            didDrawCell: (data) => {
                if (data.section === 'body' && data.column.index === 1) {
                    const t = dadosProcessados[data.row.index];
                    if (t && t.boundsStr) {
                        const deepLink = `${baseUrl}#/app?bounds=${t.boundsStr}`;
                        doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, { url: deepLink });
                    }
                }
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
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={exportarPDF} 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all active:scale-95"
                            title="Baixar Relatório em PDF"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </button>
                        
                        <Link 
                            to="/app" 
                            className="px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                        >
                            ← Voltar ao Mapa
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

                {/* --- MODO MOBILE: CARDS (VISÍVEL APENAS EM CELULAR) --- */}
                <div className="md:hidden space-y-4">
                    {dadosProcessados.map((t) => (
                        <div key={t.id} className={`bg-white rounded-xl shadow border border-slate-200 p-4 transition-all ${linhasExpandidas.includes(t.id) ? 'ring-2 ring-blue-100' : ''}`}>
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-500 mb-1">
                                        #{t.numeroId}
                                    </span>
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight">
                                        {t.boundsStr ? (
                                            <Link 
                                                to={`/app?bounds=${t.boundsStr}`} 
                                                className="text-blue-600 hover:underline"
                                            >
                                                {t.nome}
                                            </Link>
                                        ) : t.nome}
                                    </h3>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    {t.status === 'ocupado' ?
                                        <div className="flex flex-col items-end">
                                            {/* PÍLULA PADRONIZADA COM TEXTO OCUPADO E NUMERO AO FUNDO (DIREITA) */}
                                            <span 
                                                className="inline-flex items-center justify-between px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20 uppercase shadow-sm min-w-[100px]"
                                                style={{ 
                                                    background: `linear-gradient(90deg, #15803d ${t.porcentagem}%, #3b82f6 ${t.porcentagem}%)`,
                                                    textShadow: '0px 1px 1px rgba(0,0,0,0.3)'
                                                }}
                                                title={`${t.porcentagem}% Concluído`}
                                            >
                                                <span>Ocupado</span>
                                                <span className="opacity-50 text-[9px] ml-1">{t.porcentagem}%</span>
                                            </span>
                                            <span className={`text-[9px] mt-0.5 ${t.diasSemEdicao > 10 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                                                {t.diasSemEdicao > 10 && '⚠️ '}Edição: {t.ultimaEdicaoTexto}
                                            </span>
                                        </div>
                                         :
                                        <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 uppercase min-w-[100px]">Livre</span>
                                    }
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-slate-600 mb-4">
                                <div className="flex justify-between border-b border-slate-50 pb-1">
                                    <span className="text-slate-400 text-xs">Responsável</span>
                                    <span className="font-medium text-right max-w-[60%] truncate">{t.designadoNome || '-'}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-1">
                                    <span className="text-slate-400 text-xs">Designado em</span>
                                    <span className="font-medium">{t.dataDesigStr}</span>
                                </div>
                                {t.status === 'livre' && (
                                    <div className="flex justify-between border-b border-slate-50 pb-1">
                                        <span className="text-slate-400 text-xs">Última Conclusão</span>
                                        <span className="font-medium">{t.dataUltimaStr}</span>
                                    </div>
                                )}
                                {t.status === 'livre' && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-400 text-xs">Tempo Parado</span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${getCorTempo(t.diasParado)}`}>
                                            {formatarTempo(t.diasParado)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={() => toggleLinha(t.id)}
                                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold uppercase rounded flex items-center justify-center gap-2 transition-colors"
                            >
                                {linhasExpandidas.includes(t.id) ? 'Ocultar Histórico' : 'Ver Histórico'}
                                <span>{linhasExpandidas.includes(t.id) ? '▲' : '▼'}</span>
                            </button>

                            {linhasExpandidas.includes(t.id) && (
                                <div className="mt-3 pt-3 border-t border-slate-100 animate-fade-in">
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Histórico Recente</h4>
                                    {t.historicoLista.length > 0 ? (
                                        <div className="space-y-2">
                                            {t.historicoLista.map((hist, idx) => (
                                                <div key={idx} className="text-xs bg-slate-50 p-2 rounded border border-slate-100">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-slate-500">{hist.inicio}</span>
                                                        <span className="text-green-600 font-bold">→ {hist.termino}</span>
                                                    </div>
                                                    <div className="text-slate-700 font-medium">{hist.nomes}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-slate-400 italic">Sem histórico.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    {dadosProcessados.length === 0 && (
                        <div className="p-8 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
                            Nenhum território encontrado.
                        </div>
                    )}
                </div>

                {/* --- MODO DESKTOP: TABELA (VISÍVEL APENAS EM TELAS GRANDES) --- */}
                <div className="hidden md:block bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
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
                                    <th className="px-4 py-3 cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('dataDesigObj')}>Designado em {getSortIcon('dataDesigObj')}</th>
                                    <th className="px-4 py-3 text-right cursor-pointer hover:bg-slate-100 select-none" onClick={() => handleSort('dataUltimaObj')}>Conclusão {getSortIcon('dataUltimaObj')}</th>
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
                                            
                                            <td className="px-4 py-3 font-bold text-slate-700">
                                                {t.boundsStr ? (
                                                    <Link 
                                                        to={`/app?bounds=${t.boundsStr}`} 
                                                        className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                                                        onClick={(e) => e.stopPropagation()} 
                                                    >
                                                        {t.nome}
                                                    </Link>
                                                ) : (
                                                    t.nome
                                                )}
                                            </td>
                                            
                                            <td className="px-4 py-3">
                                                {t.status === 'ocupado' ?
                                                    <div className="flex flex-col items-start">
                                                        {/* PÍLULA PADRONIZADA COM TEXTO OCUPADO E NUMERO AO FUNDO (DIREITA) */}
                                                        <span 
                                                            className="inline-flex items-center justify-between gap-1 px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20 uppercase shadow-sm min-w-[100px]"
                                                            style={{ 
                                                                background: `linear-gradient(90deg, #15803d ${t.porcentagem}%, #3b82f6 ${t.porcentagem}%)`,
                                                                textShadow: '0px 1px 1px rgba(0,0,0,0.3)'
                                                            }}
                                                            title={`${t.porcentagem}% Concluído`}
                                                        >
                                                            <span>Ocupado</span>
                                                            <span className="opacity-50 text-[9px]">{t.porcentagem}%</span>
                                                        </span>
                                                        <span className={`text-[9px] ml-1 mt-0.5 ${t.diasSemEdicao > 10 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                                                            {t.diasSemEdicao > 10 && '⚠️ '}Ult. ed: {t.ultimaEdicaoTexto}
                                                        </span>
                                                    </div> :
                                                    <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200 uppercase min-w-[100px]">Livre</span>
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">
                                                {t.designadoNome || '-'}
                                                {t.status === 'ocupado' && t.cicloAtual && t.cicloAtual.responsaveis && t.cicloAtual.responsaveis.length > 1 && (
                                                    <span className="text-[10px] text-blue-500 ml-1">(+ {t.cicloAtual.responsaveis.length - 1} outros)</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 text-xs">{t.dataDesigStr}</td>
                                            <td className="px-4 py-3 text-right text-slate-500 text-xs">{t.dataUltimaStr}</td>

                                            <td className="px-4 py-3 text-right">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${getCorTempo(t.diasParado)}`}>
                                                    {formatarTempo(t.diasParado)}
                                                </span>
                                            </td>
                                        </tr>

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