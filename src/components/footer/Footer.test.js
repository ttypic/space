import React from 'react';
import { render } from '@testing-library/react';
import Footer from 'components/footer/Footer';

test('it renders empty string if `empty=true`', () => {
    const { container } = render(<Footer empty />);

    expect(container).toHaveTextContent('');
});

test('it renders empty string if `empty=true`', () => {
    const { container } = render(<Footer carets={2} />);

    expect(container).toHaveTextContent('2 carets');
});

test('it renders caret position', () => {
    const { container } = render(<Footer row={0} column={0} />);

    expect(container).toHaveTextContent('Line 1, Column 1');
});

test('it renders number of selected characters if one line selection', () => {
    const { container } = render(
        <Footer selectionRange={{ start: { row: 0, column: 1 }, end: { row: 0, column: 5 } }} />
    );

    expect(container).toHaveTextContent('4 chars');
});

test('it renders number line breaks if more than one line selected', () => {
    const { container } = render(
        <Footer selectionRange={{ start: { row: 0, column: 1 }, end: { row: 2, column: 5 } }} />
    );

    expect(container).toHaveTextContent('2 line breaks');
});
