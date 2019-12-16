import React, { FC } from 'react';

import { ButtonOrder } from 'app-constants';
import { ButtonColor } from 'enums';

import SimonButton from 'app/components/Button';

import { ButtonRow } from './styles';

const SimonBoard: FC = () => {
    let buttonIndex = 0;
    const renderButton = (value: ButtonColor) => <SimonButton key={value} buttonColor={value} index={++buttonIndex} />;

    const renderRow = (row: ButtonColor[], index: number) => <ButtonRow key={index}>{row.map(renderButton)}</ButtonRow>;

    return <>{ButtonOrder.map(renderRow)}</>;
};

export default SimonBoard;
