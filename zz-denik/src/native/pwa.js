import { isNativePlatform } from './platform';

/* ── PWA (iPhone cez Safari → Pridať na plochu) ────────────────────
   Service worker predcachuje aplikáciu pre offline režim a o
   persistentné úložisko žiadame preto, aby Safari nezmazal postavy
   uložené v localStorage. V natívnej aplikácii nič z toho netreba. */

export function initPwa() {
    if (isNativePlatform || import.meta.env.DEV) return;

    if ('serviceWorker' in navigator) {
        import('virtual:pwa-register')
            .then(({ registerSW }) => registerSW({ immediate: true }))
            .catch(() => { /* offline režim je len bonus */ });
    }

    navigator.storage?.persist?.().catch(() => {});
}
