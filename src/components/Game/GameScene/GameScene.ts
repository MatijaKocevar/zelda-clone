import playerSprite from '../../../sprites/temp-player.png';
import { Player } from '../../Player/Player';

export class GameScene extends Phaser.Scene {
    player: Player | undefined;

    preload() {
        this.load.image('player', playerSprite);
    }

    create() {
        this.player = new Player(this);
    }

    update() {
        this.player?.update();
    }
}
