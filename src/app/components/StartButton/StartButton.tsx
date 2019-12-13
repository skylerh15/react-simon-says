import React, { FC } from 'react';

import { useApp } from 'app/context/AppContext';

import { StyledStartButton } from './styles';

const StartButton: FC = () => {
    const { startGame, currentRound, canStartRound, allowUserInput } = useApp();

    const getButtonText = () => {
        if (allowUserInput) {
            return 'Start Guessing!';
        }
        if (canStartRound) {
            return `Start ${currentRound ? `Round ${currentRound + 1}` : 'Game'}`;
        }
        return 'In Progress';
    };

    return (
        <StyledStartButton disabled={!canStartRound} onClick={startGame}>
            {getButtonText()}
        </StyledStartButton>
    );
};

export default StartButton;
