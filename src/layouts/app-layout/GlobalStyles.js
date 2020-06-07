import { createGlobalStyle } from 'styled-components/macro';
import { normalize } from 'polished';

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: sans-serif;
        
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    ${normalize()}
 `;

export default GlobalStyles;
