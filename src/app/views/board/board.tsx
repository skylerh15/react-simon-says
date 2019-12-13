import React, { FC } from 'react';

import SimonBoard from 'app/components/SimonBoard';
import StartButton from 'app/components/StartButton';

import { BoardContainer } from './styles';

const Board: FC = () => (
    <BoardContainer>
        <StartButton />
        <SimonBoard />
    </BoardContainer>
);

export default Board;
