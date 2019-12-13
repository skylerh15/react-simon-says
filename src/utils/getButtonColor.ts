import { ButtonColor } from 'enums';
import { color } from 'styles/theme';

export interface ButtonColorInfo {
    unlit: string;
    lit: string;
}

export function getButtonColorInfo(buttonColor: ButtonColor): ButtonColorInfo {
    switch (buttonColor) {
        case ButtonColor.Red:
            return { unlit: color.$Red, lit: color.$Red_Lit };
        case ButtonColor.Blue:
            return { unlit: color.$Blue, lit: color.$Blue_Lit };
        case ButtonColor.Yellow:
            return { unlit: color.$Yellow, lit: color.$Yellow_Lit };
        default:
            return { unlit: color.$Green, lit: color.$Green_Lit };
    }
}
