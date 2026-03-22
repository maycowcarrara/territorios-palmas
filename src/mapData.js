let mapaPromise = null;

export function loadMapaData() {
    if (!mapaPromise) {
        mapaPromise = fetch('./mapa.json').then((response) => {
            if (!response.ok) {
                throw new Error('Falha ao carregar mapa.json');
            }

            return response.json();
        });
    }

    return mapaPromise;
}

export function clearMapaDataCache() {
    mapaPromise = null;
}
