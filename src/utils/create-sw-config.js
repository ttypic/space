import { showSnack } from 'utils/snack-emmiter';

const handleSwInstall = () => {
    showSnack('Ready to work offline', { timeout: 5000 });
};

const skipWaiting = registration => {
    if (!registration || !registration.waiting) return;
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
};

const handleSwUpdate = registration => {
    showSnack('Update available', {
        actions: ['reload', 'dismiss']
    }).then(result => {
        if (result === 'reload') skipWaiting(registration);
    });
};

export const createSwConfig = () => ({
    onSuccess: handleSwInstall,
    onUpdate: handleSwUpdate
});
