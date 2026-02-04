import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmR4PilWSpPeP_TNWi7LCn9iGso3xnWI8",
    authDomain: "territorios-palmas.firebaseapp.com",
    projectId: "territorios-palmas",
    storageBucket: "territorios-palmas.firebasestorage.app",
    messagingSenderId: "248096290085",
    appId: "1:248096290085:web:ea8d224c2bb99b140456cc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Mantemos essa configuração de cache pois ela ajuda o app a não travar
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    })
});