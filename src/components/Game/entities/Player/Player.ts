import { Cursors } from '../../../../types/Cursors.interface';
import {
    DOWN,
    Input,
    LEFT,
    RIGHT,
    SPACE,
    UP,
} from '../../mechanics/Input/Input';
import { IPlayer } from './IPlayer.interface';
import { createPlayerAnimations } from './utils/createPlayerAnimations';

export class Player {
    props: IPlayer;
    cursors?: Cursors;
    player: Phaser.Physics.Arcade.Sprite | undefined;
    isSlashing = false;
    input: Input;
    lastSlashTime = 0;
    slashCooldown = 1000;

    constructor(props: IPlayer) {
        this.props = props;
        this.input = new Input(props.scene);
        this.createPlayer();
    }

    createPlayer() {
        const { scene, position } = this.props;

        createPlayerAnimations(scene);

        this.player = scene.physics.add.sprite(
            position.x,
            position.y,
            'player1'
        );

        this.player.setCollideWorldBounds(true);
    }

    update() {
        this.handlePlayerMovement();
        this.handlePlayerAnimations();
    }

    handlePlayerMovement() {
        const { player } = this;
        const { keysPressed } = this.input;
        const currentTime = this.props.scene.time.now;

        if (player) {
            if (
                keysPressed.includes(SPACE) &&
                currentTime > this.lastSlashTime + this.slashCooldown &&
                !this.isSlashing
            ) {
                this.isSlashing = true;
                this.lastSlashTime = currentTime;
            }

            if (this.isSlashing) {
                player.setVelocityX(0);
                player.setVelocityY(0);
                return;
            }

            player.setVelocityX(0);
            player.setVelocityY(0);
            if (keysPressed.includes(LEFT)) {
                player.setVelocityX(-160);
            } else if (keysPressed.includes(RIGHT)) {
                player.setVelocityX(160);
            }

            if (keysPressed.includes(UP)) {
                player.setVelocityY(-160);
            } else if (keysPressed.includes(DOWN)) {
                player.setVelocityY(160);
            }
        }
    }

    handlePlayerAnimations() {
        const { player } = this;
        const { keysPressed } = this.input;

        if (player) {
            if (this.isSlashing) {
                if (player.anims.currentAnim?.key !== 'slash-horizontal') {
                    player.anims.play('slash-horizontal', true);

                    player.once('animationcomplete', () => {
                        this.isSlashing = false;
                    });
                }

                return;
            }

            if (keysPressed.includes(LEFT) && keysPressed[0] === LEFT) {
                player.anims.play('run-horizontal', true);
                player.flipX = true;
            }
            if (keysPressed.includes(RIGHT) && keysPressed[0] === RIGHT) {
                player.anims.play('run-horizontal', true);
                player.flipX = false;
            }
            if (keysPressed.includes(UP) && keysPressed[0] === UP) {
                player.anims.play('run-up', true);
            }
            if (keysPressed.includes(DOWN) && keysPressed[0] === DOWN) {
                player.anims.play('run-down', true);
            }
            if (keysPressed.length === 0) {
                player.anims.play('idle', true);
            }
        }
    }
}
