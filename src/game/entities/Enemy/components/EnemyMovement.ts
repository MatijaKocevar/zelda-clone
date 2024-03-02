import { Player } from '../../Player/Player';
import { Enemy } from '../Enemy';
import { IEnemyMovement } from '../Enemy.types';

export class EnemyMovement {
    private enemy: Enemy;
    private player?: Player;
    private spriteName: string;
    private moveDirection: 'horizontal' | 'vertical';
    private moveDistance = 300;
    private currentMoveDistance = 0;
    private movingPositive = true;
    private detectionRange = 200;

    constructor({ enemy, moveDirection, spriteName }: IEnemyMovement) {
        this.enemy = enemy;
        this.spriteName = spriteName;
        this.moveDirection = moveDirection;
    }

    setPlayer(player: Player) {
        this.player = player;
    }

    public update() {
        if (this.player) {
            const distanceToPlayer = Phaser.Math.Distance.Between(
                this.enemy.sprite.x,
                this.enemy.sprite.y,
                this.player.sprite.x,
                this.player.sprite.y
            );

            if (distanceToPlayer <= this.detectionRange) {
                this.moveTowardsPlayer();
            } else {
                this.handleAutomaticMovement();
            }
        }
    }

    private moveTowardsPlayer() {
        if (this.player) {
            const playerCenter = this.player.sprite.getCenter();
            const enemyCenter = this.enemy.sprite.getCenter();

            const angle = Phaser.Math.Angle.Between(
                enemyCenter.x ?? 0,
                enemyCenter.y ?? 0,
                playerCenter.x ?? 0,
                playerCenter.y ?? 0
            );

            const velocity = 100;
            this.enemy.sprite.setVelocityX(Math.cos(angle) * velocity);
            this.enemy.sprite.setVelocityY(Math.sin(angle) * velocity);

            this.enemy.sprite.flipX =
                this.player.sprite.x < this.enemy.sprite.x;

            this.enemy.sprite.anims.play(
                `${this.spriteName}-walk-horizontal`,
                true
            );
        }
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
