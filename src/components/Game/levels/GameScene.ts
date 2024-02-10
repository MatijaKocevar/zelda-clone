import playerSprite1 from '../../../assets/characters/player.png';
import tieHome from '../../../assets/map/TieHome.png';
import { Player } from '../entities/Player/Player';

export class GameScene extends Phaser.Scene {
    player: Player | undefined;

    preload() {
        this.load.spritesheet('player1', playerSprite1, {
            frameWidth: 144,
            frameHeight: 144,
        });

        this.load.image('tie-home', tieHome);
    }

    create() {
        this.add.image(-1200, -600, 'tie-home').setOrigin(0, 0);

        this.player = new Player({ position: { x: 100, y: 500 }, scene: this });
    }

    update() {
        this.player?.update();
    }
}
