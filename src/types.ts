export enum EnemyState {
    idle = "idle",
    walk = "walk",
    attack = "attack",
    dead = "dead",
}
export enum Facing {
    left = "left",
    right = "right",
}
export enum Team {
    blue = "blue",
    red = "red",
}
export enum CharType {
    orc = "orc",
    soldier = "soldier",
}

export interface CharAttrs {
    type: CharType;
    hp: number;
    damage: number;
    speed: number;
    attacksPerMinute: number;
    attackRange: number;
    sightRange: number;
    team: Team;
}
