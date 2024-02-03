import { Cursors } from './entities/Cursors.interface';
import { IPlayer } from './entities/IPlayer.interface';

export class Player {
    props: IPlayer;
    cursors?: Cursors;
    player: Phaser.Physics.Arcade.Sprite | undefined;
    isSlashing = false;

    constructor(props: IPlayer) {
        this.props = props;
        this.createPlayer();
    }

    createPlayer() {
        const { scene, position } = this.props;

        const gravityY =
            scene.sys.game.config.physics.arcade?.gravity?.y ?? 300;

        this.player = scene.physics.add.sprite(
            position.x,
            position.y,
            'player1'
        );

        this.player.setGravityY(gravityY);
        this.player.setCollideWorldBounds(true);

        this.createPlayerControls();
        this.createPlayerAnimations();
    }

    createPlayerControls() {
        const { scene } = this.props;

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

    createPlayerAnimations() {
        const { scene } = this.props;

        scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 16,
                end: 23,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 0,
                end: 5,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 24,
                end: 39,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'slash',
            frames: scene.anims.generateFrameNumbers('player2', {
                start: 32,
                end: 39,
            }),
            frameRate: 10,
            repeat: 0,
        });
    }

    update() {
        const { player, cursors } = this;

        if (cursors && player) {
            const { left, right, up, space } = cursors;

            // Checking for ground contact
            let onGround =
                player.body?.blocked.down || player.body?.touching.down;

            // Jumping
            if (up.isDown && onGround) {
                player.setVelocityY(-400);
                player.anims.play('jump', true);
                onGround = false;
            }

            if (left.isDown) {
                player.setVelocityX(-160);
                player.flipX = true;
                if (onGround && !this.isSlashing) {
                    player.anims.play('walk', true);
                }
            } else if (right.isDown) {
                player.setVelocityX(160);
                player.flipX = false;
                if (onGround && !this.isSlashing) {
                    player.anims.play('walk', true);
                }
            } else {
                player.setVelocityX(0);
                if (onGround && !this.isSlashing) {
                    player.anims.play('idle', true);
                }
            }

            if (space.isDown) {
                player.anims.play('slash', true);
                this.isSlashing = true;
                player.once('animationcomplete-slash', () => {
                    this.isSlashing = false;
                });
            }
        }
    }
}
