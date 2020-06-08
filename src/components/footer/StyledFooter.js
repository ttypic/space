import styled from 'styled-components/macro';
import { draculaBorder } from 'constants/colors';

const StyledFooter = styled.div`
    flex-shrink: 0;
    height: 1.5rem;
    padding: 0 1rem;

    color: #fff;
    font-size: 0.75rem;
    line-height: 1.5rem;
    vertical-align: middle;

    background-color: ${draculaBorder};
`;

export default StyledFooter;
