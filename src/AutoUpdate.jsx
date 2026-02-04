// src/AutoUpdate.jsx (Modificado)
import React, { useEffect, useState } from 'react';
import appInfo from './version.json';

// Criamos um evento customizado para notificar quando há atualização disponível
export const checkForUpdate = async (manual = false) => {
    try {
        const baseUrl = import.meta.env.BASE_URL;
        const response = await fetch(`${baseUrl}version.json?t=${new Date().getTime()}`, {
            cache: 'no-store'
        });

        if (!response.ok) return false;
        const data = await response.json();

        if (data.version !== appInfo.version) {
            if (manual) {
                // Se for manual, acionamos a atualização
                if ('serviceWorker' in navigator) {
                    const regs = await navigator.serviceWorker.getRegistrations();
                    for (let r of regs) await r.unregister();
                }
                // O parâmetro de busca força o Android a ignorar o cache do index.html
                window.location.href = `/?v=${data.version}`;
            }
            return true; // Há nova versão
        }
    } catch (e) {
        console.error("Erro ao verificar versão:", e);
    }
    return false;
};

const AutoUpdate = () => {
    useEffect(() => {
        const intervalo = setInterval(() => checkForUpdate(false), 60 * 1000);
        return () => clearInterval(intervalo);
    }, []);

    return null;
};

export default AutoUpdate;