import { Cursors } from './entities/Cursors.interface';
import { IPlayer } from './entities/IPlayer.interface';

export class Player {
    props: IPlayer;
    cursors?: Cursors;
    player: Phaser.Physics.Arcade.Sprite | undefined;
    isSlashing = false;
    lastDirection = '';

    constructor(props: IPlayer) {
        this.props = props;
        this.createPlayer();
    }

    createPlayer() {
        const { scene, position } = this.props;

        this.player = scene.physics.add.sprite(
            position.x,
            position.y,
            'player1'
        );

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
            this.lastDirection = 'left';
        });
        this.cursors?.right.on('down', () => {
            this.lastDirection = 'right';
        });

        this.cursors?.up.on('down', () => {
            this.lastDirection = 'up';
        });
        this.cursors?.down.on('down', () => {
            this.lastDirection = 'down';
        });
    }

    createPlayerAnimations() {
        const { scene } = this.props;

        scene.anims.create({
            key: 'walk-horizontal',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 6,
                end: 11,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'walk-up',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 12,
                end: 17,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'walk-down',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 18,
                end: 23,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'run-horizontal',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 24,
                end: 29,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'run-up',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 30,
                end: 35,
            }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'run-down',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 18,
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
            key: 'slash-horizontal',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 42,
                end: 45,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'slash-up',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 48,
                end: 51,
            }),
            frameRate: 10,
            repeat: 0,
        });

        scene.anims.create({
            key: 'slash-down',
            frames: scene.anims.generateFrameNumbers('player1', {
                start: 36,
                end: 39,
            }),
            frameRate: 10,
            repeat: 0,
        });
    }

    // update() {
    //     const { player, cursors } = this;

    //     if (cursors && player) {
    //         const { left, right, up, down, shift, space } = cursors;

    //         const speed = shift.isDown ? 100 : 160;

    //         // Reset velocity
    //         player.setVelocity(0);

    //         // Determine the direction for slashing
    //         let moving = false;
    //         const direction = this.lastDirection; // Use the lastDirection property to decide the slashing direction

    //         if (left.isDown || right.isDown || up.isDown || down.isDown) {
    //             if (this.lastDirection === 'left' && left.isDown) {
    //                 player.setVelocityX(-speed);
    //                 player.flipX = true;
    //                 moving = true;
    //             } else if (this.lastDirection === 'right' && right.isDown) {
    //                 player.setVelocityX(speed);
    //                 player.flipX = false;
    //                 moving = true;
    //             } else if (this.lastDirection === 'up' && up.isDown) {
    //                 player.setVelocityY(-speed);
    //                 moving = true;
    //             } else if (this.lastDirection === 'down' && down.isDown) {
    //                 player.setVelocityY(speed);
    //                 moving = true;
    //             }
    //         }

    //         if (!moving) {
    //             player.setVelocityX(0);
    //         }

    //         // Handle slashing
    //         if (space.isDown && !this.isSlashing) {
    //             this.isSlashing = true;

    //             // Determine which slash animation to play based on lastDirection
    //             let slashAnimation = 'slash-horizontal'; // Default slash animation
    //             if (this.lastDirection === 'up') {
    //                 slashAnimation = 'slash-up';
    //             } else if (this.lastDirection === 'down') {
    //                 slashAnimation = 'slash-down';
    //             } else if (
    //                 this.lastDirection === 'left' ||
    //                 this.lastDirection === 'right'
    //             ) {
    //                 slashAnimation = 'slash-horizontal';
    //             }

    //             player.setVelocity(0); // Stop movement while slashing
    //             player.anims.play(slashAnimation, true);

    //             player.once(`animationcomplete-${slashAnimation}`, () => {
    //                 this.isSlashing = false;
    //             });
    //             return; // Prevent movement while slashing
    //         }

    //         if (!this.isSlashing) {
    //             // Play the appropriate animation based on movement direction
    //             if (moving) {
    //                 switch (direction) {
    //                     case 'up':
    //                         player.anims.play('walk-up', true);
    //                         break;
    //                     case 'down':
    //                         player.anims.play('walk-down', true);
    //                         break;
    //                     case 'left':
    //                     case 'right':
    //                         player.anims.play(
    //                             shift.isDown
    //                                 ? 'walk-horizontal'
    //                                 : 'run-horizontal',
    //                             true
    //                         );
    //                         break;
    //                 }
    //             } else {
    //                 // If the player is not moving, play the idle animation
    //                 player.anims.play('idle', true);
    //             }
    //         }
    //     }
    // }

    update() {
        const { player, cursors } = this;

        if (cursors && player) {
            const { left, right, up, down, shift, space } = cursors;

            const speed = shift.isDown ? 100 : 160;

            // Reset velocity
            player.setVelocity(0);

            // Handle slashing
            if (space.isDown && !this.isSlashing) {
                this.isSlashing = true;
                let slashAnimation = 'slash-horizontal'; // Default slash animation
                if (this.lastDirection === 'up') {
                    slashAnimation = 'slash-up';
                } else if (this.lastDirection === 'down') {
                    slashAnimation = 'slash-down';
                }
                player.setVelocity(0); // Stop movement while slashing
                player.anims.play(slashAnimation, true);

                player.once(`animationcomplete-${slashAnimation}`, () => {
                    this.isSlashing = false;
                });
                return; // Prevent movement while slashing
            }

            if (!this.isSlashing) {
                // Determine movement direction
                let moving = false;

                // Update direction based on the most recent key press
                if (right.isDown) {
                    player.setVelocityX(speed);
                    player.flipX = false;
                    moving = true;
                    this.lastDirection = 'right';
                }
                if (left.isDown) {
                    player.setVelocityX(-speed);
                    player.flipX = true;
                    moving = true;
                    this.lastDirection = 'left';
                }
                if (up.isDown) {
                    player.setVelocityY(-speed);
                    moving = true;
                    this.lastDirection = 'up';
                }
                if (down.isDown) {
                    player.setVelocityY(speed);
                    moving = true;
                    this.lastDirection = 'down';
                }

                // Play the appropriate animation based on movement direction
                if (moving) {
                    let anim = 'walk-horizontal';
                    switch (this.lastDirection) {
                        case 'up':
                            anim = 'walk-up';
                            break;
                        case 'down':
                            anim = 'walk-down';
                            break;
                        case 'left':
                        case 'right':
                            anim = shift.isDown
                                ? 'run-horizontal'
                                : 'walk-horizontal';
                            break;
                    }
                    player.anims.play(anim, true);
                } else {
                    // If the player is not moving, play the idle animation
                    player.anims.play('idle', true);
                }
            }
        }
    }
}
