export enum Facing {
    left = "left",
    right = "right",
}
export enum Team {
    blue = "blue",
    red = "red",
}
export enum CharacterType {
    orc = "orc",
    soldier = "soldier",
    skeleton = "skeleton",
    swordsman = "swordsman",
}

export enum CharacterState {
    idle = "idle",
    walk = "walk",
    attack = "attack",
    dead = "dead",
}
export interface CharacterAttrs {
    type: CharacterType;
    hp: number;
    damage: number;
    speed: number;
    attacksPerMinute: number;
    attackRange: number;
    sightRange: number;
    team: Team;
    cost: number;
}
