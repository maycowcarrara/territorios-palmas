import { loadMapDataWithOfflineCache } from './mapOfflineCache';

let mapaPromise = null;
const MAPA_URL = import.meta.env.VITE_MAPA_URL || './mapa.json';

export function loadMapaData() {
    if (!mapaPromise) {
        mapaPromise = loadMapDataWithOfflineCache(MAPA_URL);
    }

    return mapaPromise;
}

export function clearMapaDataCache() {
    mapaPromise = null;
}
