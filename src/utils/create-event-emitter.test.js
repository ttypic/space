import createEventEmitter from './create-event-emitter';

test('it emits single arg to listener', () => {
    const eventEmitter = createEventEmitter();
    const listener = jest.fn();

    eventEmitter.subscribe(listener);
    eventEmitter.emit('event');

    expect(listener).toHaveBeenNthCalledWith(1, 'event');
});

test('it emits two args to listener', () => {
    const eventEmitter = createEventEmitter();
    const listener = jest.fn();

    eventEmitter.subscribe(listener);
    eventEmitter.emit('event', 'type');

    expect(listener).toHaveBeenNthCalledWith(1, 'event', 'type');
});

test('it emits event to each listener', () => {
    const eventEmitter = createEventEmitter();
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    eventEmitter.subscribe(listener1);
    eventEmitter.subscribe(listener2);

    eventEmitter.emit('event');

    expect(listener1).toHaveBeenNthCalledWith(1, 'event');
    expect(listener2).toHaveBeenNthCalledWith(1, 'event');
});

test('it does not emit event to unsubscribed listener', () => {
    const eventEmitter = createEventEmitter();
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    eventEmitter.subscribe(listener1);
    const unsubscribe = eventEmitter.subscribe(listener2);

    eventEmitter.emit('event');
    unsubscribe();
    eventEmitter.emit('event');

    expect(listener1).toHaveBeenNthCalledWith(2, 'event');
    expect(listener2).toHaveBeenNthCalledWith(1, 'event');
});

test('it throws error if subscribe argument is not function', () => {
    const eventEmitter = createEventEmitter();
    expect(() => eventEmitter.subscribe({})).toThrow(Error);
});
