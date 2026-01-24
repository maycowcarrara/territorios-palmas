import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker, Tooltip, useMapEvents, useMap, Marker, ZoomControl } from 'react-leaflet';
import { doc, onSnapshot, updateDoc, setDoc, arrayUnion, arrayRemove, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import L from 'leaflet';

// --- CSS EXTRA (Para o Tooltip transparente do Admin) ---
// Adicione isso no seu index.css global se quiser, ou deixe o padrão branco mesmo.
// A classe .leaflet-tooltip-transparent remove o fundo branco padrão do leaflet
const cssTooltip = `
  .label-prioridade {
    background: transparent;
    border: none;
    box-shadow: none;
    font-weight: 800;
    color: #4a044e; /* Roxo escuro para contraste no laranja */
    text-shadow: 1px 1px 0px rgba(255,255,255,0.8);
    font-size: 10px;
    text-transform: uppercase;
    text-align: center;
  }
`;

// --- 1. COMPONENTE DE CONTROLES ---
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
            alert("Ative o GPS para ver sua localização.");
            setBuscando(false);
        });
    };

    const btnClass = "bg-white w-12 h-12 flex items-center justify-center shadow-xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all duration-200";

    return (
        <div className="absolute bottom-8 right-4 z-[400] flex flex-col gap-3">
            <button
                onClick={encontrarUsuario}
                className={`${btnClass} rounded-full mb-2 text-blue-600 hover:text-blue-700 hover:border-blue-200`}
                title="Onde estou?"
            >
                {buscando ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-300 border-t-blue-600"></div>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="2" x2="12" y2="6" />
                        <line x1="12" y1="18" x2="12" y2="22" />
                        <line x1="6" y1="12" x2="2" y2="12" />
                        <line x1="22" y1="12" x2="18" y2="12" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                    </svg>
                )}
            </button>

            {/* Como já temos o ZoomControl nativo no bottomright, removi o customizado aqui para não duplicar, 
          ou mantemos o customizado e removemos o nativo no componente Mapa. 
          Vou manter o seu customizado bonito e remover o nativo no Mapa. */}
            <div className="flex flex-col shadow-xl rounded-xl overflow-hidden border border-slate-200">
                <button
                    onClick={() => map.zoomIn()}
                    className={`${btnClass} text-slate-600 hover:text-blue-600 border-b border-slate-100 rounded-none shadow-none border-0`}
                    title="Mais Zoom"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                <button
                    onClick={() => map.zoomOut()}
                    className={`${btnClass} text-slate-600 hover:text-blue-600 rounded-none shadow-none border-0`}
                    title="Menos Zoom"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// --- 2. MARCADOR DO USUÁRIO ---
