import { Player } from '../../../Player/Player';

export interface MovementBehavior {
    setPlayer(player: Player): void;
    update(): void;
}
