import {
    DOWN,
    Input,
    LEFT,
    RIGHT,
    SPACE,
    UP,
} from '../../../mechanics/Input/Input';

interface IPlayerMovement {
    player: Phaser.Physics.Arcade.Sprite;
    scene: Phaser.Scene;
}

export class PlayerMovement {
    private player: Phaser.Physics.Arcade.Sprite;
    isSlashing = false;
    private input: Input;

    constructor({ player, scene }: IPlayerMovement) {
        this.player = player;
        this.input = new Input(scene);
    }

    update() {
        this.handleMovementAnimations();
        this.handleMovement();
    }

    handleMovement() {
        const { player } = this;
        const { keysPressed } = this.input;

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

    handleMovementAnimations() {
        const { player } = this;
        const { keysPressed } = this.input;

        if (!this.isSlashing) {
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

        if (keysPressed.length === 0) {
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
