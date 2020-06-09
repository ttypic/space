const createEventEmitter = () => {
    let listeners = [];

    const subscribe = listener => {
        if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function.');
        }

        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    const emit = (...params) => listeners.forEach(listener => listener(...params));

    return {
        emit,
        subscribe
    };
};

export default createEventEmitter;
