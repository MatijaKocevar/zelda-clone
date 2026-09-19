import { Player } from '../../../player/player';
import { Enemy } from '../../enemy';
import { EnemyMovementConfig, IMovementBehavior, PatrolPath } from '../../enemy.types';
import { MovementBehavior } from './movement-behavior';

export class PatrolChaseMovement implements MovementBehavior {
    protected enemy: Enemy;
    protected player?: Player;
    protected config: EnemyMovementConfig;
    protected patrolPath: PatrolPath[];
    protected patrolIndex = 0;
    protected currentMoveDistance = 0;
    protected pauseTimer = 0;
    protected isPaused = false;
    protected lastDirection: 'left' | 'right' | 'up' | 'down' | 'horizontal' = 'horizontal';
    protected chaseAngle = 0;
    private startDelayTimer: number;

    constructor({ enemy, patrolPath, config, initialDelay }: IMovementBehavior) {
        this.enemy = enemy;
        this.config = config;
        this.patrolPath = patrolPath;
        this.startDelayTimer = initialDelay;
    }

    setPlayer(player: Player) {
        this.player = player;
    }

    public update() {
        const { enemy } = this;

        if (enemy.isDying || enemy.isDead || enemy.isDestroyed) return;

        if (this.startDelayTimer > 0) {
            this.startDelayTimer -= enemy.scene.game.loop.delta;
            enemy.sprite.setVelocity(0, 0);
            this.playIdleAnimation();
            return;
        }

        if (enemy.isKnockedBack || enemy.enemyAttack.isAttacking) return;

        if (this.isPaused) {
            this.handlePause();

            enemy.sprite.setVelocity(0, 0);

            this.playIdleAnimation();
            return;
        }

        if (!this.player) return;

        const distanceToPlayer = Phaser.Math.Distance.Between(
            enemy.sprite.x,
            enemy.sprite.y,
            this.player.sprite.x,
            this.player.sprite.y,
        );

        if (distanceToPlayer <= this.config.detectionRange) this.moveTowardsPlayer();
        else this.followPatrolPath();
    }

    protected moveTowardsPlayer() {
        if (!this.player) return;

        const playerCenterX = this.player.sprite.body?.center.x ?? 0;
        const playerCenterY = this.player.sprite.body?.center.y ?? 0;
        const enemyCenterX = this.enemy.sprite.body?.center.x ?? 0;
        const enemyCenterY = this.enemy.sprite.body?.center.y ?? 0;

        this.chaseAngle = Phaser.Math.Angle.Between(enemyCenterX, enemyCenterY, playerCenterX, playerCenterY);

        this.enemy.sprite.setVelocityX(Math.cos(this.chaseAngle) * this.config.chaseSpeed);
        this.enemy.sprite.setVelocityY(Math.sin(this.chaseAngle) * this.config.chaseSpeed);

        this.enemy.sprite.flipX = this.player.sprite.x < this.enemy.sprite.x;
        this.enemy.sprite.anims.play(this.getChaseAnimation(), true);
    }

    protected followPatrolPath() {
        const path = this.patrolPath[this.patrolIndex];
        const { sprite } = this.enemy;
        const velocity = this.config.moveSpeed;

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
        sprite.anims.play(`${this.enemy.spriteName}-walk-${this.lastDirection}`, true);

        this.currentMoveDistance += Math.abs(velocity * this.enemy.scene.game.loop.delta) / 1000;

        if (this.currentMoveDistance >= path.distance) this.prepareForPause();
    }

    protected playIdleAnimation() {
        let idleAnimationName = `${this.enemy.spriteName}-idle-`;
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

    protected prepareForPause() {
        this.currentMoveDistance = 0;
        this.patrolIndex = (this.patrolIndex + 1) % this.patrolPath.length;
        this.isPaused = true;
        this.pauseTimer = this.config.pauseDuration;
    }

    protected handlePause() {
        if (this.pauseTimer > 0) this.pauseTimer -= this.enemy.scene.game.loop.delta;
        else this.isPaused = false;
    }

    protected getChaseAnimation(): string {
        return `${this.enemy.spriteName}-walk-horizontal`;
    }
}
