import { DOWN, LEFT, RIGHT, SHIFT, SPACE, UP } from '../Input/Input';
import { CustomScene } from '../Input/Input.types';

export class GamepadInput {
    private scene: CustomScene;
    private gamepad?: Phaser.Input.Gamepad.Gamepad;
    private gamepadPressedButtons: Set<string> = new Set();
    private keysPressed: React.MutableRefObject<string[]>;
    private lastKey: React.MutableRefObject<string>;

    constructor(scene: Phaser.Scene) {
        this.scene = scene as CustomScene;
        this.keysPressed = this.scene.keysPressedRef;
        this.lastKey = this.scene.lastKeyRef;
        
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
                this.onKeyPressed(RIGHT);
                this.lastKey.current = RIGHT;
                this.gamepadPressedButtons.add(RIGHT);
            }
        } else {
            if (this.gamepadPressedButtons.has(RIGHT)) {
                this.onKeyReleased(RIGHT);
                this.gamepadPressedButtons.delete(RIGHT);
            }
        }

        if (leftX < -threshold || this.gamepad.left) {
            if (!this.gamepadPressedButtons.has(LEFT)) {
                this.onKeyPressed(LEFT);
                this.lastKey.current = LEFT;
                this.gamepadPressedButtons.add(LEFT);
            }
        } else {
            if (this.gamepadPressedButtons.has(LEFT)) {
                this.onKeyReleased(LEFT);
                this.gamepadPressedButtons.delete(LEFT);
            }
        }

        if (leftY < -threshold || this.gamepad.up) {
            if (!this.gamepadPressedButtons.has(UP)) {
                this.onKeyPressed(UP);
                this.lastKey.current = UP;
                this.gamepadPressedButtons.add(UP);
            }
        } else {
            if (this.gamepadPressedButtons.has(UP)) {
                this.onKeyReleased(UP);
                this.gamepadPressedButtons.delete(UP);
            }
        }

        if (leftY > threshold || this.gamepad.down) {
            if (!this.gamepadPressedButtons.has(DOWN)) {
                this.onKeyPressed(DOWN);
                this.lastKey.current = DOWN;
                this.gamepadPressedButtons.add(DOWN);
            }
        } else {
            if (this.gamepadPressedButtons.has(DOWN)) {
                this.onKeyReleased(DOWN);
                this.gamepadPressedButtons.delete(DOWN);
            }
        }

        if (this.gamepad.A) {
            if (!this.gamepadPressedButtons.has(SPACE)) {
                this.keysPressed.current.push(SPACE);
                this.gamepadPressedButtons.add(SPACE);
            }
        } else {
            if (this.gamepadPressedButtons.has(SPACE)) {
                this.onKeyReleased(SPACE);
                this.gamepadPressedButtons.delete(SPACE);
            }
        }

        if (this.gamepad.B) {
            if (!this.gamepadPressedButtons.has(SHIFT)) {
                this.keysPressed.current.push(SHIFT);
                this.gamepadPressedButtons.add(SHIFT);
            }
        } else {
            if (this.gamepadPressedButtons.has(SHIFT)) {
                this.onKeyReleased(SHIFT);
                this.gamepadPressedButtons.delete(SHIFT);
            }
        }
    }

    private onKeyPressed(key: string) {
        if (this.keysPressed.current?.indexOf(key) === -1) {
            this.keysPressed.current?.unshift(key);
        }
    }

    private onKeyReleased(key: string) {
        const index = this.keysPressed.current?.indexOf(key);

        if (index === -1) return;

        this.keysPressed.current?.splice(index, 1);
    }

    get isConnected(): boolean {
        return !!this.gamepad;
    }

    get gamepadInfo(): { id: string; connected: boolean } | null {
        return this.gamepad ? { id: this.gamepad.id, connected: this.gamepad.connected } : null;
    }
}
