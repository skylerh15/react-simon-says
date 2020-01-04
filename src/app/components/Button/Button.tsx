import React, { FC, useEffect, useState } from 'react';

import { ButtonColor } from 'enums';
import { getButtonColorInfo, createKeyListener } from 'utils';

import { useApp } from 'app/context/AppContext';

import { SimonButton } from './styles';

type Props = {
    buttonColor: ButtonColor;
    index: number;
};

const Button: FC<Props> = ({ buttonColor, index }) => {
    const [isLit, toggleLit] = useState(false);
    const { currentLitColor, allowUserInput, onButtonClick } = useApp();
    const useKeyListener = createKeyListener(`Digit${index}`);
    const onClick = () => {
        onButtonClick(buttonColor);
        isLit && toggleLit(false);
    };
    const onKeyDown = () => allowUserInput && toggleLit(true);
    useEffect(useKeyListener('keyup', onClick));
    useEffect(useKeyListener('keydown', onKeyDown));

    return (
        <SimonButton
            allowUserInput={allowUserInput}
            isLit={currentLitColor === buttonColor || isLit}
            onClick={onClick}
            {...getButtonColorInfo(buttonColor)}
        />
    );
};

export default Button;
