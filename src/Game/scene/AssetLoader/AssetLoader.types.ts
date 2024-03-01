export type ImageAsset = {
    key: string;
    path: string;
};

export type SpriteSheetAsset = {
    key: string;
    path: string;
    frameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
};
