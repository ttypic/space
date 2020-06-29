import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import SnackContainer from 'components/snack-container/SnackContainer';
import { snackEmitter } from 'emitters/snack-emitter';

jest.mock('nanoid', () => ({ nanoid: jest.fn(() => '1') }));

jest.mock('react-transition-group', () => {
    const FakeTransition = jest.fn(({ children }) => children('entered'));
    return { Transition: FakeTransition, TransitionGroup: jest.fn(({ children }) => children) };
});

test('it renders message after emmit', () => {
    render(<SnackContainer />);

    act(() => snackEmitter.emit('message'));

    const textElement = screen.getByText(/dismiss/i);
    expect(textElement).toBeInTheDocument();
});

test('it clears after `onResolve` SnackBar', () => {
    render(<SnackContainer />);

    act(() => snackEmitter.emit('message', { timeout: 1000 }));

    const button = screen.getByText(/dismiss/i);

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByText(/dismiss/i)).toBeNull();
});
