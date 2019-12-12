import React, { FC } from 'react';

import SimonBoard from 'app/components/SimonBoard';
import { useApp } from 'app/context/AppContext';

const Board: FC = () => {
    const { startGame } = useApp();
    return (
        <div>
            <button onClick={startGame} style={{ marginBottom: '4px' }}>
                Start Game
            </button>
            <SimonBoard />
        </div>
    );
};

export default Board;
