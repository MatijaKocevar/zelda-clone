import Phaser from 'phaser';
import { setupAnimations } from './components/setup-animations';
import { setupAreaImages } from './components/setup-area-images';
import { setupPlayer } from './components/setup-player';
import { setupEnemies } from './components/setup-enemies';
import { setupCollisions } from './components/setup-collisions';
import { setupHudCamera } from './components/setup-hud-camera';
import { getMapCollisionRects } from '../data/get-map-collision-rects';
import { AreaDefinition } from '../../../areas/area.types';
import { Collisions } from '../../../entities/collisions/collisions';
import { Enemy } from '../../../entities/enemy/enemy';
import { Player } from '../../../entities/player/player';
import { Animations } from '../../../mechanics/animations/animations';

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
        setupHudCamera(this.scene, this.player.playerLifeBar);
    }
}
