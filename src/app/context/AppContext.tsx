import React, { createContext, Dispatch, FC, useContext, useState, useEffect } from 'react';
import { delay, fill, isEqual, last, noop, range } from 'lodash';
import { useCookies } from 'react-cookie';

import { Round } from 'types/round';
import { CrowdSounds } from 'types/crowd';
import { HighScoreInfo } from 'types/score';
import {
    addYearsToToday,
    getRandomBoardColor,
    playButtonSound,
    playCrowdSound,
    zipArray,
    createKeyListener
} from 'utils';
import { ButtonColor, Cookies, Locales, KeyCode } from 'enums';
import { DEFAULT_LOCALE } from 'app-constants';

interface State {
    allowUserInput: boolean;
    canStartRound: boolean;
    clearHighScore: () => void;
    highScoreInfo?: HighScoreInfo;
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
    preventChangeSettings: boolean;
}

const initialState: State = {
    allowUserInput: false,
    canStartRound: true,
    clearHighScore: noop,
    currentLocale: DEFAULT_LOCALE,
    handleUpdateLocale: noop,
    onButtonClick: noop,
    roundData: [],
    soundEnabled: true,
    startGame: noop,
    toggleSound: noop,
    userSelectedValues: [],
    preventChangeSettings: false
};

export const AppContext = createContext(initialState);

const AppContextProvider: FC = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies();
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
    const preventChangeSettings = !(canStartRound || allowUserInput);

    const highScoreInfo =
        cookies[Cookies.HIGH_SCORE] && cookies[Cookies.HIGH_SCORE_DATE]
            ? {
                  score: Number(cookies[Cookies.HIGH_SCORE]),
                  date: new Date(cookies[Cookies.HIGH_SCORE_DATE])
              }
            : undefined;

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
    const handleSetCookie = (cookie: Cookies, value: any) => setCookie(cookie, value, { expires: addYearsToToday(10) });

    const setHighScore = () => {
        if (!highScoreInfo || currentRound > highScoreInfo.score) {
            onPlayCrowdSound('applause');
            handleSetCookie(Cookies.HIGH_SCORE, currentRound);
            handleSetCookie(Cookies.HIGH_SCORE_DATE, new Date());
        }
    };

    const clearHighScore = () => removeCookie(Cookies.HIGH_SCORE);

    const startGame = () => {
        if (!canStartRound) {
            return;
        }

        toggleUserInput(false);
        toggleCanStartRound(false);
        createNewRoundData();
    };

    // Starts game after user releases space bar
    useEffect(createKeyListener(KeyCode.SPACE)('keyup', startGame));

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
                setUserSelectedValues(newValues);
                attemptGuess(newValues);
                if (newValues.length === currentRound) {
                    setCurrentLitColor(color);
                    delay(setCurrentLitColor, 350, null);
                }
            }
        }
    };

    const handleUpdateLocale: Dispatch<Locales> = locale => {
        setCurrentLocale(locale);
        handleSetCookie(Cookies.LOCALE, locale);
    };

    const contextState: State = {
        ...initialState,
        allowUserInput,
        canStartRound,
        clearHighScore,
        currentLitColor,
        currentLocale,
        currentRound,
        handleUpdateLocale,
        highScoreInfo,
        onButtonClick,
        preventChangeSettings,
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
