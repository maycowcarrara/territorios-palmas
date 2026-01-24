import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore'; // Mudei para onSnapshot (tempo real)
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
        const docRef = doc(db, "usuarios", user.email);

        // Usamos onSnapshot para ouvir mudanças em tempo real
        // (Se você aprovar o usuário no painel, ele entra na hora sem precisar recarregar)
        const unsub = onSnapshot(docRef, async (docSnap) => {

            if (docSnap.exists()) {
                const dados = docSnap.data();

                // Só entra se for 'admin' ou 'comum'. Se for 'aguardando', não entra.
                const podeEntrar = dados.role === 'admin' || dados.role === 'comum';

                setAutorizado(podeEntrar);
                setIsAdmin(dados.role === 'admin');
                setLoading(false);
            } else {
                // --- O PULO DO GATO ---
                // Se não existe, cria automaticamente como 'aguardando'
                try {
                    await setDoc(docRef, {
                        role: 'aguardando',
                        nome: user.displayName || 'Sem nome',
                        criadoEm: new Date()
                    });
                } catch (err) {
                    console.error("Erro ao criar solicitação:", err);
                }
                // Mantém bloqueado por enquanto
                setAutorizado(false);
                setIsAdmin(false);
                setLoading(false);
            }
        });

        return () => unsub();
    }, [user]);

    return { isAdmin, autorizado, loading };
}