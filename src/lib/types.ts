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
    skeleton = "skeleton",
    skeletonArcher = "skeleton-archer",

    soldier = "soldier",
    swordsman = "swordsman",
    archer = "archer",
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

export type CharacterBlueprint = Omit<CharacterAttrs, "team"> & { description: string };
