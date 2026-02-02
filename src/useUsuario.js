import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export function useUsuario(user) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [autorizado, setAutorizado] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) {
            setAutorizado(false);
            setIsAdmin(false);
            setLoading(false);
            return;
        }

        setLoading(true);

        // --- CORREÇÃO AQUI ---
        // Forçamos o e-mail para minúsculo para garantir que bata com o cadastro do AdminPanel
        const emailFormatado = user.email.toLowerCase();
        const docRef = doc(db, "usuarios", emailFormatado);

        const unsub = onSnapshot(docRef, async (docSnap) => {

            if (docSnap.exists()) {
                const dados = docSnap.data();

                // Só entra se for 'admin' ou 'comum'.
                const podeEntrar = dados.role === 'admin' || dados.role === 'comum';

                setAutorizado(podeEntrar);
                setIsAdmin(dados.role === 'admin');
                setLoading(false);
            } else {
                // Se não existe, cria a solicitação AUTOMATICAMENTE
                try {
                    await setDoc(docRef, {
                        role: 'aguardando',
                        nome: user.displayName || 'Sem nome',
                        emailOriginal: user.email, // Guarda o e-mail original do Google só por segurança
                        criadoEm: new Date()
                    });
                } catch (err) {
                    console.error("Erro ao criar solicitação:", err);
                }

                // Mantém bloqueado
                setAutorizado(false);
                setIsAdmin(false);
                setLoading(false);
            }
        });

        return () => unsub();
    }, [user]);

    return { isAdmin, autorizado, loading };
}