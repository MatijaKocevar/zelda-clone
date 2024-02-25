import {
    DOWN,
    Input,
    LEFT,
    RIGHT,
    SHIFT,
    SPACE,
    UP,
} from '../../../mechanics/Input/Input';
import { IPlayerMovement } from '../entities/IPlayerMovement.interface';

export class PlayerMovement {
    private player: Phaser.Physics.Arcade.Sprite;
    isSlashing = false;
    input: Input;

    constructor({ player }: IPlayerMovement) {
        this.player = player.sprite;
        this.input = new Input(player.scene);
    }

    update() {
        this.handleMovementAnimations();
        this.handleMovement();
    }

    handleMovement() {
        const { player } = this;
        const { keysPressed } = this.input;
        let movingVelocity = 250;

        if (keysPressed.current.includes(SHIFT)) {
            movingVelocity = 150;
        }

        if (this.isSlashing) {
            player.setVelocityX(0);
            player.setVelocityY(0);
        } else {
            player.setVelocityX(0);
            player.setVelocityY(0);

            const latestHorizontalKey = keysPressed.current
                .filter((key) => key === LEFT || key === RIGHT)
                .shift();
            const latestVerticalKey = keysPressed.current
                .filter((key) => key === UP || key === DOWN)
                .shift();

            if (latestHorizontalKey && latestVerticalKey) {
                movingVelocity = keysPressed.current.includes(SHIFT)
                    ? 130
                    : 180;
            }

            if (latestHorizontalKey === LEFT) {
                player.setVelocityX(-movingVelocity);
            } else if (latestHorizontalKey === RIGHT) {
                player.setVelocityX(movingVelocity);
            }

            if (latestVerticalKey === UP) {
                player.setVelocityY(-movingVelocity);
            } else if (latestVerticalKey === DOWN) {
                player.setVelocityY(movingVelocity);
            }
        }
    }

    handleMovementAnimations() {
        const { player } = this;
        const { keysPressed } = this.input;

        if (!this.isSlashing) {
            if (!keysPressed.current.includes(SHIFT)) {
                if (keysPressed.current[0] === LEFT) {
                    player.flipX = true;
                    player.anims.play('run-horizontal', true);
                } else if (keysPressed.current[0] === RIGHT) {
                    player.flipX = false;
                    player.anims.play('run-horizontal', true);
                }

                if (keysPressed.current[0] === UP) {
                    player.anims.play('run-up', true);
                } else if (keysPressed.current[0] === DOWN) {
                    player.anims.play('run-down', true);
                }
            } else {
                if (keysPressed.current[0] === LEFT) {
                    player.flipX = true;
                    player.anims.play('walk-horizontal', true);
                } else if (keysPressed.current[0] === RIGHT) {
                    player.flipX = false;
                    player.anims.play('walk-horizontal', true);
                }

                if (keysPressed.current[0] === UP) {
                    player.anims.play('walk-up', true);
                } else if (keysPressed.current[0] === DOWN) {
                    player.anims.play('walk-down', true);
                }
            }

            this.handleIdleAnimations();
        }
    }

    handleIdleAnimations() {
        const { player } = this;
        const { keysPressed, lastKey } = this.input;

        if (keysPressed.current.length === 0) {
            if (lastKey.current === LEFT) {
                player.flipX = true;
                player.anims.play('idle-horizontal', true);
            }
            if (lastKey.current === RIGHT) {
                player.flipX = false;
                player.anims.play('idle-horizontal', true);
            }
            if (lastKey.current === UP) {
                player.anims.play('idle-up', true);
            }
            if (lastKey.current === DOWN) {
                player.anims.play('idle-down', true);
            }
        }

        if (
            keysPressed.current.length === 1 &&
            (keysPressed.current[0] === SPACE ||
                keysPressed.current[0] === SHIFT) &&
            !this.isSlashing
        ) {
            if (lastKey.current === LEFT) {
                player.flipX = true;
                player.anims.play('idle-horizontal', true);
            }
            if (lastKey.current === RIGHT) {
                player.flipX = false;
                player.anims.play('idle-horizontal', true);
            }
            if (lastKey.current === UP) {
                player.anims.play('idle-up', true);
            }
            if (lastKey.current === DOWN) {
                player.anims.play('idle-down', true);
            }
        }
    }
}
