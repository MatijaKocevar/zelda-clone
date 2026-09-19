import { PatrolChaseMovement } from './patrol-chase-movement';

export class ZomboiMovement extends PatrolChaseMovement {
    protected override getChaseAnimation(): string {
        const horizontal = Math.abs(Math.cos(this.chaseAngle)) >= Math.abs(Math.sin(this.chaseAngle));

        if (horizontal) return `${this.enemy.spriteName}-walk-horizontal`;

        return `${this.enemy.spriteName}-walk-${Math.sin(this.chaseAngle) < 0 ? 'up' : 'down'}`;
    }
}
