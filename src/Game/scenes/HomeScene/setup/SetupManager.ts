import Phaser from 'phaser';
import { setupAnimations } from './components/setupAnimations';
import { setupBackgroundImages } from './components/setupBackgroundImages';
import { setupPlayer } from './components/setupPlayer';
import { setupEnemies } from './components/setupEnemies';
import { setupForegroundImages } from './components/setupForegroundImages';
import { setupCollisions } from './components/setupCollisions';
import { Collisions } from '../../../entities/Collisions/Collisions';
import { Enemy } from '../../../entities/Enemy/Enemy';
import { Player } from '../../../entities/Player/Player';
import { Animations } from '../../../mechanics/Animations/Animations';

export class SetupManager {
    private scene: Phaser.Scene;
    public player!: Player;
    public enemies: Enemy[] = [];
    public animations!: Animations;
    public collisions!: Collisions;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.init();
    }

    init() {
        this.animations = setupAnimations(this.scene);
        setupBackgroundImages(this.scene);
        this.player = setupPlayer(this.scene);
        this.enemies = setupEnemies(this.scene);
        this.collisions = setupCollisions(
            this.scene,
            this.player,
            this.enemies
        );
        setupForegroundImages(this.scene);
    }
}
