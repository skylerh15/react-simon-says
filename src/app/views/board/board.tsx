import React, { FC } from 'react';

import SimonBoard from 'app/components/SimonBoard';
import { useApp } from 'app/context/AppContext';

const Board: FC = () => {
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
        <div>
            <button disabled={!canStartRound} style={{ marginBottom: '4px', width: '100%' }} onClick={startGame}>
                {getButtonText()}
            </button>
            <SimonBoard />
        </div>
    );
};

export default Board;
