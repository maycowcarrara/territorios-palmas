import { collection, doc } from 'firebase/firestore';
import { NORMAL_CONTEXT_ID, isNormalContext } from './sistema';

export const TERRITORIOS_COLLECTION = 'territorios';
export const TERRITORIOS_CONTEXT_COLLECTION = 'territorios_contexto';

export function getTerritorioBaseId(idTerritorio) {
    return `t_${idTerritorio}`;
}

export function getContextDocId(contextoId, idTerritorio) {
    return `${contextoId}__${getTerritorioBaseId(idTerritorio)}`;
}

export function getTerritorioNumeroFromDocId(docId) {
    const match = String(docId || '').match(/t_(\d+)/);
    return match ? Number(match[1]) : 0;
}

export function getTerritorioBaseRef(db, idTerritorio) {
    return doc(db, TERRITORIOS_COLLECTION, getTerritorioBaseId(idTerritorio));
}

export function getTerritorioStateRef(db, idTerritorio, contextoId = NORMAL_CONTEXT_ID) {
    if (isNormalContext(contextoId)) {
        return getTerritorioBaseRef(db, idTerritorio);
    }

    return doc(db, TERRITORIOS_CONTEXT_COLLECTION, getContextDocId(contextoId, idTerritorio));
}

export function getTerritorioContextCollectionRef(db) {
    return collection(db, TERRITORIOS_CONTEXT_COLLECTION);
}

export function buildBaseTerritorioDefaults(nome) {
    return {
        status: 'aberto',
        nome,
        quadras_feitas: [],
        notas_quadras: {}
    };
}

export function buildContextTerritorioDefaults({ idTerritorio, nome, contextoSistema }) {
    return {
        status: 'aberto',
        nome,
        territorioBaseId: getTerritorioBaseId(idTerritorio),
        territorioNumero: idTerritorio,
        contextoId: contextoSistema.contextoAtivoId,
        contextoTipo: contextoSistema.contextoAtivoTipo,
        contextoTitulo: contextoSistema.contextoAtivoTitulo,
        quadras_feitas: [],
        historico: []
    };
}

export function mergeTerritorioData({ contextoId, nomeFallback, baseData, stateData }) {
    const base = baseData || {};
    const state = stateData || {};
    const notasPermanentes = base.notas_quadras || {};

    if (isNormalContext(contextoId)) {
        return {
            status: 'aberto',
            quadras_feitas: [],
            historico: [],
            ...base,
            nome: base.nome || nomeFallback,
            notas_quadras: notasPermanentes
        };
    }

    return {
        status: 'aberto',
        nome: state.nome || base.nome || nomeFallback,
        quadras_feitas: [],
        designadoPara: null,
        designadoNome: null,
        dataDesignacao: null,
        cicloAtual: null,
        historico: [],
        ultimaConclusao: null,
        ultimaAlteracao: null,
        notas_quadras: notasPermanentes,
        ...state
    };
}
