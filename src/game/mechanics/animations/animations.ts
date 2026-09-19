import Phaser from 'phaser';
import { EnemyAnimations } from './components/enemy-animations';
import { HealthAnimations } from './components/health-animations';
import { PlayerAnimations } from './components/player-animations';

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
