import Phaser from 'phaser';
import { AreaNpcDialog, NpcDirection } from '../../areas/area.types';
import { Player } from '../player/player';

export interface INpc {
    x: number;
    y: number;
    spriteKey: string;
    direction?: NpcDirection;
    frame?: number;
    solid?: boolean;
    dialogs: AreaNpcDialog[];
    scene: Phaser.Scene;
    player: Player;
}
