import { IEnemy } from '../entities/enemy/enemy.types';
import { ImageAsset } from '../utils/asset-loader/asset-loader.types';

export interface PlacedImage extends ImageAsset {
    x: number;
    y: number;
    depth: number;
}

export interface AreaSpawn {
    x: number;
    y: number;
}

export interface TilesetImageAsset extends ImageAsset {
    name: string;
}

export interface FlagConditions {
    requiresFlags?: string[];
    forbidsFlags?: string[];
}

export type EnemySpawn = Omit<IEnemy, 'scene' | 'initialDelay'> & FlagConditions;

export interface AreaDoor extends FlagConditions {
    x: number;
    y: number;
    width: number;
    height: number;
    target?: string;
    spawn?: AreaSpawn;
    lockedDialog?: string;
}

export type NpcDirection = 'down' | 'up' | 'left' | 'right';

export interface AreaNpcDialog extends FlagConditions {
    script: string;
}

export interface AreaNpc extends FlagConditions {
    id: string;
    x: number;
    y: number;
    spriteKey: string;
    direction?: NpcDirection;
    frame?: number;
    solid?: boolean;
    dialogs: AreaNpcDialog[];
}

export type AreaTriggerType = 'enter' | 'interact' | 'victory';

export interface AreaTrigger extends FlagConditions {
    id: string;
    type: AreaTriggerType;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    radius?: number;
    once?: boolean;
    dialog?: string;
    cinematic?: string;
    setFlags?: string[];
    suppressWin?: boolean;
}

export interface AreaSignControl {
    label?: string;
    keyboard: string[];
    gamepad: string[];
}

export interface AreaSign {
    text: string;
    x: number;
    y: number;
    controls?: AreaSignControl[];
    interactHint?: boolean;
}

export interface AreaDefinition {
    key: string;
    mapUrl: string;
    backgroundColor?: string;
    playerSpawn?: AreaSpawn;
    backgroundImages: PlacedImage[];
    foregroundImages: PlacedImage[];
    tilesetImages?: TilesetImageAsset[];
    enemySpawns?: EnemySpawn[];
    signs?: AreaSign[];
    npcs?: AreaNpc[];
    triggers?: AreaTrigger[];
}
