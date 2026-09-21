import Phaser from 'phaser';
import { Player } from '../../../../entities/player/player';
import { DOOR_ENTERED_EVENT } from '../../../../events';
import { getMapDoors } from '../../data/get-map-doors';

export function setupDoors(scene: Phaser.Scene, player: Player, map: Phaser.Tilemaps.Tilemap): void {
    let entered = false;

    getMapDoors(map).forEach((door) => {
        const zone = scene.add.zone(door.x + door.width / 2, door.y + door.height / 2, door.width, door.height);

        scene.physics.add.existing(zone, true);
        scene.physics.add.overlap(player.sprite, zone, () => {
            if (entered || !door.target) {
                return;
            }

            entered = true;
            scene.events.emit(DOOR_ENTERED_EVENT, door);
        });
    });
}
