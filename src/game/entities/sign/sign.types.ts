import Phaser from 'phaser';
import { InputState } from '../../input/input-state';
import { Player } from '../player/player';
import { AreaSignControl } from '../../areas/area.types';

export interface ISign {
    x: number;
    y: number;
    text: string;
    controls?: AreaSignControl[];
    interactHint?: boolean;
    scene: Phaser.Scene;
    player: Player;
    inputState: InputState;
}
