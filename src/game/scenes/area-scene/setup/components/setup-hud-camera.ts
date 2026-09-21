import Phaser from 'phaser';

export function setupHudCamera(
    scene: Phaser.Scene,
    hudObjects: Phaser.GameObjects.GameObject[],
): Phaser.Cameras.Scene2D.Camera {
    const hudCamera = scene.cameras.add(0, 0, scene.scale.width, scene.scale.height);
    hudCamera.setScroll(0, 0);

    const worldObjects = scene.children.list.filter((child) => !hudObjects.includes(child));
    hudCamera.ignore(worldObjects);
    scene.cameras.main.ignore(hudObjects);

    const handleResize = (gameSize: Phaser.Structs.Size) => {
        hudCamera.setSize(gameSize.width, gameSize.height);
    };
    scene.scale.on(Phaser.Scale.Events.RESIZE, handleResize);
    scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
        scene.scale.off(Phaser.Scale.Events.RESIZE, handleResize);
    });

    return hudCamera;
}
