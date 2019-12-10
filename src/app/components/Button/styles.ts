import styled from 'styled-components';

import { ButtonColor, getButtonColorHex } from 'enums';

export const SimonButton = styled.div<{ buttonColor: ButtonColor }>`
    height: 70px;
    width: 70px;
    background-color: ${props => getButtonColorHex(props.buttonColor)};
`;
