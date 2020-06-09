import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app/App';
import { createSwConfig } from 'utils/create-sw-config';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register(createSwConfig());
