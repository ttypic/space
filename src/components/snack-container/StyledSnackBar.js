import styled, { keyframes } from 'styled-components/macro';

const snackbarShow = keyframes`
    from {
        transform: scale(0.5);
        opacity: 0;
    }
`;

const snackbarHide = keyframes`
    to {
        transform: translateY(100%);
        opacity: 0;
    }
`;

export const StyledSnackBar = styled.div`
    position: fixed;
    bottom: 24px;
    left: 50%;
    z-index: 100;

    display: flex;
    box-sizing: border-box;
    width: 344px;
    margin-left: -172px;

    border-radius: 2px;

    color: #eee;

    background: #2a2a2a;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    transform-origin: center;
    cursor: default;

    animation: ${props => (props.transition === 'exiting' ? snackbarHide : snackbarShow)} 300ms ease forwards 1;

    will-change: transform;

    @media (max-width: 400px) {
        bottom: 0;
        left: 0;

        width: 100%;
        margin-left: 0;

        border-radius: 0;
    }
`;

export const StyledSnackContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;

    display: block;
    width: 100%;
    height: 0;
    overflow: visible;
`;

export const SnackText = styled.div`
    flex: 1 1 auto;
    padding: 16px;

    font-size: 100%;
`;
