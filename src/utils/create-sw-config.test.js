import { createSwConfig } from 'utils/create-sw-config';
import { showSnack } from 'emitters/snack-emitter';

jest.mock('emitters/snack-emitter', () => ({ showSnack: jest.fn() }));

beforeEach(() => {
    showSnack.mockClear();
});

test('it shows snackbar for 5 sec onSuccess ', () => {
    const { onSuccess } = createSwConfig();
    onSuccess();
    expect(showSnack).toHaveBeenNthCalledWith(1, 'Ready to work offline', { timeout: 5000 });
});

test('it shows snackbar and do nothing on dismiss', () => {
    const { onUpdate } = createSwConfig();
    showSnack.mockResolvedValue('dismiss');
    return onUpdate().then(() => {
        expect(showSnack).toHaveBeenNthCalledWith(1, 'Update available', { actions: ['reload', 'dismiss'] });
    });
});

test('it shows snackbar and skip waiting on reload', () => {
    const { onUpdate } = createSwConfig();
    const registration = { waiting: { postMessage: jest.fn() } };
    showSnack.mockResolvedValue('reload');
    return onUpdate(registration).then(() => {
        expect(showSnack).toHaveBeenNthCalledWith(1, 'Update available', { actions: ['reload', 'dismiss'] });
        expect(registration.waiting.postMessage).toHaveBeenNthCalledWith(1, { type: 'SKIP_WAITING' });
    });
});

test('it shows snackbar and do nothing if there is no waiting service worker', () => {
    const { onUpdate } = createSwConfig();
    const registration = {};
    showSnack.mockResolvedValue('reload');
    return onUpdate(registration).then(() => {
        expect(showSnack).toHaveBeenNthCalledWith(1, 'Update available', { actions: ['reload', 'dismiss'] });
    });
});
