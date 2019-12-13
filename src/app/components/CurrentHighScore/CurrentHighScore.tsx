import React, { FC } from 'react';

import { useApp } from 'app/context/AppContext';

import { HighScoreHeader } from './styles';

const CurrentHighScore: FC = () => {
    const { currentHighScore } = useApp();
    return <HighScoreHeader>{`Current high score: ${currentHighScore}`}</HighScoreHeader>;
};

export default CurrentHighScore;
