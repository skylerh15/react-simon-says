import React, { createContext, FC, useState, useContext, Dispatch } from 'react';
import { delay, range, isEqual, last, fill } from 'lodash';
import { useCookies } from 'react-cookie';

import { Round } from 'types/round';
import { getRandomBoardColor, zipArray, playButtonSound, playCrowdSound, addYearsToToday } from 'utils';
import { ButtonColor } from 'enums';
import { HIGH_SCORE_COOKIE } from 'app-constants';

interface State {
    currentRound?: number;
    canStartRound: boolean;
    roundData: Round[];
    currentLitColor?: ButtonColor;
    allowUserInput: boolean;
    startGame: () => void;
    userSelectedValues: ButtonColor[];
    onButtonClick: Dispatch<ButtonColor>;
    currentHighScore: number;
}

const initialState: State = {
    allowUserInput: false,
    canStartRound: true,
    onButtonClick: () => null,
    roundData: [],
    startGame: () => null,
    userSelectedValues: [],
    currentHighScore: 0
};

export const AppContext = createContext(initialState);

const AppContextProvider: FC = ({ children }) => {
    const [cookies, setCookie] = useCookies([HIGH_SCORE_COOKIE]);
    const [roundData, setRoundData] = useState(initialState.roundData);
    const [currentLitColor, setCurrentLitColor] = useState(initialState.currentLitColor);
    const [allowUserInput, toggleUserInput] = useState(initialState.allowUserInput);
    const [userSelectedValues, setUserSelectedValues] = useState(initialState.userSelectedValues);
    const [canStartRound, toggleCanStartRound] = useState(initialState.canStartRound);

    const currentRoundData = last(roundData);
    const currentRound = currentRoundData?.roundId || 0;
    const currentHighScore = Number(cookies[HIGH_SCORE_COOKIE] || 0);

    const createNewRoundData = () => {
        const roundId = currentRound + 1;
        const color = (currentRoundData?.color || []).concat([getRandomBoardColor()]);
        setRoundData(roundData.concat({ roundId, color }));
        showRoundColors(color);
    };

    const setHighScore = () => {
        if (currentRound > currentHighScore) {
            playCrowdSound('applause');
            setCookie(HIGH_SCORE_COOKIE, currentRound, { expires: addYearsToToday(10) });
        }
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
        const correct = isCorrectGuess(colors);
        const allAnswersCorrect = correct && colors.length === currentRoundData?.color.length;
        if (!correct) {
            setRoundData([]);
            playCrowdSound('aww');
        }
        if (allAnswersCorrect) {
            setHighScore();
        }
        if (allAnswersCorrect || !correct) {
            toggleUserInput(false);
            setUserSelectedValues([]);
            toggleCanStartRound(true);
        }
    };

    const isCorrectGuess = (guesses: ButtonColor[]) =>
        isEqual(guesses, currentRoundData?.color.slice(0, guesses.length));

    const onButtonClick: Dispatch<ButtonColor> = color => {
        if (currentRound && allowUserInput) {
            playButtonSound(color);
            if (userSelectedValues.length < currentRound) {
                const newValues = userSelectedValues.concat(color);
                setCurrentLitColor(color);
                delay(setCurrentLitColor, 500, null);
                setUserSelectedValues(newValues);
                attemptGuess(newValues);
            }
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
        userSelectedValues,
        currentHighScore
    };

    return <AppContext.Provider value={contextState}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);

export default AppContextProvider;
