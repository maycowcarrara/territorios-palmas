import React, { useEffect } from 'react';
import appInfo from './version.json';

const AutoUpdate = () => {
    useEffect(() => {
        const limparCacheERecarregar = async () => {
            console.log("🔄 Nova versão detectada! Atualizando...");

            // 1. Remove Service Workers antigos (Essencial para garantir que o novo index.html seja baixado)
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) {
                    await registration.unregister();
                }
            }

            // REMOVIDO: O passo de limpar 'caches.keys()' manualmente.
            // O Vite gera arquivos com hash (ex: index-a1b2.js). Ao recarregar,
            // o navegador baixa os novos e ignora os velhos automaticamente.
            // Isso torna o reload muito mais rápido.

            // 2. Força recarregamento da página buscando do servidor
            window.location.reload(true);
        };

        const verificarVersao = async () => {
            try {
                const baseUrl = import.meta.env.BASE_URL;
                // Adiciona um timestamp para evitar cache na requisição do JSON
                const response = await fetch(`${baseUrl}version.json?t=${new Date().getTime()}`, {
                    cache: 'no-store'
                });

                if (!response.ok) return;

                const data = await response.json();

                if (data.version !== appInfo.version) {
                    await limparCacheERecarregar();
                }
            } catch (error) {
                console.error("Erro ao verificar atualização:", error);
            }
        };

        verificarVersao();
        // Verifica a cada 30 segundos (reduzi de 60s para ficar mais ágil)
        const intervalo = setInterval(verificarVersao, 30 * 1000);

        return () => clearInterval(intervalo);
    }, []);

    return null;
};

export default AutoUpdate;