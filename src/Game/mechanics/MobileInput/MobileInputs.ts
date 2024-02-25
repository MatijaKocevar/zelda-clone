import { UP, DOWN, LEFT, RIGHT } from '../Input/Input';
import { SPACE, SHIFT } from '../Input/Input';

export class MobileInput {
    keysPressed: string[] = [];

    constructor(keysPressedRef: React.MutableRefObject<string[]>) {
        this.keysPressed = keysPressedRef.current;
    }

    onTouchStartUp = () => this.onKeyPressed(UP);

    onTouchEndUp = () => this.onKeyReleased(UP);

    onTouchStartDown = () => this.onKeyPressed(DOWN);

    onTouchEndDown = () => this.onKeyReleased(DOWN);

    onTouchStartLeft = () => this.onKeyPressed(LEFT);

    onTouchEndLeft = () => this.onKeyReleased(LEFT);

    onTouchStartRight = () => this.onKeyPressed(RIGHT);

    onTouchEndRight = () => this.onKeyReleased(RIGHT);

    onTouchStartA = () => this.keysPressed.push(SPACE);

    onTouchEndA = () => this.onKeyReleased(SPACE);

    onTouchStartB = () => this.keysPressed.push(SHIFT);

    onTouchEndB = () => this.onKeyReleased(SHIFT);

    onKeyPressed(key: string) {
        console.log('key pressed', key);
        if (this.keysPressed.indexOf(key) === -1) {
            this.keysPressed.unshift(key);
        }
    }

    onKeyReleased(key: string) {
        console.log('key released', key);
        const index = this.keysPressed.indexOf(key);
        if (index === -1) {
            return;
        }

        this.keysPressed.splice(index, 1);
    }
}
