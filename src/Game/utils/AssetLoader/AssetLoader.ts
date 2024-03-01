import { ImageAsset, SpriteSheetAsset } from './AssetLoader.types';

export class AssetLoader {
    static loadImages(scene: Phaser.Scene, images: ImageAsset[]): void {
        images.forEach((image) => {
            scene.load.image(image.key, image.path);
        });
    }

    static loadSpriteSheets(
        scene: Phaser.Scene,
        spriteSheets: SpriteSheetAsset[]
    ): void {
        spriteSheets.forEach((spriteSheet) => {
            scene.load.spritesheet(
                spriteSheet.key,
                spriteSheet.path,
                spriteSheet.frameConfig
            );
        });
    }
}
