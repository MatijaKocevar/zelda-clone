import { DOWN, LEFT, RIGHT, SPACE, UP } from '../../../mechanics/Input/Input';
import { Enemy } from '../../Enemy/Enemy';
import { Player } from '../Player';
import { PlayerMovement } from './PlayerMovement';

export class PlayerAttack {
    private player: Player;
    private playerMovement: PlayerMovement;
    private lastSlashTime = 0;
    private slashCooldown = 500;
    private enemies: Enemy[];
    isSlashing = false;
    attackDirection = '';

    private attackHitbox!: Phaser.Physics.Arcade.Sprite;
    private hitEnemies: Set<Enemy>;

    constructor(player: Player, enemies: Enemy[]) {
        this.player = player;
        this.enemies = enemies;
        this.hitEnemies = new Set();
        this.playerMovement = player.playerMovement;
        this.initializeHitbox();
    }

    private initializeHitbox(): void {
        this.attackHitbox = this.player.scene.physics.add.sprite(0, 0, 'hitbox').setVisible(false).setActive(false);
        const attackHitboxBody = this.attackHitbox.body as Phaser.Physics.Arcade.Body;
        attackHitboxBody.setEnable(false);

        this.enemies.forEach((enemy) => {
            this.player.scene.physics.add.overlap(this.attackHitbox, enemy.sprite, () => {
                if (this.attackHitbox.active === false) return;
                if (this.hitEnemies.has(enemy)) return;

                console.log('hit', enemy);

                const closeContact = this.isInCloseContact(enemy);
                enemy.takeDamage(this.player.playerStats.damage, this.attackDirection, closeContact);
                this.hitEnemies.add(enemy);
            });
        });
    }

    private isInCloseContact(enemy: Enemy) {
        const distance = Phaser.Math.Distance.Between(
            enemy.sprite.x,
            enemy.sprite.y,
            this.attackHitbox.x,
            this.attackHitbox.y
        );

        return distance < 15;
    }

    update() {
        this.handleAttack();
    }

    private handleAttack(): void {
        const { keysPressed } = this.playerMovement.input;
        const currentTime = this.player.scene.time.now;

        if (keysPressed.current.includes(SPACE) && this.canAttack(currentTime)) {
            this.isSlashing = true;
            this.lastSlashTime = currentTime;
            this.handleAttackAnimation();
        }
    }

    private canAttack(currentTime: number): boolean {
        return currentTime - this.lastSlashTime > this.slashCooldown;
    }

    private handleAttackAnimation(): void {
        this.determineAttackDirection();
        this.triggerAttackAnimation();
    }

    private determineAttackDirection() {
        const { keysPressed, lastKey } = this.playerMovement.input;
        this.attackDirection =
            keysPressed.current.find((key) => [LEFT, RIGHT, UP, DOWN].includes(key)) || lastKey.current;
    }

    private triggerAttackAnimation() {
        switch (this.attackDirection) {
            case UP:
                this.player.playerSprite.sprite.anims.play('slash-up', true);
                this.player.playerSprite.sprite.once('animationstart', () => this.activateHitbox());
                break;
            case DOWN:
                this.player.playerSprite.sprite.anims.play('slash-down', true);
                this.player.playerSprite.sprite.once('animationstart', () => this.activateHitbox());
                break;
            case LEFT:
                this.player.playerSprite.sprite.flipX = true;
                this.player.playerSprite.sprite.anims.play('slash-horizontal', true);
                this.player.playerSprite.sprite.once('animationstart', () => this.activateHitbox());
                break;
            case RIGHT:
                this.player.playerSprite.sprite.flipX = false;
                this.player.playerSprite.sprite.anims.play('slash-horizontal', true);
                this.player.playerSprite.sprite.once('animationstart', () => this.activateHitbox());
                break;
            default:
                this.player.playerSprite.sprite.anims.play('slash-horizontal', true);
                this.player.playerSprite.sprite.once('animationstart', () => this.activateHitbox());
                break;
        }

        this.player.playerSprite.sprite.once('animationcomplete', () => this.deactivateHitbox());
    }

    private activateHitbox() {
        const { width, height } = this.calculateHitboxSize();
        const { x, y } = this.calculateHitboxOffset();
        this.attackHitbox
            .setPosition(this.player.playerSprite.sprite.x + x, this.player.playerSprite.sprite.y + y)
            .setSize(width, height)
            .setActive(true)
            .setVisible(true);
        (this.attackHitbox.body as Phaser.Physics.Arcade.Body).setEnable(true);
    }

    private deactivateHitbox() {
        this.isSlashing = false;

        this.attackHitbox.setActive(false).setVisible(false);
        (this.attackHitbox.body as Phaser.Physics.Arcade.Body).setEnable(false);

        this.hitEnemies.clear();
    }

    private calculateHitboxSize() {
        switch (this.attackDirection) {
            case UP:
                return { width: 50, height: 50 };
            case DOWN:
                return { width: 50, height: 50 };
            case LEFT:
                return { width: 50, height: 50 };
            case RIGHT:
                return { width: 50, height: 50 };
            default:
                return { width: 50, height: 50 };
        }
    }

    private calculateHitboxOffset(): { x: number; y: number } {
        switch (this.attackDirection) {
            case UP:
                return { x: 3, y: 5 };
            case DOWN:
                return { x: 3, y: 70 };
            case LEFT:
                return { x: -37, y: 38 };
            case RIGHT:
                return { x: 37, y: 38 };
            default:
                return {
                    x: this.player.playerSprite.sprite.flipX ? -20 : 20,
                    y: 0,
                };
        }
    }
}
