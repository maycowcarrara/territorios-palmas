const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { logger } = require("firebase-functions");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");

admin.initializeApp();

// 2. ADICIONE ESTA LINHA PARA FORÇAR O BRASIL (São Paulo)
setGlobalOptions({ region: "southamerica-east1" });

// Seu App ID do OneSignal (pode ficar visível, não é secreto)
const ONESIGNAL_APP_ID = "468b1307-84c9-48d1-b77d-e3206c010adf";

exports.enviarPushNotification = onDocumentCreated("notificacoes/{notifId}", async (event) => {
    // 1. Pega os dados da notificação que acabou de ser salva no banco
    const data = event.data.data();

    if (!data) {
        logger.warn("Nenhum dado encontrado na notificação.");
        return;
    }

    // 2. Busca a chave secreta que vamos configurar no Passo 2
    const apiKey = process.env.ONESIGNAL_KEY;

    if (!apiKey) {
        logger.error("ERRO CRÍTICO: Chave do OneSignal (ONESIGNAL_KEY) não configurada.");
        return;
    }

    // 3. Define quem vai receber (Admin ou Usuário Específico)
    let targets = [];
    if (data.para === "ADMINS") {
        // Envia para quem tem a tag "role" = "admin" no OneSignal
        // (Você precisa garantir que etiquetou os admins no OneSignal, ou mudar a estratégia aqui)
        // Se ainda não usou tags, podemos enviar para todos por enquanto ou filtrar por External ID se tiver a lista.
        // Opção simples: Envia para o segmento "Subscribed Users" (Todos) ou filtra depois.
        // Vamos tentar usar o filtro por e-mail se você tiver os e-mails dos admins fixos, ou Tag.

        // Padrão: Tenta enviar para segmento de Admins se existir, ou todos. 
        // Para simplificar agora, vamos assumir que o "para" 'ADMINS' é um caso especial.
        // Se você não usa Tags, a notificação não chegará. 
        // SUGESTÃO: Mudar a lógica para enviar para e-mails específicos se 'ADMINS' for difícil configurar agora.

        // Exemplo usando Tag (Recomendado configurar no App.jsx):
        targets = { field: "tag", key: "role", relation: "=", value: "admin" };
    } else {
        // Envia para o usuário específico pelo e-mail (External ID)
        targets = { field: "external_id", relation: "=", value: data.para.toLowerCase() };
    }

    // 4. Monta a mensagem para o OneSignal
    const payload = {
        app_id: ONESIGNAL_APP_ID,
        contents: { en: data.texto || "Nova notificação" },
        headings: { en: data.tipo === 'devolucao' ? "🏁 Território Devolvido" : "🌍 Nova Designação" },
        filters: [targets] // Aqui aplicamos o filtro de quem recebe
    };

    // 5. Envia a requisição para o OneSignal (Secure Server-Side)
    try {
        const response = await fetch("https://onesignal.com/api/v1/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.errors) {
            logger.error("Erro no retorno do OneSignal:", result.errors);
        } else {
            logger.log("Push enviado com sucesso! ID:", result.id);
        }
    } catch (error) {
        logger.error("Erro de conexão ao enviar push:", error);
    }
});