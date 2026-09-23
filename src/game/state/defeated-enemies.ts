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

export function getDefeatedEnemies(): string[] {
    return [...defeatedEnemies];
}

export function setDefeatedEnemies(keys: string[]): void {
    defeatedEnemies.clear();
    keys.forEach((key) => defeatedEnemies.add(key));
}

export function resetDefeatedEnemies(): void {
    defeatedEnemies.clear();
}
