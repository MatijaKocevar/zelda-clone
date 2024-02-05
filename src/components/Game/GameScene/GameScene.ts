import playerSprite1 from '../../../assets/characters/player.png';
import { Player } from '../../Player/Player';

export class GameScene extends Phaser.Scene {
    player: Player | undefined;

    preload() {
        this.load.spritesheet('player1', playerSprite1, {
            frameWidth: 48,
            frameHeight: 48,
        });
    }

    create() {
        this.player = new Player({ position: { x: 100, y: 500 }, scene: this });
    }

    update() {
        this.player?.update();
    }
}
