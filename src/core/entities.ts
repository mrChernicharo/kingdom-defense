import {
    finishLinesYpos,
    TIME_TO_REMOVE_DEAD_CHARACTERS,
    DRAW_CHAR_SIGHT_RADIUS,
    SPRITE_TRANSFORMS,
    SPRITE_IMG_SIZE,
    DRAW_CHAR_CENTER_POS,
    soldierAttrs,
    orcAttrs,
    skeletonAttrs,
    swordsmanAttrs,
    DRAW_CHAR_RADIUS,
    CANVAS_WIDTH,
    archerAttrs,
} from "../lib/constants";
import { DOM } from "../lib/DOM";
import { castleWallsImg, spriteData } from "../lib/spritesConfig";
import { Team, CharacterState, Facing, CharacterType } from "../lib/types";
import type { CharacterAttrs } from "../lib/types";
import { Game } from "./game";
import { Clock, FloatingText, GamePoint, Updatable, Vec2 } from "./shared";

export class GameEntity extends Updatable {
    type: string;
    hp: number;
    radius: number;

    constructor(type: string, x = 0, y = 0, hp: number, radius = 16) {
        super(x, y);
        this.type = type;
        this.hp = hp;
        this.radius = radius;
        // TODO:
        // Game.entities[this.id] = this;
    }
    isDead() {
        return this.hp <= 0;
    }
    isAlive() {
        return this.hp > 0;
    }
    takeDamage(_damage: number) {
        throw Error("the takeDamage method must be overloaded!");
    }
}

export class Castle {
    hp: number;
    hurtTimer: number;
    isTakingDamage: boolean;
    MAX_HP: number;
    constructor(MAX_HP: number) {
        this.MAX_HP = MAX_HP;
        this.hp = MAX_HP;
        this.hurtTimer = 150;
        this.isTakingDamage = false;
    }

    isAlive() {
        return this.hp > 0;
    }

    isDead() {
        return this.hp <= 0;
    }

    takeDamage(damage: number) {
        this.hp -= damage;
        this.hurtTimer = 0;
        this.isTakingDamage = true;
    }

    draw() {
        if (this.isTakingDamage) {
            DOM.ctx.filter = "brightness(400%)";
        }
        const x = 0;
        const y = finishLinesYpos.red;
        const width = CANVAS_WIDTH;
        const height = 160;
        DOM.ctx.drawImage(castleWallsImg, x, y, width, height);
        // DOM.ctx.drawImage(castleWallsImg, 0, finishLinesYpos.red - 40, Math.min(window.innerWidth, 600), 160);
        DOM.ctx.filter = "none";
    }

    update(delta: number) {
        if (this.hurtTimer > 150) {
            this.isTakingDamage = false;
        }
        if (this.isTakingDamage) {
            this.hurtTimer += delta;
        }

        const percent = this.hp / this.MAX_HP;
        DOM.castleBarFill.style.width = `${percent * 100}%`;
        DOM.castleDisplay.textContent = String(this.hp);
    }
}

export class Character extends GameEntity {
    team: Team;
    state: CharacterState;
    target: GameEntity | Castle | null;

    spriteIdx: number;
    facing: Facing;

    damage: number;
    speed: number;
    sightRange: number;
    attackRange: number;
    attacksPerMinute: number;
    attackCooldown: number;

    deadTimer: number;
    hurtTimer: number;
    turnTimer: number;
    canTurn: boolean;

    attackCooldownTimer: number;
    hasLandedHit: boolean;
    isTakingDamage: boolean;

    constructor(x = 0, y = 0, attrs: CharacterAttrs) {
        super(attrs.type, x, y, attrs.hp);

        this.team = attrs.team; // teamBlue: walks bottom-up X teamRed: walks top-down
        this.state = CharacterState.idle;
        this.facing = Facing.right;
        this.target = null;

        this.damage = attrs.damage;
        this.speed = attrs.speed;
        this.attacksPerMinute = attrs.attacksPerMinute;
        this.attackRange = attrs.attackRange;
        this.sightRange = attrs.sightRange;

        this.attackCooldown = 60_000 / this.attacksPerMinute;
        this.attackCooldownTimer = this.attackCooldown;

        this.deadTimer = 0;
        this.hurtTimer = 0;
        this.spriteIdx = 0;

        this.canTurn = true;
        this.turnTimer = 0;

        this.hasLandedHit = false;
        this.isTakingDamage = false;
    }

    isAtFinishLine() {
        const distToFinish = finishLinesYpos[this.team] - this.pos.y;
        // console.log({ distToFinish });
        return distToFinish < 12;
    }

