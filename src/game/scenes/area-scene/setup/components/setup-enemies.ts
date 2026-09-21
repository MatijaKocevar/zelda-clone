import Phaser from 'phaser';
import { Enemy } from '../../../../entities/enemy/enemy';
import { AreaDefinition } from '../../../../areas/area.types';
import { ENEMIES_ENABLED } from '../../../../dev-flags';

export function setupEnemies(scene: Phaser.Scene, area: AreaDefinition): Enemy[] {
    if (!ENEMIES_ENABLED) return [];

    return (area.enemySpawns ?? []).map((config, index) => new Enemy({ ...config, scene, initialDelay: index * 150 }));
}
