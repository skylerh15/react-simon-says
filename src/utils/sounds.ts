import { ButtonColor } from 'enums';
import { CrowdSounds } from 'types/crowd';

const APPLAUSE = require('sounds/applause.wav');
const AWW = require('sounds/aww.wav');
const A_SHARP = require('sounds/a_sharp.wav');
const C_SHARP = require('sounds/c_sharp.wav');
const F_SHARP = require('sounds/f_sharp.wav');
const G_SHARP = require('sounds/g_sharp.wav');

function getButtonSound(buttonColor: ButtonColor) {
    switch (buttonColor) {
        case ButtonColor.Red:
            return A_SHARP;
        case ButtonColor.Blue:
            return C_SHARP;
        case ButtonColor.Yellow:
            return G_SHARP;
        case ButtonColor.Green:
            return F_SHARP;
        default:
            return F_SHARP;
    }
}

function playSound(file: string) {
    const audio = new Audio(file);
    audio.volume = 0.5;
    audio.play().then(() => audio.remove());
}

export function playButtonSound(buttonColor: ButtonColor) {
    const sound = getButtonSound(buttonColor);
    playSound(sound);
}

export function playCrowdSound(sound: CrowdSounds) {
    const soundToPlay = sound === 'applause' ? APPLAUSE : AWW;
    playSound(soundToPlay);
}
