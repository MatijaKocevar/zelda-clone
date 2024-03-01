import { IPlayerStats } from '../Player.types';

export class PlayerStats {
    health: number;
    maxHealth: number;
    damage: number;

    constructor({ health, maxHealth, damage }: IPlayerStats) {
        this.health = health;
        this.maxHealth = maxHealth;
        this.damage = damage;
    }

    takeDamage(damage: number) {
        this.health -= damage;
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
