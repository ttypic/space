import createEventEmitter from 'utils/create-event-emitter';

export const snackEmitter = createEventEmitter();

export const showSnack = (message, options) => {
    return new Promise(resolve => snackEmitter.emit({ message, options, onResult: resolve }));
};
