import styled from 'styled-components';

import { ButtonColorInfo } from 'utils';

interface SimonButtonProps extends ButtonColorInfo {
    isLit: boolean;
    allowUserInput: boolean;
}

export const SimonButton = styled.div<SimonButtonProps>`
    height: 25vh;
    width: 25vh;
    border-radius: 25px;
    max-width: 49vw;
    transition-duration: 0.4s;
    -webkit-tap-highlight-color: transparent;
    margin: 2px;
    background-color: ${({ unlit }) => unlit};

    :hover {
        ${({ allowUserInput, lit }) => allowUserInput && `background-color: ${lit};`}
    }

    ${({ allowUserInput }) => allowUserInput && `cursor: pointer;`}
    ${({ isLit, lit }) => isLit && `background-color: ${lit};`}
`;
