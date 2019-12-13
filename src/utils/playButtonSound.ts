import { ButtonColor } from 'enums';

const a_sharp = require('sounds/a_sharp.wav');
const c_sharp = require('sounds/c_sharp.wav');
const f_sharp = require('sounds/f_sharp.wav');
const g_sharp = require('sounds/g_sharp.wav');

function getButtonSound(buttonColor: ButtonColor): string {
    switch (buttonColor) {
        case ButtonColor.Red:
            return a_sharp;
        case ButtonColor.Blue:
            return c_sharp;
        case ButtonColor.Yellow:
            return g_sharp;
        case ButtonColor.Green:
            return f_sharp;
        default:
            return f_sharp;
    }
}

export function playButtonSound(buttonColor: ButtonColor) {
    const sound = getButtonSound(buttonColor);
    const audioElement = new Audio(sound);
    audioElement.play();
}
