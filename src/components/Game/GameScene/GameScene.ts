import playerSprite1 from '../../../sprites/player/blue/char_blue_1.png';
import playerSprite2 from '../../../sprites/player/blue/char_blue_2.png';
import { Player } from '../../Player/Player';

export class GameScene extends Phaser.Scene {
    player: Player | undefined;

    preload() {
        this.load.spritesheet('player1', playerSprite1, {
            frameWidth: 56,
            frameHeight: 56,
        });
        this.load.spritesheet('player2', playerSprite2, {
            frameWidth: 56,
            frameHeight: 56,
        });
    }

    create() {
        this.player = new Player({ position: { x: 100, y: 500 }, scene: this });
    }

    update() {
        this.player?.update();
    }
}
