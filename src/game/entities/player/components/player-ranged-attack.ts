import Phaser from 'phaser';
import { DOWN, LEFT, RANGED, RIGHT, UP } from '../../../mechanics/input/input';
import { Collisions } from '../../collisions/collisions';
import { Enemy } from '../../enemy/enemy';
import { Fireball } from '../../projectile/fireball';
import { Player } from '../player';
import { PlayerMovement } from './player-movement';

const FIREBALL_COOLDOWN = 700;
const FIREBALL_DAMAGE = 35;
const MANA_COST_FRACTION = 0.25;
type ArcadeCollisionObject =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Physics.Arcade.Body
    | Phaser.Physics.Arcade.StaticBody
    | Phaser.Tilemaps.Tile;
const SPAWN_OFFSETS: Record<string, { x: number; y: number }> = {
    [RIGHT]: { x: 50, y: 38 },
    [LEFT]: { x: -50, y: 38 },
    [UP]: { x: 0, y: -20 },
    [DOWN]: { x: 0, y: 70 },
};

export class PlayerRangedAttack {
    private player: Player;
    private playerMovement: PlayerMovement;
    private enemies: Enemy[];
    private lastCastTime = 0;
    private activeFireballs = new Map<Phaser.Physics.Arcade.Sprite, Fireball>();
    private fireballGroup: Phaser.Physics.Arcade.Group;
    private hudCamera?: Phaser.Cameras.Scene2D.Camera;
    isCasting = false;
    castDirection = '';

    constructor(player: Player, enemies: Enemy[]) {
        this.player = player;
        this.enemies = enemies;
        this.playerMovement = player.playerMovement;
        this.fireballGroup = player.scene.physics.add.group({ allowGravity: false });
        this.initializeEnemyOverlaps();
    }

    setHudCamera(hudCamera: Phaser.Cameras.Scene2D.Camera): void {
        this.hudCamera = hudCamera;
    }

    setCollisions(collisions: Collisions): void {
        collisions.addProjectileCollider(this.fireballGroup, (first, second) => {
            this.resolveFireball(first, second)?.explode();
        });
    }

    update(): void {
        this.handleRangedAttack();

        const delta = this.player.scene.game.loop.delta;
        this.activeFireballs.forEach((fireball) => fireball.update(delta));
    }

    private handleRangedAttack(): void {
        const { inputState } = this.playerMovement.input;
        const currentTime = this.player.scene.time.now;

        if (this.player.playerDamage.isHurt || this.player.playerDamage.isDead) return;
        if (this.player.playerAttack.isSlashing) return;
        if (!inputState.isPressed(RANGED) || !this.canCast(currentTime)) return;
        if (!this.player.playerStats.useMana(this.player.playerStats.maxMana * MANA_COST_FRACTION)) return;

        this.isCasting = true;
        this.lastCastTime = currentTime;
        this.castDirection = this.determineCastDirection();

        this.playCastAnimation();
        this.spawnFireball();
    }

    private canCast(currentTime: number): boolean {
        return currentTime - this.lastCastTime > FIREBALL_COOLDOWN;
    }

    private determineCastDirection(): string {
        const { inputState } = this.playerMovement.input;

        return inputState.keysPressed.find((key) => [LEFT, RIGHT, UP, DOWN].includes(key)) || inputState.lastKey;
    }

    private playCastAnimation(): void {
        if (this.castDirection === LEFT) this.player.sprite.flipX = true;
        if (this.castDirection === RIGHT) this.player.sprite.flipX = false;

        this.player.sprite.anims.play('cast', true);
        this.player.sprite.once('animationcomplete', () => this.onCastAnimationComplete());
    }

    private onCastAnimationComplete(): void {
        this.isCasting = false;
        this.playerMovement.handleMovementAnimations();
    }

    private initializeEnemyOverlaps(): void {
        this.enemies.forEach((enemy) => {
            this.player.scene.physics.add.overlap(this.fireballGroup, enemy.sprite, (first, second) => {
                if (enemy.isDestroyed || enemy.isDying || enemy.isDead) return;

                const fireball = this.resolveFireball(first, second);
                if (!fireball) return;

                enemy.takeDamage(FIREBALL_DAMAGE, fireball.direction, false);
                fireball.explode();
            });
        });
    }

    private resolveFireball(first: ArcadeCollisionObject, second: ArcadeCollisionObject): Fireball | undefined {
        return (
            this.activeFireballs.get(first as Phaser.Physics.Arcade.Sprite) ??
            this.activeFireballs.get(second as Phaser.Physics.Arcade.Sprite)
        );
    }

    private spawnFireball(): void {
        const offset = SPAWN_OFFSETS[this.castDirection] ?? SPAWN_OFFSETS[RIGHT];
        const fireball = new Fireball(
            this.player.scene,
            this.player.sprite.x + offset.x,
            this.player.sprite.y + offset.y,
            this.castDirection,
        );

        this.fireballGroup.add(fireball.sprite);
        fireball.launch();
        this.hudCamera?.ignore(fireball.sprite);
        this.activeFireballs.set(fireball.sprite, fireball);
        fireball.onDestroyed = (destroyedFireball) => this.activeFireballs.delete(destroyedFireball.sprite);
    }
}
