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

export type EnemySpawn = Omit<IEnemy, 'scene' | 'initialDelay'>;

export interface AreaDoor {
    x: number;
    y: number;
    width: number;
    height: number;
    target?: string;
    spawn?: AreaSpawn;
}

export interface AreaSign {
    text: string;
    x: number;
    y: number;
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
}
