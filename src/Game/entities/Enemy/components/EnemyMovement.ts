import { Enemy } from '../Enemy';
import { IEnemyMovement } from '../entities/IEnemyMovement.interface';

export class EnemyMovement {
    private enemy: Enemy;
    isSlashing = false;

    private moveDistance = 300;
    private currentMoveDistance = 0;
    private movingRight = true;

    constructor({ enemy }: IEnemyMovement) {
        this.enemy = enemy;
    }

    public update() {
        this.handleAutomaticMovement();
    }

    private handleAutomaticMovement() {
        const { sprite } = this.enemy;
        if (this.isSlashing) {
            sprite.setVelocityX(0);
            sprite.anims.play('pinkazoid-idle-horizontal', true);
            return;
        }

        const velocity = this.movingRight ? 100 : -100;
        sprite.setVelocityX(velocity);

        sprite.anims.play('pinkazoid-walk-horizontal', true);
        sprite.flipX = !this.movingRight;

        this.currentMoveDistance +=
            (Math.abs(velocity) * this.enemy.scene.game.loop.delta) / 1000;

        if (this.currentMoveDistance >= this.moveDistance) {
            this.currentMoveDistance = 0; // Reset the distance counter
            this.movingRight = !this.movingRight; // Change direction
        }
    }
}
