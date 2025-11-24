import { Team, CharacterType, type CharacterAttrs } from "./types";

export const CANVAS_WIDTH = Math.min(window.innerWidth, 600);
export const CANVAS_HEIGHT = window.innerHeight - 100;

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
    [Team.red]: CANVAS_HEIGHT - 180,
};

export const unitCosts = {
    soldier: 3,
    archer: 3,
    swordsman: 5,
    orc: 4,
    skeleton: 2,
};

export const orcAttrs: Omit<CharacterAttrs, "team"> = {
    type: CharacterType.orc,
    hp: 300,
    damage: 40,
    speed: 30,
    attackRange: 52,
    attacksPerMinute: 25,
    sightRange: 220,
    cost: unitCosts.orc,
};

export const soldierAttrs: Omit<CharacterAttrs, "team"> = {
    type: CharacterType.soldier,
    hp: 220,
    damage: 30,
    speed: 36,
    attackRange: 52,
    attacksPerMinute: 36,
    sightRange: 240,
    cost: unitCosts.soldier,
};

export const archerAttrs: Omit<CharacterAttrs, "team"> = {
    type: CharacterType.archer,
    hp: 110,
    damage: 20,
    speed: 30,
    attackRange: 280,
    attacksPerMinute: 40,
    sightRange: 400,
    cost: unitCosts.archer,
};

export const swordsmanAttrs: Omit<CharacterAttrs, "team"> = {
    type: CharacterType.swordsman,
    hp: 310,
    damage: 45,
    speed: 32,
    attackRange: 50,
    attacksPerMinute: 40,
    sightRange: 260,
    cost: unitCosts.swordsman,
};

export const skeletonAttrs: Omit<CharacterAttrs, "team"> = {
    type: CharacterType.skeleton,
    hp: 140,
    damage: 20,
    speed: 40,
    attackRange: 48,
    attacksPerMinute: 40,
    sightRange: 190,
    cost: unitCosts.skeleton,
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
