import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';

import { HighScoreHeader, ClearHighScoreButton } from './styles';

const CurrentHighScore: FC = () => {
    const { currentHighScore, clearHighScore } = useApp();
    const { formatMessage } = useIntl();
    return (
        <HighScoreHeader>
            {currentHighScore ? (
                <>
                    {formatMessage({ id: 'clearHighScore.header' }, { currentHighScore })}
                    <ClearHighScoreButton
                        onClick={clearHighScore}
                        title={formatMessage({ id: 'clearHighScore.button.title' })}
                    >
                        {formatMessage({ id: 'clearHighScore.button.text' })}
                    </ClearHighScoreButton>
                </>
            ) : (
                formatMessage({ id: 'clearHighScore.header.empty' })
            )}
        </HighScoreHeader>
    );
};

export default CurrentHighScore;
