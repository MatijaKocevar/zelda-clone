import Phaser from 'phaser';

export const GORE_PIXEL_SCALE = 4;

const COLORS = {
    dark: 0x5a0a0d,
    mid: 0x8f1218,
    red: 0xc01f24,
    bright: 0xe04434,
};

const POOL_TEXTURES = [
    { key: 'gore-pool-small', width: 9, height: 7 },
    { key: 'gore-pool-medium', width: 13, height: 9 },
    { key: 'gore-pool-large', width: 18, height: 12 },
];

const SPLAT_TEXTURE = { key: 'gore-splat', width: 6, height: 5 };
const DROP_TEXTURE = { key: 'gore-drop', width: 2, height: 3 };

export function ensureGoreTextures(scene: Phaser.Scene): void {
    POOL_TEXTURES.forEach(({ key, width, height }) => drawBlob(scene, key, width, height, 4));
    drawBlob(scene, SPLAT_TEXTURE.key, SPLAT_TEXTURE.width, SPLAT_TEXTURE.height, 2);
    drawDrop(scene, DROP_TEXTURE.key);
}

function drawBlob(scene: Phaser.Scene, key: string, width: number, height: number, droplets: number): void {
    if (scene.textures.exists(key)) {
        return;
    }

    const graphics = scene.make.graphics({ x: 0, y: 0 }, false);
    const centerX = (width - 1) / 2;
    const centerY = (height - 1) / 2;
    const radiusX = Math.max(width / 2, 1);
    const radiusY = Math.max(height / 2, 1);

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const offsetX = (col - centerX) / radiusX;
            const offsetY = (row - centerY) / radiusY;
            const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY) + (Math.random() - 0.5) * 0.55;

            if (distance > 1) {
                continue;
            }

            const color = distance < 0.45 ? COLORS.red : distance < 0.75 ? COLORS.mid : COLORS.dark;
            const fill = color === COLORS.red && Math.random() < 0.18 ? COLORS.bright : color;

            graphics.fillStyle(fill, 1);
            graphics.fillRect(col * GORE_PIXEL_SCALE, row * GORE_PIXEL_SCALE, GORE_PIXEL_SCALE, GORE_PIXEL_SCALE);
        }
    }

    for (let i = 0; i < droplets; i++) {
        const col = Phaser.Math.Between(0, width - 1);
        const row = Phaser.Math.Between(0, height - 1);

        graphics.fillStyle(Math.random() < 0.3 ? COLORS.dark : COLORS.mid, 1);
        graphics.fillRect(col * GORE_PIXEL_SCALE, row * GORE_PIXEL_SCALE, GORE_PIXEL_SCALE, GORE_PIXEL_SCALE);
    }

    graphics.generateTexture(key, width * GORE_PIXEL_SCALE, height * GORE_PIXEL_SCALE);
    graphics.destroy();
}

function drawDrop(scene: Phaser.Scene, key: string): void {
    if (scene.textures.exists(key)) {
        return;
    }

    const graphics = scene.make.graphics({ x: 0, y: 0 }, false);

    graphics.fillStyle(COLORS.dark, 1);
    graphics.fillRect(0, 0, GORE_PIXEL_SCALE, GORE_PIXEL_SCALE);
    graphics.fillRect(0, GORE_PIXEL_SCALE * 2, GORE_PIXEL_SCALE, GORE_PIXEL_SCALE);

    graphics.fillStyle(COLORS.mid, 1);
    graphics.fillRect(0, GORE_PIXEL_SCALE, GORE_PIXEL_SCALE, GORE_PIXEL_SCALE);
    graphics.fillRect(GORE_PIXEL_SCALE, 0, GORE_PIXEL_SCALE, GORE_PIXEL_SCALE * 2);

    graphics.fillStyle(COLORS.bright, 1);
    graphics.fillRect(GORE_PIXEL_SCALE, GORE_PIXEL_SCALE, GORE_PIXEL_SCALE, GORE_PIXEL_SCALE);

    graphics.generateTexture(key, DROP_TEXTURE.width * GORE_PIXEL_SCALE, DROP_TEXTURE.height * GORE_PIXEL_SCALE);
    graphics.destroy();
}
