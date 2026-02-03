import React, { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase';

const NotificationHandler = () => {

    const ativarNotificacoes = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                // AQUI VAI A SUA VAPID KEY DO PASSO 1
                const token = await getToken(messaging, {
                    vapidKey: "BDiM-KJxPnIvZg_6HV8jbUoSAEPqLGSWtd0vPDUji_zKcxUiaYXHhiyUtLRiQYf7m0RKlVmSN6DxuCBmELjiR9w"
                });
                console.log("Token de Notificação:", token);
                alert("Notificações ativadas! Você receberá avisos importantes.");

                // DICA PRO: Aqui você poderia salvar esse token no banco de dados
                // junto com o usuário (db/usuarios/email/token) para enviar msg só pra ele depois.
            } else {
                alert("Você precisa permitir as notificações para receber avisos.");
            }
        } catch (error) {
            console.error("Erro ao ativar notificações:", error);
        }
    };

    // Escuta mensagens quando o app está ABERTO
    useEffect(() => {
        onMessage(messaging, (payload) => {
            console.log('Mensagem recebida no app aberto:', payload);
            // Cria um alerta simples ou um Toast customizado
            alert(`${payload.notification.title}: ${payload.notification.body}`);
        });
    }, []);

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <button
                onClick={ativarNotificacoes}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 animate-bounce"
            >
                🔔 Ativar Avisos
            </button>
        </div>
    );
};

export default NotificationHandler;