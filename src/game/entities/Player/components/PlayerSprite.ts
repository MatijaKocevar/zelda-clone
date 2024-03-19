import { LEFT, RIGHT } from '../../../mechanics/Input/Input';
import { Position, Size } from '../../../types/common';
import { Player } from '../Player';

export class PlayerSprite {
    player: Player;
    sprite: Phaser.Physics.Arcade.Sprite;
    collisionHitbox: Phaser.Physics.Arcade.Sprite;
    direction: string = RIGHT;
    isCollidingWithBlock = false;

    constructor(player: Player) {
        this.player = player;
        this.sprite = player.scene.physics.add.sprite(player.position.x, player.position.y, 'player1');
        this.collisionHitbox = player.scene.physics.add
            .sprite(player.position.x, player.position.y, 'hitboxKey')
            .setSize(46, 64)
            .setOffset(-4, 7)
            .setVisible(false)
            .setScrollFactor(0);

        this.updateProperties(RIGHT);
    }

    private updateProperties(direction: string) {
        const playerSize: Size = { height: 23, width: 13 };
        const playerOffset: Position = direction === LEFT ? { x: 64, y: 95 } : { x: 67, y: 95 };
        this.updateGameObjectProperties(this.sprite, playerSize, playerOffset);

        const hitboxSize: Size = { height: 64, width: 46 };
        const hitboxOffset: Position = direction === LEFT ? { x: -8, y: 7 } : { x: -5, y: 7 };
        this.updateGameObjectProperties(this.collisionHitbox, hitboxSize, hitboxOffset);
    }

    private updateGameObjectProperties(gameObject: Phaser.Physics.Arcade.Sprite, size: Size, offset: Position) {
        gameObject.setSize(size.width, size.height).setOffset(offset.x, offset.y);
    }

    update() {
        const { keysPressed } = this.player.playerMovement.input;
        const newDirection = keysPressed.current[0];

        if (newDirection && this.direction !== newDirection) {
            this.direction = newDirection;
            this.updateProperties(this.direction);
        }
    }

    destroy() {
        this.sprite.destroy();
        this.collisionHitbox.destroy();
    }
}
