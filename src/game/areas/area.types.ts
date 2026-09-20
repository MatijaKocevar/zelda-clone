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

export interface AreaDefinition {
    key: string;
    mapUrl: string;
    playerSpawn?: AreaSpawn;
    backgroundImages: PlacedImage[];
    foregroundImages: PlacedImage[];
    tilesetImages?: TilesetImageAsset[];
}
