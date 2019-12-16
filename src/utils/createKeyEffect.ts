export function createKeyUpEffect(keyCode: string, func: () => void) {
    return () => {
        const _onKeyUp = ({ key }: KeyboardEvent) => key === keyCode && func();
        window.addEventListener('keyup', _onKeyUp);

        return () => window.removeEventListener('keyup', _onKeyUp);
    };
}
