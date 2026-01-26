import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker, Tooltip, useMapEvents, useMap, Marker } from 'react-leaflet';
import { doc, onSnapshot, updateDoc, setDoc, arrayUnion, arrayRemove, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import L from 'leaflet';

// --- CSS ---
const cssTooltip = `
  .label-territorio { background: transparent; border: none; box-shadow: none; font-family: 'Bahnschrift', sans-serif-condensed, sans-serif; text-align: center; line-height: 1.1; pointer-events: none; }
  .label-nome { font-weight: 700; font-size: 14px; color: #1e3a8a; text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff; display: block; font-stretch: condensed; letter-spacing: -0.5px; margin-bottom: 2px; }
  .label-status { font-size: 11px; font-weight: 700; color: #444; text-shadow: 1px 1px 0px rgba(255,255,255,0.9); background-color: rgba(255,255,255,0.7); padding: 1px 6px; border-radius: 8px; display: inline-block; }
  .label-tempo { display: block; font-size: 10px; font-weight: 800; color: #7f1d1d; margin-top: 2px; text-shadow: 1px 1px 0px rgba(255,255,255,0.8); text-transform: uppercase; }
  .sem-fundo { background: transparent; border: none; box-shadow: none; }
  .map-layer-btn { width: 48px; height: 48px; border-radius: 8px; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); cursor: pointer; transition: transform 0.1s, border-color 0.2s; overflow: hidden; position: relative; background-size: cover; }
  .map-layer-btn:active { transform: scale(0.95); }
  .map-layer-btn.active { border-color: #2563eb; transform: scale(1.05); z-index: 10; }
  .thumb-rua { background: #e5e7eb; } .thumb-rua::after { content: '🗺️'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; }
  .thumb-satelite { background: #1a2e05; } .thumb-satelite::after { content: '🛰️'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 20px; }
  .popup-btn-action { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 8px; border-radius: 6px; font-weight: bold; font-size: 12px; transition: background-color 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.1); cursor: pointer; }
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
        const lat = params.get('lat'); const lng = params.get('lng'); const z = params.get('z');
        if (lat && lng) {
            setTimeout(() => { map.flyTo([parseFloat(lat), parseFloat(lng)], parseFloat(z) || 18, { animate: true, duration: 1.5 }); }, 500);
        }
    }, [location, map]);
    return null;
};

// --- COMPONENTES DE UI ---
const SeletorCamadas = ({ tipoMapa, setTipoMapa }) => {
    return (
        <div className="absolute bottom-6 left-4 z-[400] flex flex-col gap-3">
            <button onClick={() => setTipoMapa('padrao')} className={`map-layer-btn thumb-rua ${tipoMapa === 'padrao' ? 'active' : ''}`} title="Mapa de Ruas" />
            <button onClick={() => setTipoMapa('satelite')} className={`map-layer-btn thumb-satelite ${tipoMapa === 'satelite' ? 'active' : ''}`} title="Satélite" />
        </div>
    );
};

const ControlesNavegacao = ({ setPosicaoUsuario }) => {
    const map = useMap();
    const [buscando, setBuscando] = useState(false);
    const encontrarUsuario = () => {
        setBuscando(true);
        map.locate().on("locationfound", function (e) {
            setPosicaoUsuario(e.latlng); map.flyTo(e.latlng, 17); setBuscando(false);
        }).on("locationerror", function (e) { alert("Ative o GPS."); setBuscando(false); });
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

    // Função para compartilhar a localização atual
    const compartilharLocalizacao = () => {
        // CORREÇÃO: Link padrão universal do Google Maps
        const linkGoogle = `https://www.google.com/maps?q=${posicao.lat},${posicao.lng}`;
        const texto = `*Estou aqui:*\n\n${linkGoogle}`;
        const textoEncoded = encodeURIComponent(texto);
        window.open(`https://wa.me/?text=${textoEncoded}`, '_blank');
    };

    const iconeGPS = L.divIcon({ className: 'bg-transparent', html: `<div class="flex items-center justify-center relative w-16 h-16 -ml-4 -mt-4"><div class="absolute w-12 h-12 bg-blue-500/30 rounded-full animate-pulse"></div><div class="relative w-5 h-5 bg-blue-600 border-[3px] border-white rounded-full shadow-lg z-10"></div></div>`, iconSize: [20, 20], iconAnchor: [10, 10] });

    return (
        <Marker position={posicao} icon={iconeGPS}>
            <Popup>
                <div className="text-center p-1">
                    <p className="font-bold text-sm mb-2 text-gray-700">Você está aqui</p>
                    <button
                        onClick={compartilharLocalizacao}
                        className="popup-btn-action bg-blue-600 text-white hover:bg-blue-700 text-xs py-1 px-3 shadow-md"
                    >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
                        Compartilhar Local
                    </button>
                </div>
            </Popup>
        </Marker>
    );
};

