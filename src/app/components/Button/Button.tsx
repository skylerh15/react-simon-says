import React, { FC, useEffect } from 'react';

import { ButtonColor } from 'enums';
import { getButtonColorInfo } from 'utils';

import { useApp } from 'app/context/AppContext';

import { SimonButton } from './styles';

type Props = {
    buttonColor: ButtonColor;
    index: number;
};

const Button: FC<Props> = ({ buttonColor, index }) => {
    const { currentLitColor, allowUserInput, onButtonClick } = useApp();
    const onClick = () => onButtonClick(buttonColor);

    useEffect(() => {
        const _onKeyUp = ({ key }: KeyboardEvent) => key === String(index) && onButtonClick(buttonColor);
        window.addEventListener('keyup', _onKeyUp);

        return () => window.removeEventListener('keyup', _onKeyUp);
    });

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
