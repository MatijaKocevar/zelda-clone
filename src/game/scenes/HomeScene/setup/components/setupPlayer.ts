import { Player } from '../../../../entities/Player/Player';

export const WORLD_WIDTH = 5120;
export const WORLD_HEIGHT = 2880;

export function setupPlayer(scene: Phaser.Scene): Player {
    const player = new Player({
        position: { x: 2400, y: 1250 },
        scene: scene,
    });

    scene.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    if (player.sprite) {
        scene.cameras.main.startFollow(player.sprite, true, 1, 1);
        scene.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    }

    return player;
}
