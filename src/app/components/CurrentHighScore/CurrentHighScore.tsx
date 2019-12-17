import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';

import { HighScoreContainer, ClearHighScoreButton, HighScoreHeader, HighScoreSubHeader } from './styles';

const CurrentHighScore: FC = () => {
    const { highScoreInfo, clearHighScore, preventChangeSettings } = useApp();
    const { formatMessage } = useIntl();

    return (
        <HighScoreContainer>
            {highScoreInfo ? (
                <>
                    <HighScoreHeader>
                        {formatMessage({ id: 'clearHighScore.header' }, { score: highScoreInfo.score })}
                        <ClearHighScoreButton
                            disabled={preventChangeSettings}
                            onClick={clearHighScore}
                            title={formatMessage({ id: 'clearHighScore.button.title' })}
                        >
                            {formatMessage({ id: 'clearHighScore.button.text' })}
                        </ClearHighScoreButton>
                    </HighScoreHeader>
                    <HighScoreSubHeader>{highScoreInfo.date.toLocaleString()}</HighScoreSubHeader>
                </>
            ) : (
                formatMessage({ id: 'clearHighScore.header.empty' })
            )}
        </HighScoreContainer>
    );
};

export default CurrentHighScore;
