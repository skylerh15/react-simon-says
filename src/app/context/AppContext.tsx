import React, { createContext, FC, useState, useContext } from 'react';

import { Round } from 'types/round';
import getRandomBoardColor from 'utils/getRandomBoardColor';

interface State {
    currentRound: number | null;
    gameInProgress: boolean;
    roundData: Array<Round>;
}

const initialState: State = {
    currentRound: null,
    gameInProgress: false,
    roundData: []
};

export const AppContext = createContext(initialState);

const AppContextProvider: FC = ({ children }) => {
    const [currentRound, setCurrentRound] = useState(initialState.currentRound);
    const [gameInProgress, toggleGameInProgress] = useState(initialState.gameInProgress);
    const [roundData, setRoundData] = useState(initialState.roundData);

    console.log(getRandomBoardColor());

    const contextState = {
        ...initialState,
        currentRound,
        gameInProgress,
        roundData
    };

    return <AppContext.Provider value={contextState}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);

export default AppContextProvider;
