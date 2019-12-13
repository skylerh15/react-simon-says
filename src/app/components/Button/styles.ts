import styled from 'styled-components';

import { ButtonColor } from 'enums';
import { getButtonColorHex, getButtonHoverColorHex } from 'utils';

interface SimonButtonProps {
    buttonColor: ButtonColor;
    isLit: boolean;
    allowUserInput: boolean;
}

export const SimonButton = styled.div<SimonButtonProps>`
    height: 25vh;
    width: 25vh;
    max-width: 49vw;
    transition-duration: 0.4s;
    margin: 2px;
    background-color: ${({ buttonColor }) => getButtonColorHex(buttonColor)};

    :hover {
        ${({ allowUserInput, buttonColor }) =>
            allowUserInput && `background-color: ${getButtonHoverColorHex(buttonColor)};`}
    }

    ${({ allowUserInput }) => allowUserInput && `cursor: pointer;`}
    ${({ isLit, buttonColor }) => isLit && `background-color: ${getButtonHoverColorHex(buttonColor)};`}
`;
