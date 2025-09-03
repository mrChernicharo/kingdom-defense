// export const CANVAS_WIDTH = 600;

import { Team, EnemyState, CharType, type CharAttrs } from "./types";

// export const CANVAS_HEIGHT = 800;
export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;
export const SPRITE_IMG_SIZE = 100;
export const SPRITE_HEIGHT = 20;
export const SPRITE_WIDTH = 20;

export const DRAW_CHAR_CENTER_POS = true;
export const DRAW_CHAR_SIGHT_RADIUS = true;

export const finishLinesYpos = {
    [Team.blue]: 0,
    [Team.red]: CANVAS_HEIGHT - 20,
};

export const soldierIdleImg = new Image();
soldierIdleImg.src = "/src/assets/images/Soldier-Idle.png";

export const soldierWalkImg = new Image();
soldierWalkImg.src = "/src/assets/images/Soldier-Walk.png";

export const soldierAttackImg = new Image();
soldierAttackImg.src = "/src/assets/images/Soldier-Attack01.png";

export const soldierDeadImg = new Image();
soldierDeadImg.src = "/src/assets/images/Soldier-Death.png";

export const orcIdleImg = new Image();
orcIdleImg.src = "/src/assets/images/Orc-Idle.png";

export const orcWalkImg = new Image();
orcWalkImg.src = "/src/assets/images/Orc-Walk.png";

export const orcAttackImg = new Image();
orcAttackImg.src = "/src/assets/images/Orc-Attack01.png";

export const orcDeadImg = new Image();
orcDeadImg.src = "/src/assets/images/Orc-Death.png";

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
    sightRange: 120,
};

export const soldierAttrs: Omit<CharAttrs, "team"> = {
    type: CharType.soldier,
    hp: 200,
    damage: 30,
    speed: 36,
    attackRange: 16,
    attacksPerMinute: 36,
    sightRange: 100,
};
