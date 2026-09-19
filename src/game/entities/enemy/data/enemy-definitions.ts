import { EnemyDefinition, EnemyType } from '../enemy.types';

export const ENEMY_DEFINITIONS: Record<EnemyType, EnemyDefinition> = {
    pinkazoid: {
        spriteName: 'pinkazoid',
        health: 60,
        movement: {
            moveSpeed: 120,
            chaseSpeed: 170,
            detectionRange: 260,
            pauseDuration: 600,
            initialDelay: 400,
        },
        attack: {
            damage: 8,
            rangeMargin: 8,
            windUp: 150,
            cooldown: 600,
        },
    },
    zomboi: {
        spriteName: 'zomboi',
        health: 140,
        movement: {
            moveSpeed: 70,
            chaseSpeed: 110,
            detectionRange: 160,
            pauseDuration: 1400,
            initialDelay: 900,
        },
        attack: {
            damage: 16,
            rangeMargin: 8,
            windUp: 320,
            cooldown: 1000,
        },
    },
};
