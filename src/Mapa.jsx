import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker, Tooltip, useMapEvents, useMap, Marker } from 'react-leaflet';
import { doc, onSnapshot, updateDoc, setDoc, arrayUnion, arrayRemove, collection, getDocs, addDoc, query, where, deleteField } from 'firebase/firestore';
import { db } from './firebase';
import L from 'leaflet';

// --- CSS ---
const cssTooltip = `
  .label-territorio { background: transparent; border: none; box-shadow: none; font-family: 'Bahnschrift', sans-serif-condensed, sans-serif; text-align: center; line-height: 1.1; pointer-events: none; }
  .label-nome { font-weight: 700; font-size: 14px; color: #1e3a8a; text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff; display: block; font-stretch: condensed; letter-spacing: -0.5px; margin-bottom: 2px; white-space: normal; max-width: 140px; margin-left: auto; margin-right: auto; }
  .label-status { font-size: 11px; font-weight: 700; color: #444; text-shadow: 1px 1px 0px rgba(255,255,255,0.9); background-color: rgba(255,255,255,0.7); padding: 1px 6px; border-radius: 8px; display: inline-block; }
  .label-tempo { display: block; font-size: 10px; font-weight: 800; color: #7f1d1d; margin-top: 2px; text-shadow: 1px 1px 0px rgba(255,255,255,0.8); text-transform: uppercase; }
  .sem-fundo { background: transparent; border: none; box-shadow: none; }
  
  .map-layer-btn { width: 48px; height: 48px; border-radius: 8px; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); cursor: pointer; transition: transform 0.1s, border-color 0.2s; overflow: hidden; position: relative; background-size: cover; }
  .map-layer-btn:active { transform: scale(0.95); }
  .map-layer-btn.active { border-color: #2563eb; transform: scale(1.05); z-index: 10; }
  
  .thumb-rua { background: #e5e7eb; } 
  .thumb-rua::after { content: '🗺️'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; }

  .thumb-google { background: #fce7b2; } 
  .thumb-google::after { content: '📍'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; }
  
  .thumb-satelite {
    background-color: #172554;
    background-image: 
      radial-gradient(circle at 15% 25%, white 1px, transparent 1.5px),
      radial-gradient(circle at 75% 15%, rgba(255,255,255,0.8) 1px, transparent 1.5px),
      radial-gradient(circle at 60% 85%, rgba(255,255,255,0.9) 1px, transparent 1.5px),
      radial-gradient(circle at 25% 80%, rgba(255,255,255,0.6) 1px, transparent 1.5px),
      radial-gradient(circle at 85% 65%, rgba(255,255,255,0.7) 1px, transparent 1.5px);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .thumb-satelite::after { 
    content: '🛰️'; 
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
    font-size: 24px; 
    filter: drop-shadow(0 0 4px rgba(255,255,255,0.5)); 
  }

  .leaflet-tooltip.sem-fundo {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .popup-btn-action { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 8px; border-radius: 6px; font-weight: bold; font-size: 12px; transition: background-color 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.1); cursor: pointer; }
  .popup-btn-action:disabled { opacity: 0.7; cursor: not-allowed; }
`;

// Função Centroide
const calcularCentroide = (coords) => {
    let lat = 0, lng = 0, n = coords.length;
    coords.forEach(p => { lat += p[1]; lng += p[0]; });
    return { lat: lat / n, lng: lng / n };
};

// --- DEEP LINK HANDLER ---
const DeepLinkHandler = () => {
    const map = useMap();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const boundsParam = params.get('bounds');
        if (boundsParam) {
            const parts = boundsParam.split(',').map(parseFloat);
            if (parts.length === 4) {
                const [minLat, minLng, maxLat, maxLng] = parts;
                const bounds = L.latLngBounds([minLat, minLng], [maxLat, maxLng]);
                setTimeout(() => {
                    map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1.5 });
                }, 500);
                return;
            }
        }
        const lat = params.get('lat');
        const lng = params.get('lng');
        const z = params.get('z');
        if (lat && lng) {
            setTimeout(() => {
                map.flyTo([parseFloat(lat), parseFloat(lng)], parseFloat(z) || 17, { animate: true, duration: 1.5 });
            }, 500);
        }
    }, [location, map]);
    return null;
};

// --- COMPONENTES DE UI ---

