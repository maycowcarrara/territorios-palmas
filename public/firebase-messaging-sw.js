// Scripts do Firebase para Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// COPIE AQUI A MESMA CONFIGURAÇÃO QUE ESTÁ NO SEU src/firebase.js
// (Você não pode importar o arquivo .js aqui, tem que colar o objeto config direto)
const firebaseConfig = {
    apiKey: "AIzaSyBmR4PilWSpPeP_TNWi7LCn9iGso3xnWI8",
    authDomain: "territorios-palmas.firebaseapp.com",
    projectId: "territorios-palmas",
    storageBucket: "territorios-palmas.firebasestorage.app",
    messagingSenderId: "248096290085",
    appId: "1:248096290085:web:ea8d224c2bb99b140456cc"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Opcional: Lidar com notificação em segundo plano
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Mensagem recebida em background: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon-192.png' // Ícone do seu app
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});