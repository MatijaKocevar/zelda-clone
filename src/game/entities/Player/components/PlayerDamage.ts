import { Player } from '../Player';

export const CONTACT_DAMAGE = 10;

const INVULNERABILITY_DURATION = 1000;
const STAGGER_DURATION = 250;
const BASE_KNOCKBACK_STRENGTH = 400;

export class PlayerDamage {
    private player: Player;
    isHurt = false;
    isDead = false;
    isInvulnerable = false;
    private staggerTimer = 0;
    private invulnerabilityTimer = 0;
    private flickerTween?: Phaser.Tweens.Tween;

    constructor(player: Player) {
        this.player = player;
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

        if (this.isInvulnerable) {
            this.invulnerabilityTimer -= this.player.scene.game.loop.delta;
            if (this.invulnerabilityTimer <= 0) this.endInvulnerability();
        }
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