const QuadraMarker = ({ quadra, idTerritorio, isFeita, podeEditar }) => {
    const alternarQuadra = async () => {
        if (!podeEditar) return;
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);
        if (isFeita) await updateDoc(docRef, { quadras_feitas: arrayRemove(quadra.id) });
        else await updateDoc(docRef, { quadras_feitas: arrayUnion(quadra.id) });
    };
    return (
        <CircleMarker center={[quadra.lat, quadra.lng]} pathOptions={{ color: isFeita ? '#166534' : '#b91c1c', fillColor: isFeita ? '#22c55e' : '#ef4444', fillOpacity: 1, weight: 2 }} radius={16} eventHandlers={{ click: alternarQuadra }}>
            <Tooltip direction="center" permanent className="sem-fundo"><span className="font-bold text-white text-[16px]">{quadra.id}</span></Tooltip>
        </CircleMarker>
    );
};

// --- TERRITÓRIO DETALHADO ---
const TerritorioDetalhado = ({ dados, idTerritorio, zoomLevel, user, isAdmin, listaUsuarios }) => {
    const [dadosBanco, setDadosBanco] = useState({ status: 'aberto', quadras_feitas: [], designadoPara: null, designadoNome: null, ultimaConclusao: null });
    const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
    const [msgPronta, setMsgPronta] = useState(null);
    const [posicaoClique, setPosicaoClique] = useState(null);

    const listaQuadras = (dados.properties.pontos || []).map((p, index) => ({ id: index + 1, lat: p.lat, lng: p.lng }));
    const nome = dados.properties.nome || `T-${idTerritorio}`;
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

    const usuarioAtual = user?.email;
    const donoDoTerritorio = dadosBanco.designadoPara;
    const isMeu = donoDoTerritorio === usuarioAtual;
    const isOcupado = donoDoTerritorio && !isMeu;
    const isCompleto = listaQuadras.length > 0 && dadosBanco.quadras_feitas?.length === listaQuadras.length;
    const feitas = dadosBanco.quadras_feitas?.length || 0;
    const total = listaQuadras.length;
    const porcentagem = total > 0 ? (feitas / total) * 100 : 0;
    const deveMostrarQuadras = zoomLevel >= 16 && (isAdmin || isMeu);

    let diasSemTrabalhar = 0;
    let textoTempo = "Nunca";
    if (dadosBanco.ultimaConclusao) {
        const dataUltima = dadosBanco.ultimaConclusao.toDate ? dadosBanco.ultimaConclusao.toDate() : new Date(dadosBanco.ultimaConclusao);
        diasSemTrabalhar = Math.ceil(Math.abs(new Date() - dataUltima) / (1000 * 60 * 60 * 24));
        textoTempo = diasSemTrabalhar > 60 ? `${Math.floor(diasSemTrabalhar / 30)} meses` : `${diasSemTrabalhar} dias`;
    }

    let corPreenchimento = '#fed7aa'; let corBorda = '#c2410c'; let pesoBorda = 1; let opacidade = 0.5;
    if (isCompleto) { corPreenchimento = '#22c55e'; corBorda = '#15803d'; opacidade = 0.6; if (isMeu) pesoBorda = 3; }
    else if (isMeu) { corPreenchimento = '#3b82f6'; corBorda = '#1e40af'; pesoBorda = 3; if (isAdmin) { corPreenchimento = '#a855f7'; corBorda = '#6b21a8'; } }
    else if (isOcupado) { corPreenchimento = '#9ca3af'; corBorda = '#4b5563'; opacidade = 0.4; }
    else {
        if (diasSemTrabalhar > 180) corPreenchimento = '#ea580c';
        else if (diasSemTrabalhar > 120) corPreenchimento = '#f97316';
        else if (diasSemTrabalhar > 60) corPreenchimento = '#fb923c';
        else corPreenchimento = '#fed7aa';
    }

    const gerarLinkMsg = (uNome, uWhats) => {
        const baseUrl = window.location.href.split('?')[0].split('#')[0] + '#/app';
        const linkInterno = `${baseUrl}?lat=${centro.lat}&lng=${centro.lng}&z=16`;
        const textoMsg = `Olá *${uNome}*! \nO território *${nome}* foi designado para você.\n\n *Acesse pelo App:* ${linkInterno}\n\nBom trabalho!`;
        return { texto: textoMsg, whatsapp: uWhats, nome: uNome };
    };

    const salvarDesignacao = async () => {
        const idSeguro = `t_${idTerritorio}`;
        if (!usuarioSelecionado) {
            if (!dadosBanco.designadoPara) return;
            if (!confirm("Confirmar devolução do território?")) return;
            const updateData = { designadoPara: null, designadoNome: null, dataDesignacao: null };
            if (isCompleto) { updateData.ultimaConclusao = new Date(); updateData.quadras_feitas = []; }
            await updateDoc(doc(db, "territorios", idSeguro), updateData);
            setMsgPronta(null);
            return;
        }
        const usuarioObj = listaUsuarios.find(u => u.email === usuarioSelecionado);
        const nomeUsuario = usuarioObj ? usuarioObj.nome : "Dirigente";
        await updateDoc(doc(db, "territorios", idSeguro), { designadoPara: usuarioSelecionado, designadoNome: nomeUsuario, dataDesignacao: new Date() });
        const msg = gerarLinkMsg(nomeUsuario, usuarioObj?.whatsapp);
        setMsgPronta(msg);
    };

    // --- COMPARTILHAMENTO DIRETO ---
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

    // --- PONTO DE ENCONTRO ---
    const compartilharPontoEncontro = () => {
        const ponto = posicaoClique || centro;
        // CORREÇÃO: Link padrão universal do Google Maps
        const linkGoogle = `https://www.google.com/maps?q=${ponto.lat},${ponto.lng}`;
        const texto = `*Ponto de Encontro* para o território *${nome}*:\n\n${linkGoogle}`;
        const textoEncoded = encodeURIComponent(texto);
        window.open(`https://wa.me/?text=${textoEncoded}`, '_blank');
    };

    const isCurrentlyAssigned = !!dadosBanco.designadoPara;
    const isSelectingToFree = !usuarioSelecionado;

    return (
        <>
            <Polygon
                positions={posicoes}
                pathOptions={{ color: corBorda, weight: pesoBorda, fillColor: corPreenchimento, fillOpacity: opacidade }}
                eventHandlers={{ click: (e) => setPosicaoClique(e.latlng) }}
            >
                <Popup>
                    <div className="min-w-[260px] p-1 font-sans">
                        <div className="border-b border-gray-200 pb-2 mb-2 text-center">
                            <strong className="text-lg font-bold text-gray-800 block">{nome}</strong>
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
                                        <div className="text-xs text-center text-green-700 font-bold bg-green-100 p-2 rounded">Território com {msgPronta.nome}</div>
                                        <button onClick={abrirWhatsapp} className="popup-btn-action bg-green-600 text-white hover:bg-green-700">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" /></svg>
                                            {msgPronta.whatsapp ? "Enviar no WhatsApp" : "Compartilhar Link"}
                                        </button>
                                        <button onClick={() => setMsgPronta(null)} className="text-xs text-gray-400 underline text-center mt-1">Voltar</button>
                                    </div>
                                ) : (
                                    <div className="animate-fade-in">
                                        <div className="mb-2 p-2 bg-white rounded border border-slate-200 shadow-sm text-center">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase block">Responsável Atual</span>
                                            {dadosBanco.designadoPara ? (
                                                <span className="text-sm font-bold text-blue-700 block truncate">{dadosBanco.designadoNome}</span>
                                            ) : (
                                                <span className="text-sm font-bold text-green-600 block">Livre (Disponível)</span>
                                            )}
                                        </div>

                                        <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Ação / Alterar para:</label>
                                        <select
                                            className="w-full p-2 mb-2 text-sm bg-white border border-gray-300 rounded focus:border-blue-500 outline-none"
                                            value={usuarioSelecionado}
                                            onChange={(e) => setUsuarioSelecionado(e.target.value)}
                                        >
                                            <option value="">-- Devolver (Livre) --</option>
                                            {listaUsuarios.map(u => (
                                                <option key={u.email} value={u.email} className={u.email === user.email ? "font-bold text-blue-600" : ""}>
                                                    {u.nome} {u.whatsapp ? "📱" : ""}
                                                </option>
                                            ))}
                                        </select>

                                        <button
                                            onClick={salvarDesignacao}
                                            disabled={!isCurrentlyAssigned && isSelectingToFree}
                                            className={`popup-btn-action text-white mb-2 ${!isCurrentlyAssigned && isSelectingToFree ? 'bg-gray-300 cursor-not-allowed text-gray-500' :
                                                isSelectingToFree ? 'bg-red-500 hover:bg-red-600' :
                                                    'bg-blue-600 hover:bg-blue-700'
                                                }`}
                                        >
                                            {!isCurrentlyAssigned && isSelectingToFree ? "Já está Disponível" :
                                                isSelectingToFree ? "Confirmar Devolução" :
                                                    "Salvar Designação"}
                                        </button>

                                        {donoDoTerritorio && (
                                            <button onClick={compartilharDiretamente} className="popup-btn-action bg-white border border-green-600 text-green-700 hover:bg-green-50 text-xs py-1">
                                                Compartilhar Novamente
                                            </button>
                                        )}

                                        {isMeu && (
                                            <div className="pt-2 mt-2 border-t border-gray-200">
                                                <button onClick={compartilharPontoEncontro} className="popup-btn-action bg-green-600 text-white hover:bg-green-700 shadow-md w-full">
                                                    Compartilhar este ponto de encontro
                                                </button>
                                                <p className="text-[9px] text-gray-400 text-center mt-1">O link será do local exato onde você clicou.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center mt-2 flex flex-col gap-2">
                                {isMeu ? (
                                    <>
                                        <div className="bg-blue-50 text-blue-700 p-2 rounded text-xs font-bold border border-blue-100">👋 Este é o seu território.</div>
                                        <button onClick={compartilharPontoEncontro} className="popup-btn-action bg-green-600 text-white hover:bg-green-700 shadow-md">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            Compartilhar este ponto de encontro
                                        </button>
                                        <p className="text-[9px] text-gray-400">O link será do local exato onde você clicou.</p>
                                    </>
                                ) : isOcupado ? (
                                    <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded border border-gray-200">Responsável: <strong className="text-gray-700">{dadosBanco.designadoNome}</strong></div>
                                ) : (
                                    <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-100 font-medium">Disponível para trabalho.</div>
                                )}
                            </div>
                        )}
                    </div>
                </Popup>
                {zoomLevel > 13 && (
                    <Tooltip permanent direction="center" className="label-territorio">
                        <span className="label-nome">{nome}</span>
                        {!isOcupado && !isCompleto && <><span className="label-status">{dadosBanco.ultimaConclusao ? "Trabalhado" : "Nunca feito"}</span><span className="label-tempo">{textoTempo}</span></>}
                        {isOcupado && <span className="label-status" style={{ color: '#666' }}>Ocupado</span>}
                        {isCompleto && <span className="label-status" style={{ color: '#166534', background: '#dcfce7' }}>Feito!</span>}
                    </Tooltip>
                )}
            </Polygon>
            {deveMostrarQuadras && listaQuadras.map(quadra => (
                <QuadraMarker key={quadra.id} quadra={quadra} idTerritorio={idTerritorio} isFeita={dadosBanco.quadras_feitas?.includes(quadra.id)} podeEditar={isAdmin || isMeu} />
            ))}
        </>
    );
};

