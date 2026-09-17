import { InputState } from '../../input/InputState';

export interface CustomScene extends Phaser.Scene {
    inputState: InputState;
}
