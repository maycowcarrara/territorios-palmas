import { normalizeTerritorioNome } from './territorioNome';

let mapaPromise = null;
const MAPA_URL = import.meta.env.VITE_MAPA_URL || './mapa.json';

function normalizeGeoData(geoData) {
    if (!geoData || !Array.isArray(geoData.features)) {
        return geoData;
    }

    return {
        ...geoData,
        features: geoData.features.map((feature) => ({
            ...feature,
            properties: {
                ...feature.properties,
                nome: normalizeTerritorioNome(
                    feature?.properties?.nome,
                    feature?.properties?.id ? `Território ${feature.properties.id}` : ''
                )
            }
        }))
    };
}

export function loadMapaData() {
    if (!mapaPromise) {
        mapaPromise = fetch(MAPA_URL, { cache: 'no-store' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Falha ao carregar mapa: ${response.status}`);
                }
                return response.json();
            })
            .then(normalizeGeoData)
            .catch((error) => {
                mapaPromise = null;
                throw error;
            });
    }

    return mapaPromise;
}

export function clearMapaDataCache() {
    mapaPromise = null;
}
