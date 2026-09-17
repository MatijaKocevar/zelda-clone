import { DOWN, LEFT, RIGHT, SHIFT, SPACE, UP } from '../Input/Input';
import { CustomScene } from '../Input/Input.types';
import { InputState } from '../../input/InputState';

export class GamepadInput {
    private scene: CustomScene;
    private gamepad?: Phaser.Input.Gamepad.Gamepad;
    private gamepadPressedButtons: Set<string> = new Set();
    private inputState: InputState;

    constructor(scene: Phaser.Scene) {
        this.scene = scene as CustomScene;
        this.inputState = this.scene.inputState;

        this.init();
    }

    init() {
        this.setupGamepad();
    }

    setupGamepad() {
        const { scene } = this;

        if (scene.input.gamepad) {
            scene.input.gamepad.on('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
                this.gamepad = pad;
                console.log('Gamepad connected:', pad.id);
            });

            scene.input.gamepad.on('disconnected', (pad: Phaser.Input.Gamepad.Gamepad) => {
                if (this.gamepad === pad) {
                    this.gamepad = undefined;
                    console.log('Gamepad disconnected');
                    this.gamepadPressedButtons.clear();
                }
            });

            const existingGamepads = scene.input.gamepad.gamepads;
            if (existingGamepads && existingGamepads.length > 0) {
                this.gamepad = existingGamepads[0];
                console.log('Gamepad already connected:', this.gamepad.id);
            }
        }
    }

    update() {
        if (!this.gamepad) return;

        const threshold = 0.3;

        const leftX = this.gamepad.leftStick.x;
        const leftY = this.gamepad.leftStick.y;

        if (leftX > threshold || this.gamepad.right) {
            if (!this.gamepadPressedButtons.has(RIGHT)) {
                this.inputState.press(RIGHT);
                this.inputState.lastKey = RIGHT;
                this.gamepadPressedButtons.add(RIGHT);
            }
        } else {
            if (this.gamepadPressedButtons.has(RIGHT)) {
                this.inputState.release(RIGHT);
                this.gamepadPressedButtons.delete(RIGHT);
            }
        }

        if (leftX < -threshold || this.gamepad.left) {
            if (!this.gamepadPressedButtons.has(LEFT)) {
                this.inputState.press(LEFT);
                this.inputState.lastKey = LEFT;
                this.gamepadPressedButtons.add(LEFT);
            }
        } else {
            if (this.gamepadPressedButtons.has(LEFT)) {
                this.inputState.release(LEFT);
                this.gamepadPressedButtons.delete(LEFT);
            }
        }

        if (leftY < -threshold || this.gamepad.up) {
            if (!this.gamepadPressedButtons.has(UP)) {
                this.inputState.press(UP);
                this.inputState.lastKey = UP;
                this.gamepadPressedButtons.add(UP);
            }
        } else {
            if (this.gamepadPressedButtons.has(UP)) {
                this.inputState.release(UP);
                this.gamepadPressedButtons.delete(UP);
            }
        }

        if (leftY > threshold || this.gamepad.down) {
            if (!this.gamepadPressedButtons.has(DOWN)) {
                this.inputState.press(DOWN);
                this.inputState.lastKey = DOWN;
                this.gamepadPressedButtons.add(DOWN);
            }
        } else {
            if (this.gamepadPressedButtons.has(DOWN)) {
                this.inputState.release(DOWN);
                this.gamepadPressedButtons.delete(DOWN);
            }
        }

        if (this.gamepad.A) {
            if (!this.gamepadPressedButtons.has(SPACE)) {
                this.inputState.push(SPACE);
                this.gamepadPressedButtons.add(SPACE);
            }
        } else {
            if (this.gamepadPressedButtons.has(SPACE)) {
                this.inputState.release(SPACE);
                this.gamepadPressedButtons.delete(SPACE);
            }
        }

        if (this.gamepad.B) {
            if (!this.gamepadPressedButtons.has(SHIFT)) {
                this.inputState.push(SHIFT);
                this.gamepadPressedButtons.add(SHIFT);
            }
        } else {
            if (this.gamepadPressedButtons.has(SHIFT)) {
                this.inputState.release(SHIFT);
                this.gamepadPressedButtons.delete(SHIFT);
            }
        }
    }

    get isConnected(): boolean {
        return !!this.gamepad;
    }

    get gamepadInfo(): { id: string; connected: boolean } | null {
        return this.gamepad ? { id: this.gamepad.id, connected: this.gamepad.connected } : null;
    }
}
