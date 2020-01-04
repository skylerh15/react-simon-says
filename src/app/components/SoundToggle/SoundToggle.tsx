import React, { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';
import { createKeyListener } from 'utils';
import { KeyCode } from 'enums';

const SoundToggle: FC = () => {
    const { soundEnabled, toggleSound, preventChangeSettings } = useApp();
    const { formatMessage } = useIntl();

    const onToggleSound = () => !preventChangeSettings && toggleSound(!soundEnabled);

    useEffect(createKeyListener(KeyCode.M)('keyup', onToggleSound));

    return (
        <div style={{ paddingTop: '4px' }}>
            <input
                name="soundToggle"
                type="checkbox"
                checked={soundEnabled}
                disabled={preventChangeSettings}
                onChange={onToggleSound}
                title={formatMessage({ id: 'soundToggle.title' })}
            />
            {formatMessage({ id: 'soundToggle.label' })}
        </div>
    );
};

export default SoundToggle;
