import styled from 'styled-components/macro';
import Logo from 'components/logo/Logo';
import JsonIcon from 'components/lang-icons/JsonIcon';
import { draculaBorder, draculaIcon, draculaIconHover, draculaToolbar } from 'constants/colors';

const StyledToolbar = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 2rem;
    padding: 0 0.5rem;

    background-color: ${draculaToolbar};
`;

export const StyledLogo = styled(Logo)`
    width: 1.5rem;
    height: 1.5rem;
`;

export const StyledJsonIcon = styled(JsonIcon)`
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 4rem;

    & > rect {
        fill: ${props => (props.active ? draculaBorder : 'none')};
    }

    & > path {
        fill: ${draculaIcon};
    }

    &:hover > path {
        fill: ${draculaIconHover};
    }

    &:hover > rect {
        stroke: ${draculaBorder};
        stroke-width: 2;
    }
`;

export default StyledToolbar;
