import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';
import { Locales } from 'enums';

import { LocaleChooserRow, LocaleSelect } from './styles';

const LocaleChooser: FC = () => {
    const { currentLocale, setCurrentLocale, allowUserInput, canStartRound } = useApp();
    const { formatMessage } = useIntl();

    const options = Object.keys(Locales)
        .map(k => Locales[k])
        .map(locale => (
            <option key={locale} value={locale}>
                {formatMessage({ id: `localeChooser.value.${locale}` })}
            </option>
        ));

    const chooserDisabled = !canStartRound && !allowUserInput;

    return (
        <LocaleChooserRow>
            <label>
                {formatMessage({ id: 'localeChooser.label' })}
                <LocaleSelect
                    disabled={chooserDisabled}
                    value={currentLocale}
                    onChange={e => setCurrentLocale(Locales[e.target.value])}
                >
                    {options}
                </LocaleSelect>
            </label>
        </LocaleChooserRow>
    );
};

export default LocaleChooser;
