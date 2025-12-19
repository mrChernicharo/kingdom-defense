import { Team, CharacterType, type CharacterBlueprint } from "./types";

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 1200;
export const BOTTOM_LIMIT_Y = CANVAS_HEIGHT - 140;

export const SPRITE_IMG_SIZE = 100;
const SPRITE_TRANSFORMS_OPTS = {
    xs: { scale: 1, translate: 0 },
    sm: { scale: 1.5, translate: 3 },
    md: { scale: 2, translate: 2 },
    lg: { scale: 3, translate: 1.5 },
};
export const SPRITE_TRANSFORMS = SPRITE_TRANSFORMS_OPTS.md;

export const finishLinesYpos = {
    [Team.blue]: 0,
    [Team.red]: BOTTOM_LIMIT_Y,
};

export const unitCosts = {
    soldier: 2,
    archer: 3,
    swordsman: 4,
    orc: 3,
    skeleton: 2,
    "skeleton-archer": 3,
};

export const orcAttrs: CharacterBlueprint = {
    type: CharacterType.orc,
    hp: 300,
    damage: 40,
    speed: 30,
    attackRange: 52,
    attacksPerMinute: 25,
    sightRange: 220,
    cost: unitCosts.orc,
    description: "Strong melee unit with high health and damage.",
};

export const soldierAttrs: CharacterBlueprint = {
    type: CharacterType.soldier,
    hp: 160,
    damage: 30,
    speed: 36,
    attackRange: 52,
    attacksPerMinute: 36,
    sightRange: 240,
    cost: unitCosts.soldier,
    description: "Balanced unit with good speed and attack rate.",
};

export const archerAttrs: CharacterBlueprint = {
    type: CharacterType.archer,
    hp: 110,
    damage: 20,
    speed: 30,
    attackRange: 280,
    attacksPerMinute: 40,
    sightRange: 400,
    cost: unitCosts.archer,
    description: "Ranged attacker with long range and wide sight.",
};

export const skeletonArcherAttrs: CharacterBlueprint = {
    type: CharacterType.skeletonArcher,
    hp: 120,
    damage: 18,
    speed: 32,
    attackRange: 280,
    attacksPerMinute: 40,
    sightRange: 380,
    cost: unitCosts["skeleton-archer"],
    description: "Undead ranged unit with moderate range and health.",
};

export const swordsmanAttrs: CharacterBlueprint = {
    type: CharacterType.swordsman,
    hp: 310,
    damage: 45,
    speed: 32,
    attackRange: 50,
    attacksPerMinute: 40,
    sightRange: 260,
    cost: unitCosts.swordsman,
    description: "Powerful melee warrior with highest health and damage.",
};

export const skeletonAttrs: CharacterBlueprint = {
    type: CharacterType.skeleton,
    hp: 140,
    damage: 20,
    speed: 40,
    attackRange: 48,
    attacksPerMinute: 40,
    sightRange: 190,
    cost: unitCosts.skeleton,
    description: "Fast undead melee unit with low cost and speed advantage.",
};

export const DRAW_CHAR_RADIUS = false;
export const DRAW_CHAR_CENTER_POS = false;
export const DRAW_CHAR_SIGHT_RADIUS = false;

export const TIME_TO_REMOVE_DEAD_CHARACTERS = 3000;
export const DRAG_UNIT_Y_LIMIT_PERCENT = 0.6;
export const FLOATING_TEXT_Y_OFFSET = 24;

export const INITIAL_MANA = 3;
export const MANA_PER_MINUTE = 36;

export const CLOCK_DEFAULT_TIME_MULTIPLIER = 1;
