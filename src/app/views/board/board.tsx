import React, { FC } from 'react';

import SimonBoard from 'app/components/SimonBoard';
import { useApp } from 'app/context/AppContext';

const Board: FC = () => {
    const { startGame, currentRound, canStartRound } = useApp();
    return (
        <div>
            <button disabled={!canStartRound} style={{ marginBottom: '4px', width: '100%' }} onClick={startGame}>
                {canStartRound ? `Start ${currentRound ? `Round ${currentRound + 1}` : 'Game'}` : 'In Progress'}
            </button>
            <SimonBoard />
        </div>
    );
};

export default Board;
