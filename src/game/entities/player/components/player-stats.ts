import { IPlayerStats } from '../player.types';

const MANA_REGEN_PER_SECOND = 6;

export class PlayerStats {
    health: number;
    maxHealth: number;
    damage: number;
    armor: number;
    mana: number;
    maxMana: number;

    constructor({ health, maxHealth, damage, armor, mana, maxMana }: IPlayerStats) {
        this.health = health;
        this.maxHealth = maxHealth;
        this.damage = damage;
        this.armor = armor;
        this.mana = mana;
        this.maxMana = maxMana;
    }

    takeDamage(damage: number) {
        const mitigatedDamage = Math.max(0, damage - this.armor);
        this.health -= mitigatedDamage;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    heal(healAmount: number) {
        this.health += healAmount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    increaseDamage(damageAmount: number) {
        this.damage += damageAmount;
    }

    increaseMaxHealth(healthAmount: number) {
        this.maxHealth += healthAmount;
    }

    useMana(manaAmount: number): boolean {
        if (this.mana < manaAmount) {
            return false;
        }

        this.mana -= manaAmount;
        return true;
    }

    regenerateMana(deltaMs: number) {
        this.mana = Math.min(this.maxMana, this.mana + (MANA_REGEN_PER_SECOND * deltaMs) / 1000);
    }

    getHealth() {
        return this.health;
    }

    getMaxHealth() {
        return this.maxHealth;
    }

    getDamage() {
        return this.damage;
    }

    getArmor() {
        return this.armor;
    }

    setArmor(armor: number) {
        this.armor = armor;
    }

    setHealth(health: number) {
        this.health = health;
    }

    setMaxHealth(maxHealth: number) {
        this.maxHealth = maxHealth;
    }

    setDamage(damage: number) {
        this.damage = damage;
    }

    setMaxMana(maxMana: number) {
        this.maxMana = maxMana;
    }

    setMana(mana: number) {
        this.mana = mana;
    }
}
