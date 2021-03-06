import React from 'react';

import CurrentHighScore from 'app/components/CurrentHighScore';
import LocaleChooser from 'app/components/LocaleChooser';
import SoundToggle from 'app/components/SoundToggle';
import SimonBoard from 'app/components/SimonBoard';
import SiteTitle from 'app/components/SiteTitle';
import StartButton from 'app/components/StartButton';

import { BoardContainer } from './styles';

const Board = () => (
    <BoardContainer>
        <SiteTitle />
        <CurrentHighScore />
        <SimonBoard />
        <StartButton />
        <LocaleChooser />
        <SoundToggle />
    </BoardContainer>
);

export default Board;
