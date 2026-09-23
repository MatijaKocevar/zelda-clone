import Phaser from 'phaser';
import { AreaDefinition } from '../../../../areas/area.types';
import { Npc } from '../../../../entities/npc/npc';
import { Player } from '../../../../entities/player/player';
import { passesFlagConditions } from '../../../../story/story-flags';

export function setupNpcs(scene: Phaser.Scene, area: AreaDefinition, player: Player): Npc[] {
    return (area.npcs ?? [])
        .filter((npc) => passesFlagConditions(npc.requiresFlags, npc.forbidsFlags))
        .map((npc) => new Npc({ ...npc, scene, player }));
}
