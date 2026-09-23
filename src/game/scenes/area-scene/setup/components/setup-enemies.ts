import Phaser from 'phaser';
import { Enemy } from '../../../../entities/enemy/enemy';
import { AreaDefinition } from '../../../../areas/area.types';
import { ENEMIES_ENABLED, ENFORCE_STORY_GATING } from '../../../../dev-flags';
import { ENEMY_DEFINITIONS } from '../../../../entities/enemy/data/enemy-definitions';
import { isEnemyDefeated, markEnemyDefeated } from '../../../../state/defeated-enemies';
import { grantXp } from '../../../../state/player-state';
import { passesFlagConditions } from '../../../../story/story-flags';

export function setupEnemies(scene: Phaser.Scene, area: AreaDefinition): Enemy[] {
    if (!ENEMIES_ENABLED) return [];

    return (area.enemySpawns ?? [])
        .map((config, index) => ({ config, index }))
        .filter(
            ({ config }) => !ENFORCE_STORY_GATING || passesFlagConditions(config.requiresFlags, config.forbidsFlags),
        )
        .filter(({ index }) => !isEnemyDefeated(area.key, index))
        .map(
            ({ config, index }) =>
                new Enemy({
                    ...config,
                    scene,
                    initialDelay: index * 150,
                    onDeath: () => {
                        markEnemyDefeated(area.key, index);
                        grantXp(ENEMY_DEFINITIONS[config.type].xp);
                    },
                }),
        );
}
