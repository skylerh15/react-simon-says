import React from 'react';

import SimonBoard from 'app/components/SimonBoard';
import StartButton from 'app/components/StartButton';

import { BoardContainer } from './styles';

const Board = () => (
    <BoardContainer>
        <StartButton />
        <SimonBoard />
    </BoardContainer>
);

export default Board;
