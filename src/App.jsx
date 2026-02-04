import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider, db } from './firebase';
import { collection, query, where, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import Mapa from './Mapa';
import { useUsuario } from './useUsuario';
import AdminPanel from './AdminPanel';
import Relatorios from './Relatorios';
import appInfo from './version.json';
import AutoUpdate, { checkForUpdate } from './AutoUpdate';
import AjudaModal from './AjudaModal';

// --- CAPTURA GLOBAL DO EVENTO DE INSTALAÇÃO ---
let deferredPromptGlobal = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPromptGlobal = e;
});

// --- TELA DE LOGIN ---
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verificandoSessao, setVerificandoSessao] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/app');
      } else {
        setVerificandoSessao(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErro('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com Google. Tente novamente.");
      setLoading(false);
    }
  };

  if (verificandoSessao) {
    return (
      <div className="flex items-center justify-center h-[100dvh] bg-gray-100">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <h2 className="text-4xl font-bold text-gray-300">Territórios</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[100dvh] bg-gray-100">
      <div className="w-96 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 m-4 animate-fade-in">
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Territórios</h2>
          <p className="text-gray-500 mb-8">Palmas - PR</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg transition-all shadow-sm active:scale-95"
            >
              {loading ? (
                <span className="text-sm">Conectando...</span>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Entrar com Google
                </>
              )}
            </button>
            {erro && <p className="text-red-500 text-xs mt-2">{erro}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SININHO DE NOTIFICAÇÕES ---
const SininhoNotificacoes = ({ user, isAdmin }) => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q1 = query(collection(db, "notificacoes"), where("para", "==", user.email));
    const unsubs = [];

    const unsub1 = onSnapshot(q1, (snap) => {
      const minhas = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setNotificacoes(prev => {
        const outras = prev.filter(p => p.origem === 'admin');
        const listaFinal = [...outras, ...minhas];
        return listaFinal.sort((a, b) => (b.data?.seconds || 0) - (a.data?.seconds || 0));
      });
    });
    unsubs.push(unsub1);

    if (isAdmin) {
      const q2 = query(collection(db, "notificacoes"), where("para", "==", "ADMINS"));
      const unsub2 = onSnapshot(q2, (snap) => {
        const deAdmin = snap.docs.map(d => ({ id: d.id, ...d.data(), origem: 'admin' }));
        setNotificacoes(prev => {
          const pessoais = prev.filter(p => p.origem !== 'admin');
          const listaFinal = [...pessoais, ...deAdmin];
          return listaFinal.sort((a, b) => (b.data?.seconds || 0) - (a.data?.seconds || 0));
        });
      });
      unsubs.push(unsub2);
    }
    return () => unsubs.forEach(u => u());
  }, [user, isAdmin]);

  const limparNotificacao = async (id) => {
    try { await deleteDoc(doc(db, "notificacoes", id)); } catch (e) { console.error("Erro ao limpar notificação:", e); }
  };

  const temNovas = notificacoes.length > 0;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-white hover:bg-blue-700 rounded-full transition-colors active:scale-95"
        title="Notificações"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {temNovas && <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-blue-600 animate-pulse"></span>}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-start justify-end p-4 pt-16 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-80 overflow-hidden animate-fade-in mr-2 border border-blue-100" onClick={e => e.stopPropagation()}>
            <div className="p-3 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
              <h3 className="font-bold text-blue-800 text-sm flex items-center gap-2">🔔 Notificações</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold px-2">✕</button>
            </div>
            <div className="max-h-96 overflow-y-auto bg-gray-50/50">
              {notificacoes.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center">
                  <span className="text-2xl mb-2">😴</span>
                  <span>Nenhuma notificação nova.</span>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notificacoes.map(notif => (
                    <div key={notif.id} className="p-3 hover:bg-white transition-colors flex gap-3 items-start group">
                      <div className="text-xl pt-0.5 bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-sm border border-gray-100">
                        {notif.tipo === 'devolucao' ? '🏁' : '📍'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 leading-snug">{notif.texto}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">
                          {notif.data?.toDate ? notif.data.toDate().toLocaleString() : 'Agora'}
                        </p>
                      </div>
                      <button
                        onClick={() => limparNotificacao(notif.id)}
                        className="text-gray-300 hover:text-red-500 self-start p-1 hover:bg-red-50 rounded transition-colors"
                        title="Marcar como lida"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- MODAL MEUS TERRITÓRIOS ---
const MeusTerritoriosModal = ({ isOpen, onClose, user, navigate }) => {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      carregarMeusTerritorios();
    }
  }, [isOpen, user]);

  const carregarMeusTerritorios = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "territorios"), where("designadoPara", "==", user.email));
      const querySnapshot = await getDocs(q);
      const meusDocs = [];
      querySnapshot.forEach((doc) => meusDocs.push({ id: doc.id, ...doc.data() }));

      if (meusDocs.length > 0) {
        const response = await fetch('./mapa.json');
        const geoData = await response.json();

        const listaCompleta = meusDocs.map(doc => {
          const numeroId = parseInt(doc.id.replace('t_', ''));
          const feature = geoData.features.find(f => {
            const fId = f.properties.id || (geoData.features.indexOf(f) + 1);
            return fId === numeroId;
          });

          // Lógica de Zoom Automático (Bounds)
          let boundsStr = null;
          if (feature) {
            const coords = feature.geometry.coordinates[0];
            let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
            coords.forEach(p => {
              const lng = p[0];
              const lat = p[1];
              if (lat < minLat) minLat = lat;
              if (lat > maxLat) maxLat = lat;
              if (lng < minLng) minLng = lng;
              if (lng > maxLng) maxLng = lng;
            });
            boundsStr = `${minLat},${minLng},${maxLat},${maxLng}`;
          }

          let dataFormatada = "Data desc.";
          if (doc.dataDesignacao) {
            const d = doc.dataDesignacao.toDate ? doc.dataDesignacao.toDate() : new Date(doc.dataDesignacao);
            dataFormatada = d.toLocaleDateString('pt-BR');
          }

          return { ...doc, numeroId, boundsStr, dataFormatada };
        });

        listaCompleta.sort((a, b) => a.numeroId - b.numeroId);
        setLista(listaCompleta);
      } else {
        setLista([]);
      }
    } catch (error) { console.error(error); }
    setLoading(false);
  };

  const irParaMapa = (item) => {
    if (item.boundsStr) {
      navigate(`/app?bounds=${item.boundsStr}`);
      onClose();
    } else {
      alert("Localização não encontrada.");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-0 w-full max-w-sm animate-fade-in overflow-hidden flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-blue-600 text-white">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Meus Territórios
          </h3>
          <button onClick={onClose} className="text-white/80 hover:text-white font-bold text-xl px-2">✕</button>
        </div>
        <div className="overflow-y-auto p-4 flex-1">
          {loading ? (
            <div className="flex flex-col items-center py-8 text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
              <p className="text-sm">Buscando seus territórios...</p>
            </div>
          ) : lista.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2 text-4xl">🤷‍♂️</p>
              <p>Nenhum território designado para você no momento.</p>
              <p className="text-xs mt-2 text-gray-400">Fale com o Servo de Territórios.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lista.map((t) => (
                <div key={t.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{t.nome || `Território ${t.numeroId}`}</h4>
                      <p className="text-xs text-gray-500">Recebido em: <span className="font-medium text-gray-700">{t.dataFormatada}</span></p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">#{t.numeroId}</div>
                  </div>
                  <button onClick={() => irParaMapa(t)} className="w-full bg-blue-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    Ir para o Mapa
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MODAL DE LEGENDA ---
const LegendaModal = ({ isOpen, onClose, isAdmin }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
          <h3 className="text-lg font-bold text-gray-800">Legenda do Mapa</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl px-2">✕</button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-orange-500 border border-orange-700 opacity-60 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Disponível</p><p className="text-gray-500 text-xs">Fale com o Servo</p></div></div>
          <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-blue-500 border border-blue-800 opacity-60 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Seu Território</p><p className="text-gray-500 text-xs">Em andamento</p></div></div>
          {isAdmin && <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-purple-500 border border-purple-800 opacity-60 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Seu (Admin)</p><p className="text-gray-500 text-xs">Designado para você</p></div></div>}
          <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-green-500 border border-green-800 opacity-60 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Concluído</p><p className="text-gray-500 text-xs">Todas as quadras feitas</p></div></div>
          <div className="flex items-center gap-3"><span className="w-8 h-8 rounded bg-gray-500 border border-gray-700 opacity-30 flex-shrink-0"></span><div><p className="text-gray-800 font-bold text-sm">Ocupado</p><p className="text-gray-500 text-xs">Outro dirigente cuidando</p></div></div>
        </div>
        <button onClick={onClose} className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 shadow-sm">Entendi</button>
      </div>
    </div>
  );
};

// --- MENU LATERAL (ATUALIZADO - ORDEM REAJUSTADA) ---
const MenuLateral = ({ isOpen, onClose, user, isAdmin, navigate, handleLogout, abrirAjuda, abrirLegenda }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    if (deferredPromptGlobal) {
      setDeferredPrompt(deferredPromptGlobal);
    }
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      deferredPromptGlobal = e;
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const instalarApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        deferredPromptGlobal = null;
      }
    } else {
      alert('Para instalar: Abra o menu do navegador (três pontinhos) e procure "Adicionar à Tela Inicial" ou "Instalar Aplicativo".');
    }
  };

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[2000] bg-black/50 transition-opacity" onClick={onClose}></div>}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[2001] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>

        {/* CABEÇALHO DO MENU */}
        <div className="bg-blue-600 p-6 text-white flex-shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-3 mb-3 mt-4">
            <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xl shadow ring-2 ring-blue-400">
              {(user?.displayName || user?.email || '?')[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{user?.displayName || 'Usuário'}</p>
              <p className="text-xs text-blue-200 truncate">{user?.email}</p>
            </div>
          </div>
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-800/50 border border-blue-400/30 text-blue-100">
            {isAdmin ? 'Administrador' : 'Dirigente'}
          </span>
        </div>

        {/* CORPO DO MENU */}
        <div className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto">

          {/* 1. MAPA */}
          <button onClick={() => { navigate('/app'); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium border border-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Mapa
          </button>

          {/* 2 & 3. ITENS DE ADMIN */}
          {isAdmin && (
            <>
              <button onClick={() => { navigate('/relatorios'); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Relatórios
              </button>

              <button onClick={() => { navigate('/admin'); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Gerenciar Usuários
              </button>
            </>
          )}

          {/* 4. LEGENDA */}
          <button onClick={() => { abrirLegenda(); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Legenda do Mapa
          </button>

          {/* 5. COMO USAR */}
          <button onClick={() => { abrirAjuda(); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 text-yellow-700 transition-colors font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Como usar (Ajuda)
          </button>

          {/* 6. INSTALAR */}
          {!isStandalone && (
            <button onClick={instalarApp} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-green-700 transition-colors font-medium border border-dashed border-green-200 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Instalar Aplicativo
            </button>
          )}

          <div className="h-px bg-gray-100 my-2"></div>

          {/* 7. SAIR */}
          <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Sair do Sistema
          </button>
        </div>

        {/* --- RODAPÉ COM BOTÃO DE UPDATE --- */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex-shrink-0 flex flex-col items-center gap-1">
          <div className="text-[10px] text-gray-400 text-center mb-2">
            <p className="font-semibold text-gray-500">Territórios Digitais v{appInfo.version}</p>
            <p className="opacity-70">{appInfo.buildDate}</p>
          </div>

          <button 
            onClick={async () => {
                const temUpdate = await checkForUpdate(true);
                if (!temUpdate) alert("Seu sistema já está atualizado! ✅");
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-blue-600 text-xs font-bold hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Verificar Atualização
          </button>
          
          <p className="mt-2 text-[10px] text-gray-300">Desenvolvido com carinho ❤️</p>
        </div>
      </div>
    </>
  );
};

// --- DASHBOARD (ATUALIZADO - HEADER COM ATALHOS) ---
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [verificandoLogin, setVerificandoLogin] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const [legendaAberta, setLegendaAberta] = useState(false);
  const [ajudaAberta, setAjudaAberta] = useState(false);
  const [meusTerritoriosAberto, setMeusTerritoriosAberto] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/');
      } else {
        setUser(currentUser);
      }
      setVerificandoLogin(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const { isAdmin, autorizado, loading: verificandoBanco } = useUsuario(user);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  if (verificandoLogin || (user && verificandoBanco)) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-blue-600 font-semibold text-sm">Carregando sistema...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (!autorizado) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gray-100 p-4">
        <div className="w-96 bg-white shadow-xl rounded-xl p-6 text-center border border-red-100">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Acesso Restrito</h2>
          <p className="mb-6 text-gray-600">O e-mail <strong>{user.email}</strong> não está cadastrado.</p>
          <button onClick={handleLogout} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700">Sair</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden relative">
      <MenuLateral
        isOpen={menuAberto}
        onClose={() => setMenuAberto(false)}
        user={user}
        isAdmin={isAdmin}
        navigate={navigate}
        handleLogout={handleLogout}
        abrirAjuda={() => setAjudaAberta(true)}
        abrirLegenda={() => setLegendaAberta(true)}
      />

      <LegendaModal
        isOpen={legendaAberta}
        onClose={() => setLegendaAberta(false)}
        isAdmin={isAdmin}
      />

      <AjudaModal
        isOpen={ajudaAberta}
        onClose={() => setAjudaAberta(false)}
        isAdmin={isAdmin}
      />

      <MeusTerritoriosModal
        isOpen={meusTerritoriosAberto}
        onClose={() => setMeusTerritoriosAberto(false)}
        user={user}
        navigate={navigate}
      />

      <div className="h-16 bg-blue-600 text-white shadow-md z-20 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-wide">Territórios</span>
        </div>

        <div className="flex items-center gap-3">
          {/* ATALHO 1: RELATÓRIOS (SÓ ADMIN) */}
          {isAdmin && (
            <button
              onClick={() => navigate('/relatorios')}
              className="p-2 text-white/90 hover:text-white hover:bg-blue-500 rounded-full transition-colors relative"
              title="Relatórios"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </button>
          )}

          {/* ATALHO 2: AJUDA (QUEM NÃO É ADMIN) */}
          {!isAdmin && (
            <button
              onClick={() => setAjudaAberta(true)}
              className="p-2 text-white/90 hover:text-white hover:bg-blue-500 rounded-full transition-colors relative"
              title="Como Usar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}

          <SininhoNotificacoes user={user} isAdmin={isAdmin} />

          <button
            onClick={() => setMeusTerritoriosAberto(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-700/80 hover:bg-blue-800 rounded-full shadow-sm text-sm font-semibold transition-colors active:scale-95 border border-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs uppercase tracking-wider">Meus</span>
          </button>

          <button
            onClick={() => setMenuAberto(true)}
            className="p-1 hover:bg-blue-700 rounded transition-colors ml-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 relative z-0">
        <Mapa user={user} isAdmin={isAdmin} />
      </div>
    </div>
  );
}

// --- APP PRINCIPAL ---
function App() {
  const [user, setUser] = useState(null);

  // 1. Monitora o Auth Globalmente
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <HashRouter>
      <AutoUpdate />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </HashRouter>
  );
}

export default App;