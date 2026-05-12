export const LIVE_UPDATE_MANIFEST_URL =
    import.meta.env.VITE_LIVE_UPDATE_MANIFEST_URL ||
    'https://territorios-15891-palmas-pr.web.app/live-update/manifest.json';

export const LIVE_UPDATE_ENABLED = LIVE_UPDATE_MANIFEST_URL.trim().length > 0;
