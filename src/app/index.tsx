import * as React from 'react';

import AppContextProvider from 'app/context/AppContext';

import Board from 'app/views/board';

import { OutsideWrapper, MiddleWrapper, InnerContent } from './styles';

const App = () => (
    <AppContextProvider>
        <OutsideWrapper>
            <MiddleWrapper>
                <InnerContent>
                    <Board />
                </InnerContent>
            </MiddleWrapper>
        </OutsideWrapper>
    </AppContextProvider>
);

export default App;
