import { ButtonColor } from 'enums';

export default function(): ButtonColor {
    const colors = Object.keys(ButtonColor)
        .map(k => ButtonColor[k])
        .filter(Number);
    const randomInt = Math.floor(Math.random() * colors.length);
    return colors[randomInt];
}
