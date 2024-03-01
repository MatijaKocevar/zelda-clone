import { Enemy } from '../../../../entities/Enemy/Enemy';
import { IEnemy } from '../../../../entities/Enemy/Enemy.types';

export function setupEnemies(scene: Phaser.Scene): Enemy[] {
    const enemyConfigurations: IEnemy[] = [
        {
            position: { x: 2200, y: 1350 },
            scene: scene,
            moveDirection: 'horizontal',
            spriteName: 'pinkazoid',
        },
        {
            position: { x: 2400, y: 825 },
            scene: scene,
            moveDirection: 'horizontal',
            spriteName: 'zomboi',
        },
        {
            position: { x: 2000, y: 1750 },
            scene: scene,
            moveDirection: 'horizontal',
            spriteName: 'pinkazoid',
        },
        {
            position: { x: 2700, y: 950 },
            scene: scene,
            moveDirection: 'vertical',
            spriteName: 'zomboi',
        },
        {
            position: { x: 1850, y: 1100 },
            scene: scene,
            moveDirection: 'vertical',
            spriteName: 'pinkazoid',
        },
        {
            position: { x: 2700, y: 1500 },
            scene: scene,
            moveDirection: 'vertical',
            spriteName: 'zomboi',
        },
    ];

    return enemyConfigurations.map((config) => new Enemy(config));
}
