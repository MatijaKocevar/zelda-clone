import playerSprite from '../../../sprites/player/blue/char_blue_1.png';
import { Player } from '../../Player/Player';

export class GameScene extends Phaser.Scene {
    player: Player | undefined;

    preload() {
        this.load.spritesheet('player', playerSprite, {
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
