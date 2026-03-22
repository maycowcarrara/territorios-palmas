import appInfo from './version.json';

export async function checkForUpdate(manual = false) {
    try {
        const baseUrl = import.meta.env.BASE_URL;
        const response = await fetch(`${baseUrl}version.json?t=${Date.now()}`, {
            cache: 'no-store'
        });

        if (!response.ok) return false;

        const data = await response.json();
        if (data.version === appInfo.version) return false;

        if (manual) {
            if ('serviceWorker' in navigator) {
                const regs = await navigator.serviceWorker.getRegistrations();
                await Promise.all(regs.map((registration) => registration.unregister()));
            }

            window.location.href = `/?v=${data.version}`;
        }

        return true;
    } catch (error) {
        console.error("Erro ao verificar versão:", error);
        return false;
    }
}
