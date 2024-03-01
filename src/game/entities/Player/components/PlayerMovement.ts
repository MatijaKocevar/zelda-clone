import {
    DOWN,
    Input,
    LEFT,
    RIGHT,
    SHIFT,
    SPACE,
    UP,
} from '../../../mechanics/Input/Input';
import { Player } from '../Player';

export class PlayerMovement {
    private player: Player;
    input: Input;

    constructor(player: Player) {
        this.player = player;
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

        if (player.playerAttack.isSlashing) {
            player.sprite.setVelocityX(0);
            player.sprite.setVelocityY(0);
        } else {
            player.sprite.setVelocityX(0);
            player.sprite.setVelocityY(0);

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
                player.sprite.setVelocityX(-movingVelocity);
            } else if (latestHorizontalKey === RIGHT) {
                player.sprite.setVelocityX(movingVelocity);
            }

            if (latestVerticalKey === UP) {
                player.sprite.setVelocityY(-movingVelocity);
            } else if (latestVerticalKey === DOWN) {
                player.sprite.setVelocityY(movingVelocity);
            }
        }
    }

    handleMovementAnimations() {
        const { player } = this;
        const { keysPressed } = this.input;

        if (!player.playerAttack.isSlashing) {
            if (!keysPressed.current.includes(SHIFT)) {
                if (keysPressed.current[0] === LEFT) {
                    player.sprite.flipX = true;
                    player.sprite.anims.play('run-horizontal', true);
                } else if (keysPressed.current[0] === RIGHT) {
                    player.sprite.flipX = false;
                    player.sprite.anims.play('run-horizontal', true);
                }

                if (keysPressed.current[0] === UP) {
                    player.sprite.anims.play('run-up', true);
                } else if (keysPressed.current[0] === DOWN) {
                    player.sprite.anims.play('run-down', true);
                }
            } else {
                if (keysPressed.current[0] === LEFT) {
                    player.sprite.flipX = true;
                    player.sprite.anims.play('walk-horizontal', true);
                } else if (keysPressed.current[0] === RIGHT) {
                    player.sprite.flipX = false;
                    player.sprite.anims.play('walk-horizontal', true);
                }

                if (keysPressed.current[0] === UP) {
                    player.sprite.anims.play('walk-up', true);
                } else if (keysPressed.current[0] === DOWN) {
                    player.sprite.anims.play('walk-down', true);
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
                player.sprite.flipX = true;
                player.sprite.anims.play('idle-horizontal', true);
            }
            if (lastKey.current === RIGHT) {
                player.sprite.flipX = false;
                player.sprite.anims.play('idle-horizontal', true);
            }
            if (lastKey.current === UP) {
                player.sprite.anims.play('idle-up', true);
            }
            if (lastKey.current === DOWN) {
                player.sprite.anims.play('idle-down', true);
            }
        }

        if (
            keysPressed.current.length === 1 &&
            (keysPressed.current[0] === SPACE ||
                keysPressed.current[0] === SHIFT) &&
            !player.playerAttack.isSlashing
        ) {
            if (lastKey.current === LEFT) {
                player.sprite.flipX = true;
                player.sprite.anims.play('idle-horizontal', true);
            }
            if (lastKey.current === RIGHT) {
                player.sprite.flipX = false;
                player.sprite.anims.play('idle-horizontal', true);
            }
            if (lastKey.current === UP) {
                player.sprite.anims.play('idle-up', true);
            }
            if (lastKey.current === DOWN) {
                player.sprite.anims.play('idle-down', true);
            }
        }
    }
}
