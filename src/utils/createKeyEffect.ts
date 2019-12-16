export const createKeyEffect = (type: 'keyup' | 'keydown', keyCode: string, func: () => void) => () => {
    const _onKey = ({ code }: KeyboardEvent) => code === keyCode && func();
    window.addEventListener(type, _onKey);

    return () => window.removeEventListener(type, _onKey);
};
