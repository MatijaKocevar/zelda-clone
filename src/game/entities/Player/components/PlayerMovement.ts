import { DOWN, Input, LEFT, RIGHT, SHIFT, SPACE, UP } from '../../../mechanics/Input/Input';
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

        player.sprite.setVelocityX(0);
        player.sprite.setVelocityY(0);

        if (!player.playerAttack.isSlashing) {
            const isShiftPressed = keysPressed.current.includes(SHIFT);
            const movingVelocity = isShiftPressed ? 150 : 250;
            const diagonalVelocity = isShiftPressed ? 130 : 180;

            const horizontalKey = keysPressed.current.find((key) => key === LEFT || key === RIGHT);
            const verticalKey = keysPressed.current.find((key) => key === UP || key === DOWN);

            let velocityX = 0,
                velocityY = 0;

            if (horizontalKey) velocityX = horizontalKey === LEFT ? -movingVelocity : movingVelocity;
            if (verticalKey) velocityY = verticalKey === UP ? -movingVelocity : movingVelocity;

            if (horizontalKey && verticalKey) {
                velocityX *= diagonalVelocity / movingVelocity;
                velocityY *= diagonalVelocity / movingVelocity;
            }

            player.sprite.setVelocityX(velocityX);
            player.sprite.setVelocityY(velocityY);
        }
    }

    handleMovementAnimations() {
        const { player } = this;
        const { keysPressed } = this.input;

        if (!player.playerAttack.isSlashing) {
            const direction = keysPressed.current[0];
            const isWalking = keysPressed.current.includes(SHIFT);
            const animationPrefix = isWalking ? 'walk' : 'run';

            let animationDirection = '';
            if (direction === LEFT || direction === RIGHT) {
                animationDirection = '-horizontal';
                player.sprite.flipX = direction === LEFT;
            } else if (direction === UP) {
                animationDirection = '-up';
            } else if (direction === DOWN) {
                animationDirection = '-down';
            }

            if (animationDirection) {
                player.sprite.anims.play(`${animationPrefix}${animationDirection}`, true);
            }

            this.handleIdleAnimations();
        }
    }

    handleIdleAnimations() {
        const { player } = this;
        const { keysPressed, lastKey } = this.input;

        const shouldPlayIdleAnimation =
            keysPressed.current.length === 0 ||
            (keysPressed.current.length === 1 &&
                (keysPressed.current[0] === SPACE || keysPressed.current[0] === SHIFT) &&
                !player.playerAttack.isSlashing);

        if (shouldPlayIdleAnimation) {
            switch (lastKey.current) {
                case LEFT:
                    player.sprite.flipX = true;
                    player.sprite.anims.play('idle-horizontal', true);
                    break;
                case RIGHT:
                    player.sprite.flipX = false;
                    player.sprite.anims.play('idle-horizontal', true);
                    break;
                case UP:
                    player.sprite.anims.play('idle-up', true);
                    break;
                case DOWN:
                    player.sprite.anims.play('idle-down', true);
                    break;
            }
        }
    }
}
