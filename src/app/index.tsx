import React from 'react';
import { ThemeProvider } from 'styled-components';

import AppContextProvider from 'app/context/AppContext';
import IntlContext from 'app/context/IntlContext';

import Board from 'app/views/board';

import { color } from 'styles/theme';
import { OutsideWrapper, MiddleWrapper, InnerContent } from './styles';

const App = () => (
    <ThemeProvider theme={{ color }}>
        <AppContextProvider>
            <IntlContext>
                <OutsideWrapper>
                    <MiddleWrapper>
                        <InnerContent>
                            <Board />
                        </InnerContent>
                    </MiddleWrapper>
                </OutsideWrapper>
            </IntlContext>
        </AppContextProvider>
    </ThemeProvider>
);

export default App;
