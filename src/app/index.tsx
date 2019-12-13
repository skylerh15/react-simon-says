import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import AppContextProvider from 'app/context/AppContext';

import Board from 'app/views/board';

import { color } from 'styles/theme';
import { OutsideWrapper, MiddleWrapper, InnerContent } from './styles';

const App = () => (
    <ThemeProvider theme={{ color }}>
        <AppContextProvider>
            <OutsideWrapper>
                <MiddleWrapper>
                    <InnerContent>
                        <Board />
                    </InnerContent>
                </MiddleWrapper>
            </OutsideWrapper>
        </AppContextProvider>
    </ThemeProvider>
);

export default App;
