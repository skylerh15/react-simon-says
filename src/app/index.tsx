import * as React from 'react';

import AppContextProvider from './context/AppContext';

import Board from './views/board';

import { OutsideWrapper, MiddleWrapper, InnerContent } from './styles';

const App = () => {
    return (
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
};

export default App;
