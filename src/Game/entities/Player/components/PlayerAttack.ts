import {
    DOWN,
    Input,
    LEFT,
    RIGHT,
    SPACE,
    UP,
} from '../../../mechanics/Input/Input';
import { IPlayerAttack } from './entities/IPlayerAttack.interface';
import { PlayerMovement } from './PlayerMovement';

export class PlayerAttack {
    private player: Phaser.Physics.Arcade.Sprite;
    private playerMovement: PlayerMovement;
    private lastSlashTime = 0;
    private slashCooldown = 500;
    private input: Input;

    constructor({ player, scene, playerMovement }: IPlayerAttack) {
        this.player = player;
        this.playerMovement = playerMovement;
        this.input = new Input(scene);
    }

    update() {
        this.handleAttack();
    }

    handleAttack() {
        const { keysPressed } = this.input;
        const currentTime = this.player.scene.time.now;

        if (keysPressed.includes(SPACE)) {
            if (
                !this.playerMovement.isSlashing ||
                (this.playerMovement.isSlashing &&
                    currentTime - this.lastSlashTime > this.slashCooldown)
            ) {
                if (currentTime - this.lastSlashTime > this.slashCooldown) {
                    this.playerMovement.isSlashing = true;
                    this.lastSlashTime = currentTime;

                    this.handleAttackAnimation();
                }
            }
        }
    }

    handleAttackAnimation() {
        const { player } = this;
        const { keysPressed, cursors } = this.input;

        const direction = keysPressed.find((key) =>
            [LEFT, RIGHT, UP, DOWN].includes(key)
        );
        const defaultDirection = this.player?.flipX ? LEFT : RIGHT;

        if (direction === LEFT || (!direction && defaultDirection === LEFT)) {
            player.flipX = true;
            player.anims.play('slash-horizontal', true);
        } else if (
            direction === RIGHT ||
            (!direction && defaultDirection === RIGHT)
        ) {
            player.flipX = false;
            player.anims.play('slash-horizontal', true);
        }

        if (direction === UP) {
            player.anims.play('slash-up', true);
        } else if (direction === DOWN) {
            player.anims.play('slash-down', true);
        } else {
            player.anims.play('slash-horizontal', true);
        }

        if (!direction) {
            if (cursors?.lastKey === LEFT) {
                player.flipX = true;
                player.anims.play('slash-horizontal', true);
            } else if (cursors?.lastKey === RIGHT) {
                player.flipX = false;
                player.anims.play('slash-horizontal', true);
            }

            if (cursors?.lastKey === UP) {
                player.anims.play('slash-up', true);
            } else if (cursors?.lastKey === DOWN) {
                player.anims.play('slash-down', true);
            }
        }

        player.once('animationcomplete-slash-horizontal', () => {
            this.playerMovement.isSlashing = false;
            this.playerMovement.handleMovementAnimations();
        });
        player.once('animationcomplete-slash-up', () => {
            this.playerMovement.isSlashing = false;
            this.playerMovement.handleMovementAnimations();
        });
        player.once('animationcomplete-slash-down', () => {
            this.playerMovement.isSlashing = false;
            this.playerMovement.handleMovementAnimations();
        });
    }
}
