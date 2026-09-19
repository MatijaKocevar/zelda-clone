import { InputState } from '../../input/input-state';

export interface CustomScene extends Phaser.Scene {
    inputState: InputState;
}
