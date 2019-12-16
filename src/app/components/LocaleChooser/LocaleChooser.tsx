import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';
import { Locales } from 'enums';

import { LocaleChooserRow, LocaleSelect } from './styles';

const LocaleChooser: FC = () => {
    const { currentLocale, handleUpdateLocale, preventChangeSettings } = useApp();
    const { formatMessage } = useIntl();

    const options = Object.keys(Locales)
        .map(e => Locales[e])
        .map(locale => (
            <option key={locale} value={locale}>
                {formatMessage({ id: `localeChooser.value.${locale}` })}
            </option>
        ));

    return (
        <LocaleChooserRow>
            {formatMessage({ id: 'localeChooser.label' })}
            <LocaleSelect
                disabled={preventChangeSettings}
                value={currentLocale}
                onChange={e => handleUpdateLocale(Locales[e.target.value])}
            >
                {options}
            </LocaleSelect>
        </LocaleChooserRow>
    );
};

export default LocaleChooser;
