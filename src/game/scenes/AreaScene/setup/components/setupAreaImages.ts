import { AreaDefinition, PlacedImage } from '../../../../areas/Area.types';

function addImages(scene: Phaser.Scene, images: PlacedImage[], defaultDepth: number): void {
    images.forEach(({ key, x, y, depth }) => {
        scene.add.image(x, y, key).setOrigin(0, 0).setDepth(depth ?? defaultDepth);
    });
}

export function setupAreaImages(scene: Phaser.Scene, area: AreaDefinition): void {
    addImages(scene, area.backgroundImages, 0);
    addImages(scene, area.foregroundImages, 50);
}
