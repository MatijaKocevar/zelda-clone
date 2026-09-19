import { Player } from '../../Player/Player';
import { CONTACT_DAMAGE } from '../../Player/components/PlayerDamage';
import { Enemy } from '../Enemy';
import { IEnemyAttack } from '../Enemy.types';

const WIND_UP_DURATION = 200;
const ATTACK_COOLDOWN = 700;
const ATTACK_RANGE_MARGIN = 8;

export class EnemyAttack {
    private enemy: Enemy;
    private spriteName: string;
    private player?: Player;
    isAttacking = false;
    private cooldownTimer = 0;
    private windUpTimer = 0;
    private hasDealtDamage = false;

    constructor({ enemy, spriteName }: IEnemyAttack) {
        this.enemy = enemy;
        this.spriteName = spriteName;
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

    private startAttack() {
        if (!this.player) return;

        this.isAttacking = true;
        this.hasDealtDamage = false;
        this.windUpTimer = WIND_UP_DURATION;

        this.enemy.sprite.setVelocity(0, 0);

        const directionX = this.player.sprite.x - this.enemy.sprite.x;
        const directionY = this.player.sprite.y - this.enemy.sprite.y;

        this.enemy.sprite.anims.play(`${this.spriteName}-attack-${this.getAttackDirection(directionX, directionY)}`, true);
        this.enemy.sprite.once('animationcomplete', () => this.onAttackComplete());
    }

    private onAttackComplete() {
        this.isAttacking = false;
        this.cooldownTimer = ATTACK_COOLDOWN;
    }

    private dealDamage() {
        const { player, enemy } = this;
        if (!player || !this.isPlayerInRange()) return;

        const directionX = player.sprite.x - enemy.sprite.x;
        const directionY = player.sprite.y - enemy.sprite.y;
        const distance = Math.hypot(directionX, directionY) || 1;

        player.playerDamage.takeDamage(CONTACT_DAMAGE, directionX / distance, directionY / distance);
    }

    private isPlayerInRange(): boolean {
        const { player, enemy } = this;
        if (!player) return false;

        const playerBody = player.sprite.body as Phaser.Physics.Arcade.Body | null;
        const enemyBody = enemy.sprite.body as Phaser.Physics.Arcade.Body | null;
        if (!playerBody || !enemyBody) return false;

        const directionX = playerBody.center.x - enemyBody.center.x;
        const directionY = playerBody.center.y - enemyBody.center.y;

        const withinX = Math.abs(directionX) < playerBody.halfWidth + enemyBody.halfWidth + ATTACK_RANGE_MARGIN;
        const withinY = Math.abs(directionY) < playerBody.halfHeight + enemyBody.halfHeight + ATTACK_RANGE_MARGIN;

        return withinX && withinY;
    }

    private getAttackDirection(directionX: number, directionY: number): 'horizontal' | 'up' | 'down' {
        if (Math.abs(directionX) >= Math.abs(directionY)) {
            this.enemy.sprite.flipX = directionX < 0;
            return 'horizontal';
        }

        return directionY < 0 ? 'up' : 'down';
    }
}
