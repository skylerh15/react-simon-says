import { range } from 'lodash';
import { ButtonColor } from 'enums';

export function getRandomBoardColor(): ButtonColor {
    const colors = Object.keys(ButtonColor).map(e => ButtonColor[e]);
    const randomInt = Math.floor(Math.random() * colors.length);
    return colors[randomInt];
}

export const getRandomBoardColors = (count: number): ButtonColor[] => range(count).map(getRandomBoardColor);
