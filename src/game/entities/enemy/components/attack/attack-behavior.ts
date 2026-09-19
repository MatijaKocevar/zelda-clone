import { Player } from '../../../player/player';

export interface AttackBehavior {
    isAttacking: boolean;
    setPlayer(player: Player): void;
    update(): void;
}
