import { Player } from '../../../Player/Player';

export interface AttackBehavior {
    isAttacking: boolean;
    setPlayer(player: Player): void;
    update(): void;
}
