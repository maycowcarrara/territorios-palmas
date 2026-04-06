import { addDoc, arrayUnion, collection, getDocs, query, where } from 'firebase/firestore';
import { TERRITORIO_STATUS } from './territorioContext';
import { enviarEventoNotificacaoPeloRelay, relayDisponivel } from './notificationRelay';

export async function finalizarTerritorioDesignado({ salvarEstadoTerritorio, dadosBanco, nome, db, contextoSistema }) {
    if (!dadosBanco?.designadoPara) {
        return { ok: false, motivo: 'sem_designacao' };
    }

    const responsavelNome = dadosBanco.designadoNome || 'Dirigente';
    const agora = new Date();
    const contextoSufixo = contextoSistema?.campanhaAtiva ? ` na campanha "${contextoSistema.contextoAtivoTitulo}"` : '';
    const ciclo = dadosBanco.cicloAtual || {
        dataInicio: dadosBanco.dataDesignacao || agora,
        responsaveis: [responsavelNome]
    };
    const historico = {
        ...ciclo,
        dataTermino: agora,
        responsaveis: [...new Set([...(ciclo.responsaveis || []), responsavelNome])]
    };

    await salvarEstadoTerritorio({
        designadoPara: null,
        designadoNome: null,
        dataDesignacao: null,
        cicloAtual: null,
        historico: arrayUnion(historico),
        ultimaConclusao: agora,
        quadras_feitas: [],
        status: TERRITORIO_STATUS.FINALIZADO,
        ultimaAlteracao: agora
    });

    const adminsQuery = query(collection(db, 'usuarios'), where('role', '==', 'admin'));
    const adminsSnapshot = await getDocs(adminsQuery);
    if (!adminsSnapshot.empty) {
        const texto = `🏁 O Território ${nome} foi finalizado por ${responsavelNome}${contextoSufixo}.`;

        if (relayDisponivel()) {
            await enviarEventoNotificacaoPeloRelay({
                para: 'ADMINS',
                texto,
                tipo: 'conclusao',
                origem: 'sistema',
                tituloPush: 'Território finalizado'
            });
        } else {
            await addDoc(collection(db, 'notificacoes'), {
                para: 'ADMINS',
                texto,
                data: agora,
                lida: false,
                tipo: 'conclusao',
                origem: 'sistema'
            });
        }
    }

    return {
        ok: true,
        responsavelNome,
        contextoSufixo
    };
}
