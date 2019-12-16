import React, { FC, useEffect } from 'react';

import { ButtonColor } from 'enums';
import { getButtonColorInfo, createKeyUpEffect } from 'utils';

import { useApp } from 'app/context/AppContext';

import { SimonButton } from './styles';

type Props = {
    buttonColor: ButtonColor;
    index: number;
};

const Button: FC<Props> = ({ buttonColor, index }) => {
    const { currentLitColor, allowUserInput, onButtonClick } = useApp();
    const onClick = () => onButtonClick(buttonColor);

    const keyUpEffect = createKeyUpEffect(String(index), onClick);
    useEffect(keyUpEffect);

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
