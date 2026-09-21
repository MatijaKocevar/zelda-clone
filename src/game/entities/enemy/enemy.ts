import Phaser from 'phaser';
import { Position } from '../../types/position.interface';
import { EnemyType, IEnemy } from './enemy.types';
import { ENEMY_DEFINITIONS } from './data/enemy-definitions';
import { createAttackBehavior, createMovementBehavior } from './components/behavior-factory';
import { AttackBehavior } from './components/attack/attack-behavior';
import { MovementBehavior } from './components/movement/movement-behavior';

const DEATH_FALL_DURATION = 450;
const CORPSE_LINGER_DURATION = 30000;
const CORPSE_FADE_DURATION = 1500;

export class Enemy {
    scene: Phaser.Scene;
    position: Position;
    sprite: Phaser.Physics.Arcade.Sprite;
    type: EnemyType;
    spriteName: string;
    health: number;
    enemyMovement: MovementBehavior;
    enemyAttack: AttackBehavior;
    isDestroyed = false;
    isDying = false;
    isDead = false;
    isKnockedBack = false;

    constructor({ position, scene, type, patrolPath, initialDelay = 0 }: IEnemy) {
        const definition = ENEMY_DEFINITIONS[type];

        this.position = position;
        this.scene = scene;
        this.type = type;
        this.spriteName = definition.spriteName;
        this.health = definition.health;

        this.sprite = scene.physics.add.sprite(position.x, position.y, definition.spriteName);

        this.enemyMovement = createMovementBehavior(type, {
            enemy: this,
            patrolPath,
            config: definition.movement,
            initialDelay: definition.movement.initialDelay + initialDelay,
        });
        this.enemyAttack = createAttackBehavior(type, {
            enemy: this,
            config: definition.attack,
        });

        this.sprite.body?.setSize(27, 35);
        this.sprite.body?.setOffset(35, 35);
    }

    get isAlive(): boolean {
        return !this.isDying && !this.isDead && !this.isDestroyed;
    }

    public update() {
        if (this.isDestroyed) return;

        this.syncDepth();

        if (this.isDying || this.isDead) return;

        this.enemyAttack.update();
        this.enemyMovement.update();
    }

    private syncDepth(): void {
        const body = this.sprite.body as Phaser.Physics.Arcade.Body | null;

        this.sprite.setDepth(body ? body.bottom : this.sprite.y);
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
