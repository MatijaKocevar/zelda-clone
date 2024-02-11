import playerSprite1 from '../../../assets/characters/player.png';
import tieHome from '../../../assets/map/TieHome.png';
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
        const { add, cameras, physics } = this.scene;

        add.image(0, 0, 'tie-home').setOrigin(0, 0);

        this.animations = new Animations(this.scene);
        this.player = new Player({
            position: { x: 2400, y: 1200 },
            scene: this.scene,
        });

        physics.world.setBounds(0, 0, 5120, 2880);

        const { sprite } = this.player;

        cameras.main.startFollow(sprite, true, 0.05, 0.05);
        cameras.main.setBounds(0, 0, 5120, 2880);
    }

    update() {
        this.player?.update();
    }
}
