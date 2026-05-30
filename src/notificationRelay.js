import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './firebase';

const relayUrl = import.meta.env.VITE_NOTIFICATIONS_RELAY_URL || '';

export const relayDisponivel = () => Boolean(relayUrl);

const getRelayBaseUrl = () => relayUrl.replace(/\/$/, '');

const postRelay = async (payload) => {
    if (!relayUrl) {
        throw new Error('Relay de notificações não configurado.');
    }

    const user = auth.currentUser;
    if (!user) {
        throw new Error('Sessão expirada. Entre novamente para continuar.');
    }

    const idToken = await user.getIdToken();

    const response = await fetch(`${getRelayBaseUrl()}/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idToken,
            ...payload
        })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data?.error || 'Falha ao enviar notificação pelo relay.');
    }

    return data;
};

export const enviarComunicadoPeloRelay = async ({ destino, mensagem }) =>
    postRelay({
        action: 'broadcast',
        destino,
        mensagem
    });

export const enviarEventoNotificacaoPeloRelay = async ({
    para,
    texto,
    tipo = 'sistema',
    origem = 'sistema',
    tituloPush = 'Territórios'
}) =>
    postRelay({
        action: 'notify',
        notificacao: {
            para,
            texto,
            tipo,
            origem,
            tituloPush
        }
    });

export const enviarEventoNotificacao = async ({
    para,
    texto,
    tipo = 'sistema',
    origem = 'sistema',
    tituloPush = 'Territórios'
}) => {
    if (relayDisponivel()) {
        try {
            return await enviarEventoNotificacaoPeloRelay({
                para,
                texto,
                tipo,
                origem,
                tituloPush
            });
        } catch (error) {
            console.warn('Relay de notificações indisponível. Tentando fallback no Firestore.', error);
        }
    }

    await addDoc(collection(db, 'notificacoes'), {
        para,
        texto,
        data: new Date(),
        lida: false,
        tipo,
        origem
    });

    return {
        ok: true,
        action: 'notify',
        channel: 'firestore-fallback'
    };
};
