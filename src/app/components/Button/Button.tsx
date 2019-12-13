import React, { FC } from 'react';

import { ButtonColor } from 'enums';
import { getButtonColorInfo } from 'utils';

import { useApp } from 'app/context/AppContext';

import { SimonButton } from './styles';

type Props = {
    buttonColor: ButtonColor;
};

const Button: FC<Props> = ({ buttonColor }) => {
    const { currentLitColor, allowUserInput, onButtonClick } = useApp();

    const onClick = () => onButtonClick(buttonColor);

    return (
        <SimonButton
            allowUserInput={allowUserInput}
            isLit={currentLitColor === buttonColor}
            onClick={onClick}
            {...getButtonColorInfo(buttonColor)}
        />
    );
};

export default Button;
