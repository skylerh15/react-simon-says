import React, { createContext, FC, useState, useContext } from 'react';
import { delay, range, isEqual } from 'lodash';

import { Round } from 'types/round';
import { getRandomBoardColor } from 'utils/getRandomBoardColor';
import zipArray from 'utils/zip-array';
import { ButtonColor } from 'enums';

interface State {
    currentRound: number | null;
    canStartRound: boolean;
    roundData: Round[];
    currentLitColor: ButtonColor | null;
    allowUserInput: boolean;
    startGame: () => void;
    userSelectedValues: ButtonColor[];
    onButtonClick: (color: ButtonColor) => void;
}

const initialState: State = {
    allowUserInput: false,
    currentLitColor: null,
    currentRound: null,
    canStartRound: true,
    onButtonClick: () => null,
    roundData: [],
    startGame: () => null,
    userSelectedValues: []
};

export const AppContext = createContext(initialState);

const AppContextProvider: FC = ({ children }) => {
    const [roundData, setRoundData] = useState(initialState.roundData);
    const [currentLitColor, setCurrentLitColor] = useState(initialState.currentLitColor);
    const [allowUserInput, toggleUserInput] = useState(initialState.allowUserInput);
    const [userSelectedValues, setUserSelectedValues] = useState(initialState.userSelectedValues);
    const [canStartRound, toggleCanStartRound] = useState(initialState.canStartRound);
    const currentRound = roundData.length ? roundData[roundData.length - 1].roundId : null;

    const getCurrentRoundData = () => roundData.find(r => r.roundId === currentRound);

    const createNewRoundData = () => {
        const roundId = (currentRound || 0) + 1;
        const currentRoundData = getCurrentRoundData();
        const randomColor = [getRandomBoardColor()];
        const color = currentRoundData ? currentRoundData.color.concat(randomColor) : randomColor;
        setRoundData(roundData.concat({ roundId, color }));
        showRoundColors(color);
    };

    const startGame = () => {
        toggleUserInput(false);
        toggleCanStartRound(false);
        createNewRoundData();
    };

    const showRoundColors = (colors: ButtonColor[]) => {
        const emptyArray = range(colors.length).map(() => null);
        const colorRotation = zipArray(colors, emptyArray);
        const setColor = (index: number) => {
            if (index === colorRotation.length - 1) {
                toggleUserInput(true);
            }
            setCurrentLitColor(colorRotation[index]);
        };

        colorRotation.forEach((color, ix) => delay(setColor, 1000 * (ix + 1), ix));
    };

    const attemptGuess = (selectedValues: ButtonColor[]) => {
        const currentRoundData = getCurrentRoundData();
        if (!currentRoundData) {
            return;
        }
        const incorrect = !isCorrectGuess(selectedValues);
        if (incorrect) {
            setRoundData([]);
        }
        if (selectedValues.length === currentRoundData.color.length || incorrect) {
            toggleUserInput(false);
            setUserSelectedValues([]);
            toggleCanStartRound(true);
        }
    };

    const isCorrectGuess = (guesses: ButtonColor[]) => {
        const currentRoundData = getCurrentRoundData();
        if (!currentRoundData) {
            return false;
        }
        return isEqual(guesses, currentRoundData.color.slice(0, guesses.length));
    };

    const onButtonClick = (color: ButtonColor) => {
        if (!currentRound) {
            return;
        }
        if (userSelectedValues.length < currentRound) {
            const newValues = userSelectedValues.concat(color);
            setUserSelectedValues(newValues);
            attemptGuess(newValues);
        }
    };

    const contextState = {
        ...initialState,
        allowUserInput,
        canStartRound,
        currentLitColor,
        currentRound,
        onButtonClick,
        roundData,
        startGame,
        userSelectedValues
    };

    return <AppContext.Provider value={contextState}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);

export default AppContextProvider;
