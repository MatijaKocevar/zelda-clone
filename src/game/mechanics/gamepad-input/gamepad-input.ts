import { DOWN, LEFT, RIGHT, SHIFT, SPACE, UP } from '../input/input';
import { CustomScene } from '../input/input.types';
import { InputState } from '../../input/input-state';

const STICK_THRESHOLD = 0.3;

const BUTTON = {
    A: 0,
    B: 1,
    DPAD_UP: 12,
    DPAD_DOWN: 13,
    DPAD_LEFT: 14,
    DPAD_RIGHT: 15,
};

export class GamepadInput {
    private inputState: InputState;
    private gamepadIndex: number | null = null;
    private pressedButtons: Set<string> = new Set();

    constructor(scene: Phaser.Scene) {
        this.inputState = (scene as CustomScene).inputState;
    }

    update() {
        const gamepad = this.getGamepad();

        if (!gamepad) {
            this.releaseAll();
            return;
        }

        const leftX = gamepad.axes[0] ?? 0;
        const leftY = gamepad.axes[1] ?? 0;

        this.setDirection(RIGHT, leftX > STICK_THRESHOLD || this.isPressed(gamepad, BUTTON.DPAD_RIGHT));
        this.setDirection(LEFT, leftX < -STICK_THRESHOLD || this.isPressed(gamepad, BUTTON.DPAD_LEFT));
        this.setDirection(UP, leftY < -STICK_THRESHOLD || this.isPressed(gamepad, BUTTON.DPAD_UP));
        this.setDirection(DOWN, leftY > STICK_THRESHOLD || this.isPressed(gamepad, BUTTON.DPAD_DOWN));
        this.setButton(SPACE, this.isPressed(gamepad, BUTTON.A));
        this.setButton(SHIFT, this.isPressed(gamepad, BUTTON.B));
    }

    get isConnected(): boolean {
        return this.getGamepad() !== null;
    }

    private getGamepad(): Gamepad | null {
        const gamepads = navigator.getGamepads();

        if (this.gamepadIndex !== null) {
            const current = gamepads[this.gamepadIndex];

            if (current && current.connected) {
                return current;
            }

            this.gamepadIndex = null;
        }

        for (const gamepad of gamepads) {
            if (gamepad && gamepad.connected) {
                this.gamepadIndex = gamepad.index;
                return gamepad;
            }
        }

        return null;
    }

    private isPressed(gamepad: Gamepad, buttonIndex: number): boolean {
        return gamepad.buttons[buttonIndex]?.pressed ?? false;
    }

    private setDirection(key: string, active: boolean) {
        if (active) {
            if (!this.pressedButtons.has(key)) {
                this.inputState.press(key);
                this.inputState.lastKey = key;
                this.pressedButtons.add(key);
            }
            return;
        }

        if (this.pressedButtons.has(key)) {
            this.inputState.release(key);
            this.pressedButtons.delete(key);
        }
    }

    private setButton(key: string, active: boolean) {
        if (active) {
            if (!this.pressedButtons.has(key)) {
                this.inputState.push(key);
                this.pressedButtons.add(key);
            }
            return;
        }

        if (this.pressedButtons.has(key)) {
            this.inputState.release(key);
            this.pressedButtons.delete(key);
        }
    }

    private releaseAll() {
        this.pressedButtons.forEach((key) => this.inputState.release(key));
        this.pressedButtons.clear();
    }
}
