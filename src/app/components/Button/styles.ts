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

    margin-right: 4px;
    margin-bottom: 4px;

    :hover {
        ${({ allowUserInput, buttonColor }) =>
            allowUserInput && `background-color: ${getButtonHoverColorHex(buttonColor)};`}
    }

    ${({ isLit, buttonColor }) => isLit && `background-color: ${getButtonHoverColorHex(buttonColor)};`}
`;
