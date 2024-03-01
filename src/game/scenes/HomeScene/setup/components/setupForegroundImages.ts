export function setupForegroundImages(scene: Phaser.Scene): void {
    const { add } = scene;

    add.image(0, 0, 'foreground-top-left').setOrigin(0, 0).setDepth(50);
    add.image(2560, 0, 'foreground-top-right').setOrigin(0, 0).setDepth(50);
    add.image(0, 1440, 'foreground-bottom-left').setOrigin(0, 0).setDepth(50);
    add.image(2560, 1440, 'foreground-bottom-right')
        .setOrigin(0, 0)
        .setDepth(50);
}
