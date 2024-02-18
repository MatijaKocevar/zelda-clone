import { PlayerMovement } from '../components/PlayerMovement';

export interface IPlayerAttack {
    player: Phaser.Physics.Arcade.Sprite;
    scene: Phaser.Scene;
    playerMovement: PlayerMovement;
}
