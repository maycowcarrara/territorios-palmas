import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import Mapa from './Mapa';
import { useUsuario } from './useUsuario';
import AdminPanel from './AdminPanel';
import Relatorios from './Relatorios'; 
import appInfo from './version.json';
import AutoUpdate from './AutoUpdate';

// --- CAPTURA GLOBAL DO EVENTO DE INSTALAÇÃO ---
// Isso garante que pegamos o evento mesmo antes do React renderizar qualquer coisa
let deferredPromptGlobal = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Previne que o Chrome mostre a barra mini automaticamente
  e.preventDefault();
  // Salva o evento na variável global para usarmos depois
  deferredPromptGlobal = e;
});

// --- TELA DE LOGIN ---
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate('/app');
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

  return (
    <div className="flex items-center justify-center h-[100dvh] bg-gray-100">
      <div className="w-96 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 m-4">
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Territórios</h2>
          <p className="text-gray-500 mb-8">Palmas - PR</p>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-lg transition-all shadow-sm"
            >
              {loading ? (
                <span className="text-sm">Carregando...</span>
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

// --- MODAL DE LEGENDA ---
const LegendaModal = ({ isOpen, onClose, isAdmin }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
          <h3 className="text-lg font-bold text-gray-800">Legenda do Mapa</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl px-2">✕</button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-orange-500 border border-orange-700 opacity-60 flex-shrink-0"></span>
            <div>
              <p className="text-gray-800 font-bold text-sm">Disponível</p>
              <p className="text-gray-500 text-xs">Fale com o Servo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-blue-500 border border-blue-800 opacity-60 flex-shrink-0"></span>
            <div>
              <p className="text-gray-800 font-bold text-sm">Seu Território</p>
              <p className="text-gray-500 text-xs">Em andamento</p>
            </div>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-purple-500 border border-purple-800 opacity-60 flex-shrink-0"></span>
              <div>
                <p className="text-gray-800 font-bold text-sm">Seu (Admin)</p>
                <p className="text-gray-500 text-xs">Designado para você</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-green-500 border border-green-800 opacity-60 flex-shrink-0"></span>
            <div>
              <p className="text-gray-800 font-bold text-sm">Concluído</p>
              <p className="text-gray-500 text-xs">Todas as quadras feitas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-gray-500 border border-gray-700 opacity-30 flex-shrink-0"></span>
            <div>
              <p className="text-gray-800 font-bold text-sm">Ocupado</p>
              <p className="text-gray-500 text-xs">Outro dirigente cuidando</p>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 shadow-sm">
          Entendi
        </button>
      </div>
    </div>
  );
};

// --- MENU LATERAL ---
const MenuLateral = ({ isOpen, onClose, user, isAdmin, navigate, handleLogout }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // 1. Tenta pegar da variável global (capturada no início do script)
    if (deferredPromptGlobal) {
      setDeferredPrompt(deferredPromptGlobal);
    }

    // 2. Define um listener local como fallback (caso o evento dispare tarde)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      deferredPromptGlobal = e; // Atualiza global também
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
      // Fallback visual se não conseguirmos disparar o prompt nativo
      alert('Para instalar: Abra o menu do navegador (três pontinhos) e procure "Adicionar à Tela Inicial" ou "Instalar Aplicativo".');
    }
  };

  // Verifica se já está rodando como App instalado
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[50] bg-black/50 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[51] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="bg-blue-600 p-6 text-white">
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

        <div className="p-4 flex flex-col gap-2 flex-1">

          <button onClick={() => { navigate('/app'); onClose(); }} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Mapa
          </button>

          {isAdmin && (
            <>
              <button
                onClick={() => { navigate('/admin'); onClose(); }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Gerenciar Usuários
              </button>

              {/* NOVA OPÇÃO: RELATÓRIOS */}
              <button
                onClick={() => { navigate('/relatorios'); onClose(); }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Relatórios
              </button>
            </>
          )}

          {/* Só mostra o botão se NÃO estiver rodando como App instalado */}
          {!isStandalone && (
            <button
              onClick={instalarApp}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-green-700 transition-colors font-medium border border-dashed border-green-200 mt-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Instalar Aplicativo
            </button>
          )}

          <div className="h-px bg-gray-100 my-2"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Sair do Sistema
          </button>

        </div>

        {/* RODAPÉ COM VERSÃO AUTOMÁTICA */}
        <div className="p-4 text-center text-[10px] text-gray-300 bg-gray-50 border-t border-gray-100">
          <p>Territórios Digitais v{appInfo.version}</p>
          <p className="opacity-70">Atualizado em: {appInfo.buildDate}</p>
          <p className="mt-1">Desenvolvido com carinho ❤️</p>
        </div>

      </div>
    </>
  );
};

// --- DASHBOARD (Tela Principal) ---
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [verificandoLogin, setVerificandoLogin] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const [legendaAberta, setLegendaAberta] = useState(false);

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
      />

      <LegendaModal
        isOpen={legendaAberta}
        onClose={() => setLegendaAberta(false)}
        isAdmin={isAdmin}
      />

      {/* BARRA SUPERIOR */}
      <div className="h-16 bg-blue-600 text-white shadow-md z-20 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-wide">Territórios</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLegendaAberta(true)}
            className="w-9 h-9 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            title="Legenda de Cores"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <button
            onClick={() => setMenuAberto(true)}
            className="p-1 hover:bg-blue-700 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* ÁREA DO MAPA (Preenche o resto) */}
      <div className="flex-1 bg-gray-100 relative z-0">
        <Mapa user={user} isAdmin={isAdmin} />
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AutoUpdate />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* NOVA ROTA DE RELATÓRIOS */}
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </HashRouter>
  );
}

export default App;