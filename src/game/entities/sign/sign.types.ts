import Phaser from 'phaser';
import { InputState } from '../../input/input-state';
import { Player } from '../player/player';

export interface ISign {
    x: number;
    y: number;
    text: string;
    scene: Phaser.Scene;
    player: Player;
    inputState: InputState;
}
