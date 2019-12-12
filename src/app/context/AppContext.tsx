import React, { createContext, FC, useState, useContext } from 'react';
import { delay, range } from 'lodash';

import { Round } from 'types/round';
import { getRandomBoardColors } from 'utils/getRandomBoardColor';
import zipArray from 'utils/zip-array';
import { ButtonColor } from 'enums';

interface State {
    currentRound: number | null;
    gameInProgress: boolean;
    roundData: Round[];
    currentLitColor: ButtonColor | null;
    allowUserInput: boolean;
    startGame: () => void;
}

const initialState: State = {
    currentRound: null,
    gameInProgress: false,
    roundData: [],
    currentLitColor: null,
    allowUserInput: false,
    startGame: () => null
};

export const AppContext = createContext(initialState);

const AppContextProvider: FC = ({ children }) => {
    const [roundData, setRoundData] = useState(initialState.roundData);
    const [currentLitColor, setCurrentLitColor] = useState(initialState.currentLitColor);
    const [allowUserInput, toggleUserInput] = useState(initialState.allowUserInput);
    const currentRound = roundData.length ? roundData[roundData.length - 1].roundId : null;
    const gameInProgress = Boolean(currentRound);

    // const getCurrentRoundData = () => roundData.find(r => r.roundId === currentRound);

    const createNewRoundData = () => {
        const roundId = currentRound ? currentRound + 1 : 1;
        const color = getRandomBoardColors(roundId);
        setRoundData(roundData.concat({ roundId, color }));
        showRoundColors(color);
    };

    const startGame = () => createNewRoundData();

    const showRoundColors = (colors: ButtonColor[]) => {
        const emptyArray = range(colors.length).map(() => null);
        const colorRotation = zipArray(colors, emptyArray);
        const setColor = (index: number) => {
            if (index === colorRotation.length - 1) {
                toggleUserInput(true);
            }
            setCurrentLitColor(colorRotation[index]);
        };

        colorRotation.forEach((color, ix) => delay(setColor, 1500 * (ix + 1), ix));
    };

    const contextState = {
        ...initialState,
        currentRound,
        gameInProgress,
        roundData,
        currentLitColor,
        allowUserInput,
        startGame
    };

    return <AppContext.Provider value={contextState}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);

export default AppContextProvider;
