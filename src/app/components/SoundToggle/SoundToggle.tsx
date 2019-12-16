import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';

const SoundToggle: FC = () => {
    const { soundEnabled, toggleSound, preventChangeSettings } = useApp();
    const { formatMessage } = useIntl();

    return (
        <div style={{ paddingTop: '4px' }}>
            <input
                name="soundToggle"
                type="checkbox"
                checked={soundEnabled}
                disabled={preventChangeSettings}
                onChange={e => toggleSound(e.target.checked)}
                title={formatMessage({ id: 'soundToggle.title' })}
            />
            {formatMessage({ id: 'soundToggle.label' })}
        </div>
    );
};

export default SoundToggle;