    walkTowards(targetPos: Vec2, delta: number) {
        this.state = CharacterState.walk;

        const direction = new Vec2(targetPos.x - this.pos.x, targetPos.y - this.pos.y);
        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        // const magnitude = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2));
        // const magnitude = this.pos.distance(targetPos);
        const normalizedVec = new Vec2(direction.x / magnitude, direction.y / magnitude);
        const nextPos = new Vec2(
            this.pos.x + normalizedVec.x * this.speed * delta,
            this.pos.y + normalizedVec.y * this.speed * delta
        );

        this.pos = nextPos;
    }

    walkToFinishLine(delta: number) {
        const finishLine = new Vec2(this.pos.x, finishLinesYpos[this.team]);
        const distanceToFinishLine = this.pos.distance(finishLine);
        if (distanceToFinishLine < 10) {
            if (this.state === CharacterState.walk) {
                console.log("FINISH LINE REACHED!");
                this.state = CharacterState.idle;
            }
        } else {
            this.walkTowards(finishLine, delta * 0.001);
        }
    }

    turnToFaceTarget() {
        if (!this.target || this.target instanceof Castle) return;
        this.turnTimer = 0;
        this.canTurn = false;

        const direction = new Vec2(this.target.pos.x - this.pos.x, this.target.pos.y - this.pos.y);

        if (direction.x > 0) {
            this.facing = Facing.right;
        } else if (direction.x < 0) {
            this.facing = Facing.left;
        }
    }

    takeDamage(damage: number) {
        this.hp -= damage;
        this.hurtTimer = 0;
        this.isTakingDamage = true;
    }

    performAttack() {
        if (!this.target || this.target.isDead()) return;

        // console.log(this.cooldown);
        if (this.attackCooldownTimer >= this.attackCooldown) {
            this.state = CharacterState.attack;
            this.attackCooldownTimer = 0;
        }
        if (this.attackCooldownTimer > 300 && this.state === CharacterState.attack && !this.hasLandedHit) {
            this.hasLandedHit = true;
            this.target.takeDamage(this.damage);

            if (this.target instanceof GamePoint) {
                const color = (this.target as Character)?.team == Team.blue ? "red" : "white";
                new FloatingText(this.target.pos.x, this.target.pos.y, String(this.damage), { color });
            }

            console.log(
                this.target instanceof Castle
                    ? `${this.type.toUpperCase()} Hits Caslte dealing ${this.damage} dmg \n%cCastle hp is now: ${
                          Game.castle.hp
                      }`
                    : `${this.type.toUpperCase()} ${this.spriteIdx} Hits ${this.target.type.toUpperCase()} dealing ${
                          this.damage
                      } dmg \n%c${this.target.type.toUpperCase()} hp is now: ${this.target.hp}`,
                "color: orange"
            );
        }
        if (this.attackCooldownTimer >= 600) {
            this.state = CharacterState.idle;
            this.hasLandedHit = false;
        }
    }

    lookForClosestTarget(): GameEntity | null {
        let minDist = Infinity;
        let target: GameEntity | null = null;

        Object.values(Game.entities).forEach((entity) => {
            if (entity.isDead()) return;

            const sameTeam = (entity as Character).team === this.team;
            if (sameTeam) return;

            const dist = this.pos.distance(entity.pos);
            if (dist < minDist) {
                minDist = dist;

                // console.log({ dist, t: this.target });
                if (dist < this.sightRange) {
                    target = entity;
                }
            }
        });

        return target;
    }

