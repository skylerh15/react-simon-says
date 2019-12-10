import React, { FC } from 'react';

import { ButtonColor } from 'enums';

import { SimonButton } from './styles';

type Props = {
    buttonColor: ButtonColor;
};

const Button: FC<Props> = ({ buttonColor }) => {
    return <SimonButton buttonColor={buttonColor} />;
};

export default Button;
