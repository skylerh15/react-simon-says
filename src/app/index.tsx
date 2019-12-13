import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import AppContextProvider from 'app/context/AppContext';
import AppMessages from 'lib/i18n';
import { LOCALE } from 'app-constants';

import Board from 'app/views/board';

import { color } from 'styles/theme';
import { OutsideWrapper, MiddleWrapper, InnerContent } from './styles';

const App = () => (
    <ThemeProvider theme={{ color }}>
        <AppContextProvider>
            <IntlProvider locale={LOCALE} messages={AppMessages[LOCALE]}>
                <OutsideWrapper>
                    <MiddleWrapper>
                        <InnerContent>
                            <Board />
                        </InnerContent>
                    </MiddleWrapper>
                </OutsideWrapper>
            </IntlProvider>
        </AppContextProvider>
    </ThemeProvider>
);

export default App;
