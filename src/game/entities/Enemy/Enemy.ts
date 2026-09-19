import { Position } from '../../types/Position.interface';
import { IEnemy } from './Enemy.types';
import { EnemyMovement } from './components/EnemyMovement';

const DEATH_FALL_DURATION = 450;
const CORPSE_LINGER_DURATION = 30000;
const CORPSE_FADE_DURATION = 1500;
const CORPSE_DEPTH = 1;

export class Enemy {
    scene: Phaser.Scene;
    position: Position;
    sprite: Phaser.Physics.Arcade.Sprite;
    enemyMovement: EnemyMovement;
    isDestroyed = false;
    isDying = false;
    isDead = false;
    isKnockedBack = false;

    health = 100;

    constructor({ position, scene, spriteName, patrolPath }: IEnemy) {
        this.position = position;
        this.scene = scene;

        this.sprite = scene.physics.add.sprite(position.x, position.y, spriteName);

        this.enemyMovement = new EnemyMovement({
            enemy: this,
            spriteName,
            patrolPath: patrolPath,
        });

        this.sprite.body?.setSize(27, 35);
        this.sprite.body?.setOffset(35, 35);
    }

    public update() {
        if (this.isDying || this.isDead || this.isDestroyed) return;

        this.enemyMovement.update();
    }

    public takeDamage(damage: number, attackDirection: string, closeContact: boolean) {
        if (this.isDying || this.isDead) return;

        if (this.health <= 0) {
            this.die(attackDirection);
            return;
        }

        this.health -= damage;

        this.flicker();
        this.applyKnockback(attackDirection, closeContact);
    }

    private die(attackDirection: string) {
        this.isDying = true;
        this.isKnockedBack = false;

        this.scene.tweens.killTweensOf(this.sprite);
        this.sprite.setData('isFlickering', false);
        this.sprite.alpha = 1;
        this.sprite.setVelocity(0, 0);
        this.sprite.anims.stop();

        const body = this.sprite.body as Phaser.Physics.Arcade.Body | null;
        if (body) {
            body.enable = false;
            body.checkCollision.none = true;
        }

        const fallDirection = attackDirection === 'LEFT' || attackDirection === 'UP' ? -1 : 1;

        this.sprite.setTintFill(0xffffff);
        this.scene.time.delayedCall(90, () => {
            if (!this.isDestroyed) this.sprite.clearTint();
        });

        this.scene.tweens.add({
            targets: this.sprite,
            angle: 90 * fallDirection,
            duration: DEATH_FALL_DURATION,
            ease: 'Bounce.Out',
            onComplete: () => this.becomeCorpse(),
        });
    }

    private becomeCorpse() {
        this.isDying = false;
        this.isDead = true;

        this.sprite.setDepth(CORPSE_DEPTH);

        this.scene.time.delayedCall(CORPSE_LINGER_DURATION, () => this.fadeCorpse());
    }

    private fadeCorpse() {
        if (this.isDestroyed) return;

        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            duration: CORPSE_FADE_DURATION,
            onComplete: () => this.destroy(),
        });
    }

    private flicker() {
        if (this.sprite.getData('isFlickering')) {
            this.scene.tweens.killTweensOf(this.sprite);
        }

        this.sprite.setData('isFlickering', true);

        this.scene.tweens.add({
            targets: this.sprite,
            alpha: { from: 0.5, to: 1 },
            duration: 50,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.sprite.setData('isFlickering', false);
                this.sprite.alpha = 1;
            },
        });
    }

    private applyKnockback(attackDirection: string, isCloseContact: boolean) {
        this.sprite.setVelocity(0, 0);
        this.isKnockedBack = true;
        const knockbackStrength = isCloseContact ? 700 : 500;

        console.log('knockbackStrength', knockbackStrength);
        console.log('attackDirection', attackDirection);
        console.log('isCloseContact', isCloseContact);

        switch (attackDirection) {
            case 'LEFT':
                this.sprite.setVelocityX(-knockbackStrength);
                break;
            case 'RIGHT':
                this.sprite.setVelocityX(knockbackStrength);
                break;
            case 'UP':
                this.sprite.setVelocityY(-knockbackStrength);
                break;
            case 'DOWN':
                this.sprite.setVelocityY(knockbackStrength);
                break;
        }

        this.scene.time.delayedCall(200, () => {
            if (this.isDying || this.isDead) return;

            this.sprite.setVelocity(0, 0);
            this.isKnockedBack = false;
        });
    }

    public destroy() {
        this.isDying = false;
        this.isDead = false;
        this.isDestroyed = true;
        this.sprite.setVisible(false).setActive(false);
        this.sprite.destroy();
    }
}
