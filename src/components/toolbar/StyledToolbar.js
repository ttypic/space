import styled from 'styled-components/macro';
import Logo from 'components/logo/Logo';
import { draculaToolbar } from 'constants/colors';

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

export default StyledToolbar;
