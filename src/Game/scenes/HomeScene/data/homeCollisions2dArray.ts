import { collisionData } from './HomeCollisions';

export const getHomeCollisions2dArray = () => {
    const collisions2D = [];

    for (let i = 0; i < collisionData.length; i += 80) {
        collisions2D.push(collisionData.slice(i, i + 80));
    }

    return collisions2D;
};
