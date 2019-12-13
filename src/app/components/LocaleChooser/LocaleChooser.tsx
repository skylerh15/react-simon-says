import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { useApp } from 'app/context/AppContext';
import { Locales } from 'enums';

import { LocaleChooserRow, LocaleSelect } from './styles';

const LocaleChooser: FC = () => {
    const { currentLocale, setCurrentLocale } = useApp();
    const { formatMessage } = useIntl();

    const locales = Object.keys(Locales).map(k => Locales[k]);

    const options = locales.map(l => {
        return (
            <option key={l} value={l}>
                {formatMessage({ id: `localeChooser.value.${l}` })}
            </option>
        );
    });

    return (
        <LocaleChooserRow>
            {formatMessage({ id: 'localeChooser.label' })}
            <LocaleSelect value={currentLocale} onChange={e => setCurrentLocale(Locales[e.target.value])}>
                {options}
            </LocaleSelect>
        </LocaleChooserRow>
    );
};

export default LocaleChooser;
