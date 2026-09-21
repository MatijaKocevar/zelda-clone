import Phaser from 'phaser';
import { Enemy } from '../../../../entities/enemy/enemy';
import { AreaDefinition } from '../../../../areas/area.types';

export function setupEnemies(scene: Phaser.Scene, area: AreaDefinition): Enemy[] {
    return (area.enemySpawns ?? []).map((config, index) => new Enemy({ ...config, scene, initialDelay: index * 150 }));
}