const MarcadorUsuario = ({ posicao }) => {
    if (!posicao) return null;
    const iconeGPS = L.divIcon({
        className: 'bg-transparent',
        html: `
      <div class="flex items-center justify-center relative w-16 h-16 -ml-4 -mt-4">
        <div class="absolute w-12 h-12 bg-blue-500/30 rounded-full animate-pulse"></div>
        <div class="relative w-5 h-5 bg-blue-600 border-[3px] border-white rounded-full shadow-lg z-10"></div>
      </div>
    `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    return <Marker position={posicao} icon={iconeGPS}><Popup>Você está aqui</Popup></Marker>;
};

// --- 3. COMPONENTE DA QUADRA ---
const QuadraMarker = ({ quadra, idTerritorio, isFeita, podeEditar }) => {
    const alternarQuadra = async () => {
        if (!podeEditar) return;
        const idSeguro = `t_${idTerritorio}`;
        const docRef = doc(db, "territorios", idSeguro);
        if (isFeita) await updateDoc(docRef, { quadras_feitas: arrayRemove(quadra.id) });
        else await updateDoc(docRef, { quadras_feitas: arrayUnion(quadra.id) });
    };

    return (
        <CircleMarker
            center={[quadra.lat, quadra.lng]}
            pathOptions={{
                color: isFeita ? '#166534' : '#b91c1c',
                fillColor: isFeita ? '#22c55e' : '#ef4444',
                fillOpacity: podeEditar ? 1 : 0.4,
                weight: 2,
                opacity: podeEditar ? 1 : 0.4
            }}
            radius={15}
            eventHandlers={{ click: alternarQuadra }}
        >
            <Tooltip direction="center" permanent className="sem-fundo">{quadra.id}</Tooltip>
        </CircleMarker>
    );
};

// --- 4. COMPONENTE DO TERRITÓRIO (COM LÓGICA DE CALOR) ---
const TerritorioDetalhado = ({ dados, idTerritorio, zoomLevel, user, isAdmin, listaUsuarios }) => {
    const [dadosBanco, setDadosBanco] = useState({
        status: 'aberto',
        quadras_feitas: [],
        designadoPara: null,
        designadoNome: null,
        dataDesignacao: null,
        ultimaConclusao: null // <--- NOVO CAMPO
    });

    const [usuarioSelecionado, setUsuarioSelecionado] = useState("");

    const listaQuadras = (dados.properties.pontos || []).map((p, index) => ({
        id: index + 1, lat: p.lat, lng: p.lng, nomeOriginal: p.nome
    }));

    const nome = dados.properties.nome || `Território ${idTerritorio}`;
    const posicoes = dados.geometry.coordinates[0].map(coord => [coord[1], coord[0]]);

    useEffect(() => {
        const idSeguro = `t_${idTerritorio}`;
        const unsub = onSnapshot(doc(db, "territorios", idSeguro), (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setDadosBanco(data);
                if (data.designadoPara) setUsuarioSelecionado(data.designadoPara);
                else setUsuarioSelecionado("");
            } else {
                setDoc(docSnapshot.ref, { status: 'aberto', nome: nome, quadras_feitas: [] });
            }
        });
        return () => unsub();
    }, [idTerritorio, nome]);

    const usuarioAtual = user?.email;
    const donoDoTerritorio = dadosBanco.designadoPara;
    const isMeu = donoDoTerritorio === usuarioAtual;
    const isOcupado = donoDoTerritorio && !isMeu;
    const podeEditar = isAdmin || isMeu;

    const total = listaQuadras.length;
    const feitas = dadosBanco.quadras_feitas ? dadosBanco.quadras_feitas.length : 0;
    const porcentagem = total > 0 ? (feitas / total) * 100 : 0;
    const isCompleto = total > 0 && feitas === total;
    const deveMostrarQuadras = zoomLevel >= 15 && (isAdmin || isMeu);

    // --- CÁLCULO DE TEMPO (HEATMAP) ---
    let diasSemTrabalhar = 0;
    let textoTempo = "";

    if (dadosBanco.ultimaConclusao) {
        const dataUltima = dadosBanco.ultimaConclusao.toDate ? dadosBanco.ultimaConclusao.toDate() : new Date(dadosBanco.ultimaConclusao);
        const diffTime = Math.abs(new Date() - dataUltima);
        diasSemTrabalhar = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diasSemTrabalhar > 60) textoTempo = `${Math.floor(diasSemTrabalhar / 30)} meses`;
        else textoTempo = `${diasSemTrabalhar} dias`;
    } else {
        // Se nunca foi trabalhado ou não tem data
        diasSemTrabalhar = 999;
        textoTempo = "Nunca";
    }

    // --- LÓGICA DE CORES AVANÇADA ---
    let corPreenchimento = '#fed7aa'; // Laranja Muito Claro (Padrão Recente)
    let corBorda = '#c2410c';
    let pesoBorda = 1;
    let opacidade = 0.5;

    if (isCompleto) {
        corPreenchimento = '#22c55e'; // Verde
        corBorda = '#15803d';
        pesoBorda = isMeu ? 3 : 1;
        opacidade = 0.6;
    } else if (isMeu) {
        if (isAdmin) { corPreenchimento = '#a855f7'; corBorda = '#6b21a8'; }
        else { corPreenchimento = '#3b82f6'; corBorda = '#1e40af'; }
        pesoBorda = 3;
        opacidade = 0.5;
    } else if (isOcupado) {
        corPreenchimento = '#9ca3af'; // Cinza
        corBorda = '#4b5563';
        opacidade = 0.4;
    } else {
        // --- É LIVRE (Aplicar Heatmap apenas para Admin) ---
        if (isAdmin) {
            if (diasSemTrabalhar > 180) corPreenchimento = '#ef4444'; // Vermelho (Urgente > 6 meses)
            else if (diasSemTrabalhar > 90) corPreenchimento = '#f97316'; // Laranja Forte (> 3 meses)
            else if (diasSemTrabalhar > 30) corPreenchimento = '#fdba74'; // Laranja Médio (> 1 mês)
            else corPreenchimento = '#fed7aa'; // Laranja Claro (Recente)
        } else {
            // Para usuário comum, laranja padrão para não confundir
            corPreenchimento = '#fdba74';
        }
    }

    const salvarDesignacao = async () => {
        const idSeguro = `t_${idTerritorio}`;
        if (!usuarioSelecionado) {
            // DEVOLVER / LIBERAR
            if (!confirm("Remover a designação e liberar o território?")) return;

            const updateData = {
                designadoPara: null,
                designadoNome: null,
                dataDesignacao: null
            };

            // SE ESTIVER COMPLETO AO DEVOLVER, SALVA DATA E RESETA
            if (isCompleto) {
                updateData.ultimaConclusao = new Date(); // Salva hoje como data de conclusão
                updateData.quadras_feitas = []; // Reseta as bolinhas
            }

            await updateDoc(doc(db, "territorios", idSeguro), updateData);
            return;
        }

        // DESIGNAR
        const usuarioObj = listaUsuarios.find(u => u.email === usuarioSelecionado);
        const nomeUsuario = usuarioObj ? usuarioObj.nome : "Usuário";
        await updateDoc(doc(db, "territorios", idSeguro), {
            designadoPara: usuarioSelecionado,
            designadoNome: nomeUsuario,
            dataDesignacao: new Date()
        });
    };

    return (
        <>
            <Polygon
                positions={posicoes}
                pathOptions={{ color: corBorda, weight: pesoBorda, fillColor: corPreenchimento, fillOpacity: opacidade }}
            >
                <Popup>
                    <div className="min-w-[240px] p-1">
                        <strong className="text-sm uppercase tracking-wide text-gray-800 block mb-2 text-center">{nome}</strong>

                        {/* Informação de Última Conclusão */}
                        {dadosBanco.ultimaConclusao && (
                            <div className="text-center text-[10px] text-gray-400 mb-2">
                                Trabalhado pela última vez há: <strong>{textoTempo}</strong>
                            </div>
                        )}

                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progresso</span><span>{feitas}/{total}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div className={`h-2 rounded-full transition-all duration-500 ${isCompleto ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${porcentagem}%` }}></div>
                        </div>
                        <hr className="border-gray-200 mb-3" />

                        {isAdmin ? (
                            <div className="bg-gray-50 p-3 rounded border border-gray-200 shadow-sm">
                                {isCompleto && <div className="mb-2 p-1.5 bg-green-100 text-green-700 text-xs rounded text-center font-bold border border-green-200">✅ CONCLUÍDO</div>}
                                {isMeu && !isCompleto && <div className="mb-2 p-1.5 bg-purple-100 text-purple-700 text-xs rounded text-center font-bold border border-purple-200">SEU TERRITÓRIO</div>}
                                {isOcupado && <div className="mb-2 text-xs text-center text-gray-500">Com: <strong>{dadosBanco.designadoNome}</strong></div>}

                                <div className="flex gap-1 mt-2">
                                    <select
                                        className="w-full p-1 text-sm bg-white border border-gray-300 rounded focus:outline-none"
                                        value={usuarioSelecionado}
                                        onChange={(e) => setUsuarioSelecionado(e.target.value)}
                                    >
                                        <option value="">-- Devolver / Livre --</option>
                                        {listaUsuarios.map(u => (
                                            <option key={u.email} value={u.email} className={u.email === user.email ? "font-bold text-blue-600" : ""}>
                                                {u.nome || u.email} {u.email === user.email ? "(Você)" : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={salvarDesignacao} className="bg-blue-600 text-white px-3 rounded font-bold">OK</button>
                                </div>
                                {/* Dica para o Admin sobre a devolução */}
                                {isCompleto && usuarioSelecionado === "" && (
                                    <p className="text-[9px] text-orange-600 mt-1 text-center">
                                        *Ao devolver completo, o progresso será resetado e a data atual salva.
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="text-center">
                                {isCompleto ? (
                                    <div className="bg-green-50 text-green-700 p-2 rounded text-xs border border-green-200 font-bold">🎉 Concluído!</div>
                                ) : isMeu ? (
                                    <div className="bg-blue-50 text-blue-700 p-2 rounded text-xs border border-blue-200 font-medium">Seu Território</div>
                                ) : isOcupado ? (
                                    <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded border border-gray-200">Dirigente: <strong>{dadosBanco.designadoNome}</strong></div>
                                ) : (
                                    <div className="text-xs text-orange-600 bg-orange-50 border border-orange-100 p-2 rounded font-medium">Disponível</div>
                                )}
                            </div>
                        )}
                    </div>
                </Popup>

                {/* TEXTO DE PRIORIDADE (Só aparece para o Admin e se estiver Livre) */}
                {isAdmin && !isOcupado && !isMeu && !isCompleto && (
                    <Tooltip permanent direction="center" className="label-prioridade">
                        <span className="font-bold text-xs" style={{ color: '#4a044e', textShadow: '0 0 3px white' }}>
                            {textoTempo}
                        </span>
                    </Tooltip>
                )}

            </Polygon>

            {deveMostrarQuadras && listaQuadras.map(quadra => (
                <QuadraMarker key={quadra.id} quadra={quadra} idTerritorio={idTerritorio} isFeita={dadosBanco.quadras_feitas?.includes(quadra.id)} podeEditar={podeEditar} />
            ))}
        </>
    );
};

// --- 5. MAPA PRINCIPAL ---
const Mapa = ({ user, isAdmin }) => {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(14);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [posicaoUsuario, setPosicaoUsuario] = useState(null);

    useEffect(() => {
        fetch('./mapa.json').then(res => res.json()).then(data => setGeoJsonData(data));
        const carregarUsuarios = async () => {
            try {
                const query = await getDocs(collection(db, "usuarios"));
                const lista = query.docs.map(doc => ({ email: doc.id, nome: doc.data().nome || "Sem Nome", role: doc.data().role }));
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

    // INJEÇÃO DE CSS DENTRO DO COMPONENTE PARA O TOOLTIP FUNCIONAR SEM ARQUIVO EXTERNO
    return (
        <div className="h-full w-full relative">
            <style>{cssTooltip}</style> {/* Injeta o CSS do Tooltip */}

            {!geoJsonData ? (
                <div className="flex h-full items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <MapContainer center={[-26.485, -51.995]} zoom={14} zoomControl={false} className="h-full w-full z-0">
                    <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapEvents />
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