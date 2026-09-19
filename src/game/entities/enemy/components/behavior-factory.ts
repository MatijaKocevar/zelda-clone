import { EnemyType, IAttackBehavior, IMovementBehavior } from '../enemy.types';
import { AttackBehavior } from './attack/attack-behavior';
import { PinkazoidAttack } from './attack/pinkazoid-attack';
import { ZomboiAttack } from './attack/zomboi-attack';
import { MovementBehavior } from './movement/movement-behavior';
import { PinkazoidMovement } from './movement/pinkazoid-movement';
import { ZomboiMovement } from './movement/zomboi-movement';

type MovementBehaviorConstructor = new (params: IMovementBehavior) => MovementBehavior;
type AttackBehaviorConstructor = new (params: IAttackBehavior) => AttackBehavior;

const MOVEMENT_BEHAVIORS: Record<EnemyType, MovementBehaviorConstructor> = {
    pinkazoid: PinkazoidMovement,
    zomboi: ZomboiMovement,
};

const ATTACK_BEHAVIORS: Record<EnemyType, AttackBehaviorConstructor> = {
    pinkazoid: PinkazoidAttack,
    zomboi: ZomboiAttack,
};

export function createMovementBehavior(type: EnemyType, params: IMovementBehavior): MovementBehavior {
    const Behavior = MOVEMENT_BEHAVIORS[type];

    return new Behavior(params);
}

export function createAttackBehavior(type: EnemyType, params: IAttackBehavior): AttackBehavior {
    const Behavior = ATTACK_BEHAVIORS[type];

    return new Behavior(params);
}
