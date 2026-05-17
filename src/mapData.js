let mapaPromise = null;
const MAPA_URL = import.meta.env.VITE_MAPA_URL || './mapa.json';

export function loadMapaData() {
    if (!mapaPromise) {
        mapaPromise = fetch(MAPA_URL).then((response) => {
            if (!response.ok) {
                throw new Error(`Falha ao carregar mapa: ${MAPA_URL}`);
            }

            return response.json();
        });
    }

    return mapaPromise;
}

export function clearMapaDataCache() {
    mapaPromise = null;
}