    update(delta: number) {
        if (this.isDead()) {
            this.deadTimer += delta;
            if (this.state != CharacterState.dead) {
                this.state = CharacterState.dead;
            }

            if (this.deadTimer > TIME_TO_REMOVE_DEAD_CHARACTERS) {
                delete Game.entities[this.id];
                console.log(Object.keys(Game.entities).length + " entities ::::");
            }
        }

        if (this.isAlive()) {
            this.target = this.lookForClosestTarget();

            if (this.target) {
                if (this.target.isDead()) {
                    this.target = null;
                } else {
                    if (this.canTurn) {
                        this.turnToFaceTarget();
                    }

                    const distanceToTarget = this.pos.distance(this.target.pos);
                    if (distanceToTarget > this.attackRange) {
                        this.walkTowards(this.target.pos, delta * 0.001);
                    } else {
                        this.performAttack();
                    }
                }
            } else {
                if (this.team === Team.red && this.isAtFinishLine()) {
                    this.target = Game.castle;
                    this.performAttack();
                    this;
                } else {
                    this.walkToFinishLine(delta);
                }
            }
        }

        switch (this.state) {
            case CharacterState.attack:
                this.spriteIdx = Math.trunc(this.attackCooldownTimer / 100); // 0 - 5
                break;
            case CharacterState.dead:
                this.spriteIdx = Math.trunc(Math.min(this.deadTimer, 399) / 100); // 0 - 3
                break;
            default:
                this.spriteIdx =
                    Math.trunc(Clock.elapsed / spriteData[this.type][this.state].frameSpeed) %
                    spriteData[this.type][this.state].frameCount;
        }

        if (this.hurtTimer > 150) {
            this.isTakingDamage = false;
        }
        if (this.isTakingDamage) {
            this.hurtTimer += delta;
        }

        this.attackCooldownTimer += delta;

        if (this.turnTimer > 500) {
            this.canTurn = true;
        }
        this.turnTimer += delta;
    }

    draw() {
        if (DRAW_CHAR_SIGHT_RADIUS) {
            DOM.ctx.strokeStyle = "#00FF00";
            DOM.ctx.beginPath();
            DOM.ctx.ellipse(this.pos.x, this.pos.y, this.sightRange, this.sightRange, 0, 0, 2 * Math.PI);
            DOM.ctx.closePath();
            DOM.ctx.stroke();
        }

        if (DRAW_CHAR_RADIUS) {
            DOM.ctx.strokeStyle = "#0099ff";
            DOM.ctx.beginPath();
            DOM.ctx.ellipse(this.pos.x, this.pos.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
            DOM.ctx.closePath();
            DOM.ctx.stroke();
        }

        if (this.isTakingDamage) {
            DOM.ctx.filter = "grayscale(100%) brightness(1000%)";
        }

        const { scale, translate } = SPRITE_TRANSFORMS;

        if (this.facing == Facing.left) {
            DOM.ctx.save();
            DOM.ctx.scale(scale, scale);
            DOM.ctx.scale(-1, 1);
            DOM.ctx.translate(this.pos.x / translate, -this.pos.y / translate);
            DOM.ctx.translate(0, 0);
            DOM.ctx.drawImage(
                spriteData[this.type][this.state].image,
                this.spriteIdx * 100,
                0,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE,
                -this.pos.x + SPRITE_IMG_SIZE / 2,
                this.pos.y - spriteData[this.type][this.state].image.height / 2 - 6,
                -SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE
            );
            DOM.ctx.restore();
        } else {
            DOM.ctx.save();
            DOM.ctx.scale(scale, scale);
            DOM.ctx.translate(-this.pos.x / translate, -this.pos.y / translate);
            DOM.ctx.drawImage(
                spriteData[this.type][this.state].image,
                this.spriteIdx * 100,
                0,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE,
                this.pos.x - SPRITE_IMG_SIZE / 2,
                this.pos.y - spriteData[this.type][this.state].image.height / 2 - 6,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE
            );
            DOM.ctx.restore();
        }

        DOM.ctx.filter = "none";

        if (DRAW_CHAR_CENTER_POS) {
            DOM.ctx.strokeStyle = "#FF0000";
            DOM.ctx.beginPath();
            DOM.ctx.ellipse(this.pos.x, this.pos.y, 2, 2, 0, 0, 2 * Math.PI);
            DOM.ctx.closePath();
            DOM.ctx.stroke();
        }
    }
}

export class Soldier extends Character {
    constructor(team: Team, x = 0, y = 0) {
        super(x, y, { ...soldierAttrs, team });
    }
}

export class Archer extends Character {
    constructor(team: Team, x = 0, y = 0) {
        super(x, y, { ...archerAttrs, team });
    }
}

export class Swordsman extends Character {
    constructor(team: Team, x = 0, y = 0) {
        super(x, y, { ...swordsmanAttrs, team });
    }
}

export class Orc extends Character {
    constructor(team: Team, x = 0, y = 0) {
        super(x, y, { ...orcAttrs, team });
    }
}

export class Skeleton extends Character {
    constructor(team: Team, x = 0, y = 0) {
        super(x, y, { ...skeletonAttrs, team });
    }
}

export const heroClasses = {
    [CharacterType.soldier]: Soldier,
    [CharacterType.swordsman]: Swordsman,
    [CharacterType.archer]: Archer,
};

export const enemyClasses = {
    [CharacterType.orc]: Orc,
    [CharacterType.skeleton]: Skeleton,
};
