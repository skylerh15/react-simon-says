import { color } from 'styles/theme/color';

export enum ButtonColor {
    Red = 'Red',
    Blue = 'Blue',
    Yellow = 'Yellow',
    Green = 'Green'
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

export function getButtonHoverColorHex(buttonColor: ButtonColor) {
    switch (buttonColor) {
        case ButtonColor.Red:
            return color.$Red_Lit;
        case ButtonColor.Blue:
            return color.$Blue_Lit;
        case ButtonColor.Yellow:
            return color.$Yellow_Lit;
        case ButtonColor.Green:
            return color.$Green_Lit;
        default:
            return color.$Yellow_Lit;
    }
}
