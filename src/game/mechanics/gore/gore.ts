import Phaser from 'phaser';
import { GORE_ENABLED } from '../../dev-flags';
import { ensureGoreTextures } from './gore-textures';

const MAX_STAINS = 120;
const POOL_KEYS = ['gore-pool-small', 'gore-pool-medium', 'gore-pool-large'];

const stains: Phaser.GameObjects.Image[] = [];
const trackedScenes = new WeakSet<Phaser.Scene>();

export type BloodSize = 'small' | 'medium' | 'large';

export function spawnBlood(scene: Phaser.Scene, x: number, y: number, size: BloodSize = 'medium'): void {
    if (!GORE_ENABLED) {
        return;
    }

    prepare(scene);

    spawnStain(scene, x, y, `gore-pool-${size}`);
    spawnStain(scene, x + Phaser.Math.Between(-16, 16), y, Phaser.Math.RND.pick(POOL_KEYS));
    spawnStain(scene, x + Phaser.Math.Between(-20, 20), y, 'gore-splat');
}

export function spawnSplatter(scene: Phaser.Scene, x: number, y: number, count = 3): void {
    if (!GORE_ENABLED) {
        return;
    }

    prepare(scene);

    for (let i = 0; i < count; i++) {
        spawnStain(scene, x + Phaser.Math.Between(-28, 28), y + Phaser.Math.Between(-12, 16), 'gore-splat');
    }
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

function spawnStain(scene: Phaser.Scene, x: number, y: number, key: string): void {
    const stain = scene.add
        .image(x + Phaser.Math.Between(-12, 12), y + Phaser.Math.Between(-8, 10), key)
        .setDepth(y - 2)
        .setAngle(Phaser.Math.Between(0, 3) * 90)
        .setFlipX(Math.random() < 0.5)
        .setAlpha(0.85);

    stains.push(stain);

    while (stains.length > MAX_STAINS) {
        stains.shift()?.destroy();
    }
}
