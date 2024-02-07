import { Cursors } from './entities/Cursors.interface';
import { IPlayer } from './entities/IPlayer.interface';
import { createPlayerAnimations } from './utils/createPlayerAnimations';
import { createPlayerControls } from './utils/createPlayerControls';

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

        this.cursors = createPlayerControls(scene);
        createPlayerAnimations(scene);

        this.player = scene.physics.add.sprite(
            position.x,
            position.y,
            'player1'
        );

        this.player.setCollideWorldBounds(true);
    }

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
                if (cursors.lastDirection === 'up') {
                    slashAnimation = 'slash-up';
                } else if (cursors.lastDirection === 'down') {
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
                    cursors.lastDirection = 'right';
                }
                if (left.isDown) {
                    player.setVelocityX(-speed);
                    player.flipX = true;
                    moving = true;
                    cursors.lastDirection = 'left';
                }
                if (up.isDown) {
                    player.setVelocityY(-speed);
                    moving = true;
                    cursors.lastDirection = 'up';
                }
                if (down.isDown) {
                    player.setVelocityY(speed);
                    moving = true;
                    cursors.lastDirection = 'down';
                }

                // Play the appropriate animation based on movement direction
                if (moving) {
                    let anim = 'walk-horizontal';
                    switch (cursors.lastDirection) {
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
