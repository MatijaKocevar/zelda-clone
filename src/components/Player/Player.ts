import { Cursors } from './entities/Cursors.interface';

export class Player {
    cursors?: Cursors;
    player: Phaser.Physics.Arcade.Sprite | undefined;

    constructor(scene: Phaser.Scene) {
        this.createPlayer(scene);
    }

    createPlayer(scene: Phaser.Scene) {
        const gravityY =
            scene.sys.game.config.physics.arcade?.gravity?.y ?? 300;

        this.player = scene.physics.add.sprite(400, 300, 'player');
        this.player.setGravityY(gravityY);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.createPlayerControls(scene);
    }

    createPlayerControls(scene: Phaser.Scene) {
        if (scene.input.keyboard) {
            this.cursors = {
                up: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.W
                ),
                down: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.S
                ),
                left: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.A
                ),
                right: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.D
                ),
                space: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.SPACE
                ),
            };
        }
    }

    update() {
        const { player, cursors } = this;

        if (cursors && player) {
            const { left, right, space } = cursors;

            if (left.isDown) {
                player.setVelocityX(-160);
            } else if (right.isDown) {
                player.setVelocityX(160);
            } else {
                player.setVelocityX(0);
            }

            if (space.isDown && player.body?.blocked.down) {
                player.setVelocityY(-400);
            }
        }
    }
}
