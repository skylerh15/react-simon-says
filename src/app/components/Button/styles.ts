import styled from 'styled-components';

import { ButtonColor, getButtonColorHex, getButtonHoverColorHex } from 'enums';

export const SimonButton = styled.div<{ buttonColor: ButtonColor }>`
    height: 100px;
    width: 100px;
    transition-duration: 0.4s;
    background-color: ${({ buttonColor }) => getButtonColorHex(buttonColor)};

    :hover {
        background-color: ${({ buttonColor }) => getButtonHoverColorHex(buttonColor)};
    }
`;
