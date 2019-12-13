import React, { FC } from 'react';

import SimonBoard from 'app/components/SimonBoard';
import StartButton from 'app/components/StartButton';

const Board: FC = () => (
    <div>
        <StartButton />
        <SimonBoard />
    </div>
);

export default Board;
