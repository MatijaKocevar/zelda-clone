import { Player } from '../../../player/player';
import { Enemy } from '../../enemy';
import { EnemyAttackConfig, IAttackBehavior } from '../../enemy.types';
import { AttackBehavior } from './attack-behavior';

export class MeleeAttack implements AttackBehavior {
    protected enemy: Enemy;
    protected player?: Player;
    protected config: EnemyAttackConfig;
    isAttacking = false;
    private cooldownTimer = 0;
    private windUpTimer = 0;
    private hasDealtDamage = false;

    constructor({ enemy, config }: IAttackBehavior) {
        this.enemy = enemy;
        this.config = config;
    }

    setPlayer(player: Player) {
        this.player = player;
    }

    update() {
        const { enemy } = this;

        if (enemy.isDying || enemy.isDead || enemy.isDestroyed) return;

        if (this.cooldownTimer > 0) this.cooldownTimer -= enemy.scene.game.loop.delta;

        if (this.isAttacking) {
            this.windUpTimer -= enemy.scene.game.loop.delta;

            if (this.windUpTimer <= 0 && !this.hasDealtDamage) {
                this.hasDealtDamage = true;
                this.dealDamage();
            }

            return;
        }

        if (enemy.isKnockedBack || this.cooldownTimer > 0) return;

        if (this.isPlayerInRange()) this.startAttack();
    }

    protected startAttack() {
        if (!this.player) return;

        this.isAttacking = true;
        this.hasDealtDamage = false;
        this.windUpTimer = this.config.windUp;

        this.enemy.sprite.setVelocity(0, 0);

        const directionX = this.player.sprite.x - this.enemy.sprite.x;
        const directionY = this.player.sprite.y - this.enemy.sprite.y;

        this.enemy.sprite.anims.play(
            `${this.enemy.spriteName}-attack-${this.getAttackDirection(directionX, directionY)}`,
            true,
        );
        this.enemy.sprite.once('animationcomplete', () => this.onAttackComplete());
    }

    protected onAttackComplete() {
        this.isAttacking = false;
        this.cooldownTimer = this.config.cooldown;
    }

    protected dealDamage() {
        const { player, enemy } = this;
        if (!player || !this.isPlayerInRange()) return;

        const directionX = player.sprite.x - enemy.sprite.x;
        const directionY = player.sprite.y - enemy.sprite.y;
        const distance = Math.hypot(directionX, directionY) || 1;

        player.playerDamage.takeDamage(this.config.damage, directionX / distance, directionY / distance);
    }

    protected isPlayerInRange(): boolean {
        const { player, enemy } = this;
        if (!player) return false;

        const playerBody = player.sprite.body as Phaser.Physics.Arcade.Body | null;
        const enemyBody = enemy.sprite.body as Phaser.Physics.Arcade.Body | null;
        if (!playerBody || !enemyBody) return false;

        const directionX = playerBody.center.x - enemyBody.center.x;
        const directionY = playerBody.center.y - enemyBody.center.y;

        const withinX = Math.abs(directionX) < playerBody.halfWidth + enemyBody.halfWidth + this.config.rangeMargin;
        const withinY = Math.abs(directionY) < playerBody.halfHeight + enemyBody.halfHeight + this.config.rangeMargin;

        return withinX && withinY;
    }

    protected getAttackDirection(directionX: number, directionY: number): 'horizontal' | 'up' | 'down' {
        if (Math.abs(directionX) >= Math.abs(directionY)) {
            this.enemy.sprite.flipX = directionX < 0;
            return 'horizontal';
        }

        return directionY < 0 ? 'up' : 'down';
    }
}
