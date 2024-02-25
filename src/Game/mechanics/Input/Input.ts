import { Cursors } from '../../../types/Cursors.interface';

export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';
export const SPACE = 'SPACE';
export const SHIFT = 'SHIFT';

export class Input {
    private scene: Phaser.Scene;
    cursors?: Cursors;
    keysPressed: string[] = [];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        //@ts-expect-error - keysPressedRef is not a valid property of scene
        this.keysPressed = scene.keysPressedRef.current;

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
                up: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.W
                ),
                down: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.S
                ),
                left: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.A
                ),
                right: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.D
                ),
                space: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.SPACE
                ),
                shift: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.SHIFT
                ),
                lastKey: RIGHT,
            };

            this.cursors = cursors;
        }
    }

    createInputListeners() {
        const { cursors } = this;

        if (cursors) {
            cursors?.up.on('down', () => {
                this.onKeyPressed(UP);
                cursors.lastKey = UP;
            });
            cursors?.up.on('up', () => {
                this.onKeyReleased(UP);
            });

            cursors?.down.on('down', () => {
                this.onKeyPressed(DOWN);
                cursors.lastKey = DOWN;
            });
            cursors?.down.on('up', () => {
                this.onKeyReleased(DOWN);
            });

            cursors?.left.on('down', () => {
                this.onKeyPressed(LEFT);
                cursors.lastKey = LEFT;
            });
            cursors?.left.on('up', () => {
                this.onKeyReleased(LEFT);
            });

            cursors?.right.on('down', () => {
                this.onKeyPressed(RIGHT);
                cursors.lastKey = RIGHT;
            });
            cursors?.right.on('up', () => {
                this.onKeyReleased(RIGHT);
            });

            cursors?.space.on('down', () => {
                // this.onKeyPressed(SPACE);
                this.keysPressed.push(SPACE);
            });
            cursors?.space.on('up', () => {
                this.onKeyReleased(SPACE);
            });

            cursors?.shift.on('down', () => {
                // this.onKeyPressed(SHIFT);
                this.keysPressed.push(SHIFT);
            });
            cursors?.shift.on('up', () => {
                this.onKeyReleased(SHIFT);
            });
        }
    }

    onKeyPressed(key: string) {
        if (this.keysPressed.indexOf(key) === -1) {
            this.keysPressed.unshift(key);
        }
    }

    onKeyReleased(key: string) {
        const index = this.keysPressed.indexOf(key);
        if (index === -1) {
            return;
        }

        this.keysPressed.splice(index, 1);
    }
}
