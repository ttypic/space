import { snackEmitter, showSnack } from 'emitters/snack-emitter';

test('it promisify emitter', () => {
    const expectedOptions = {};
    snackEmitter.subscribe(({ message, options, onResult }) => {
        onResult('action');
        expect(message).toBe('message');
        expect(options).toBe(expectedOptions);
    });
    return showSnack('message', expectedOptions).then(action => {
        expect(action).toBe('action');
    });
});
