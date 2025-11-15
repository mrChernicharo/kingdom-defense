import castleWalls from "/src/assets/images/castle-wall.png";
// export const CANVAS_WIDTH = 600;

import soldierIdleImgSrc from "/src/assets/images/Soldier-Idle.png";
import soldierWalkImgSrc from "/src/assets/images/Soldier-Walk.png";
import soldierAttackImgSrc from "/src/assets/images/Soldier-Attack01.png";
import soldierDeadImgSrc from "/src/assets/images/Soldier-Death.png";

import swordsmanIdleImgSrc from "/src/assets/images/Swordsman-Idle.png";
import swordsmanWalkImgSrc from "/src/assets/images/Swordsman-Walk.png";
import swordsmanAttackImgSrc from "/src/assets/images/Swordsman-Attack01.png";
import swordsmanDeadImgSrc from "/src/assets/images/Swordsman-Death.png";

import orcIdleImgSrc from "/src/assets/images/Orc-Idle.png";
import orcWalkImgSrc from "/src/assets/images/Orc-Walk.png";
import orcAttackImgSrc from "/src/assets/images/Orc-Attack01.png";
import orcDeadImgSrc from "/src/assets/images/Orc-Death.png";

import skeletonIdleImgSrc from "/src/assets/images/Skeleton-Idle.png";
import skeletonWalkImgSrc from "/src/assets/images/Skeleton-Walk.png";
import skeletonAttackImgSrc from "/src/assets/images/Skeleton-Attack01.png";
import skeletonDeadImgSrc from "/src/assets/images/Skeleton-Death.png";

import { Team, CharacterState, CharacterType, type CharacterAttrs } from "./types";

export const castleWallsImg = new Image();
castleWallsImg.src = castleWalls;

export const CANVAS_WIDTH = Math.min(window.innerWidth, 600);
export const CANVAS_HEIGHT = window.innerHeight;
// export const CANVAS_HEIGHT = Math.min(window.innerHeight, 900);

export const SPRITE_IMG_SIZE = 100;
const SPRITE_TRANSFORMS_OPTS = {
    xs: { scale: 1, translate: 0 },
    sm: { scale: 1.5, translate: 3 },
    md: { scale: 2, translate: 2 },
    lg: { scale: 3, translate: 1.5 },
};
export const SPRITE_TRANSFORMS = SPRITE_TRANSFORMS_OPTS.md;
// export const SPRITE_HEIGHT = 20;
// export const SPRITE_WIDTH = 20;

export const finishLinesYpos = {
    [Team.blue]: 0,
    [Team.red]: CANVAS_HEIGHT - 180,
};

export const soldierIdleImg = new Image();
export const soldierWalkImg = new Image();
export const soldierAttackImg = new Image();
export const soldierDeadImg = new Image();
soldierIdleImg.src = soldierIdleImgSrc;
soldierWalkImg.src = soldierWalkImgSrc;
soldierAttackImg.src = soldierAttackImgSrc;
soldierDeadImg.src = soldierDeadImgSrc;

export const swordsmanIdleImg = new Image();
export const swordsmanWalkImg = new Image();
export const swordsmanAttackImg = new Image();
export const swordsmanDeadImg = new Image();
swordsmanIdleImg.src = swordsmanIdleImgSrc;
swordsmanWalkImg.src = swordsmanWalkImgSrc;
swordsmanAttackImg.src = swordsmanAttackImgSrc;
swordsmanDeadImg.src = swordsmanDeadImgSrc;

export const orcIdleImg = new Image();
export const orcWalkImg = new Image();
export const orcAttackImg = new Image();
export const orcDeadImg = new Image();
orcIdleImg.src = orcIdleImgSrc;
orcWalkImg.src = orcWalkImgSrc;
orcAttackImg.src = orcAttackImgSrc;
orcDeadImg.src = orcDeadImgSrc;

export const skeletonIdleImg = new Image();
export const skeletonWalkImg = new Image();
export const skeletonAttackImg = new Image();
export const skeletonDeadImg = new Image();
skeletonIdleImg.src = skeletonIdleImgSrc;
skeletonWalkImg.src = skeletonWalkImgSrc;
skeletonAttackImg.src = skeletonAttackImgSrc;
skeletonDeadImg.src = skeletonDeadImgSrc;

