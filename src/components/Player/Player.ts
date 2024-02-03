import { Cursors } from './entities/Cursors.interface';
import { IPlayer } from './entities/IPlayer.interface';

export class Player {
    props: IPlayer;
    cursors?: Cursors;
    player: Phaser.Physics.Arcade.Sprite | undefined;
    isJumping = false;

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
            'player'
        );

        this.player.setGravityY(gravityY);
        this.player.setBounce(0.2);
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
            frames: scene.anims.generateFrameNumbers('player', {
                start: 16,
                end: 23,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('player', {
                start: 0,
                end: 5,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('player', {
                start: 24,
                end: 39,
            }),
            frameRate: 10,
            repeat: 0,
        });
    }

    update() {
        const { player, cursors } = this;

        if (cursors && player) {
            const { left, right, space } = cursors;

            const onGround =
                player.body?.blocked.down || player.body?.touching.down;
            const shouldJump = space.isDown && onGround && !this.isJumping;

            if (shouldJump) {
                player.setVelocityY(-400);
                player.anims.play('jump', true);
                this.isJumping = true;
            } else if (this.isJumping && onGround) {
                this.isJumping = false;
            }

            if (!this.isJumping) {
                if (left.isDown) {
                    player.setVelocityX(-160);
                    player.flipX = true;
                    player.anims.play('walk', true);
                } else if (right.isDown) {
                    player.setVelocityX(160);
                    player.flipX = false;
                    player.anims.play('walk', true);
                } else {
                    player.setVelocityX(0);
                    if (onGround) {
                        player.anims.play('idle', true);
                    }
                }
            }
        }
    }
}
