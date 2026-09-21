import Phaser from 'phaser';
import { Enemy } from '../../../../entities/enemy/enemy';
import { AreaDefinition } from '../../../../areas/area.types';
import { ENEMIES_ENABLED } from '../../../../dev-flags';
import { isEnemyDefeated, markEnemyDefeated } from '../../../../state/defeated-enemies';

export function setupEnemies(scene: Phaser.Scene, area: AreaDefinition): Enemy[] {
    if (!ENEMIES_ENABLED) return [];

    return (area.enemySpawns ?? [])
        .map((config, index) => ({ config, index }))
        .filter(({ index }) => !isEnemyDefeated(area.key, index))
        .map(
            ({ config, index }) =>
                new Enemy({
                    ...config,
                    scene,
                    initialDelay: index * 150,
                    onDeath: () => markEnemyDefeated(area.key, index),
                }),
        );
}
