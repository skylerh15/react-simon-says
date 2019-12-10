import { color } from 'styles/theme/color';

export enum ButtonColor {
    Red,
    Blue,
    Yellow,
    Green
}

export function getButtonColorHex(buttonColor: ButtonColor) {
    switch (buttonColor) {
        case ButtonColor.Red:
            return color.$Red;
        case ButtonColor.Blue:
            return color.$Blue;
        case ButtonColor.Yellow:
            return color.$Yellow;
        case ButtonColor.Green:
            return color.$Green;
        default:
            return color.$Yellow;
    }
}
