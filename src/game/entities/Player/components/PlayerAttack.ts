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
        this.attackHitbox = this.player.scene.physics.add.sprite(-10000, -10000, 'hitbox');
        this.attackHitbox.setVisible(false).setActive(false);

        this.enemies.forEach((enemy) => {
            this.player.scene.physics.add.overlap(this.attackHitbox, enemy.sprite, () => {
                if (this.attackHitbox.active === false) return;
                if (this.hitEnemies.has(enemy)) return;

                console.log('hit', this.player.playerStats.damage);

                enemy.takeDamage(this.player.playerStats.damage);
                this.hitEnemies.add(enemy);
            });
        });
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
        const direction = this.determineAttackDirection();
        this.triggerAttackAnimation(direction);
        this.positionHitbox(direction);
    }

    private determineAttackDirection(): string {
        const { keysPressed, lastKey } = this.playerMovement.input;
        const direction = keysPressed.current.find((key) => [LEFT, RIGHT, UP, DOWN].includes(key)) || lastKey.current;
        return direction;
    }

    private triggerAttackAnimation(direction: string): void {
        switch (direction) {
            case UP:
                this.player.sprite.anims.play('slash-up', true);
                break;
            case DOWN:
                this.player.sprite.anims.play('slash-down', true);
                break;
            case LEFT:
                this.player.sprite.flipX = true;
                this.player.sprite.anims.play('slash-horizontal', true);
                break;
            case RIGHT:
                this.player.sprite.flipX = false;
                this.player.sprite.anims.play('slash-horizontal', true);
                break;
            default:
                this.player.sprite.anims.play('slash-horizontal', true);
                break;
        }

        this.player.sprite.once('animationcomplete', () => this.onAttackAnimationComplete());
    }

    private positionHitbox(direction: string): void {
        const offsets = this.calculateHitboxOffset(direction);
        const size = this.calculateHitboxSize(direction);

        this.attackHitbox.setPosition(this.player.sprite.x + offsets.x, this.player.sprite.y + offsets.y);
        this.attackHitbox.setSize(size.width, size.height).setActive(true);
    }

    private calculateHitboxSize(direction: string) {
        switch (direction) {
            case UP:
                return { width: 50, height: 30 };
            case DOWN:
                return { width: 50, height: 20 };
            case LEFT:
                return { width: 50, height: 50 };
            case RIGHT:
                return { width: 50, height: 50 };
            default:
                return { width: 30, height: 30 };
        }
    }

    private calculateHitboxOffset(direction: string): { x: number; y: number } {
        switch (direction) {
            case UP:
                return { x: 3, y: 5 };
            case DOWN:
                return { x: 3, y: 70 };
            case LEFT:
                return { x: -30, y: 40 };
            case RIGHT:
                return { x: 37, y: 40 };
            default:
                return {
                    x: this.player.sprite.flipX ? -20 : 20,
                    y: 0,
                };
        }
    }

    private onAttackAnimationComplete(): void {
        this.isSlashing = false;
        this.playerMovement.handleMovementAnimations();
        this.attackHitbox.setActive(false).setVisible(false).setPosition(-10000, -10000);

        this.hitEnemies.clear();
    }
}
