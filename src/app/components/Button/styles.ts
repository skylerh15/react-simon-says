import styled from 'styled-components';

import { ButtonColor, getButtonColorHex, getButtonHoverColorHex } from 'enums';

interface SimonButtonProps {
    buttonColor: ButtonColor;
    isLit: boolean;
    allowUserInput: boolean;
}

export const SimonButton = styled.div<SimonButtonProps>`
    height: 100px;
    width: 100px;
    transition-duration: 0.4s;
    background-color: ${({ buttonColor }) => getButtonColorHex(buttonColor)};

    margin: 2px;

    :hover {
        ${({ allowUserInput, buttonColor }) =>
            allowUserInput && `background-color: ${getButtonHoverColorHex(buttonColor)};`}
    }

    ${({ allowUserInput }) => allowUserInput && `cursor: pointer;`}

    ${({ isLit, buttonColor }) => isLit && `background-color: ${getButtonHoverColorHex(buttonColor)};`}
`;
