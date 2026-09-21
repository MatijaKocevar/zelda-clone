import Phaser from 'phaser';
import { DOWN, LEFT, RIGHT, UP } from '../../mechanics/input/input';

const FIREBALL_SPEED = 450;
const FIREBALL_LIFETIME = 1500;
const FIREBALL_BODY_SIZE = 40;
const EXPLOSION_SCALE = 1.6;
const EXPLOSION_DURATION = 120;

const DIRECTION_VECTORS: Record<string, { x: number; y: number }> = {
    [UP]: { x: 0, y: -1 },
    [DOWN]: { x: 0, y: 1 },
    [LEFT]: { x: -1, y: 0 },
    [RIGHT]: { x: 1, y: 0 },
};

export class Fireball {
    sprite: Phaser.Physics.Arcade.Sprite;
    direction: string;
    onDestroyed?: (fireball: Fireball) => void;

    private scene: Phaser.Scene;
    private lifeRemaining = FIREBALL_LIFETIME;
    private exploded = false;

    constructor(scene: Phaser.Scene, x: number, y: number, direction: string) {
        this.scene = scene;
        this.direction = direction;

        this.sprite = scene.physics.add.sprite(x, y, 'fireball');
        this.sprite.play('fireball-spin');
        this.sprite.setDepth(this.sprite.y);

        const body = this.sprite.body as Phaser.Physics.Arcade.Body;
        body.setSize(FIREBALL_BODY_SIZE, FIREBALL_BODY_SIZE, true);
        body.setAllowGravity(false);
    }

    launch(): void {
        const vector = DIRECTION_VECTORS[this.direction] ?? DIRECTION_VECTORS[RIGHT];
        this.sprite.setVelocity(vector.x * FIREBALL_SPEED, vector.y * FIREBALL_SPEED);
    }

    update(delta: number): void {
        if (this.exploded) return;

        const body = this.sprite.body as Phaser.Physics.Arcade.Body | null;
        this.sprite.setDepth(body ? body.bottom : this.sprite.y);

        this.lifeRemaining -= delta;

        if (this.lifeRemaining <= 0) {
            this.explode();
        }
    }

    explode(): void {
        if (this.exploded) return;

        this.exploded = true;
        this.sprite.setVelocity(0, 0);
        this.sprite.anims.stop();

        const body = this.sprite.body as Phaser.Physics.Arcade.Body | null;
        if (body) {
            body.enable = false;
        }

        this.scene.tweens.add({
            targets: this.sprite,
            scale: EXPLOSION_SCALE,
            alpha: 0,
            duration: EXPLOSION_DURATION,
            onComplete: () => this.destroy(),
        });
    }

    private destroy(): void {
        this.onDestroyed?.(this);
        this.sprite.destroy();
    }
}
