import { Enemy } from '../../../../entities/Enemy/Enemy';
import { IEnemy } from '../../../../entities/Enemy/Enemy.types';

export function setupEnemies(scene: Phaser.Scene): Enemy[] {
    const enemyConfigurations: IEnemy[] = [
        {
            position: { x: 2100, y: 1350 },
            scene: scene,
            spriteName: 'pinkazoid',
            patrolPath: [
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 2680, y: 950 },
            scene: scene,
            spriteName: 'zomboi',
            patrolPath: [
                {
                    direction: 'down',
                    distance: 100,
                },
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'right',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 2850, y: 1315 },
            scene: scene,
            spriteName: 'pinkazoid',
            patrolPath: [
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 2690, y: 1650 },
            scene: scene,
            spriteName: 'pinkazoid',
            patrolPath: [
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 1881, y: 1640 },
            scene: scene,
            spriteName: 'zomboi',
            patrolPath: [
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 1850, y: 995 },
            scene: scene,
            spriteName: 'zomboi',
            patrolPath: [
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 1180, y: 1230 },
            scene: scene,
            spriteName: 'pinkazoid',
            patrolPath: [
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 2250, y: 795 },
            scene: scene,
            spriteName: 'pinkazoid',
            patrolPath: [
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
                {
                    direction: 'right',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 1675, y: 750 },
            scene: scene,
            spriteName: 'pinkazoid',
            patrolPath: [
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 3017, y: 866 },
            scene: scene,
            spriteName: 'zomboi',
            patrolPath: [
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 3676, y: 883 },
            scene: scene,
            spriteName: 'zomboi',
            patrolPath: [
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 4163, y: 958 },
            scene: scene,
            spriteName: 'zomboi',
            patrolPath: [
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 3791, y: 1380 },
            scene: scene,
            spriteName: 'zomboi',
            patrolPath: [
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 3703, y: 1570 },
            scene: scene,
            spriteName: 'pinkazoid',
            patrolPath: [
                {
                    direction: 'right',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'left',
                    distance: 100,
                },
            ],
        },
        {
            position: { x: 3145, y: 1841 },
            scene: scene,
            spriteName: 'pinkazoid',
            patrolPath: [
                {
                    direction: 'left',
                    distance: 100,
                },
                {
                    direction: 'up',
                    distance: 100,
                },
                {
                    direction: 'down',
                    distance: 100,
                },
                {
                    direction: 'right',
                    distance: 100,
                },
            ],
        },
    ];

    return enemyConfigurations.map((config) => new Enemy(config));
}
