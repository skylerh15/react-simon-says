import React, { createContext, FC, useState, useContext, Dispatch } from 'react';
import { delay, range, isEqual, last, fill } from 'lodash';

import { Round } from 'types/round';
import { getRandomBoardColor, zipArray, playButtonSound } from 'utils';
import { ButtonColor } from 'enums';

interface State {
    currentRound: number | undefined;
    canStartRound: boolean;
    roundData: Round[];
    currentLitColor: ButtonColor | null;
    allowUserInput: boolean;
    startGame: () => void;
    userSelectedValues: ButtonColor[];
    onButtonClick: Dispatch<ButtonColor>;
}

const initialState: State = {
    allowUserInput: false,
    currentLitColor: null,
    currentRound: undefined,
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

    const currentRoundData = last(roundData);
    const currentRound = currentRoundData?.roundId;

    const createNewRoundData = () => {
        const roundId = (currentRound || 0) + 1;
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

    const showRoundColors: Dispatch<ButtonColor[]> = colors => {
        const emptyArray = fill(range(colors.length), null);
        const colorRotation = zipArray(colors, emptyArray);
        const setColor = (index: number) => {
            if (index === colorRotation.length - 1) {
                toggleUserInput(true);
            }
            const currentColor = colorRotation[index];
            if (currentColor) {
                playButtonSound(currentColor);
            }
            setCurrentLitColor(currentColor);
        };

        colorRotation.forEach((color, ix) => delay(setColor, 1000 * (ix + 1), ix));
    };

    const attemptGuess: Dispatch<ButtonColor[]> = colors => {
        const incorrect = !isCorrectGuess(colors);
        if (incorrect) {
            setRoundData([]);
        }
        if (colors.length === currentRoundData?.color.length || incorrect) {
            toggleUserInput(false);
            setUserSelectedValues([]);
            toggleCanStartRound(true);
        }
    };

    const isCorrectGuess = (guesses: ButtonColor[]) =>
        isEqual(guesses, currentRoundData?.color.slice(0, guesses.length));

    const onButtonClick: Dispatch<ButtonColor> = color => {
        if (!currentRound || !allowUserInput) {
            return;
        }
        playButtonSound(color);
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