const SeletorCamadas = ({ tipoMapa, setTipoMapa, showRefs, setShowRefs, showCondos, setShowCondos }) => {
    const alternarCamada = () => {
        if (tipoMapa === 'google') setTipoMapa('satelite');
        else if (tipoMapa === 'satelite') setTipoMapa('padrao');
        else setTipoMapa('google');
    };

    let classeBotao = '';
    let tituloBotao = '';

    if (tipoMapa === 'google') {
        classeBotao = 'thumb-satelite';
        tituloBotao = "Mudar para Satélite";
    } else if (tipoMapa === 'satelite') {
        classeBotao = 'thumb-rua';
        tituloBotao = "Mudar para OpenStreetMap";
    } else {
        classeBotao = 'thumb-google';
        tituloBotao = "Mudar para Google Maps";
    }

    return (
        <div className="absolute bottom-6 left-4 z-[400] flex flex-col gap-3">
            <button onClick={() => setShowRefs(!showRefs)} className={`w-12 h-12 rounded-lg bg-white shadow-lg flex items-center justify-center border-2 transition-all ${showRefs ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-400'}`} title="Mostrar/Ocultar Pontos de Referência">📍</button>
            <button onClick={() => setShowCondos(!showCondos)} className={`w-12 h-12 rounded-lg bg-white shadow-lg flex items-center justify-center border-2 transition-all ${showCondos ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-400'}`} title="Mostrar/Ocultar Condomínios">🏢</button>
            <button onClick={alternarCamada} className={`map-layer-btn ${classeBotao}`} title={tituloBotao} />
        </div>
    );
};

const ControleVisibilidade = ({ ocultarCores, setOcultarCores }) => {
    return (
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
            <button onClick={() => setOcultarCores(!ocultarCores)} className={`w-12 h-12 flex items-center justify-center rounded-full shadow-xl border transition-all duration-200 active:scale-95 ${ocultarCores ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-500 border-slate-300'}`} title={ocultarCores ? "Mostrar Cores" : "Ocultar Cores (Ver Mapa)"}>
                {ocultarCores ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                )}
            </button>
        </div>
    );
};

