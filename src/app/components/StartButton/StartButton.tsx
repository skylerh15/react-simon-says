import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';

import { StyledStartButton } from './styles';

const StartButton: FC = () => {
    const { startGame, currentRound, canStartRound, allowUserInput } = useApp();
    const { formatMessage } = useIntl();

    const getButtonText = () => {
        let buttonId = 'inProgress';
        const nextRound = (currentRound || 0) + 1;
        if (allowUserInput) {
            buttonId = 'startGuess';
        } else if (canStartRound) {
            buttonId = currentRound ? 'startRound' : 'startGame';
        }
        const id = `startButton.text.${buttonId}`;
        return formatMessage({ id }, { nextRound, currentRound });
    };

    return (
        <StyledStartButton disabled={!canStartRound} onClick={startGame}>
            {getButtonText()}
        </StyledStartButton>
    );
};

export default StartButton;
