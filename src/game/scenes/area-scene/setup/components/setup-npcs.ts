import Phaser from 'phaser';
import { AreaDefinition } from '../../../../areas/area.types';
import { Npc } from '../../../../entities/npc/npc';
import { Player } from '../../../../entities/player/player';
import { spawnBlood } from '../../../../mechanics/gore/gore';
import { passesFlagConditions } from '../../../../story/story-flags';

export function setupNpcs(scene: Phaser.Scene, area: AreaDefinition, player: Player): Npc[] {
    const npcs = (area.npcs ?? []).filter((npc) => passesFlagConditions(npc.requiresFlags, npc.forbidsFlags));

    npcs.filter((npc) => npc.corpse).forEach((npc) => spawnBlood(scene, npc.x, npc.y, 'medium'));

    return npcs.map((npc) => new Npc({ ...npc, scene, player }));
}