const ControlesNavegacao = ({ setPosicaoUsuario }) => {
    const map = useMap();
    const [buscando, setBuscando] = useState(false);

    const encontrarUsuario = () => {
        setBuscando(true);
        map.locate().on("locationfound", function (e) {
            setPosicaoUsuario(e.latlng);
            map.flyTo(e.latlng, 17);
            setBuscando(false);
        }).on("locationerror", function (e) {
            alert("Ative o GPS.");
            setBuscando(false);
        });
    };

    return (
        <div className="absolute bottom-6 right-4 z-[400] flex flex-col gap-3">
            <button onClick={encontrarUsuario} className="bg-white w-12 h-12 flex items-center justify-center shadow-xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all duration-200 rounded-full mb-2 text-blue-600">
                {buscando ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-300 border-t-blue-600"></div> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></svg>}
            </button>
            <div className="flex flex-col shadow-xl rounded-xl overflow-hidden border border-slate-200 bg-white">
                <button onClick={() => map.zoomIn()} className="w-12 h-12 flex items-center justify-center text-slate-600 border-b border-slate-100"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 4.5v15m7.5-7.5h-15" /></svg></button>
                <button onClick={() => map.zoomOut()} className="w-12 h-12 flex items-center justify-center text-slate-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M19.5 12h-15" /></svg></button>
            </div>
        </div>
    );
};

const MarcadorUsuario = ({ posicao }) => {
    if (!posicao) return null;

    const compartilharLocalizacao = () => {
        const linkGoogle = `https://www.google.com/maps?q=${posicao.lat},${posicao.lng}`;
        const textoEncoded = encodeURIComponent(`*Minha localização no território:*\n\n${linkGoogle}`);
        window.open(`https://wa.me/?text=${textoEncoded}`, '_blank');
    };

    const iconeGPS = L.divIcon({ className: 'bg-transparent', html: `<div class="flex items-center justify-center relative w-16 h-16 -ml-4 -mt-4"><div class="absolute w-12 h-12 bg-blue-500/30 rounded-full animate-pulse"></div><div class="relative w-5 h-5 bg-blue-600 border-[3px] border-white rounded-full shadow-lg z-10"></div></div>`, iconSize: [20, 20], iconAnchor: [10, 10] });

    return (
        <Marker position={posicao} icon={iconeGPS}>
            <Popup>
                <div className="text-center p-1">
                    <p className="font-bold text-sm mb-2 text-gray-700">Você está aqui</p>
                    <button onClick={compartilharLocalizacao} className="popup-btn-action bg-blue-600 text-white hover:bg-blue-700 text-xs py-1 px-3 shadow-md">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
                        Compartilhar Local
                    </button>
                </div>
            </Popup>
        </Marker>
    );
};

// --- MODAL DE NOTAS ---
const ModalNota = ({ isOpen, onClose, onAdicionar, onEditar, onExcluir, dados, user, isAdmin }) => {
    const [texto, setTexto] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const scrollRef = useRef(null);

    const notas = useMemo(() => {
        if (!dados?.notas) return [];
        if (typeof dados.notas === 'string') {
            return [{ id: 'legacy', texto: dados.notas, autorNome: 'Sistema (Antigo)', data: null, autorEmail: 'sistema' }];
        }
        return dados.notas;
    }, [dados]);

    useEffect(() => {
        if (isOpen) {
            setTexto('');
            setEditandoId(null);
            setTimeout(() => {
                if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }, 100);
        }
    }, [isOpen, dados]);

    const handleSubmit = () => {
        if (!texto.trim()) return;
        if (editandoId) {
            onEditar(dados.quadraId, editandoId, texto);
        } else {
            onAdicionar(dados.quadraId, texto);
        }
        setTexto('');
        setEditandoId(null);
    };

    const iniciarEdicao = (nota) => {
        setTexto(nota.texto);
        setEditandoId(nota.id);
    };

    const cancelarEdicao = () => {
        setTexto('');
        setEditandoId(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in" style={{ zIndex: 9999 }}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col h-[500px]">
                <div className="bg-blue-600 p-4 flex justify-between items-center shrink-0">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        💬 Notas: {dados?.quadraId}
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white text-xl font-bold">×</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3" ref={scrollRef}>
                    {notas.length === 0 && (
                        <p className="text-center text-gray-400 text-sm italic mt-10">Nenhuma observação ainda.</p>
                    )}
                    {notas.map((nota) => {
                        const isMe = user?.email === nota.autorEmail;
                        const podeExcluir = isAdmin || isMe;
                        const podeEditar = isMe;
                        return (
                            <div key={nota.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] rounded-lg p-3 shadow-sm relative group ${isMe ? 'bg-blue-100 text-blue-900 rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
                                    <div className="flex justify-between items-center gap-4 mb-1 border-b border-black/5 pb-1">
                                        <span className="text-[10px] font-bold uppercase opacity-70">{nota.autorNome || 'Anônimo'}</span>
                                        <span className="text-[9px] opacity-50">
                                            {nota.data ? new Date(nota.data).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '-'}
                                        </span>
                                    </div>
                                    <p className="text-sm whitespace-pre-wrap">{nota.texto}</p>
                                    <div className="absolute -top-2 -right-2 hidden group-hover:flex gap-1">
                                        {podeEditar && (
                                            <button onClick={() => iniciarEdicao(nota)} className="bg-white text-blue-600 border border-blue-200 p-1 rounded-full shadow hover:bg-blue-50" title="Editar">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                        )}
                                        {podeExcluir && (
                                            <button onClick={() => onExcluir(dados.quadraId, nota.id)} className="bg-white text-red-600 border border-red-200 p-1 rounded-full shadow hover:bg-red-50" title="Excluir">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-3 bg-white border-t border-gray-200">
                    {editandoId && (
                        <div className="flex justify-between items-center text-xs text-blue-600 mb-2 bg-blue-50 p-1 px-2 rounded">
                            <span>✏️ Editando mensagem...</span>
                            <button onClick={cancelarEdicao} className="underline hover:text-blue-800">Cancelar</button>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <textarea
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                            placeholder="Escreva uma observação..."
                            rows="2"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
                        />
                        <button onClick={handleSubmit} disabled={!texto.trim()} className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- QUADRA MARKER ---
const QuadraMarker = ({ quadra, idTerritorio, isFeita, podeEditar, nota, onAbrirNota, totalQuadras, qtdFeitas, onConclusao }) => {
    const alternarQuadra = async () => {
        if (!podeEditar) return;
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);

        if (isFeita) {
            await updateDoc(docRef, { quadras_feitas: arrayRemove(quadra.id) });
        } else {
            await updateDoc(docRef, { quadras_feitas: arrayUnion(quadra.id) });
            // Se completar todas
            if (qtdFeitas + 1 === totalQuadras) {
                if (onConclusao) onConclusao();
            }
        }
    };

    const handleContextMenu = (e) => {
        if (e.originalEvent) { e.originalEvent.preventDefault(); e.originalEvent.stopPropagation(); }
        if (podeEditar) { onAbrirNota(quadra.id, nota); }
    };

    const temNota = () => {
        if (!nota) return false;
        if (typeof nota === 'string') return nota.trim() !== "";
        if (Array.isArray(nota)) return nota.length > 0;
        return false;
    };

    return (
        <CircleMarker
            center={[quadra.lat, quadra.lng]}
            pathOptions={{
                color: isFeita ? '#166534' : '#b91c1c',
                fillColor: isFeita ? '#22c55e' : '#ef4444',
                fillOpacity: 1, weight: 2
            }}
            radius={16}
            eventHandlers={{ click: alternarQuadra, contextmenu: handleContextMenu }}
        >
            <Tooltip direction="center" permanent className="sem-fundo" opacity={1}>
                <div className="relative flex items-center justify-center w-8 h-8 pointer-events-none">
                    <span className="font-bold text-white text-[15px] drop-shadow-md select-none">{quadra.id}</span>
                    {temNota() && (
                        <span className="absolute -top-1 -right-2 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full shadow-sm z-50" title="Tem observações"></span>
                    )}
                </div>
            </Tooltip>
        </CircleMarker>
    );
};

// --- TERRITÓRIO DETALHADO ATUALIZADO ---
const TerritorioDetalhado = ({ dados, idTerritorio, zoomLevel, user, isAdmin, listaUsuarios, ocultarCores, showRefs, showCondos }) => {
    const [dadosBanco, setDadosBanco] = useState({ status: 'aberto', quadras_feitas: [], designadoPara: null, designadoNome: null, ultimaConclusao: null });
    const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
    const [msgPronta, setMsgPronta] = useState(null);
    const [posicaoClique, setPosicaoClique] = useState(null);
    const [modalConfig, setModalConfig] = useState({ open: false, dados: null });
    // --- ESTADO DE CARREGAMENTO NOVO ---
    const [loadingAction, setLoadingAction] = useState(false);

    const pontosFiltrados = useMemo(() => {
        const todos = dados.properties.pontos || [];
        return {
            trabalho: todos.filter(p => !p.tipo || p.tipo === 'quadra' || p.tipo === 'endereco'),
            referencias: todos.filter(p => p.tipo === 'referencia'),
            condominios: todos.filter(p => p.tipo === 'condominio')
        };
    }, [dados]);

    const listaQuadras = pontosFiltrados.trabalho.map((p, index) => ({
        id: p.nome || (index + 1),
        lat: p.lat,
        lng: p.lng
    }));

    const nome = dados.properties.nome || `T-${idTerritorio}`;
    const codigoTerritorio = nome.includes('-') ? nome.split('-')[0].trim() : nome; // Extrai código curto
    const coords = dados.geometry.coordinates[0];
    const posicoes = coords.map(coord => [coord[1], coord[0]]);
    const centro = calcularCentroide(coords);

    useEffect(() => {
        const idSeguro = `t_${idTerritorio}`;
        const unsub = onSnapshot(doc(db, "territorios", idSeguro), (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setDadosBanco(data);
                setUsuarioSelecionado("");
            } else { setDoc(docSnapshot.ref, { status: 'aberto', nome: nome, quadras_feitas: [] }); }
        });
        return () => unsub();
    }, [idTerritorio, nome]);

    const notificarConclusao = async () => {
        if (!dadosBanco.designadoPara) return;
        try {
            const q = query(collection(db, "usuarios"), where("role", "==", "admin"));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                await addDoc(collection(db, "notificacoes"), {
                    para: "ADMINS",
                    texto: `🏁 O Território ${nome} foi 100% concluído por ${dadosBanco.designadoNome}.`,
                    data: new Date(),
                    lida: false,
                    tipo: 'devolucao',
                    origem: 'sistema'
                });
            }
            alert("Parabéns! Você concluiu todas as quadras. Os administradores foram notificados.");
        } catch (error) { console.error(error); }
    };

    const adicionarNota = async (quadraId, texto) => {
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);
        const novaNota = { id: crypto.randomUUID(), texto, autorEmail: user.email, autorNome: user.displayName || user.email.split('@')[0], data: new Date().toISOString() };
        const notasAtuais = dadosBanco.notas_quadras?.[quadraId];
        let novoArray = Array.isArray(notasAtuais) ? [...notasAtuais, novaNota] : (typeof notasAtuais === 'string' ? [{ id: 'legacy', texto: notasAtuais, autorNome: 'Sistema', data: new Date().toISOString(), autorEmail: 'sistema' }, novaNota] : [novaNota]);
        await updateDoc(docRef, { [`notas_quadras.${quadraId}`]: novoArray });
    };

    const editarNota = async (quadraId, noteId, novoTexto) => {
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);
        const notasAtuais = dadosBanco.notas_quadras?.[quadraId];
        if (!Array.isArray(notasAtuais)) return;
        const novoArray = notasAtuais.map(n => {
            if (n.id === noteId) {
                if (n.autorEmail !== user.email && !isAdmin) return n;
                return { ...n, texto: novoTexto, editadoEm: new Date().toISOString() };
            }
            return n;
        });
        await updateDoc(docRef, { [`notas_quadras.${quadraId}`]: novoArray });
    };

    const removerNota = async (quadraId, noteId) => {
        if (!confirm("Excluir esta mensagem?")) return;
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);
        const notasAtuais = dadosBanco.notas_quadras?.[quadraId];
        if (!Array.isArray(notasAtuais)) { if (noteId === 'legacy') await updateDoc(docRef, { [`notas_quadras.${quadraId}`]: deleteField() }); return; }
        const novoArray = notasAtuais.filter(n => n.id !== noteId);
        await updateDoc(doc(db, "territorios", idSeguro), { [`notas_quadras.${quadraId}`]: novoArray });
    };

    const abrirModalNota = (quadraId, notasAtuais) => {
        setModalConfig({ open: true, dados: { quadraId, notas: notasAtuais } });
    };

    const fecharModal = () => {
        setModalConfig({ ...modalConfig, open: false });
    };

    const usuarioAtual = user?.email;
    const donoDoTerritorio = dadosBanco.designadoPara;
    const isMeu = donoDoTerritorio === usuarioAtual;
    const isOcupado = donoDoTerritorio && !isMeu;
    const isCompleto = listaQuadras.length > 0 && dadosBanco.quadras_feitas?.length === listaQuadras.length;
    const feitas = dadosBanco.quadras_feitas?.length || 0;
    const total = listaQuadras.length;
    const porcentagem = total > 0 ? (feitas / total) * 100 : 0;

    // VISIBILIDADE
    const deveMostrarQuadras = zoomLevel >= 17 && (isAdmin || isMeu);
    const podeVerDetalhes = isAdmin || isMeu;

    let diasSemTrabalhar = 0;
    let textoTempo = "Nunca";
    if (dadosBanco.ultimaConclusao) {
        const dataUltima = dadosBanco.ultimaConclusao.toDate ? dadosBanco.ultimaConclusao.toDate() : new Date(dadosBanco.ultimaConclusao);
        diasSemTrabalhar = Math.ceil(Math.abs(new Date() - dataUltima) / (1000 * 60 * 60 * 24));
        textoTempo = diasSemTrabalhar > 60 ? `${Math.floor(diasSemTrabalhar / 30)} meses` : `${diasSemTrabalhar} dias`;
    }

    // --- CORES ATUALIZADAS (TONS DE LARANJA) ---
    let corPreenchimento = '#fed7aa'; // Padrão
    let corBorda = '#c2410c';
    let pesoBorda = 1;
    let opacidade = 0.5;
    let opacidadeBorda = 1;

    if (isCompleto) {
        corPreenchimento = '#22c55e'; corBorda = '#15803d'; opacidade = 0.6; if (isMeu) pesoBorda = 3;
    }
    else if (isMeu) {
        corPreenchimento = '#3b82f6'; corBorda = '#1e40af'; pesoBorda = 3; if (isAdmin) { corPreenchimento = '#a855f7'; corBorda = '#6b21a8'; }
    }
    else if (isOcupado) {
        corPreenchimento = '#9ca3af'; corBorda = '#4b5563'; opacidade = 0.4;
    }
    else {
        // --- ESCALA DE LARANJAS ---
        if (!dadosBanco.ultimaConclusao) {
            corPreenchimento = '#fed7aa'; // Padrão (Nunca trabalhado)
        } else {
            if (diasSemTrabalhar > 180) { corPreenchimento = '#c2410c'; } // +6 meses: Tijolo
            else if (diasSemTrabalhar > 120) { corPreenchimento = '#ea580c'; } // 4-6 meses: Laranja Escuro
            else if (diasSemTrabalhar > 60) { corPreenchimento = '#fb923c'; } // 2-4 meses: Laranja Médio
            else { corPreenchimento = '#ffedd5'; } // < 2 meses: Laranja Muito Claro
        }
    }

    if (!isAdmin && !isMeu) { opacidade = 0.2; opacidadeBorda = 0.4; }
    if (ocultarCores) { corPreenchimento = 'transparent'; opacidade = 0; pesoBorda = 5; opacidadeBorda = 0.8; }

    const gerarLinkMsg = (uNome, uWhats) => {
        const baseUrl = window.location.href.split('?')[0].split('#')[0] + '#/app';
        const linkInterno = `${baseUrl}?lat=${centro.lat}&lng=${centro.lng}&z=16`;
        const textoMsg = `Olá *${uNome}*! \nO território *${nome}* foi designado para você.\n\n *Acesse pelo App:* ${linkInterno}\n\nBom trabalho!`;
        return { texto: textoMsg, whatsapp: uWhats, nome: uNome };
    };

    const salvarDesignacao = async () => {
        const idSeguro = `t_${idTerritorio}`;

        // Bloqueia e mostra feedback
        setLoadingAction(true);

        try {
            if (!usuarioSelecionado) {
                if (!dadosBanco.designadoPara || !confirm("Confirmar devolução do território?")) {
                    setLoadingAction(false);
                    return;
                }
                const ciclo = dadosBanco.cicloAtual || { dataInicio: dadosBanco.dataDesignacao || new Date(), responsaveis: [dadosBanco.designadoNome] };
                const historico = { ...ciclo, dataTermino: new Date(), responsaveis: [...new Set([...(ciclo.responsaveis || []), dadosBanco.designadoNome])] };
                const updateData = { designadoPara: null, designadoNome: null, dataDesignacao: null, cicloAtual: null, historico: arrayUnion(historico) };
                if (isCompleto) { updateData.ultimaConclusao = new Date(); updateData.quadras_feitas = []; }

                await updateDoc(doc(db, "territorios", idSeguro), updateData);
                try { await addDoc(collection(db, "notificacoes"), { para: "ADMINS", texto: `Território ${nome} devolvido.`, data: new Date(), lida: false, tipo: 'devolucao' }); } catch (e) { }

                setMsgPronta(null);
                alert("✅ Território devolvido com sucesso! Sincronizado com o servidor.");
            } else {
                const usuarioObj = listaUsuarios.find(u => u.email === usuarioSelecionado);
                const novoNome = usuarioObj ? usuarioObj.nome : "Dirigente";
                let novoCiclo = dadosBanco.designadoPara ? { dataInicio: dadosBanco.cicloAtual?.dataInicio, responsaveis: [...new Set([...(dadosBanco.cicloAtual?.responsaveis || [dadosBanco.designadoNome]), novoNome])] } : { dataInicio: new Date(), responsaveis: [novoNome] };

                await updateDoc(doc(db, "territorios", idSeguro), { designadoPara: usuarioSelecionado, designadoNome: novoNome, dataDesignacao: new Date(), cicloAtual: novoCiclo });

                const link = `${window.location.href.split('#')[0]}#/app?lat=${centro.lat}&lng=${centro.lng}&z=16`;
                setMsgPronta({ texto: `Olá *${novoNome}*! \nO território *${nome}* foi designado para você.\n\n *Acesse:* ${link}\n\nBom trabalho!`, whatsapp: usuarioObj?.whatsapp, nome: novoNome });

                alert(`✅ Designação salva com sucesso para ${novoNome}!`);
            }
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("❌ ERRO AO SALVAR: Verifique sua conexão com a internet e tente novamente. A alteração NÃO foi salva.");
        } finally {
            setLoadingAction(false);
        }
    };

    const compartilharDiretamente = () => {
        const usuarioObj = listaUsuarios.find(u => u.email === dadosBanco.designadoPara);
        const msg = gerarLinkMsg(dadosBanco.designadoNome, usuarioObj?.whatsapp);
        const textoEncoded = encodeURIComponent(msg.texto);
        const url = msg.whatsapp ? `https://wa.me/${msg.whatsapp.replace(/\D/g, '')}?text=${textoEncoded}` : `https://wa.me/?text=${textoEncoded}`;
        window.open(url, '_blank');
    };

    const abrirWhatsapp = () => {
        if (!msgPronta) return;
        const textoEncoded = encodeURIComponent(msgPronta.texto);
        const url = msgPronta.whatsapp ? `https://wa.me/${msgPronta.whatsapp.replace(/\D/g, '')}?text=${textoEncoded}` : `https://wa.me/?text=${textoEncoded}`;
        window.open(url, '_blank');
        setMsgPronta(null);
    };

    const compartilharPontoEncontro = () => {
        const p = posicaoClique || centro;
        // LINK CORRIGIDO
        window.open(`https://wa.me/?text=${encodeURIComponent(`*Ponto de Encontro - ${nome}*:\n\nhttps://www.google.com/maps?q=${p.lat},${p.lng}`)}`, '_blank');
    };

    if (!isAdmin && !isMeu) return null;

    return (
        <>
            <Polygon positions={posicoes} pathOptions={{ color: corBorda, weight: pesoBorda, fillColor: corPreenchimento, fillOpacity: opacidade, opacity: opacidadeBorda }} eventHandlers={{ click: (e) => setPosicaoClique(e.latlng) }}>
                <Popup>
                    <div className="min-w-[260px] p-1 font-sans">
                        <div className="border-b border-gray-200 pb-2 mb-2 text-center relative">
                            {/* ÍCONE DE PROCESSANDO NO CABEÇALHO (POPUP) */}
                            {loadingAction && (
                                <div className="absolute top-0 right-0 animate-spin text-blue-600" title="Salvando alterações...">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                            <strong className="text-lg font-bold text-gray-800 block break-words leading-tight">{nome}</strong>
                            {dadosBanco.ultimaConclusao && <span className="text-[10px] text-gray-500 uppercase">Última vez: {textoTempo} atrás</span>}
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium"><span>{feitas} de {total} quadras</span><span>{Math.round(porcentagem)}%</span></div>
                            <div className="w-full bg-gray-200 rounded-full h-2 border border-gray-300 overflow-hidden"><div className={`h-full transition-all duration-500 ${isCompleto ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${porcentagem}%` }}></div></div>
                        </div>
                        {isAdmin ? (
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                {msgPronta ? (
                                    <div className="animate-fade-in flex flex-col gap-2">
                                        <div className="text-xs text-center text-green-700 font-bold bg-green-100 p-2 rounded">Designado para {msgPronta.nome}</div>
                                        <button onClick={abrirWhatsapp} className="popup-btn-action bg-green-600 text-white hover:bg-green-700">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" /></svg>
                                            {msgPronta.whatsapp ? "Enviar no WhatsApp" : "Compartilhar Link"}
                                        </button>
                                        <button onClick={() => setMsgPronta(null)} className="text-xs text-gray-400 underline text-center mt-1">Voltar</button>
                                    </div>
                                ) : (
                                    <div className="animate-fade-in">
                                        <div className="mb-3 p-3 bg-white rounded-lg border border-slate-200 shadow-sm text-center flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Responsável ATUAL</span>
                                            {dadosBanco.designadoPara ? (
                                                <span className="text-lg font-extrabold text-blue-800 uppercase leading-tight break-words">
                                                    {dadosBanco.designadoNome}
                                                </span>
                                            ) : (
                                                <span className="text-lg font-bold text-green-600">
                                                    Livre
                                                </span>
                                            )}
                                        </div>
                                        <select
                                            className="w-full p-2 mb-2 text-sm bg-white border border-gray-300 rounded outline-none disabled:bg-gray-100 disabled:text-gray-400"
                                            value={usuarioSelecionado}
                                            onChange={(e) => setUsuarioSelecionado(e.target.value)}
                                            disabled={loadingAction}
                                        >
                                            <option value="">-- Devolver / Livre --</option>
                                            {listaUsuarios.map(u => <option key={u.email} value={u.email} className={u.email === user.email ? "font-bold text-blue-600" : ""}>{u.nome}</option>)}
                                        </select>
                                        <button
                                            onClick={salvarDesignacao}
                                            disabled={(!dadosBanco.designadoPara && !usuarioSelecionado) || loadingAction}
                                            className={`popup-btn-action text-white mb-2 ${loadingAction ? 'bg-slate-400 cursor-wait' :
                                                (!dadosBanco.designadoPara && !usuarioSelecionado ? 'bg-gray-300' : !usuarioSelecionado ? 'bg-red-500' : 'bg-blue-600')
                                                }`}
                                        >
                                            {loadingAction ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processando...
                                                </span>
                                            ) : (
                                                !dadosBanco.designadoPara && !usuarioSelecionado ? "Já está Livre" : !usuarioSelecionado ? "Devolver" : "Salvar"
                                            )}
                                        </button>
                                        {donoDoTerritorio && <button onClick={compartilharDiretamente} disabled={loadingAction} className="popup-btn-action bg-white border border-green-600 text-green-700 hover:bg-green-50 text-xs py-1 mt-2">Compartilhar Novamente</button>}
                                        {isMeu && <button onClick={compartilharPontoEncontro} className="popup-btn-action bg-green-600 text-white mt-2">Ponto de Encontro</button>}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center mt-2">
                                {isMeu ? <button onClick={compartilharPontoEncontro} className="popup-btn-action bg-green-600 text-white w-full">Ponto de Encontro</button> : <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">{isOcupado ? `Ocupado por ${dadosBanco.designadoNome}` : "Disponível"}</div>}
                            </div>
                        )}
                    </div>
                </Popup>
                {/* TOOLTIP INTELIGENTE */}
                {zoomLevel >= 14 && !ocultarCores && (
                    <Tooltip permanent direction="center" className="label-territorio">
                        <span className="label-nome">{zoomLevel < 16 ? codigoTerritorio : nome}</span>
                        {zoomLevel >= 16 && podeVerDetalhes && (
                            <>
                                {!isOcupado && !isCompleto && (<><span className="label-status">{dadosBanco.ultimaConclusao ? "Trabalhado" : "Nunca"}</span><span className="label-tempo">{textoTempo}</span></>)}
                                {isOcupado && <span className="label-status" style={{ color: '#666' }}>Ocupado</span>}
                                {isCompleto && <span className="label-status" style={{ color: '#166534', background: '#dcfce7' }}>Feito!</span>}
                            </>
                        )}
                    </Tooltip>
                )}
            </Polygon>

            {/* ITENS INTERNOS COM KEYS ÚNICAS COMPOSTAS (FIXED) */}
            {deveMostrarQuadras && listaQuadras.map((q, idx) => (
                <QuadraMarker
                    key={`t-${idTerritorio}-q-${idx}`} // FIX: Usando apenas ID do território + index para garantir unicidade absoluta
                    quadra={q} idTerritorio={idTerritorio} isFeita={dadosBanco.quadras_feitas?.includes(q.id)} podeEditar={isAdmin || isMeu} nota={dadosBanco.notas_quadras?.[q.id]} onAbrirNota={abrirModalNota} totalQuadras={total} qtdFeitas={feitas} onConclusao={notificarConclusao}
                />
            ))}
            {deveMostrarQuadras && showRefs && pontosFiltrados.referencias.map((ref, idx) => (
                <Marker key={`t-${idTerritorio}-ref-${idx}`} position={[ref.lat, ref.lng]} icon={L.divIcon({ className: 'bg-transparent', html: `<div class="text-xl drop-shadow-sm cursor-help">📍</div>`, iconAnchor: [12, 12] })}>
                    <Tooltip direction="top" offset={[0, -10]} className="font-bold text-xs">{ref.nome}</Tooltip>
                    <Popup>
                        <div className="flex flex-col items-center gap-2 p-1 min-w-[150px]">
                            <h3 className="font-bold text-gray-800 text-sm">{ref.nome}</h3>
                            <button onClick={() => window.open(`https://www.google.com/maps?q=${ref.lat},${ref.lng}`, '_blank')} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium w-full shadow-sm">Compartilhar</button>
                        </div>
                    </Popup>
                </Marker>
            ))}
            {deveMostrarQuadras && showCondos && pontosFiltrados.condominios.map((c, idx) => (
                <Marker key={`t-${idTerritorio}-cdo-${idx}`} position={[c.lat, c.lng]} icon={L.divIcon({ className: 'bg-transparent', html: `<div class="relative group"><div class="text-xl drop-shadow-sm cursor-help">🏢</div>${(dadosBanco.notas_quadras?.[c.nome]?.length || (typeof dadosBanco.notas_quadras?.[c.nome] === 'string' && dadosBanco.notas_quadras?.[c.nome])) ? '<span class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full shadow-sm z-50"></span>' : ''}</div>`, iconAnchor: [12, 12] })} eventHandlers={{ click: (e) => { L.DomEvent.stopPropagation(e); abrirModalNota(c.nome, dadosBanco.notas_quadras?.[c.nome]); } }}>
                    <Tooltip direction="top" offset={[0, -10]} className="font-bold text-xs text-blue-800">{c.nome}</Tooltip>
                </Marker>
            ))}
            <ModalNota isOpen={modalConfig.open} dados={modalConfig.dados} user={user} isAdmin={isAdmin} onClose={fecharModal} onAdicionar={adicionarNota} onEditar={editarNota} onExcluir={removerNota} />
        </>
    );
};

// --- MAPA PRINCIPAL ---
const Mapa = ({ user, isAdmin }) => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(14);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [posicaoUsuario, setPosicaoUsuario] = useState(null);
    const [tipoMapa, setTipoMapa] = useState('google');
    const [ocultarCores, setOcultarCores] = useState(false);
    const [showRefs, setShowRefs] = useState(true);
    const [showCondos, setShowCondos] = useState(true);

    useEffect(() => {
        fetch('./mapa.json').then(res => res.json()).then(data => setGeoJsonData(data));
        const carregarUsuarios = async () => {
            if (!isAdmin) return;
            try {
                const q = await getDocs(collection(db, "usuarios"));
                const lista = q.docs.map(doc => ({ email: doc.id, nome: doc.data().nome || "Sem Nome", role: doc.data().role, whatsapp: doc.data().whatsapp }));
                lista.sort((a, b) => a.nome.localeCompare(b.nome));
                setListaUsuarios(lista);
            } catch (e) { console.error(e); }
        };
        carregarUsuarios();
    }, [isAdmin]);

    const MapEvents = () => {
        const map = useMapEvents({ zoomend: () => setZoomLevel(map.getZoom()) });
        return null;
    };

    return (
        <div className="h-full w-full relative">
            <style>{cssTooltip}</style>
            {!geoJsonData ? (
                <div className="flex h-full items-center justify-center bg-gray-100"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
            ) : (
                <MapContainer center={[-26.485, -51.995]} zoom={14} maxZoom={22} zoomControl={false} className="h-full w-full z-0">
                    <MapEvents />
                    <DeepLinkHandler />
                    {tipoMapa === 'padrao' && <TileLayer attribution='© OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxNativeZoom={19} maxZoom={22} />}
                    {tipoMapa === 'google' && <TileLayer attribution='© Google Maps' url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" maxNativeZoom={20} maxZoom={22} />}
                    {tipoMapa === 'satelite' && <TileLayer attribution='© Google Maps' url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" maxNativeZoom={20} maxZoom={22} />}

                    <SeletorCamadas tipoMapa={tipoMapa} setTipoMapa={setTipoMapa} showRefs={showRefs} setShowRefs={setShowRefs} showCondos={showCondos} setShowCondos={setShowCondos} />
                    <ControleVisibilidade ocultarCores={ocultarCores} setOcultarCores={setOcultarCores} />
                    <ControlesNavegacao setPosicaoUsuario={setPosicaoUsuario} />
                    <MarcadorUsuario posicao={posicaoUsuario} />

                    {geoJsonData.features.map((feature, index) => {
                        const uniqueId = feature.properties.id || index + 1;
                        // Chave composta para unicidade absoluta
                        const uniqueKey = feature.properties.id ? `terr-${feature.properties.id}` : `terr-idx-${index}`;
                        return (
                            <TerritorioDetalhado
                                key={uniqueKey}
                                dados={feature}
                                idTerritorio={uniqueId}
                                zoomLevel={zoomLevel}
                                user={user}
                                isAdmin={isAdmin}
                                listaUsuarios={listaUsuarios}
                                ocultarCores={ocultarCores}
                                showRefs={showRefs}
                                showCondos={showCondos}
                            />
                        );
                    })}
                </MapContainer>
            )}
        </div>
    );
};

export default Mapa;