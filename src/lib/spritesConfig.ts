import castleWalls from "/src/assets/images/castle-wall.png";

import arrowSrc from "/src/assets/images/Arrow01(100x100).png";
import goldArrowSrc from "/src/assets/images/Arrow02(100x100).png";
import boneArrowSrc from "/src/assets/images/Arrow03(100x100).png";

import soldierIdleImgSrc from "/src/assets/images/Soldier-Idle.png";
import soldierWalkImgSrc from "/src/assets/images/Soldier-Walk.png";
import soldierAttackImgSrc from "/src/assets/images/Soldier-Attack01.png";
import soldierDeadImgSrc from "/src/assets/images/Soldier-Death.png";

import archerIdleImgSrc from "/src/assets/images/Archer-Idle.png";
import archerWalkImgSrc from "/src/assets/images/Archer-Walk.png";
import archerAttackImgSrc from "/src/assets/images/Archer-Attack01.png";
import archerDeadImgSrc from "/src/assets/images/Archer-Death.png";

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

import { CharacterState } from "./types";

export const castleWallsImg = new Image();
castleWallsImg.src = castleWalls;

export const SPRITE_IMG_SIZE = 100;

const SPRITE_TRANSFORMS_OPTS = {
    xs: { scale: 1, translate: 0 },
    sm: { scale: 1.5, translate: 3 },
    md: { scale: 2, translate: 2 },
    lg: { scale: 3, translate: 1.5 },
};
export const SPRITE_TRANSFORMS = SPRITE_TRANSFORMS_OPTS.md;

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

export const archerIdleImg = new Image();
export const archerWalkImg = new Image();
export const archerAttackImg = new Image();
export const archerDeadImg = new Image();
archerIdleImg.src = archerIdleImgSrc;
archerWalkImg.src = archerWalkImgSrc;
archerAttackImg.src = archerAttackImgSrc;
archerDeadImg.src = archerDeadImgSrc;

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

export const arrowImg = new Image();
export const goldArrowImg = new Image();
export const boneArrowImg = new Image();
arrowImg.src = arrowSrc;
goldArrowImg.src = goldArrowSrc;
boneArrowImg.src = boneArrowSrc;

export const spriteData: Record<
    string,
    Record<CharacterState, { frameCount: number; frameSpeed: number; image: HTMLImageElement }>
> = {
    soldier: {
        [CharacterState.idle]: { frameCount: 6, frameSpeed: 400, image: soldierIdleImg },
        [CharacterState.walk]: { frameCount: 8, frameSpeed: 100, image: soldierWalkImg },
        [CharacterState.attack]: { frameCount: 6, frameSpeed: 100, image: soldierAttackImg },
        [CharacterState.dead]: { frameCount: 4, frameSpeed: 100, image: soldierDeadImg },
    },
    archer: {
        [CharacterState.idle]: { frameCount: 6, frameSpeed: 400, image: archerIdleImg },
        [CharacterState.walk]: { frameCount: 8, frameSpeed: 100, image: archerWalkImg },
        [CharacterState.attack]: { frameCount: 9, frameSpeed: 100, image: archerAttackImg },
        [CharacterState.dead]: { frameCount: 4, frameSpeed: 100, image: archerDeadImg },
    },
    swordsman: {
        [CharacterState.idle]: { frameCount: 6, frameSpeed: 400, image: swordsmanIdleImg },
        [CharacterState.walk]: { frameCount: 8, frameSpeed: 100, image: swordsmanWalkImg },
        [CharacterState.attack]: { frameCount: 7, frameSpeed: 200, image: swordsmanAttackImg },
        [CharacterState.dead]: { frameCount: 4, frameSpeed: 100, image: swordsmanDeadImg },
    },
    orc: {
        [CharacterState.idle]: { frameCount: 6, frameSpeed: 400, image: orcIdleImg },
        [CharacterState.walk]: { frameCount: 8, frameSpeed: 100, image: orcWalkImg },
        [CharacterState.attack]: { frameCount: 6, frameSpeed: 100, image: orcAttackImg },
        [CharacterState.dead]: { frameCount: 4, frameSpeed: 100, image: orcDeadImg },
    },
    skeleton: {
        [CharacterState.idle]: { frameCount: 6, frameSpeed: 400, image: skeletonIdleImg },
        [CharacterState.walk]: { frameCount: 8, frameSpeed: 100, image: skeletonWalkImg },
        [CharacterState.attack]: { frameCount: 6, frameSpeed: 100, image: skeletonAttackImg },
        [CharacterState.dead]: { frameCount: 4, frameSpeed: 100, image: skeletonDeadImg },
    },
};

export type ProjectileName = "arrow" | "goldArrow" | "boneArrow";
export const projectileSprites: Record<ProjectileName, HTMLImageElement> = {
    arrow: arrowImg,
    goldArrow: goldArrowImg,
    boneArrow: boneArrowImg,
};
