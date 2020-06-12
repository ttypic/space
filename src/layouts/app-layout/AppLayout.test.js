import React from 'react';
import { render } from '@testing-library/react';
import AppLayout from 'layouts/app-layout/AppLayout';

test('it render content', () => {
    const { container } = render(<AppLayout>some text</AppLayout>);
    expect(container).toHaveTextContent('some text');
});
