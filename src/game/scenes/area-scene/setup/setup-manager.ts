import Phaser from 'phaser';
import { setupAnimations } from './components/setup-animations';
import { setupAreaImages } from './components/setup-area-images';
import { setupSigns } from './components/setup-signs';
import { setupNpcs } from './components/setup-npcs';
import { setupPlayer } from './components/setup-player';
import { setupEnemies } from './components/setup-enemies';
import { setupCollisions } from './components/setup-collisions';
import { setupDoors } from './components/setup-doors';
import { setupHudCamera } from './components/setup-hud-camera';
import { getMapCollisionRects } from '../data/get-map-collision-rects';
import { TriggerManager } from '../update/trigger-manager';
import { ObjectiveDisplay } from '../../../hud/objective-display';
import { applyPlayerState } from '../../../state/player-state';
import { AreaDefinition, AreaSpawn } from '../../../areas/area.types';
import { Collisions } from '../../../entities/collisions/collisions';
import { Enemy } from '../../../entities/enemy/enemy';
import { Npc } from '../../../entities/npc/npc';
import { Player } from '../../../entities/player/player';
import { Sign } from '../../../entities/sign/sign';
import { Animations } from '../../../mechanics/animations/animations';

export class SetupManager {
    private scene: Phaser.Scene;
    private map: Phaser.Tilemaps.Tilemap;
    private area: AreaDefinition;
    private spawn?: AreaSpawn;
    public player!: Player;
    public enemies: Enemy[] = [];
    public signs: Sign[] = [];
    public npcs: Npc[] = [];
    public triggers!: TriggerManager;
    public objectiveDisplay!: ObjectiveDisplay;
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
        this.signs = setupSigns(this.scene, this.area, this.player);
        this.npcs = setupNpcs(this.scene, this.area, this.player);
        this.triggers = new TriggerManager(this.scene, this.player, this.area);
        applyPlayerState(this.player);
        this.objectiveDisplay = new ObjectiveDisplay(this.scene);

        const hudCamera = setupHudCamera(this.scene, [
            ...this.player.playerLifeBar.getObjects(),
            ...this.player.playerManaBar.getObjects(),
            ...this.objectiveDisplay.getObjects(),
        ]);
        this.player.playerRangedAttack.setCollisions(this.collisions);
        this.player.playerRangedAttack.setHudCamera(hudCamera);
    }
}
