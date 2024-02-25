import { UP, DOWN, LEFT, RIGHT, Input } from '../Input/Input';
import { SPACE, SHIFT } from '../Input/Input';

export class MobileInput {
    keysPressed: string[] = [];
    input: Input;

    constructor(input: Input) {
        this.input = input;
    }

    onTouchStartUp = () => this.onKeyPressed(UP);

    onTouchEndUp = () => this.onKeyReleased(UP);

    onTouchStartDown = () => this.onKeyPressed(DOWN);

    onTouchEndDown = () => this.onKeyReleased(DOWN);

    onTouchStartLeft = () => this.onKeyPressed(LEFT);

    onTouchEndLeft = () => this.onKeyReleased(LEFT);

    onTouchStartRight = () => this.onKeyPressed(RIGHT);

    onTouchEndRight = () => this.onKeyReleased(RIGHT);

    onTouchStartA = () => this.input.keysPressed.push(SPACE);

    onTouchEndA = () => this.onKeyReleased(SPACE);

    onTouchStartB = () => this.input.keysPressed.push(SHIFT);

    onTouchEndB = () => this.onKeyReleased(SHIFT);

    onKeyPressed(key: string) {
        if (this.input.keysPressed.indexOf(key) === -1) {
            this.input.keysPressed.unshift(key);
        }
    }

    onKeyReleased(key: string) {
        const index = this.input.keysPressed.indexOf(key);
        if (index === -1) {
            return;
        }

        this.input.keysPressed.splice(index, 1);
    }
}
