import Phaser from 'phaser';
import { GORE_ENABLED } from '../../dev-flags';
import { ensureGoreTextures } from './gore-textures';

const MAX_STAINS = 160;
const POOL_KEYS = ['gore-pool-small', 'gore-pool-medium', 'gore-pool-large'];
const DIRECTION_ANGLES: Record<string, number> = { LEFT: 180, RIGHT: 0, UP: -90, DOWN: 90 };

const stains: Phaser.GameObjects.Image[] = [];
const trackedScenes = new WeakSet<Phaser.Scene>();

export function bloodBurst(
    scene: Phaser.Scene,
    sprite: Phaser.GameObjects.Sprite,
    damage: number,
    direction?: string,
): void {
    if (!GORE_ENABLED) {
        return;
    }

    prepare(scene);

    const ground = groundY(sprite);

    spray(scene, sprite, Phaser.Math.Clamp(3 + Math.round(damage / 3), 3, 10), direction);
    spawnStain(scene, sprite.x, ground, 'gore-splat');
}

export function deathGore(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite, direction?: string): void {
    if (!GORE_ENABLED) {
        return;
    }

    prepare(scene);

    const ground = groundY(sprite);

    spawnStain(scene, sprite.x, ground, 'gore-pool-large');
    spawnStain(scene, sprite.x + Phaser.Math.Between(-24, 24), ground, Phaser.Math.RND.pick(POOL_KEYS));
    spawnStain(scene, sprite.x + Phaser.Math.Between(-24, 24), ground, 'gore-splat');
    spray(scene, sprite, 14, direction);
}

export function clearGore(): void {
    while (stains.length > 0) {
        stains.pop()?.destroy();
    }
}

function prepare(scene: Phaser.Scene): void {
    ensureGoreTextures(scene);

    if (trackedScenes.has(scene)) {
        return;
    }

    trackedScenes.add(scene);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
        trackedScenes.delete(scene);
        clearGore();
    });
}

function spray(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite, count: number, direction?: string): void {
    const ground = groundY(sprite);
    const baseAngle =
        direction !== undefined && direction in DIRECTION_ANGLES
            ? DIRECTION_ANGLES[direction]
            : Phaser.Math.Between(0, 359);

    for (let i = 0; i < count; i++) {
        const angle = Phaser.Math.DegToRad(baseAngle + Phaser.Math.Between(-50, 50));
        const distance = Phaser.Math.Between(18, 64);
        const targetX = sprite.x + Math.cos(angle) * distance;
        const targetY = ground + Math.sin(angle) * distance * 0.6;
        const drop = scene.add.image(sprite.x, ground - 8, 'gore-drop').setDepth(ground + 40);
        const leavesStain = Math.random() < 0.35;

        scene.tweens.add({
            targets: drop,
            x: targetX,
            y: targetY,
            alpha: 0,
            duration: Phaser.Math.Between(180, 340),
            ease: 'Quad.Out',
            onComplete: () => {
                if (leavesStain) {
                    spawnStain(scene, targetX, ground, 'gore-pool-small');
                }

                drop.destroy();
            },
        });
    }
}

function spawnStain(scene: Phaser.Scene, x: number, ground: number, key: string): void {
    const stain = scene.add
        .image(x + Phaser.Math.Between(-12, 12), ground + Phaser.Math.Between(-8, 10), key)
        .setDepth(ground - 2)
        .setAngle(Phaser.Math.Between(0, 3) * 90)
        .setFlipX(Math.random() < 0.5)
        .setAlpha(0.85);

    stains.push(stain);

    while (stains.length > MAX_STAINS) {
        stains.shift()?.destroy();
    }
}

function groundY(sprite: Phaser.GameObjects.Sprite): number {
    const body = sprite.body as Phaser.Physics.Arcade.Body | null;

    return body ? body.bottom : sprite.y;
}
