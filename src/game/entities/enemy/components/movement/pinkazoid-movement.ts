import { PatrolChaseMovement } from './patrol-chase-movement';

export class PinkazoidMovement extends PatrolChaseMovement {
    protected override getChaseAnimation(): string {
        return `${this.enemy.spriteName}-walk-horizontal`;
    }
}
