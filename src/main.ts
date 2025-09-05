import {
    finishLinesYpos,
    poseFrameSpeed,
    poseFrameCount,
    poseImage,
    SPRITE_IMG_SIZE,
    DRAW_CHAR_CENTER_POS,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    DRAW_CHAR_SIGHT_RADIUS,
    TIME_TO_REMOVE_DEAD_CHARACTERS,
    orcAttrs,
    soldierAttrs,
    SPRITE_TRANSFORMS,
    skeletonAttrs,
} from "./contants";
import { idMaker } from "./helperFns";
import type { CharAttrs } from "./types";
import { Facing, EnemyState, Team } from "./types";

const playBtn = document.querySelector("#play-btn") as HTMLButtonElement;
const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

class Vec2 {
    x = 0;
    y = 0;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    distance(target: Vec2) {
        const direction = new Vec2(target.x - this.x, target.y - this.y);
        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        return magnitude;
    }
}

class Clock {
    static isPaused = true;
    static elapsed = 0;
    static prevTime = Date.now();
    static currTime = Date.now();

    static togglePause(): void {
        Clock.isPaused = !Clock.isPaused;
    }

    static tick(): number {
        Clock.currTime = Date.now();
        let delta = Clock.currTime - Clock.prevTime;
        if (delta > 20) delta = 20;
        Clock.elapsed += delta;

        Clock.prevTime = Clock.currTime;
        return delta;
    }
}

class GameEntity {
    pos: Vec2;
    type: string;
    id: string;
    hp: number;

    constructor(type: string, x = 0, y = 0, hp: number) {
        this.id = idMaker();
        this.type = type;
        this.pos = new Vec2(x, y);
        this.hp = hp;
    }
    update(_delta: number) {
        throw Error("the update method must be overloaded!");
    }
    draw() {
        throw Error("the draw method must be overloaded!");
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

class Character extends GameEntity {
    team: Team;
    state: EnemyState;
    target: GameEntity | null;

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
    cooldownTimer: number;
    hasLandedHit: boolean;
    isTakingDamage: boolean;

    constructor(x = 0, y = 0, attrs: CharAttrs) {
        super(attrs.type, x, y, attrs.hp);

        this.team = attrs.team; // teamBlue: walks bottom-up X teamRed: walks top-down
        this.state = EnemyState.idle;
        this.facing = Facing.right;
        this.target = null;

        this.damage = attrs.damage;
        this.speed = attrs.speed;
        this.attacksPerMinute = attrs.attacksPerMinute;
        this.attackRange = attrs.attackRange;
        this.sightRange = attrs.sightRange;
        this.attackCooldown = 60_000 / this.attacksPerMinute;

        this.cooldownTimer = this.attackCooldown;
        this.deadTimer = 0;
        this.hurtTimer = 0;
        this.spriteIdx = 0;

        this.hasLandedHit = false;
        this.isTakingDamage = false;
    }

    walkTowards(targetPos: Vec2, delta: number) {
        this.state = EnemyState.walk;

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
            if (this.state === EnemyState.walk) {
                console.log("FINISH LINE REACHED!");
                this.state = EnemyState.idle;
            }
        } else {
            this.walkTowards(finishLine, delta * 0.001);
        }
    }

    turnToFaceTarget() {
        if (!this.target) return;

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
        if (this.cooldownTimer >= this.attackCooldown) {
            this.state = EnemyState.attack;
            this.cooldownTimer = 0;
        }
        if (this.cooldownTimer > 300 && this.state === EnemyState.attack && !this.hasLandedHit) {
            this.hasLandedHit = true;
            this.target.takeDamage(this.damage);
            // prettier-ignore
            console.log(
                `${this.type.toUpperCase()} Hits ${this.target.type.toUpperCase()} dealing ${this.damage} dmg \n%c${this.target.type.toUpperCase()} hp is now: ${this.target.hp}`, 'color: orange'
            );
        }
        if (this.cooldownTimer >= 600) {
            this.state = EnemyState.idle;
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
            if (this.state != EnemyState.dead) {
                this.state = EnemyState.dead;
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
                    this.turnToFaceTarget();

                    const distanceToTarget = this.pos.distance(this.target.pos);
                    if (distanceToTarget > this.attackRange) {
                        this.walkTowards(this.target.pos, delta * 0.001);
                    } else {
                        this.performAttack();
                    }
                }
            } else {
                this.walkToFinishLine(delta);
            }
        }

        switch (this.state) {
            case EnemyState.attack:
                this.spriteIdx = Math.trunc(this.cooldownTimer / 100); // 0 - 5
                break;
            case EnemyState.dead:
                this.spriteIdx = Math.trunc(Math.min(this.deadTimer, 399) / 100); // 0 - 3
                break;
            default:
                this.spriteIdx =
                    Math.trunc(Clock.elapsed / poseFrameSpeed[this.type][this.state]) %
                    poseFrameCount[this.type][this.state];
        }

        if (this.hurtTimer > 150) {
            this.isTakingDamage = false;
        }
        if (this.isTakingDamage) {
            this.hurtTimer += delta;
        }

        this.cooldownTimer += delta;
    }

