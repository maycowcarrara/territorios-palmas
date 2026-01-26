import { useEffect } from 'react';
import versaoLocal from './version.json'; // A versão compilada com o app

const AutoUpdate = () => {
    useEffect(() => {
        const verificarAtualizacao = async () => {
            try {
                // AJUSTE AQUI: Removemos a barra "/" do início. 
                // Usar './version.json' faz ele buscar na mesma pasta onde o site está rodando.
                const response = await fetch(`./version.json?t=${new Date().getTime()}`);

                if (!response.ok) return; // Se der erro na busca (404), ignora

                const versaoServidor = await response.json();

                // Se a versão do servidor for diferente da local
                if (versaoServidor.version !== versaoLocal.version) {
                    console.log(`Nova versão detectada: ${versaoLocal.version} -> ${versaoServidor.version}`);

                    // 1. Limpa o cache do navegador (arquivos estáticos)
                    if ('caches' in window) {
                        const names = await caches.keys();
                        // Apaga todos os caches antigos
                        await Promise.all(names.map(name => caches.delete(name)));
                    }

                    // 2. Desregistra Service Workers (o maior vilão do cache em PWA)
                    if ('serviceWorker' in navigator) {
                        const registrations = await navigator.serviceWorker.getRegistrations();
                        for (let registration of registrations) {
                            await registration.unregister();
                        }
                    }

                    // 3. Aviso e Reload Forçado
                    alert(`Atualização disponível (${versaoServidor.version})! O app será reiniciado.`);

                    // Reload ignorando cache (parâmetro true)
                    window.location.reload(true);
                }
            } catch (error) {
                // Erros de rede silenciosos (não precisa assustar o usuário)
                console.log("Verificação de update falhou (offline ou erro de rede).");
            }
        };

        // Verifica assim que abre
        verificarAtualizacao();

        // Verifica a cada 2 minutos enquanto o app estiver aberto
        const intervalo = setInterval(verificarAtualizacao, 120000);

        return () => clearInterval(intervalo);
    }, []);

    return null;
};

export default AutoUpdate;