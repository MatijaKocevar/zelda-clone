import { Player } from '../../Player/Player';
import { Enemy } from '../Enemy';
import { IEnemyMovement, PatrolPath } from '../Enemy.types';

export class EnemyMovement {
    private enemy: Enemy;
    private player?: Player;
    private spriteName: string;
    private patrolPath: PatrolPath[];
    private patrolIndex = 0;
    private currentMoveDistance = 0;
    private detectionRange = 200;
    private pauseTimer = 0;
    private isPaused = false;
    private alertSpeedMultiplier = 1.5;
    private lastDirection: 'left' | 'right' | 'up' | 'down' | 'horizontal' = 'horizontal';

    constructor({ enemy, patrolPath, spriteName }: IEnemyMovement) {
        this.enemy = enemy;
        this.spriteName = spriteName;
        this.patrolPath = patrolPath;
    }

    setPlayer(player: Player) {
        this.player = player;
    }

    public update() {
        if (this.isPaused) {
            this.handlePause();

            this.enemy.sprite.setVelocityX(0);
            this.enemy.sprite.setVelocityY(0);

            this.playIdleAnimation();
            return;
        }

        if (this.player) {
            const distanceToPlayer = Phaser.Math.Distance.Between(
                this.enemy.sprite.x,
                this.enemy.sprite.y,
                this.player.sprite.x,
                this.player.sprite.y
            );

            if (distanceToPlayer <= this.detectionRange) this.moveTowardsPlayer();
            else this.followPatrolPath();
        }
    }

    private moveTowardsPlayer() {
        if (this.player) {
            const playerCenterX = this.player.sprite.body?.center.x ?? 0;
            const playerCenterY = this.player.sprite.body?.center.y ?? 0;
            const enemyCenterX = this.enemy.sprite.body?.center.x ?? 0;
            const enemyCenterY = this.enemy.sprite.body?.center.y ?? 0;

            const angle = Phaser.Math.Angle.Between(enemyCenterX, enemyCenterY, playerCenterX, playerCenterY);

            const velocity = 100 * this.alertSpeedMultiplier;
            const velocityX = Math.cos(angle) * velocity;
            const velocityY = Math.sin(angle) * velocity;

            this.enemy.sprite.setVelocityX(velocityX);
            this.enemy.sprite.setVelocityY(velocityY);

            this.enemy.sprite.flipX = this.player.sprite.x < this.enemy.sprite.x;
            this.enemy.sprite.anims.play(`${this.spriteName}-walk-horizontal`, true);
        }
    }

    private followPatrolPath() {
        const path = this.patrolPath[this.patrolIndex];
        const { sprite } = this.enemy;
        const velocity = 100;

        switch (path.direction) {
            case 'left':
            case 'right':
                sprite.setVelocityY(0);
                sprite.setVelocityX(path.direction === 'right' ? velocity : -velocity);
                sprite.flipX = path.direction === 'left';
                break;
            case 'up':
            case 'down':
                sprite.setVelocityX(0);
                sprite.setVelocityY(path.direction === 'down' ? velocity : -velocity);
                break;
        }

        this.lastDirection = path.direction === 'left' || path.direction === 'right' ? 'horizontal' : path.direction;
        sprite.anims.play(`${this.spriteName}-walk-${this.lastDirection}`, true);

        this.currentMoveDistance += Math.abs(velocity * this.enemy.scene.game.loop.delta) / 1000;

        if (this.currentMoveDistance >= path.distance) this.prepareForPause();
    }

    private playIdleAnimation() {
        let idleAnimationName = `${this.spriteName}-idle-`;
        switch (this.lastDirection) {
            case 'left':
            case 'right':
            case 'horizontal':
                idleAnimationName += 'horizontal';
                break;
            case 'up':
                idleAnimationName += 'up';
                break;
            case 'down':
                idleAnimationName += 'down';
                break;
            default:
                idleAnimationName += 'horizontal';
                break;
        }

        this.enemy.sprite.anims.play(idleAnimationName, true);
    }

    private prepareForPause() {
        this.currentMoveDistance = 0;
        this.patrolIndex = (this.patrolIndex + 1) % this.patrolPath.length;
        this.isPaused = true;
        this.pauseTimer = 1000;
    }

    private handlePause() {
        if (this.pauseTimer > 0) this.pauseTimer -= this.enemy.scene.game.loop.delta;
        else this.isPaused = false;
    }
}
