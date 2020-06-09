import styled, { keyframes } from 'styled-components/macro';

const focusRing = keyframes`
    from {
        transform: scale(0.01);
    }
`;

const StyledSnackButton = styled.button`
    position: relative;

    flex: 0 1 auto;
    min-width: 5em;
    height: 36px;
    margin: auto 8px auto -8px;
    padding: 8px;
    overflow: hidden;

    border: none;
    border-radius: 8px;

    color: lightgreen;
    font-weight: inherit;
    font-size: 100%;
    letter-spacing: 0.05em;
    text-align: center;
    text-transform: uppercase;

    background: none;
    outline: none;
    cursor: pointer;

    transition: background-color 200ms ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.15);
    }

    &:focus:before {
        position: absolute;
        top: 50%;
        left: 50%;

        width: 120%;
        height: 0;
        margin: -60% 0 0 -60%;
        padding: 0 0 120%;

        border-radius: 50%;

        background: rgba(255, 255, 255, 0.1);
        transform-origin: center;

        animation: ${focusRing} 300ms ease-out forwards 1;

        pointer-events: none;
        will-change: transform;
        content: '';
    }
`;

export default StyledSnackButton;
