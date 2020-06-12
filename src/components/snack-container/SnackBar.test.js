import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SnackBar from 'components/snack-container/SnackBar';

jest.useFakeTimers();

test('it renders dismiss by default', () => {
    render(<SnackBar id="1" message="message" />);
    expect(screen.getByRole('button')).toHaveTextContent('dismiss');
});

test('it calls resolve on snackbar after 5 sec', () => {
    const resolve = jest.fn();
    const result = jest.fn();
    render(<SnackBar id="1" message="message" options={{ timeout: 5000 }} onResolve={resolve} onResult={result} />);
    expect(resolve).not.toBeCalled();
    expect(result).not.toBeCalled();
    jest.runAllTimers();
    expect(resolve).toHaveBeenNthCalledWith(1, '1');
    expect(result).toHaveBeenNthCalledWith(1, '');
});

test('it does not call `onResolve` snackbar if timout was not set', () => {
    const resolve = jest.fn();
    const result = jest.fn();
    render(<SnackBar id="1" message="message" onResolve={resolve} onResult={result} />);
    jest.runAllTimers();
    expect(resolve).not.toBeCalled();
    expect(result).not.toBeCalled();
});

test('it calls `onResolve` on click', async () => {
    const resolve = jest.fn();
    const result = jest.fn();
    const options = { actions: ['close'] };
    render(<SnackBar id="1" message="message" options={options} onResolve={resolve} onResult={result} />);

    fireEvent.click(screen.getByRole('button'));

    expect(resolve).toHaveBeenNthCalledWith(1, '1');
    expect(result).toHaveBeenNthCalledWith(1, 'close');
});

test('it call `onResolve` once even if timeout was setup', async () => {
    const resolve = jest.fn();
    const result = jest.fn();

    const options = { timeout: 5000 };

    render(<SnackBar id="1" message="message" options={options} onResolve={resolve} onResult={result} />);

    fireEvent.click(screen.getByRole('button'));

    expect(resolve).toHaveBeenNthCalledWith(1, '1');
    expect(result).toHaveBeenNthCalledWith(1, 'dismiss');

    jest.runAllTimers();

    expect(resolve).toHaveBeenNthCalledWith(1, '1');
    expect(result).toHaveBeenNthCalledWith(1, 'dismiss');
});
