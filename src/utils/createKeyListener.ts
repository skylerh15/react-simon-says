export const createKeyListener = (keyCode: string) => (type: 'keyup' | 'keydown', func: Function) => () => {
    const _onKey = ({ code }: KeyboardEvent) => code === keyCode && func();
    window.addEventListener(type, _onKey);

    return () => window.removeEventListener(type, _onKey);
};
