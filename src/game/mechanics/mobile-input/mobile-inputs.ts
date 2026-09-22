import { UP, DOWN, LEFT, RIGHT } from '../input/input';
import { SPACE, RANGED, INTERACT } from '../input/input';
import { InputState } from '../../input/input-state';

export class MobileInput {
    inputState: InputState;

    constructor(inputState: InputState) {
        this.inputState = inputState;
    }

    onTouchStartUp = () => {
        this.inputState.press(UP);
        this.inputState.lastKey = UP;
    };

    onTouchEndUp = () => this.inputState.release(UP);

    onTouchStartDown = () => {
        this.inputState.press(DOWN);
        this.inputState.lastKey = DOWN;
    };

    onTouchEndDown = () => this.inputState.release(DOWN);

    onTouchStartLeft = () => {
        this.inputState.press(LEFT);
        this.inputState.lastKey = LEFT;
    };

    onTouchEndLeft = () => this.inputState.release(LEFT);

    onTouchStartRight = () => {
        this.inputState.press(RIGHT);
        this.inputState.lastKey = RIGHT;
    };

    onTouchEndRight = () => this.inputState.release(RIGHT);

    onTouchStartA = () => this.inputState.push(SPACE);

    onTouchEndA = () => this.inputState.release(SPACE);

    onTouchStartB = () => this.inputState.push(RANGED);

    onTouchEndB = () => this.inputState.release(RANGED);

    onTouchStartX = () => this.inputState.push(INTERACT);

    onTouchEndX = () => this.inputState.release(INTERACT);
}
