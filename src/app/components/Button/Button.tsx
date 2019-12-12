import React, { FC } from 'react';

import { ButtonColor } from 'enums';

import { useApp } from 'app/context/AppContext';

import { SimonButton } from './styles';

type Props = {
    buttonColor: ButtonColor;
};

const Button: FC<Props> = ({ buttonColor }) => {
    const { currentLitColor, allowUserInput } = useApp();
    return (
        <SimonButton
            buttonColor={buttonColor}
            isLit={currentLitColor === buttonColor}
            allowUserInput={allowUserInput}
        />
    );
};

export default Button;
