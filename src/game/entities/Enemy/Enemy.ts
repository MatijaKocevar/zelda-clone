import { Position } from '../../types/Position.interface';
import { IEnemy } from './Enemy.types';
import { EnemyMovement } from './components/EnemyMovement';

export class Enemy {
    scene: Phaser.Scene;
    position: Position;
    sprite: Phaser.Physics.Arcade.Sprite;
    enemyMovement: EnemyMovement;
    isDestroyed = false;
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
        this.enemyMovement.update();
    }

    public takeDamage(damage: number, attackDirection: string, closeContact: boolean) {
        if (this.health <= 0) {
            this.destroy();
            return;
        }

        this.health -= damage;

        this.flicker();
        this.applyKnockback(attackDirection, closeContact);
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
            this.sprite.setVelocity(0, 0);
            this.isKnockedBack = false;
        });
    }

    public destroy() {
        this.isDestroyed = true;
        this.sprite.setVisible(false).setActive(false);
        this.sprite.destroy();
    }
}
