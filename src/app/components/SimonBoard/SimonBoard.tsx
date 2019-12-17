import React, { FC } from 'react';

import { ButtonOrder } from 'app-constants';

import SimonButton from 'app/components/Button';

import { ButtonRow } from './styles';

const SimonBoard: FC = () => {
    let buttonIndex = 0;
    const renderButtons = ButtonOrder.map((row, ix) => (
        <ButtonRow key={ix}>
            {row.map(color => (
                <SimonButton key={++buttonIndex} buttonColor={color} index={buttonIndex} />
            ))}
        </ButtonRow>
    ));

    return <>{renderButtons}</>;
};

export default SimonBoard;