// --- 6. MAPA PRINCIPAL ---
const Mapa = ({ user, isAdmin }) => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(14);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [posicaoUsuario, setPosicaoUsuario] = useState(null);
    const [tipoMapa, setTipoMapa] = useState('padrao');

    useEffect(() => {
        fetch('./mapa.json').then(res => res.json()).then(data => setGeoJsonData(data));
        const carregarUsuarios = async () => {
            try {
                const query = await getDocs(collection(db, "usuarios"));
                const lista = query.docs.map(doc => ({
                    email: doc.id, nome: doc.data().nome || "Sem Nome", role: doc.data().role, whatsapp: doc.data().whatsapp
                }));
                lista.sort((a, b) => a.nome.localeCompare(b.nome));
                setListaUsuarios(lista);
            } catch (e) { console.error(e); }
        };
        carregarUsuarios();
    }, []);

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
                <MapContainer center={[-26.485, -51.995]} zoom={14} zoomControl={false} className="h-full w-full z-0">
                    <MapEvents />
                    <DeepLinkHandler />
                    {tipoMapa === 'padrao' ? <TileLayer attribution='© OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> : <TileLayer attribution='© Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />}
                    <SeletorCamadas tipoMapa={tipoMapa} setTipoMapa={setTipoMapa} />
                    <ControlesNavegacao setPosicaoUsuario={setPosicaoUsuario} />
                    <MarcadorUsuario posicao={posicaoUsuario} />
                    {geoJsonData.features.map((feature, index) => {
                        const uniqueId = feature.properties.id || index + 1;
                        return <TerritorioDetalhado key={uniqueId} dados={feature} idTerritorio={uniqueId} zoomLevel={zoomLevel} user={user} isAdmin={isAdmin} listaUsuarios={listaUsuarios} />;
                    })}
                </MapContainer>
            )}
        </div>
    );
};

export default Mapa;