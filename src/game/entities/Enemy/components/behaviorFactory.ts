import { EnemyType, IAttackBehavior, IMovementBehavior } from '../Enemy.types';
import { AttackBehavior } from './attack/AttackBehavior';
import { PinkazoidAttack } from './attack/PinkazoidAttack';
import { ZomboiAttack } from './attack/ZomboiAttack';
import { MovementBehavior } from './movement/MovementBehavior';
import { PinkazoidMovement } from './movement/PinkazoidMovement';
import { ZomboiMovement } from './movement/ZomboiMovement';

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
