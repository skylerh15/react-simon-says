import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';

import {
    HighScoreContainer,
    ClearHighScoreButton,
    HighScoreHeader,
    HighScoreSubHeader,
    HighScoreEmptyHeader
} from './styles';

const CurrentHighScore: FC = () => {
    const { highScoreInfo, clearHighScore } = useApp();
    const { formatMessage } = useIntl();
    return highScoreInfo ? (
        <HighScoreContainer>
            <HighScoreHeader>
                {formatMessage({ id: 'clearHighScore.header' }, { score: highScoreInfo.score })}
                <ClearHighScoreButton
                    onClick={clearHighScore}
                    title={formatMessage({ id: 'clearHighScore.button.title' })}
                >
                    {formatMessage({ id: 'clearHighScore.button.text' })}
                </ClearHighScoreButton>
            </HighScoreHeader>
            <HighScoreSubHeader>{highScoreInfo.date.toLocaleString()}</HighScoreSubHeader>
        </HighScoreContainer>
    ) : (
        <HighScoreEmptyHeader>{formatMessage({ id: 'clearHighScore.header.empty' })}</HighScoreEmptyHeader>
    );
};

export default CurrentHighScore;
