import { Player } from '../../../player/player';

export interface MovementBehavior {
    setPlayer(player: Player): void;
    update(): void;
}
