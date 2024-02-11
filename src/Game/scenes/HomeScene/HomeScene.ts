import playerSprite1 from '../../../assets/characters/player.png';
import tieHome from '../../../assets/map/TieHome.png';
import tieHomeForeground from '../../../assets/map/TieHomeForeground.png';
import collisionBlock from '../../../assets/tilesets/collision.png';
import { Player } from '../../entities/Player/Player';
import { Animations } from '../../mechanics/Animations/Animations';
import { getCollisions2dArray } from './data/homeCollisions2dArray';

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
        load.image('tie-home-foreground', tieHomeForeground);
        load.image('collision-block', collisionBlock);
    }

    create() {
        const { add, cameras, physics } = this.scene;

        add.image(0, 0, 'tie-home').setOrigin(0, 0);

        this.animations = new Animations(this.scene);
        this.player = new Player({
            position: { x: 2400, y: 1250 },
            scene: this.scene,
        });

        physics.world.setBounds(0, 0, 5120, 2880);

        const { sprite } = this.player;

        cameras.main.startFollow(sprite, true, 0.05, 0.05);
        cameras.main.setBounds(0, 0, 5120, 2880);

        const tileSize = 16;
        const collisions2dArray = getCollisions2dArray();
        collisions2dArray.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col === 1) {
                    const block = this.scene.physics.add
                        .staticImage(
                            x * tileSize * 4 + 32,
                            y * tileSize * 4 + 32,
                            'collision-block'
                        )
                        .setOrigin(0, 0)
                        .setDisplayOrigin(32, 32)
                        .setVisible(false);

                    block.body.setSize(tileSize * 4, tileSize * 4);
                    block.setImmovable(true);

                    if (this.player && this.player.sprite) {
                        this.scene.physics.add.collider(
                            this.player.sprite,
                            block
                        );
                    }
                }
            });
        });

        add.image(0, 0, 'tie-home-foreground').setOrigin(0, 0);
        console.log('HomeScene created: ', getCollisions2dArray());
    }

    update() {
        this.player?.update();
    }
}
