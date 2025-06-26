// utils/storage.ts
export const safeLocalStorage = {
    getItem: (key: string): string | null => {
        if (typeof window === 'undefined') {
            console.warn('localStorage is not available in SSR');
            return null;
        }
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.error('localStorage access error:', e);
            return null;
        }
    },

    setItem: (key: string, value: string): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.error('localStorage set error:', e);
        }
    },

    removeItem: (key: string): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('localStorage remove error:', e);
        }
    },

    clear: (): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.clear();
        } catch (e) {
            console.error('localStorage clear error:', e);
        }
    }
};