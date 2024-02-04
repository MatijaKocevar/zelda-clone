import { Cursors } from './entities/Cursors.interface';
import { IPlayer } from './entities/IPlayer.interface';

export class Player {
    props: IPlayer;
    cursors?: Cursors;
    player: Phaser.Physics.Arcade.Sprite | undefined;
    isSlashing = false;
    isJumping = false;
    lastDirection = '';

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
                shift: scene.input.keyboard.addKey(
                    Phaser.Input.Keyboard.KeyCodes.SHIFT
                ),
            };
        }

        this.cursors?.left.on('down', () => {
            this.lastDirection = 'LEFT';
        });
        this.cursors?.right.on('down', () => {
            this.lastDirection = 'RIGHT';
        });

        this.cursors?.left.on('up', () => {
            if (this.cursors?.right.isDown) {
                this.lastDirection = 'RIGHT';
            }
        });
        this.cursors?.right.on('up', () => {
            if (this.cursors?.left.isDown) {
                this.lastDirection = 'LEFT';
            }
        });
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
            key: 'run',
            frames: scene.anims.generateFrameNumbers('player2', {
                start: 0,
                end: 9,
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
            const { left, right, up, shift, space } = cursors;

            const speed = shift.isDown ? 100 : 160;
            const onGround =
                player.body?.blocked.down || player.body?.touching.down;

            // Reset jumping flag if on the ground
            if (onGround && this.isJumping) {
                this.isJumping = false;
            }

            // Handle slashing
            if (space.isDown && !this.isSlashing) {
                this.isSlashing = true;
                player.setVelocityX(0);
                player.anims.play('slash', true);

                player.once('animationcomplete-slash', () => {
                    this.isSlashing = false;
                });
            }

            // Jumping
            if (up.isDown && onGround && !this.isJumping && !this.isSlashing) {
                player.anims.stop();
                player.setVelocityY(-400);
                player.anims.play('jump', true);
                this.isJumping = true;
            }

            if (!this.isSlashing || (this.isSlashing && this.isJumping)) {
                // Movement handling
                let moving = false;

                if (left.isDown || right.isDown) {
                    if (this.lastDirection === 'LEFT' && left.isDown) {
                        player.setVelocityX(-speed);
                        player.flipX = true;
                        moving = true;
                    } else if (this.lastDirection === 'RIGHT' && right.isDown) {
                        player.setVelocityX(speed);
                        player.flipX = false;
                        moving = true;
                    }
                }

                if (!moving) {
                    if (onGround) {
                        player.setVelocityX(0);
                    }
                }

                // Animation handling based on movement and actions
                if (moving && !this.isJumping) {
                    player.anims.play(shift.isDown ? 'run' : 'walk', true);
                } else if (onGround && !this.isJumping && !moving) {
                    player.anims.play('idle', true);
                }
            }
        }
    }
}
