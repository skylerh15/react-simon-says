import React from 'react';

import SimonBoard from 'app/components/SimonBoard';
import StartButton from 'app/components/StartButton';
import CurrentHighScore from 'app/components/CurrentHighScore';
import LocaleChooser from 'app/components/LocaleChooser';
import SiteTitle from 'app/components/SiteTitle';

import { BoardContainer } from './styles';

const Board = () => (
    <BoardContainer>
        <SiteTitle />
        <CurrentHighScore />
        <SimonBoard />
        <StartButton />
        <LocaleChooser />
    </BoardContainer>
);

export default Board;
