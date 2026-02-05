import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, addDoc, collection } from 'firebase/firestore'; // Adicionado addDoc e collection
import { db } from './firebase';

export function useUsuario(user) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [autorizado, setAutorizado] = useState(false);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null); // NOVO: Guarda o status exato (ex: 'aguardando')

    useEffect(() => {
        if (!user?.email) {
            setAutorizado(false);
            setIsAdmin(false);
            setRole(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        const emailFormatado = user.email.toLowerCase();
        const docRef = doc(db, "usuarios", emailFormatado);

        const unsub = onSnapshot(docRef, async (docSnap) => {

            if (docSnap.exists()) {
                const dados = docSnap.data();

                // Só entra se for 'admin' ou 'comum'.
                const podeEntrar = dados.role === 'admin' || dados.role === 'comum';

                setAutorizado(podeEntrar);
                setIsAdmin(dados.role === 'admin');
                setRole(dados.role); // Atualiza o role atual
                setLoading(false);
            } else {
                // Se não existe, cria a solicitação AUTOMATICAMENTE
                try {
                    // 1. Cria o usuário
                    await setDoc(docRef, {
                        role: 'aguardando',
                        nome: user.displayName || 'Sem nome',
                        emailOriginal: user.email,
                        whatsapp: '', // Inicializa vazio para evitar undefined
                        criadoEm: new Date()
                    });

                    // 2. NOVO: Envia notificação para os ADMINS
                    await addDoc(collection(db, "notificacoes"), {
                        texto: `Novo cadastro pendente: ${user.displayName || user.email}`,
                        para: 'ADMINS', // Palavra-chave que seu Sininho já reconhece
                        origem: 'sistema',
                        lida: false,
                        data: new Date()
                    });

                } catch (err) {
                    console.error("Erro ao criar solicitação:", err);
                }

                // Mantém bloqueado, mas define o role como aguardando para a UI saber
                setAutorizado(false);
                setIsAdmin(false);
                setRole('aguardando');
                setLoading(false);
            }
        });

        return () => unsub();
    }, [user]);

    // Retornamos o 'role' agora
    return { isAdmin, autorizado, loading, role };
}