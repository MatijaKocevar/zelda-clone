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

        player.playerSprite.sprite.setVelocityX(0);
        player.playerSprite.sprite.setVelocityY(0);

        if (!player.playerAttack.isSlashing) {
            const isShiftPressed = keysPressed.current.includes(SHIFT);
            const movingVelocity = isShiftPressed ? 150 : 250;
            const diagonalVelocity = isShiftPressed ? 130 : 180;

            const horizontalKey = keysPressed.current.find((key) => key === LEFT || key === RIGHT);
            const verticalKey = keysPressed.current.find((key) => key === UP || key === DOWN);

            let velocityX = 0,
                velocityY = 0;

            if (horizontalKey && !player.playerSprite.isCollidingWithBlock)
                velocityX = horizontalKey === LEFT ? -movingVelocity : movingVelocity;
            if (verticalKey && !player.playerSprite.isCollidingWithBlock)
                velocityY = verticalKey === UP ? -movingVelocity : movingVelocity;

            if (horizontalKey && verticalKey && !player.playerSprite.isCollidingWithBlock) {
                velocityX *= diagonalVelocity / movingVelocity;
                velocityY *= diagonalVelocity / movingVelocity;
            }

            if (!player.playerSprite.isCollidingWithBlock) {
                player.playerSprite.sprite.setVelocityX(velocityX);
                player.playerSprite.sprite.setVelocityY(velocityY);
            }

            player.playerSprite.collisionHitbox.setVelocityX(velocityX);
            player.playerSprite.collisionHitbox.setVelocityY(velocityY);
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
                player.playerSprite.sprite.flipX = direction === LEFT;
            } else if (direction === UP) {
                animationDirection = '-up';
                player.playerSprite.sprite.flipX = false;
            } else if (direction === DOWN) {
                animationDirection = '-down';
                player.playerSprite.sprite.flipX = false;
            }

            if (animationDirection) {
                player.playerSprite.sprite.anims.play(`${animationPrefix}${animationDirection}`, true);
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
                    player.playerSprite.sprite.flipX = true;
                    player.playerSprite.sprite.anims.play('idle-horizontal', true);
                    break;
                case RIGHT:
                    player.playerSprite.sprite.flipX = false;
                    player.playerSprite.sprite.anims.play('idle-horizontal', true);
                    break;
                case UP:
                    player.playerSprite.sprite.anims.play('idle-up', true);
                    break;
                case DOWN:
                    player.playerSprite.sprite.anims.play('idle-down', true);
                    break;
            }
        }
    }
}
