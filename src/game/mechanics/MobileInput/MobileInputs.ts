import { UP, DOWN, LEFT, RIGHT } from '../Input/Input';
import { SPACE, SHIFT } from '../Input/Input';

export class MobileInput {
    keysPressed: React.MutableRefObject<string[]>;
    lastKey: React.MutableRefObject<string>;

    constructor(keysPressedRef: React.MutableRefObject<string[]>, lastKeyRef: React.MutableRefObject<string>) {
        this.keysPressed = keysPressedRef;
        this.lastKey = lastKeyRef;
    }

    onTouchStartUp = () => {
        this.onKeyPressed(UP);
        this.lastKey.current = UP;
    };

    onTouchEndUp = () => this.onKeyReleased(UP);

    onTouchStartDown = () => {
        this.onKeyPressed(DOWN);
        this.lastKey.current = DOWN;
    };

    onTouchEndDown = () => this.onKeyReleased(DOWN);

    onTouchStartLeft = () => {
        this.onKeyPressed(LEFT);
        this.lastKey.current = LEFT;
    };

    onTouchEndLeft = () => this.onKeyReleased(LEFT);

    onTouchStartRight = () => {
        this.onKeyPressed(RIGHT);
        this.lastKey.current = RIGHT;
    };

    onTouchEndRight = () => this.onKeyReleased(RIGHT);

    onTouchStartA = () => this.keysPressed.current.push(SPACE);

    onTouchEndA = () => this.onKeyReleased(SPACE);

    onTouchStartB = () => this.keysPressed.current.push(SHIFT);

    onTouchEndB = () => this.onKeyReleased(SHIFT);

    onKeyPressed(key: string) {
        console.log('key pressed', key);
        if (this.keysPressed.current.indexOf(key) === -1) {
            this.keysPressed.current.unshift(key);
        }
    }

    onKeyReleased(key: string) {
        const index = this.keysPressed.current.indexOf(key);

        if (index === -1) return;

        this.keysPressed.current.splice(index, 1);
    }
}
