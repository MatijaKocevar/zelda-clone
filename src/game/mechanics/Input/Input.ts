import { Cursors } from '../../types/Cursors.interface';
import { InputState } from '../../input/InputState';
import { CustomScene } from './Input.types';

export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';
export const SPACE = 'SPACE';
export const SHIFT = 'SHIFT';

export class Input {
    private scene: CustomScene;
    cursors?: Cursors;
    inputState: InputState;

    constructor(scene: Phaser.Scene) {
        this.scene = scene as CustomScene;

        this.inputState = this.scene.inputState;

        this.init();
    }

    init = () => {
        this.createInputs();
        this.createInputListeners();
    };

    createInputs() {
        const { scene } = this;

        if (scene.input.keyboard) {
            const cursors = {
                up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
                down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
                left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
                right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
                space: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
                shift: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            };

            this.cursors = cursors;
        }
    }

    createInputListeners() {
        const { cursors } = this;

        if (!cursors) return;

        cursors.up.on('down', () => {
            this.onKeyPressed(UP);
            this.inputState.lastKey = UP;
        });
        cursors.up.on('up', () => {
            this.onKeyReleased(UP);
        });

        cursors.down.on('down', () => {
            this.onKeyPressed(DOWN);
            this.inputState.lastKey = DOWN;
        });
        cursors.down.on('up', () => {
            this.onKeyReleased(DOWN);
        });

        cursors.left.on('down', () => {
            this.onKeyPressed(LEFT);
            this.inputState.lastKey = LEFT;
        });
        cursors.left.on('up', () => {
            this.onKeyReleased(LEFT);
        });

        cursors.right.on('down', () => {
            this.onKeyPressed(RIGHT);
            this.inputState.lastKey = RIGHT;
        });
        cursors.right.on('up', () => {
            this.onKeyReleased(RIGHT);
        });

        cursors.space.on('down', () => {
            this.inputState.push(SPACE);
        });
        cursors.space.on('up', () => {
            this.onKeyReleased(SPACE);
        });

        cursors.shift.on('down', () => {
            this.inputState.push(SHIFT);
        });
        cursors.shift.on('up', () => {
            this.onKeyReleased(SHIFT);
        });
    }

    onKeyPressed(key: string) {
        this.inputState.press(key);
    }

    onKeyReleased(key: string) {
        this.inputState.release(key);
    }
}