export const poseFrameCount: Record<string, Record<CharacterState, number>> = {
    soldier: {
        [CharacterState.idle]: 6,
        [CharacterState.walk]: 8,
        [CharacterState.attack]: 6,
        [CharacterState.dead]: 4,
    },
    swordsman: {
        [CharacterState.idle]: 6,
        [CharacterState.walk]: 8,
        [CharacterState.attack]: 6,
        [CharacterState.dead]: 4,
    },
    orc: {
        [CharacterState.idle]: 6,
        [CharacterState.walk]: 8,
        [CharacterState.attack]: 6,
        [CharacterState.dead]: 4,
    },
    skeleton: {
        [CharacterState.idle]: 6,
        [CharacterState.walk]: 8,
        [CharacterState.attack]: 6,
        [CharacterState.dead]: 4,
    },
};
export const poseFrameSpeed: Record<string, Record<CharacterState, number>> = {
    soldier: {
        [CharacterState.idle]: 400,
        [CharacterState.walk]: 100,
        [CharacterState.attack]: 100,
        [CharacterState.dead]: 100,
    },
    swordsman: {
        [CharacterState.idle]: 400,
        [CharacterState.walk]: 100,
        [CharacterState.attack]: 100,
        [CharacterState.dead]: 100,
    },
    orc: {
        [CharacterState.idle]: 400,
        [CharacterState.walk]: 100,
        [CharacterState.attack]: 100,
        [CharacterState.dead]: 100,
    },
    skeleton: {
        [CharacterState.idle]: 400,
        [CharacterState.walk]: 100,
        [CharacterState.attack]: 100,
        [CharacterState.dead]: 100,
    },
};
export const poseImage: Record<string, Record<CharacterState, HTMLImageElement>> = {
    soldier: {
        [CharacterState.idle]: soldierIdleImg,
        [CharacterState.walk]: soldierWalkImg,
        [CharacterState.attack]: soldierAttackImg,
        [CharacterState.dead]: soldierDeadImg,
    },
    swordsman: {
        [CharacterState.idle]: swordsmanIdleImg,
        [CharacterState.walk]: swordsmanWalkImg,
        [CharacterState.attack]: swordsmanAttackImg,
        [CharacterState.dead]: swordsmanDeadImg,
    },
    orc: {
        [CharacterState.idle]: orcIdleImg,
        [CharacterState.walk]: orcWalkImg,
        [CharacterState.attack]: orcAttackImg,
        [CharacterState.dead]: orcDeadImg,
    },
    skeleton: {
        [CharacterState.idle]: skeletonIdleImg,
        [CharacterState.walk]: skeletonWalkImg,
        [CharacterState.attack]: skeletonAttackImg,
        [CharacterState.dead]: skeletonDeadImg,
    },
};

export const unitCosts = {
    soldier: 3,
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
    hp: 200,
    damage: 30,
    speed: 36,
    attackRange: 44,
    attacksPerMinute: 36,
    sightRange: 240,
    cost: unitCosts.soldier,
};

export const swordsmanAttrs: Omit<CharacterAttrs, "team"> = {
    type: CharacterType.swordsman,
    hp: 300,
    damage: 45,
    speed: 32,
    attackRange: 44,
    attacksPerMinute: 40,
    sightRange: 260,
    cost: unitCosts.swordsman,
};

export const skeletonAttrs: Omit<CharacterAttrs, "team"> = {
    type: CharacterType.skeleton,
    hp: 140,
    damage: 20,
    speed: 40,
    attackRange: 36,
    attacksPerMinute: 40,
    sightRange: 190,
    cost: unitCosts.skeleton,
};

export const DRAW_CHAR_RADIUS = true;
export const DRAW_CHAR_CENTER_POS = false;
export const DRAW_CHAR_SIGHT_RADIUS = false;

export const TIME_TO_REMOVE_DEAD_CHARACTERS = 3000;
export const DRAG_UNIT_Y_LIMIT_PERCENT = 0.6;
export const FLOATING_TEXT_Y_OFFSET = 24;
