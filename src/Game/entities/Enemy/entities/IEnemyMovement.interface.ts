import { Enemy } from '../Enemy';

export interface IEnemyMovement {
    enemy: Enemy;
    moveDirection: 'horizontal' | 'vertical';
    spriteName: string;
}
