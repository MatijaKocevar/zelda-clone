import { EnemyAnimations } from './components/EnemyAnimations';
import { HealthAnimations } from './components/HealthAnimations';
import { PlayerAnimations } from './components/PlayerAnimations';

export class Animations {
    playerAnimations: PlayerAnimations;
    enemyAnimations: EnemyAnimations;
    healthAnimations: HealthAnimations;

    constructor(scene: Phaser.Scene) {
        this.playerAnimations = new PlayerAnimations(scene);
        this.enemyAnimations = new EnemyAnimations(scene);
        this.healthAnimations = new HealthAnimations(scene);

        this.init();
    }

    init() {
        this.playerAnimations.init();
        this.enemyAnimations.init();
        this.healthAnimations.init();
    }
}
