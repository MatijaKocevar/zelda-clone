import Phaser from 'phaser';
import { Enemy } from '../../enemy/enemy';
import { Player } from '../player';

const INVULNERABILITY_DURATION = 1000;
const STAGGER_DURATION = 250;
const BASE_KNOCKBACK_STRENGTH = 400;
const CONTACT_PUSH_STRENGTH = 50;
const CONTACT_PUSH_MARGIN = 4;
const GAME_OVER_DELAY = 800;

export class PlayerDamage {
    private player: Player;
    private enemies: Enemy[];
    isHurt = false;
    isDead = false;
    isInvulnerable = false;
    private staggerTimer = 0;
    private invulnerabilityTimer = 0;
    private flickerTween?: Phaser.Tweens.Tween;

    constructor(player: Player, enemies: Enemy[]) {
        this.player = player;
        this.enemies = enemies;
    }

    update() {
        if (this.isDead) return;

        if (this.isHurt) {
            this.staggerTimer -= this.player.scene.game.loop.delta;
            if (this.staggerTimer <= 0) {
                this.isHurt = false;
                this.player.sprite.setVelocity(0, 0);
            }
        }

        if (!this.isHurt) this.applyContactPushVelocity();

        if (this.isInvulnerable) {
            this.invulnerabilityTimer -= this.player.scene.game.loop.delta;
            if (this.invulnerabilityTimer <= 0) this.endInvulnerability();
        }
    }

    private applyContactPushVelocity() {
        const body = this.player.sprite.body as Phaser.Physics.Arcade.Body;
        let pushX = 0;
        let pushY = 0;

        this.enemies.forEach((enemy) => {
            if (enemy.isDestroyed || enemy.isDying || enemy.isDead || enemy.enemyAttack.isAttacking) return;

            const enemyBody = enemy.sprite.body as Phaser.Physics.Arcade.Body | null;
            if (!enemyBody) return;

            const directionX = body.center.x - enemyBody.center.x;
            const directionY = body.center.y - enemyBody.center.y;

            const withinX = Math.abs(directionX) < body.halfWidth + enemyBody.halfWidth + CONTACT_PUSH_MARGIN;
            const withinY = Math.abs(directionY) < body.halfHeight + enemyBody.halfHeight + CONTACT_PUSH_MARGIN;

            if (!withinX || !withinY) return;

            const distance = Math.hypot(directionX, directionY) || 1;
            pushX += directionX / distance;
            pushY += directionY / distance;
        });

        const length = Math.hypot(pushX, pushY);
        if (length === 0) return;

        body.velocity.x += (pushX / length) * CONTACT_PUSH_STRENGTH;
        body.velocity.y += (pushY / length) * CONTACT_PUSH_STRENGTH;
    }

    takeDamage(damage: number, knockbackDirectionX: number, knockbackDirectionY: number) {
        if (this.isInvulnerable || this.isDead) return;

        this.player.playerStats.takeDamage(damage);

        if (this.player.playerStats.getHealth() <= 0) {
            this.die();
            return;
        }

        this.isHurt = true;
        this.isInvulnerable = true;
        this.staggerTimer = STAGGER_DURATION;
        this.invulnerabilityTimer = INVULNERABILITY_DURATION;

        this.player.sprite.anims.play('hurt', true);
        this.applyKnockback(knockbackDirectionX, knockbackDirectionY);
        this.flicker();
    }

    private die() {
        this.isDead = true;
        this.isHurt = false;
        this.isInvulnerable = false;
        this.staggerTimer = 0;
        this.invulnerabilityTimer = 0;

        this.stopFlicker();
        this.player.sprite.setVelocity(0, 0);
        this.player.sprite.anims.play('death', true);

        this.player.scene.time.delayedCall(GAME_OVER_DELAY, () => {
            this.player.scene.events.emit('player-died');
        });
    }

    private applyKnockback(directionX: number, directionY: number) {
        const armorResistance = Phaser.Math.Clamp(this.player.playerStats.getArmor() / 100, 0, 1);
        const strength = BASE_KNOCKBACK_STRENGTH * (1 - armorResistance);

        this.player.sprite.setVelocity(directionX * strength, directionY * strength);
    }

    private flicker() {
        this.stopFlicker();

        this.flickerTween = this.player.scene.tweens.add({
            targets: this.player.sprite,
            alpha: { from: 0.5, to: 1 },
            duration: 50,
            yoyo: true,
            repeat: Math.round(INVULNERABILITY_DURATION / 100) - 1,
        });
    }

    private stopFlicker() {
        if (this.flickerTween) {
            this.flickerTween.stop();
            this.flickerTween = undefined;
        }

        this.player.sprite.alpha = 1;
    }

    private endInvulnerability() {
        this.isInvulnerable = false;
        this.stopFlicker();
    }
}
