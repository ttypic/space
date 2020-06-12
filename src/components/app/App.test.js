import React from 'react';
import { render } from '@testing-library/react';
import App from 'components/app/App';

test('it renders without errors', () => {
    render(<App />);
});
