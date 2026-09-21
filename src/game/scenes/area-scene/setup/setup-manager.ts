import Phaser from 'phaser';
import { setupAnimations } from './components/setup-animations';
import { setupAreaImages } from './components/setup-area-images';
import { setupPlayer } from './components/setup-player';
import { setupEnemies } from './components/setup-enemies';
import { setupCollisions } from './components/setup-collisions';
import { setupDoors } from './components/setup-doors';
import { setupHudCamera } from './components/setup-hud-camera';
import { getMapCollisionRects } from '../data/get-map-collision-rects';
import { AreaDefinition, AreaSpawn } from '../../../areas/area.types';
import { Collisions } from '../../../entities/collisions/collisions';
import { Enemy } from '../../../entities/enemy/enemy';
import { Player } from '../../../entities/player/player';
import { Animations } from '../../../mechanics/animations/animations';

export class SetupManager {
    private scene: Phaser.Scene;
    private map: Phaser.Tilemaps.Tilemap;
    private area: AreaDefinition;
    private spawn?: AreaSpawn;
    public player!: Player;
    public enemies: Enemy[] = [];
    public animations!: Animations;
    public collisions!: Collisions;

    constructor(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap, area: AreaDefinition, spawn?: AreaSpawn) {
        this.scene = scene;
        this.map = map;
        this.area = area;
        this.spawn = spawn;

        this.init();
    }

    init() {
        this.animations = setupAnimations(this.scene);
        setupAreaImages(this.scene, this.area);
        this.enemies = setupEnemies(this.scene, this.area);
        this.player = setupPlayer(this.scene, this.enemies, this.map, this.area, this.spawn);
        this.enemies.forEach((enemy) => {
            enemy.enemyMovement.setPlayer(this.player);
            enemy.enemyAttack.setPlayer(this.player);
        });
        this.collisions = setupCollisions(this.scene, this.player, this.enemies, getMapCollisionRects(this.map));
        setupDoors(this.scene, this.player, this.map);

        const hudCamera = setupHudCamera(this.scene, this.player.playerLifeBar);
        this.player.playerRangedAttack.setCollisions(this.collisions);
        this.player.playerRangedAttack.setHudCamera(hudCamera);
    }
}
