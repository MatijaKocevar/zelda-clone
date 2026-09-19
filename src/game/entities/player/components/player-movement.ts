import { DOWN, Input, LEFT, RIGHT, SHIFT, SPACE, UP } from '../../../mechanics/input/input';
import { GamepadInput } from '../../../mechanics/gamepad-input';
import { Player } from '../player';

export class PlayerMovement {
    private player: Player;
    input: Input;
    gamepadInput: GamepadInput;

    constructor(player: Player) {
        this.player = player;
        this.input = new Input(player.scene);
        this.gamepadInput = new GamepadInput(player.scene);
    }

    update() {
        this.gamepadInput.update();
        this.handleMovementAnimations();
        this.handleMovement();
    }

    handleMovement() {
        const { player } = this;
        const { inputState } = this.input;

        if (player.playerDamage.isHurt || player.playerDamage.isDead) return;

        player.sprite.setVelocityX(0);
        player.sprite.setVelocityY(0);

        if (!player.playerAttack.isSlashing) {
            const isShiftPressed = inputState.isPressed(SHIFT);
            const movingVelocity = isShiftPressed ? 150 : 250;
            const diagonalVelocity = isShiftPressed ? 130 : 180;

            const horizontalKey = inputState.keysPressed.find((key) => key === LEFT || key === RIGHT);
            const verticalKey = inputState.keysPressed.find((key) => key === UP || key === DOWN);

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
        const { inputState } = this.input;

        if (player.playerDamage.isHurt || player.playerDamage.isDead) return;

        if (!player.playerAttack.isSlashing) {
            const direction = inputState.keysPressed[0];
            const isWalking = inputState.isPressed(SHIFT);
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
        const { inputState } = this.input;

        const shouldPlayIdleAnimation =
            inputState.keysPressed.length === 0 ||
            (inputState.keysPressed.length === 1 &&
                (inputState.keysPressed[0] === SPACE || inputState.keysPressed[0] === SHIFT) &&
                !player.playerAttack.isSlashing);

        if (shouldPlayIdleAnimation) {
            switch (inputState.lastKey) {
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
