import { Position } from '../../../../types/Position.interface';
import { PlayerAnimations } from '../../mechanics/Animations/PlayerAnimations';
import {
    DOWN,
    Input,
    LEFT,
    RIGHT,
    SPACE,
    UP,
} from '../../mechanics/Input/Input';
import { IPlayer } from './IPlayer.interface';

export class Player {
    scene: Phaser.Scene;
    position: Position;
    player: Phaser.Physics.Arcade.Sprite;
    playerAnimations: PlayerAnimations;
    isSlashing = false;
    input: Input;
    lastSlashTime = 0;
    slashCooldown = 500;

    constructor({ position, scene }: IPlayer) {
        this.scene = scene;
        this.position = position;
        this.input = new Input(scene);
        this.playerAnimations = new PlayerAnimations(scene);
        this.player = scene.physics.add.sprite(
            position.x,
            position.y,
            'player1'
        );
        this.setPlayerOptions();
    }

    setPlayerOptions() {
        this.player.setCollideWorldBounds(true);
    }

    update() {
        this.handleAttack();
        this.handlePlayerAnimations();
        this.handlePlayerMovement();
    }

    handleAttack() {
        const { player } = this;
        const { keysPressed } = this.input;
        const currentTime = this.scene.time.now;

        if (player && keysPressed.includes(SPACE)) {
            if (
                !this.isSlashing ||
                (this.isSlashing &&
                    currentTime - this.lastSlashTime > this.slashCooldown)
            ) {
                if (currentTime - this.lastSlashTime > this.slashCooldown) {
                    this.isSlashing = true;
                    this.lastSlashTime = currentTime;

                    this.handleAttackAnimation();
                }
            }
        }
    }

    handleAttackAnimation() {
        const { player } = this;
        const { keysPressed } = this.input;

        if (player) {
            const direction = keysPressed.find((key) =>
                [LEFT, RIGHT, UP, DOWN].includes(key)
            );
            const defaultDirection = this.player?.flipX ? LEFT : RIGHT;

            if (
                direction === LEFT ||
                (!direction && defaultDirection === LEFT)
            ) {
                player.flipX = true;
                player.anims.play('slash-horizontal', true);
            } else if (
                direction === RIGHT ||
                (!direction && defaultDirection === RIGHT)
            ) {
                player.flipX = false;
                player.anims.play('slash-horizontal', true);
            } else if (direction === UP) {
                player.anims.play('slash-up', true);
            } else if (direction === DOWN) {
                player.anims.play('slash-down', true);
            } else {
                player.anims.play('slash-horizontal', true);
            }

            player.once('animationcomplete-slash-horizontal', () => {
                this.isSlashing = false;
                this.handlePlayerAnimations();
            });
            player.once('animationcomplete-slash-up', () => {
                this.isSlashing = false;
                this.handlePlayerAnimations();
            });
            player.once('animationcomplete-slash-down', () => {
                this.isSlashing = false;
                this.handlePlayerAnimations();
            });
        }
    }

    handlePlayerMovement() {
        const { player } = this;
        const { keysPressed } = this.input;

        if (player) {
            if (this.isSlashing) {
                player.setVelocityX(0);
                player.setVelocityY(0);
            } else {
                player.setVelocityX(0);
                player.setVelocityY(0);

                const latestHorizontalKey = keysPressed
                    .filter((key) => key === LEFT || key === RIGHT)
                    .pop();
                const latestVerticalKey = keysPressed
                    .filter((key) => key === UP || key === DOWN)
                    .pop();

                if (latestHorizontalKey === LEFT) {
                    player.setVelocityX(-160);
                } else if (latestHorizontalKey === RIGHT) {
                    player.setVelocityX(160);
                }

                if (latestVerticalKey === UP) {
                    player.setVelocityY(-160);
                } else if (latestVerticalKey === DOWN) {
                    player.setVelocityY(160);
                }
            }
        }
    }

    handlePlayerAnimations() {
        const { player } = this;
        const { keysPressed } = this.input;

        if (player && !this.isSlashing) {
            if (keysPressed[0] === LEFT) {
                player.flipX = true;
                player.anims.play('run-horizontal', true);
            }
            if (keysPressed[0] === RIGHT) {
                player.flipX = false;
                player.anims.play('run-horizontal', true);
            }

            if (keysPressed[0] === UP) {
                player.anims.play('run-up', true);
            }
            if (keysPressed[0] === DOWN) {
                player.anims.play('run-down', true);
            }

            this.handleIdleAnimations();
        }
    }

    handleIdleAnimations() {
        const { player } = this;
        const { keysPressed, cursors } = this.input;
        if (player && keysPressed.length === 0) {
            if (cursors?.lastKey === LEFT) {
                player.flipX = true;
                player.anims.play('idle-horizontal', true);
            }
            if (cursors?.lastKey === RIGHT) {
                player.flipX = false;
                player.anims.play('idle-horizontal', true);
            }
            if (cursors?.lastKey === UP) {
                player.anims.play('idle-up', true);
            }
            if (cursors?.lastKey === DOWN) {
                player.anims.play('idle-down', true);
            }
        }

        if (
            player &&
            keysPressed.length === 1 &&
            keysPressed[0] === SPACE &&
            !this.isSlashing
        ) {
            if (cursors?.lastKey === LEFT) {
                player.flipX = true;
                player.anims.play('idle-horizontal', true);
            }
            if (cursors?.lastKey === RIGHT) {
                player.flipX = false;
                player.anims.play('idle-horizontal', true);
            }
            if (cursors?.lastKey === UP) {
                player.anims.play('idle-up', true);
            }
            if (cursors?.lastKey === DOWN) {
                player.anims.play('idle-down', true);
            }
        }
    }
}
