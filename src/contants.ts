// export const CANVAS_WIDTH = 600;

import soldierIdleImgSrc from "/src/assets/images/Soldier-Idle.png";
import soldierWalkImgSrc from "/src/assets/images/Soldier-Walk.png";
import soldierAttackImgSrc from "/src/assets/images/Soldier-Attack01.png";
import soldierDeadImgSrc from "/src/assets/images/Soldier-Death.png";

import orcIdleImgSrc from "/src/assets/images/Orc-Idle.png";
import orcWalkImgSrc from "/src/assets/images/Orc-Walk.png";
import orcAttackImgSrc from "/src/assets/images/Orc-Attack01.png";
import orcDeadImgSrc from "/src/assets/images/Orc-Death.png";

import skeletonIdleImgSrc from "/src/assets/images/Skeleton-Idle.png";
import skeletonWalkImgSrc from "/src/assets/images/Skeleton-Walk.png";
import skeletonAttackImgSrc from "/src/assets/images/Skeleton-Attack01.png";
import skeletonDeadImgSrc from "/src/assets/images/Skeleton-Death.png";

import { Team, EnemyState, CharType, type CharAttrs } from "./types";

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 800;
export const SPRITE_IMG_SIZE = 100;

export const SPRITE_SCALE = 1.5;
export const SPRITE_TRANSFORMS = {
    xs: { scale: 1, translate: 0 },
    sm: { scale: 1.5, translate: 0.3333 },
    md: { scale: 2, translate: 2 },
    lg: { scale: 3, translate: 1.5 },
};
// export const SPRITE_HEIGHT = 20;
// export const SPRITE_WIDTH = 20;

export const DRAW_CHAR_CENTER_POS = true;
export const DRAW_CHAR_SIGHT_RADIUS = true;

export const TIME_TO_REMOVE_DEAD_CHARACTERS = 3000;

export const finishLinesYpos = {
    [Team.blue]: 0,
    [Team.red]: CANVAS_HEIGHT,
};

export const soldierIdleImg = new Image();
export const soldierWalkImg = new Image();
export const soldierAttackImg = new Image();
export const soldierDeadImg = new Image();
soldierIdleImg.src = soldierIdleImgSrc;
soldierWalkImg.src = soldierWalkImgSrc;
soldierAttackImg.src = soldierAttackImgSrc;
soldierDeadImg.src = soldierDeadImgSrc;

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

export const poseFrameCount: Record<string, Record<EnemyState, number>> = {
    soldier: {
        [EnemyState.idle]: 6,
        [EnemyState.walk]: 8,
        [EnemyState.attack]: 6,
        [EnemyState.dead]: 4,
    },
    orc: {
        [EnemyState.idle]: 6,
        [EnemyState.walk]: 8,
        [EnemyState.attack]: 6,
        [EnemyState.dead]: 4,
    },
    skeleton: {
        [EnemyState.idle]: 6,
        [EnemyState.walk]: 8,
        [EnemyState.attack]: 6,
        [EnemyState.dead]: 4,
    },
};
export const poseFrameSpeed: Record<string, Record<EnemyState, number>> = {
    soldier: {
        [EnemyState.idle]: 400,
        [EnemyState.walk]: 100,
        [EnemyState.attack]: 100,
        [EnemyState.dead]: 100,
    },
    orc: {
        [EnemyState.idle]: 400,
        [EnemyState.walk]: 100,
        [EnemyState.attack]: 100,
        [EnemyState.dead]: 100,
    },
    skeleton: {
        [EnemyState.idle]: 400,
        [EnemyState.walk]: 100,
        [EnemyState.attack]: 100,
        [EnemyState.dead]: 100,
    },
};
export const poseImage: Record<string, Record<EnemyState, HTMLImageElement>> = {
    soldier: {
        [EnemyState.idle]: soldierIdleImg,
        [EnemyState.walk]: soldierWalkImg,
        [EnemyState.attack]: soldierAttackImg,
        [EnemyState.dead]: soldierDeadImg,
    },
    orc: {
        [EnemyState.idle]: orcIdleImg,
        [EnemyState.walk]: orcWalkImg,
        [EnemyState.attack]: orcAttackImg,
        [EnemyState.dead]: orcDeadImg,
    },
    skeleton: {
        [EnemyState.idle]: skeletonIdleImg,
        [EnemyState.walk]: skeletonWalkImg,
        [EnemyState.attack]: skeletonAttackImg,
        [EnemyState.dead]: skeletonDeadImg,
    },
};

export const orcAttrs: Omit<CharAttrs, "team"> = {
    type: CharType.orc,
    hp: 300,
    damage: 40,
    speed: 30,
    attackRange: 22,
    attacksPerMinute: 25,
    sightRange: 150,
};

export const soldierAttrs: Omit<CharAttrs, "team"> = {
    type: CharType.soldier,
    hp: 200,
    damage: 30,
    speed: 36,
    attackRange: 16,
    attacksPerMinute: 36,
    sightRange: 120,
};

export const skeletonAttrs: Omit<CharAttrs, "team"> = {
    type: CharType.skeleton,
    hp: 140,
    damage: 20,
    speed: 40,
    attackRange: 16,
    attacksPerMinute: 40,
    sightRange: 130,
};
