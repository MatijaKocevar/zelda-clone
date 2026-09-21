import tutorialMapUrl from '../../../assets/map/tutorial/tutorial.tmj?url';
import waterBackground from '../../../assets/OG/tiny-swords/Terrain/Tileset/Water Background color.png';
import tilemapColor1 from '../../../assets/OG/tiny-swords/Terrain/Tileset/Tilemap_color1.png';
import villageHouses from '../../../assets/map/tutorial/image-b4ab5f91e491cb6c2fcc6c9accef2157909615914ea2669070bfc035c23d6bdf.png';
import blueTower from '../../../assets/map/tutorial/image-07f902950e36912e207a09ad2dc1b986ad9c7eb345a1f015b18924ef465066e1.png';
import tree1 from '../../../assets/map/tutorial/image-704699a9d78db1b7cc7fa2adcf4594cd5f2fb81fa91903866e13b5d4f51dcd1b.png';
import bush1 from '../../../assets/map/tutorial/image-e37e902e18f8218a12c276e56daa14d2a32d88418cab814effa0a0618f6d1b5e.png';
import rocks from '../../../assets/map/tutorial/image-dab113e169f8176cd2cde37027c06af8f2cc406b0c815624127048500943bb04.png';
import { AreaDefinition, TilesetImageAsset } from '../area.types';
import { tutorialEnemySpawns } from './tutorial-enemies';

const tutorialTilesetImages: TilesetImageAsset[] = [
    { name: 'Water Background color', key: 'tutorial-water-background', path: waterBackground },
    { name: 'Tilemap_color1', key: 'tutorial-tilemap-color1', path: tilemapColor1 },
    { name: 'Village Houses', key: 'village-houses', path: villageHouses },
    { name: 'Blue Tower', key: 'blue-tower', path: blueTower },
    { name: 'Tree 1', key: 'tree1', path: tree1 },
    { name: 'Bush 1', key: 'bush1', path: bush1 },
    { name: 'Rocks', key: 'rocks', path: rocks },
];

export const tutorialArea: AreaDefinition = {
    key: 'tutorial',
    mapUrl: tutorialMapUrl,
    playerSpawn: { x: 2560, y: 1480 },
    backgroundImages: [],
    foregroundImages: [],
    tilesetImages: tutorialTilesetImages,
    enemySpawns: tutorialEnemySpawns,
};
