import playerSprite1 from '../../../../assets/characters/player.png';
import tieHome from '../../../../assets/map/TieHome.png';
import { Player } from '../../entities/Player/Player';
import { Animations } from '../../mechanics/Animations/Animations';

export class HomeScene {
    player: Player | undefined;
    animations: Animations | undefined;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    preload() {
        const { load } = this.scene;

        load.spritesheet('player1', playerSprite1, {
            frameWidth: 144,
            frameHeight: 144,
        });

        load.image('tie-home', tieHome);
    }

    create() {
        const { add } = this.scene;

        add.image(-1200, -600, 'tie-home').setOrigin(0, 0);

        this.animations = new Animations(this.scene);
        this.player = new Player({
            position: { x: 100, y: 500 },
            scene: this.scene,
        });
    }

    update() {
        this.player?.update();
    }
}
