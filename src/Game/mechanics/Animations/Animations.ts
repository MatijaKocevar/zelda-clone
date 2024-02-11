import { EnemyAnimations } from './components/EnemyAnimations';
import { PlayerAnimations } from './components/PlayerAnimations';

export class Animations {
    playerAnimations: PlayerAnimations;
    enemyAnimations: EnemyAnimations;

    constructor(scene: Phaser.Scene) {
        this.playerAnimations = new PlayerAnimations(scene);
        this.enemyAnimations = new EnemyAnimations(scene);

        this.init();
    }

    init() {
        this.playerAnimations.init();
        this.enemyAnimations.init();
    }
}
