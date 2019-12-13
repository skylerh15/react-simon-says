import React from 'react';

import SimonBoard from 'app/components/SimonBoard';
import StartButton from 'app/components/StartButton';
import CurrentHighScore from 'app/components/CurrentHighScore';

import { BoardContainer } from './styles';

const Board = () => (
    <BoardContainer>
        <CurrentHighScore />
        <SimonBoard />
        <StartButton />
    </BoardContainer>
);

export default Board;
