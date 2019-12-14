import React, { createContext, FC, useState, useContext, Dispatch } from 'react';
import { delay, range, isEqual, last, fill, noop } from 'lodash';
import { useCookies } from 'react-cookie';

import { Round } from 'types/round';
import { CrowdSounds } from 'types/crowd';
import { getRandomBoardColor, zipArray, playButtonSound, playCrowdSound, addYearsToToday } from 'utils';
import { ButtonColor, Locales, Cookies } from 'enums';
import { DEFAULT_LOCALE } from 'app-constants';

interface State {
    allowUserInput: boolean;
    canStartRound: boolean;
    clearHighScore: () => void;
    currentHighScore: number;
    currentLitColor?: ButtonColor;
    currentLocale: Locales;
    currentRound?: number;
    handleUpdateLocale: Dispatch<Locales>;
    onButtonClick: Dispatch<ButtonColor>;
    roundData: Round[];
    soundEnabled: boolean;
    startGame: () => void;
    toggleSound: Dispatch<boolean>;
    userSelectedValues: ButtonColor[];
}

const initialState: State = {
    allowUserInput: false,
    canStartRound: true,
    clearHighScore: noop,
    currentHighScore: 0,
    currentLocale: DEFAULT_LOCALE,
    handleUpdateLocale: noop,
    onButtonClick: noop,
    roundData: [],
    soundEnabled: true,
    startGame: noop,
    toggleSound: noop,
    userSelectedValues: []
};

export const AppContext = createContext(initialState);

const AppContextProvider: FC = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(Object.keys(Cookies).map(e => Cookies[e]));
    const [roundData, setRoundData] = useState(initialState.roundData);
    const [currentLitColor, setCurrentLitColor] = useState(initialState.currentLitColor);
    const [allowUserInput, toggleUserInput] = useState(initialState.allowUserInput);
    const [userSelectedValues, setUserSelectedValues] = useState(initialState.userSelectedValues);
    const [canStartRound, toggleCanStartRound] = useState(initialState.canStartRound);
    const [soundEnabled, onToggleSound] = useState(
        cookies[Cookies.SOUND] ? cookies[Cookies.SOUND] === 'true' : initialState.soundEnabled
    );
    const [currentLocale, setCurrentLocale] = useState(cookies[Cookies.LOCALE] || initialState.currentLocale);

    const currentRoundData = last(roundData);
    const currentRound = currentRoundData?.roundId || 0;
    const currentHighScore = Number(cookies[Cookies.HIGH_SCORE] || 0);

    const createNewRoundData = () => {
        const roundId = currentRound + 1;
        const color = (currentRoundData?.color || []).concat([getRandomBoardColor()]);
        setRoundData(roundData.concat({ roundId, color }));
        showRoundColors(color);
    };

    const toggleSound: Dispatch<boolean> = value => {
        onToggleSound(value);
        handleSetCookie(Cookies.SOUND, value);
    };

    const onPlayCrowdSound: Dispatch<CrowdSounds> = crowdSound => soundEnabled && playCrowdSound(crowdSound);
    const onPlayButtonSound: Dispatch<ButtonColor> = color => soundEnabled && playButtonSound(color);
    const handleSetCookie = (cookie: Cookies, value: any) => {
        setCookie(cookie, value, { expires: addYearsToToday(10) });
    };

    const setHighScore = () => {
        if (currentRound > currentHighScore) {
            onPlayCrowdSound('applause');
            handleSetCookie(Cookies.HIGH_SCORE, currentRound);
        }
    };

    const clearHighScore = () => removeCookie(Cookies.HIGH_SCORE);

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
                onPlayButtonSound(currentColor);
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
            onPlayCrowdSound('aww');
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
            onPlayButtonSound(color);
            if (userSelectedValues.length < currentRound) {
                const newValues = userSelectedValues.concat(color);
                setCurrentLitColor(color);
                delay(setCurrentLitColor, 500, null);
                setUserSelectedValues(newValues);
                attemptGuess(newValues);
            }
        }
    };

    const handleUpdateLocale: Dispatch<Locales> = locale => {
        setCurrentLocale(locale);
        handleSetCookie(Cookies.LOCALE, locale);
    };

    const contextState = {
        ...initialState,
        allowUserInput,
        canStartRound,
        clearHighScore,
        currentHighScore,
        currentLitColor,
        currentLocale,
        currentRound,
        handleUpdateLocale,
        onButtonClick,
        roundData,
        soundEnabled,
        startGame,
        toggleSound,
        userSelectedValues
    };

    return <AppContext.Provider value={contextState}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);

export default AppContextProvider;
