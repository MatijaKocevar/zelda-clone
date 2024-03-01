export function setupBackgroundImages(scene: Phaser.Scene): void {
    const { add } = scene;

    add.image(0, 0, 'background-top-left').setOrigin(0, 0);
    add.image(2560, 0, 'background-top-right').setOrigin(0, 0);
    add.image(0, 1440, 'background-bottom-left').setOrigin(0, 0);
    add.image(2560, 1440, 'background-bottom-right').setOrigin(0, 0);
}
