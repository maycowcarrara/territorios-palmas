import React, { useEffect } from 'react';
import appInfo from './version.json'; // Importa a versão local (do build)

const AutoUpdate = () => {
    useEffect(() => {
        // Função para destruir o cache e forçar atualização
        const limparCacheERecarregar = async () => {
            console.log("🔄 Nova versão detectada! Atualizando...");

            // 1. Remove Service Workers antigos (PWA)
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) {
                    await registration.unregister();
                }
            }

            // 2. Limpa o Cache Storage (onde o PWA guarda arquivos)
            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(key => caches.delete(key)));
            }

            // 3. Força recarregamento da página (true = ignora cache do browser)
            window.location.reload(true);
        };

        const verificarVersao = async () => {
            try {
                // PEQUENA MELHORIA: Usar BASE_URL do Vite
                // Isso garante que o fetch pegue '/territorios-palmas/version.json' no GitHub
                // e '/version.json' no localhost automaticamente.
                const baseUrl = import.meta.env.BASE_URL;
                const response = await fetch(`${baseUrl}version.json?t=${new Date().getTime()}`);

                if (!response.ok) return;

                const data = await response.json();

                // Compara a versão do servidor com a versão que está rodando
                if (data.version !== appInfo.version) {
                    await limparCacheERecarregar();
                }
            } catch (error) {
                console.error("Erro ao verificar atualização:", error);
            }
        };

        // Verifica assim que o componente monta
        verificarVersao();

        // Verifica periodicamente (a cada 60s)
        const intervalo = setInterval(verificarVersao, 60 * 1000);

        return () => clearInterval(intervalo);
    }, []);

    return null; // Componente invisível (lógica pura)
};

export default AutoUpdate;