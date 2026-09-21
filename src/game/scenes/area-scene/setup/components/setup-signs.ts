import Phaser from 'phaser';
import { Sign } from '../../../../entities/sign/sign';
import { AreaDefinition } from '../../../../areas/area.types';
import { Player } from '../../../../entities/player/player';

export function setupSigns(scene: Phaser.Scene, area: AreaDefinition, player: Player): Sign[] {
    const inputState = player.playerMovement.input.inputState;

    return (area.signs ?? []).map((sign) => new Sign({ ...sign, scene, player, inputState }));
}
