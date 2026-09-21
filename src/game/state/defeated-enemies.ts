const defeatedEnemies = new Set<string>();

function enemyKey(areaKey: string, spawnIndex: number): string {
    return `${areaKey}:${spawnIndex}`;
}

export function isEnemyDefeated(areaKey: string, spawnIndex: number): boolean {
    return defeatedEnemies.has(enemyKey(areaKey, spawnIndex));
}

export function markEnemyDefeated(areaKey: string, spawnIndex: number): void {
    defeatedEnemies.add(enemyKey(areaKey, spawnIndex));
}

export function resetDefeatedEnemies(): void {
    defeatedEnemies.clear();
}
