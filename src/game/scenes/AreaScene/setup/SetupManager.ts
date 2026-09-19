import Phaser from 'phaser';
import { setupAnimations } from './components/setupAnimations';
import { setupAreaImages } from './components/setupAreaImages';
import { setupPlayer } from './components/setupPlayer';
import { setupEnemies } from './components/setupEnemies';
import { setupCollisions } from './components/setupCollisions';
import { getMapCollisionRects } from '../data/getMapCollisionRects';
import { AreaDefinition } from '../../../areas/Area.types';
import { Collisions } from '../../../entities/Collisions/Collisions';
import { Enemy } from '../../../entities/Enemy/Enemy';
import { Player } from '../../../entities/Player/Player';
import { Animations } from '../../../mechanics/Animations/Animations';

export class SetupManager {
    private scene: Phaser.Scene;
    private map: Phaser.Tilemaps.Tilemap;
    private area: AreaDefinition;
    public player!: Player;
    public enemies: Enemy[] = [];
    public animations!: Animations;
    public collisions!: Collisions;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap, area: AreaDefinition) {
        this.scene = scene;
        this.map = map;
        this.area = area;

        this.init();
    }

    init() {
        this.animations = setupAnimations(this.scene);
        setupAreaImages(this.scene, this.area);
        this.enemies = setupEnemies(this.scene);
        this.player = setupPlayer(this.scene, this.enemies, this.map, this.area);
        this.enemies.forEach((enemy) => {
            enemy.enemyMovement.setPlayer(this.player);
            enemy.enemyAttack.setPlayer(this.player);
        });
        this.collisions = setupCollisions(this.scene, this.player, this.enemies, getMapCollisionRects(this.map));
    }
}
