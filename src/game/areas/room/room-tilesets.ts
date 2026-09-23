import bedTileset from '../../../assets/OG/ninja-4x/TilesetBed.png';
import campTileset from '../../../assets/OG/ninja-4x/TilesetCamp.png';
import elementsTileset from '../../../assets/OG/ninja-4x/TilesetElements.png';
import interiorFloorTileset from '../../../assets/OG/ninja-4x/TilesetInteriorFloor.png';
import reliefTileset from '../../../assets/OG/ninja-4x/TilesetRelief.png';
import reliefDetailTileset from '../../../assets/OG/ninja-4x/TilesetReliefDetail.png';
import wallSimpleTileset from '../../../assets/OG/ninja-4x/TilesetWallSimple.png';
import { TilesetImageAsset } from '../area.types';

export const houseTilesetImages: TilesetImageAsset[] = [
    { name: 'TilesetWallSimple', key: 'room-tileset-wall-simple', path: wallSimpleTileset },
    { name: 'TilesetInteriorFloor', key: 'room-tileset-interior-floor', path: interiorFloorTileset },
    { name: 'TilesetBed', key: 'room-tileset-bed', path: bedTileset },
    { name: 'TilesetCamp', key: 'room-tileset-camp', path: campTileset },
    { name: 'TilesetElements', key: 'room-tileset-elements', path: elementsTileset },
];

export const caveTilesetImages: TilesetImageAsset[] = [
    { name: 'TilesetRelief', key: 'room-tileset-relief', path: reliefTileset },
    { name: 'TilesetInteriorFloor', key: 'room-tileset-interior-floor', path: interiorFloorTileset },
    { name: 'TilesetReliefDetail', key: 'room-tileset-relief-detail', path: reliefDetailTileset },
];
