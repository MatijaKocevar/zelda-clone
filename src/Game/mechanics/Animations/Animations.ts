import { PlayerAnimations } from './components/PlayerAnimations';

export class Animations {
    playerAnimations: PlayerAnimations;

    constructor(scene: Phaser.Scene) {
        this.playerAnimations = new PlayerAnimations(scene);

        this.init();
    }

    init() {
        this.playerAnimations.init();
    }
}
