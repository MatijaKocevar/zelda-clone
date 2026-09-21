import Phaser from 'phaser';
import { EnemyAnimations } from './components/enemy-animations';
import { FireballAnimations } from './components/fireball-animations';
import { HealthAnimations } from './components/health-animations';
import { PlayerAnimations } from './components/player-animations';

export class Animations {
    playerAnimations: PlayerAnimations;
    enemyAnimations: EnemyAnimations;
    healthAnimations: HealthAnimations;
    fireballAnimations: FireballAnimations;

    constructor(scene: Phaser.Scene) {
        this.playerAnimations = new PlayerAnimations(scene);
        this.enemyAnimations = new EnemyAnimations(scene);
        this.healthAnimations = new HealthAnimations(scene);
        this.fireballAnimations = new FireballAnimations(scene);

        this.init();
    }

    init() {
        this.playerAnimations.init();
        this.enemyAnimations.init();
        this.healthAnimations.init();
        this.fireballAnimations.init();
    }
}