    draw() {
        if (DRAW_CHAR_SIGHT_RADIUS) {
            ctx.strokeStyle = "#00FF00";
            ctx.beginPath();
            ctx.ellipse(this.pos.x, this.pos.y, this.sightRange, this.sightRange, 0, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }

        if (this.isTakingDamage) {
            ctx.filter = "grayscale(100%) brightness(1000%)";
        }

        const st = SPRITE_TRANSFORMS.md;
        if (this.facing == Facing.left) {
            ctx.save();
            ctx.scale(st.scale, st.scale);
            ctx.scale(-1, 1);
            ctx.translate(this.pos.x / st.translate, -this.pos.y / st.translate);
            ctx.translate(0, 0);
            ctx.drawImage(
                poseImage[this.type][this.state],
                this.spriteIdx * 100,
                0,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE,
                -this.pos.x + SPRITE_IMG_SIZE / 2,
                this.pos.y - poseImage[this.type][this.state].height / 2 - 6,
                -SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE
            );
            ctx.restore();
        } else {
            ctx.save();
            ctx.scale(st.scale, st.scale);
            ctx.translate(-this.pos.x / st.translate, -this.pos.y / st.translate);
            ctx.drawImage(
                poseImage[this.type][this.state],
                this.spriteIdx * 100,
                0,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE,
                this.pos.x - SPRITE_IMG_SIZE / 2,
                this.pos.y - poseImage[this.type][this.state].height / 2 - 6,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE
            );
            ctx.restore();
        }

        // ctx.save();
        // ctx.scale(2, 2);
        // ctx.translate(-this.pos.x / 2, -this.pos.y / 2);
        // ctx.drawImage(
        //     poseImage[this.type][this.state],
        //     this.spriteIdx * SPRITE_IMG_SIZE,
        //     0,
        //     SPRITE_IMG_SIZE,
        //     SPRITE_IMG_SIZE,
        //     this.pos.x - SPRITE_IMG_SIZE / 2,
        //     this.pos.y - poseImage[this.type][this.state].height / 2 - 6,
        //     SPRITE_IMG_SIZE,
        //     SPRITE_IMG_SIZE
        // );
        // ctx.restore();

        ctx.filter = "none";

        if (DRAW_CHAR_CENTER_POS) {
            ctx.strokeStyle = "#FF0000";
            ctx.beginPath();
            ctx.ellipse(this.pos.x, this.pos.y, 2, 2, 0, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

class Soldier extends Character {
    constructor(team: Team, x = 0, y = 0) {
        super(x, y, { ...soldierAttrs, team });
    }
}

class Orc extends Character {
    constructor(team: Team, x = 0, y = 0) {
        super(x, y, { ...orcAttrs, team });
    }
}

class Skeleton extends Character {
    constructor(team: Team, x = 0, y = 0) {
        super(x, y, { ...skeletonAttrs, team });
    }
}

const ALL_CHARACTER_CLASSES = [Soldier, Skeleton, Orc];

class Game {
    static entities: Record<string, GameEntity> = {};
    // static target: Vec2 | null = null;
    charIdx = 0;

    constructor() {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        canvas.classList.remove("hidden");

        [
            new Orc(Team.red, 20, 0),
            new Orc(Team.red, 100, 0),
            new Orc(Team.red, 180, 0),
            new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
            new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
            // new Orc(Team.red, 380, 0),
            // new Soldier(Team.blue, 100, CANVAS_HEIGHT - 20),
            // new Soldier(Team.blue, 200, CANVAS_HEIGHT - 20),
            // new Soldier(Team.blue, 300, CANVAS_HEIGHT - 20),
            // new Soldier(Team.red, 340, 0),
            // ...Array(30)
            //     .fill(0)
            //     .map((_, i) => i * 20)
            //     .map((x) => new Orc(Team.red, x, 0)),
        ].forEach((entity) => {
            Game.entities[entity.id] = entity;
        });

        playBtn.addEventListener("click", this.toggleIsPlaying.bind(this));
        canvas.addEventListener("click", this.spawnCharacter.bind(this));
        window.addEventListener("keypress", this.toggleCharToDeploy.bind(this));

        this.toggleIsPlaying();
    }

    toggleIsPlaying() {
        Clock.togglePause();
        playBtn.textContent = Clock.isPaused ? "Play" : "Pause";

        if (!Clock.isPaused) {
            this.tick();
        }
    }

    spawnCharacter(ev: MouseEvent) {
        // let char: Character;
        // if (this.charToDeploy == CharType.soldier) char = new Soldier(Team.blue, ev.offsetX, ev.offsetY);
        // else char = new Orc(Team.red, ev.offsetX, ev.offsetY);
        const Class = ALL_CHARACTER_CLASSES[this.charIdx];
        let team = Team.red;
        if (Class.name == "Soldier") team = Team.blue;
        // console.log({ Class, team });
        const char = new Class(team, ev.offsetX, ev.offsetY);
        Game.entities[char.id] = char;
    }

    toggleCharToDeploy(ev: KeyboardEvent) {
        if (ev.key === " ") {
            ev.preventDefault();
            this.charIdx++;
            this.charIdx %= ALL_CHARACTER_CLASSES.length;
            console.log(this.charIdx);
            // this.charToDeploy = this.charToDeploy == CharType.orc ? CharType.soldier : CharType.orc;
            // console.log(this.charToDeploy);
        }
    }

    tick() {
        const delta = Clock.tick();
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // grass
        ctx.fillStyle = "#007f00";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        Object.values(Game.entities)
            .sort((a, b) => a.pos.y - b.pos.y)
            .forEach((entity) => {
                entity.update(delta);
                entity.draw();
            });

        if (!Clock.isPaused) {
            requestAnimationFrame(this.tick.bind(this));
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    new Game();
});
