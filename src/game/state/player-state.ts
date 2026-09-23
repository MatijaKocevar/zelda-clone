import { Player } from '../entities/player/player';
import { hasFlag } from '../story/story-flags';

export interface PlayerStateSnapshot {
    xp: number;
    level: number;
    health: number;
    mana: number;
}

interface GrowthEntry {
    flag: string;
    damage?: number;
    maxHealth?: number;
    armor?: number;
    maxMana?: number;
}

const BASE_DAMAGE = 25;
const BASE_MAX_HEALTH = 300;
const BASE_ARMOR = 0;
const BASE_MAX_MANA = 100;

const LEVEL_DAMAGE = 3;
const LEVEL_MAX_HEALTH = 25;
const LEVEL_MAX_MANA = 15;

const FULL = -1;

const GROWTH: GrowthEntry[] = [
    { flag: 'act2-melee-training', damage: 10, maxHealth: 50 },
    { flag: 'act2-cave-trial', armor: 2, maxHealth: 50 },
    { flag: 'unlocked-magic', maxMana: 100 },
];

let xp = 0;
let level = 1;
let health = FULL;
let mana = FULL;
let statsVersion = 0;
let appliedVersion = -1;

export function xpToNextLevel(): number {
    return 100 + (level - 1) * 75;
}

export function getLevel(): number {
    return level;
}

export function getXp(): number {
    return xp;
}

export function grantXp(amount: number): void {
    xp += amount;

    while (xp >= xpToNextLevel()) {
        xp -= xpToNextLevel();
        level += 1;
        health = FULL;
        mana = FULL;
    }

    statsVersion += 1;
}

export function markPlayerStatsDirty(): void {
    statsVersion += 1;
}

export function resetPlayerState(): void {
    xp = 0;
    level = 1;
    health = FULL;
    mana = FULL;
    statsVersion += 1;
}

export function revivePlayerState(): void {
    health = FULL;
    mana = FULL;
    statsVersion += 1;
}

export function capturePlayerState(player: Player): void {
    if (player.playerDamage.isDead) {
        return;
    }

    health = player.playerStats.health;
    mana = player.playerStats.mana;
}

export function applyPlayerState(player: Player): void {
    const stats = player.playerStats;
    const growth = GROWTH.filter((entry) => hasFlag(entry.flag));
    const sum = (values: (number | undefined)[]) => values.reduce<number>((total, value) => total + (value ?? 0), 0);

    stats.setDamage(BASE_DAMAGE + LEVEL_DAMAGE * (level - 1) + sum(growth.map((entry) => entry.damage)));
    stats.setMaxHealth(BASE_MAX_HEALTH + LEVEL_MAX_HEALTH * (level - 1) + sum(growth.map((entry) => entry.maxHealth)));
    stats.setArmor(BASE_ARMOR + sum(growth.map((entry) => entry.armor)));
    stats.setMaxMana(BASE_MAX_MANA + LEVEL_MAX_MANA * (level - 1) + sum(growth.map((entry) => entry.maxMana)));
    stats.setHealth(health === FULL ? stats.getMaxHealth() : Math.min(health, stats.getMaxHealth()));
    stats.setMana(mana === FULL ? stats.maxMana : Math.min(mana, stats.maxMana));

    appliedVersion = statsVersion;
}

export function syncPlayerState(player: Player): void {
    if (appliedVersion !== statsVersion) {
        applyPlayerState(player);
    }
}

export function getPlayerStateSnapshot(): PlayerStateSnapshot {
    return { xp, level, health, mana };
}

export function restorePlayerStateSnapshot(snapshot: PlayerStateSnapshot): void {
    xp = snapshot.xp;
    level = snapshot.level;
    health = snapshot.health;
    mana = snapshot.mana;
    statsVersion += 1;
}
