import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { arrayRemove, arrayUnion, deleteField, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const CANAL_PADRAO_ID = 'territorios-alertas';
let listenersRegistrados = false;
let emailUsuarioAtual = null;
let ultimoTokenRegistrado = null;

const ehAndroidNativo = () => Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';
const normalizarRotaPush = (rota) => {
    const rotaLimpa = String(rota || '/app').trim();
    if (!rotaLimpa) return '#/app';
    if (rotaLimpa.startsWith('#')) return rotaLimpa;
    return `#${rotaLimpa.startsWith('/') ? rotaLimpa : `/${rotaLimpa}`}`;
};

const abrirDestinoDoPush = (notification) => {
    const data = notification?.notification?.data || notification?.data || {};
    const rota = normalizarRotaPush(data?.targetRoute || '/app');

    if (typeof window !== 'undefined' && window.location.hash !== rota) {
        window.location.hash = rota;
    }
};

const getRefUsuario = (email) => doc(db, 'usuarios', email.toLowerCase());

const persistirTokenUsuario = async (email, token) => {
    if (!email || !token) return;

    ultimoTokenRegistrado = token;

    await setDoc(getRefUsuario(email), {
        fcmTokens: arrayUnion(token),
        ultimoFcmToken: token,
        ultimoFcmTokenAtualizadoEm: new Date(),
        plataformaPush: 'android'
    }, { merge: true });
};

const removerTokenUsuario = async (email, token) => {
    if (!email || !token) return;

    await setDoc(getRefUsuario(email), {
        fcmTokens: arrayRemove(token),
        ultimoFcmToken: deleteField(),
        ultimoFcmTokenAtualizadoEm: deleteField(),
        plataformaPush: deleteField()
    }, { merge: true });
};

const garantirListenersPush = async () => {
    if (listenersRegistrados || !ehAndroidNativo()) return;

    await PushNotifications.addListener('registration', async (token) => {
        console.info('FCM token registrado:', token.value);

        try {
            await persistirTokenUsuario(emailUsuarioAtual, token.value);
        } catch (error) {
            console.error('Erro ao salvar token FCM no Firestore:', error);
        }
    });

    await PushNotifications.addListener('registrationError', (error) => {
        console.error('Erro ao registrar Push Notifications:', error);
    });

    await PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.info('Push recebido:', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.info('Push aberto pelo usuario:', notification);
        abrirDestinoDoPush(notification);
    });

    listenersRegistrados = true;
};

export const ativarPushNotifications = async (user) => {
    if (!ehAndroidNativo() || !user?.email) return;

    emailUsuarioAtual = user.email.toLowerCase();

    await garantirListenersPush();

    let permissao = await PushNotifications.checkPermissions();
    if (permissao.receive === 'prompt') {
        permissao = await PushNotifications.requestPermissions();
    }

    if (permissao.receive !== 'granted') {
        throw new Error('Permissão de notificações não concedida no Android.');
    }

    await PushNotifications.createChannel({
        id: CANAL_PADRAO_ID,
        name: 'Alertas do Territórios',
        description: 'Comunicados e avisos do sistema',
        importance: 4,
        visibility: 1,
        sound: 'default'
    });

    await PushNotifications.register();
};

export const desativarPushNotifications = async (email) => {
    if (!ehAndroidNativo()) return;

    const emailNormalizado = email?.toLowerCase() || emailUsuarioAtual;
    const tokenParaRemover = ultimoTokenRegistrado;

    try {
        await PushNotifications.unregister();
    } catch (error) {
        console.warn('Nao foi possivel desregistrar o FCM do aparelho:', error);
    }

    try {
        await removerTokenUsuario(emailNormalizado, tokenParaRemover);
    } catch (error) {
        console.warn('Nao foi possivel remover o token FCM do Firestore:', error);
    }

    emailUsuarioAtual = null;
    ultimoTokenRegistrado = null;
};
