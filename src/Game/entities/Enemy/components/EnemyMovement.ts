import { Enemy } from '../Enemy';
import { IEnemyMovement } from '../entities/IEnemyMovement.interface';

export class EnemyMovement {
    private enemy: Enemy;
    private spriteName: string;
    private moveDirection: 'horizontal' | 'vertical';
    private moveDistance = 300;
    private currentMoveDistance = 0;
    private movingPositive = true;

    constructor({ enemy, moveDirection, spriteName }: IEnemyMovement) {
        this.enemy = enemy;
        this.spriteName = spriteName;
        this.moveDirection = moveDirection;
    }

    public update() {
        this.handleAutomaticMovement();
    }

    private handleAutomaticMovement() {
        const { sprite } = this.enemy;

        const velocity = this.movingPositive ? 100 : -100;
        if (this.moveDirection === 'horizontal') {
            sprite.setVelocityX(velocity);
            sprite.anims.play(`${this.spriteName}-walk-horizontal`, true);
            sprite.flipX = !this.movingPositive;
        } else {
            sprite.setVelocityY(velocity);
            const animationName = this.movingPositive
                ? `${this.spriteName}-walk-down`
                : `${this.spriteName}-walk-up`;
            sprite.anims.play(animationName, true);
        }

        this.currentMoveDistance +=
            (Math.abs(velocity) * this.enemy.scene.game.loop.delta) / 1000;
        if (this.currentMoveDistance >= this.moveDistance) {
            this.currentMoveDistance = 0;
            this.movingPositive = !this.movingPositive;
        }
    }
}
