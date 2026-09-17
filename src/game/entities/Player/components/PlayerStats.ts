import { IPlayerStats } from '../Player.types';

export class PlayerStats {
    health: number;
    maxHealth: number;
    damage: number;
    armor: number;

    constructor({ health, maxHealth, damage, armor }: IPlayerStats) {
        this.health = health;
        this.maxHealth = maxHealth;
        this.damage = damage;
        this.armor = armor;
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
}
