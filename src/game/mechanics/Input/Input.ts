import { Cursors } from '../../types/Cursors.interface';
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
    keysPressed: React.MutableRefObject<string[]>;
    lastKey: React.MutableRefObject<string>;

    constructor(scene: Phaser.Scene) {
        this.scene = scene as CustomScene;

        this.keysPressed = this.scene.keysPressedRef;
        this.lastKey = this.scene.lastKeyRef;

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

        if (cursors) {
            cursors?.up.on('down', () => {
                this.onKeyPressed(UP);
                this.lastKey.current = UP;
            });
            cursors?.up.on('up', () => {
                this.onKeyReleased(UP);
            });

            cursors?.down.on('down', () => {
                this.onKeyPressed(DOWN);
                this.lastKey.current = DOWN;
            });
            cursors?.down.on('up', () => {
                this.onKeyReleased(DOWN);
            });

            cursors?.left.on('down', () => {
                this.onKeyPressed(LEFT);
                this.lastKey.current = LEFT;
            });
            cursors?.left.on('up', () => {
                this.onKeyReleased(LEFT);
            });

            cursors?.right.on('down', () => {
                this.onKeyPressed(RIGHT);
                this.lastKey.current = RIGHT;
            });
            cursors?.right.on('up', () => {
                this.onKeyReleased(RIGHT);
            });

            cursors?.space.on('down', () => {
                this.keysPressed.current?.push(SPACE);
            });
            cursors?.space.on('up', () => {
                this.onKeyReleased(SPACE);
            });

            cursors?.shift.on('down', () => {
                this.keysPressed.current?.push(SHIFT);
            });
            cursors?.shift.on('up', () => {
                this.onKeyReleased(SHIFT);
            });
        }
    }

    onKeyPressed(key: string) {
        if (this.keysPressed.current?.indexOf(key) === -1) {
            this.keysPressed.current?.unshift(key);
        }
    }

    onKeyReleased(key: string) {
        const index = this.keysPressed.current?.indexOf(key);
        if (index === -1) {
            return;
        }

        this.keysPressed.current?.splice(index, 1);
    }
}
