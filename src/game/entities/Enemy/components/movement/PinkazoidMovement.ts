import { PatrolChaseMovement } from './PatrolChaseMovement';

export class PinkazoidMovement extends PatrolChaseMovement {
    protected override getChaseAnimation(): string {
        return `${this.enemy.spriteName}-walk-horizontal`;
    }
}
