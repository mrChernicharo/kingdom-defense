// export const CANVAS_WIDTH = 600;

import soldierIdleImgSrc from "/src/assets/images/Soldier-Idle.png";
import soldierWalkImgSrc from "/src/assets/images/Soldier-Walk.png";
import soldierAttackImgSrc from "/src/assets/images/Soldier-Attack01.png";
import soldierDeadImgSrc from "/src/assets/images/Soldier-Death.png";
import orcIdleImgSrc from "/src/assets/images/Orc-Idle.png";
import orcWalkImgSrc from "/src/assets/images/Orc-Walk.png";
import orcAttackImgSrc from "/src/assets/images/Orc-Attack01.png";
import orcDeadImgSrc from "/src/assets/images/Orc-Death.png";

import { Team, EnemyState, CharType, type CharAttrs } from "./types";

// export const CANVAS_HEIGHT = 800;
export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;
export const SPRITE_IMG_SIZE = 100;
export const SPRITE_HEIGHT = 20;
export const SPRITE_WIDTH = 20;

export const DRAW_CHAR_CENTER_POS = false;
export const DRAW_CHAR_SIGHT_RADIUS = false;

export const TIME_TO_REMOVE_DEAD_CHARACTERS = 3000;

export const finishLinesYpos = {
    [Team.blue]: 0,
    [Team.red]: CANVAS_HEIGHT,
};

export const soldierIdleImg = new Image();
soldierIdleImg.src = soldierIdleImgSrc;

export const soldierWalkImg = new Image();
soldierWalkImg.src = soldierWalkImgSrc;

export const soldierAttackImg = new Image();
soldierAttackImg.src = soldierAttackImgSrc;

export const soldierDeadImg = new Image();
soldierDeadImg.src = soldierDeadImgSrc;

export const orcIdleImg = new Image();
orcIdleImg.src = orcIdleImgSrc;

export const orcWalkImg = new Image();
orcWalkImg.src = orcWalkImgSrc;

export const orcAttackImg = new Image();
orcAttackImg.src = orcAttackImgSrc;

export const orcDeadImg = new Image();
orcDeadImg.src = orcDeadImgSrc;

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
