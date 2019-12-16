import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';

const SoundToggle: FC = () => {
    const { soundEnabled, toggleSound, canStartRound, allowUserInput } = useApp();
    const { formatMessage } = useIntl();

    const toggleDisabled = !(canStartRound || allowUserInput);

    return (
        <div style={{ paddingTop: '4px' }}>
            <input
                name="soundToggle"
                type="checkbox"
                checked={soundEnabled}
                disabled={toggleDisabled}
                onChange={e => toggleSound(e.target.checked)}
                title={formatMessage({ id: 'soundToggle.title' })}
            />
            {formatMessage({ id: 'soundToggle.label' })}
        </div>
    );
};

export default SoundToggle;
