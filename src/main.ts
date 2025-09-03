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
    orcAttrs,
    soldierAttrs,
} from "./contants";
import { idMaker, wait } from "./helperFns";
import type { CharAttrs } from "./types";
import { Facing, EnemyState, Team, CharType } from "./types";

const playBtn = document.querySelector("#play-btn") as HTMLButtonElement;
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

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
    update(delta: number) {
        throw Error("must overload update method");
    }
    draw() {
        throw Error("must overload draw method");
    }
    isDead() {
        return this.hp <= 0;
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

    cooldownTimer: number;
    hasLandedHit: boolean;

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

        this.cooldownTimer = 0;
        this.spriteIdx = 0;
        this.hasLandedHit = false;
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

    turnToFaceTarget() {
        if (!this.target) return;

        const direction = new Vec2(this.target.pos.x - this.pos.x, this.target.pos.y - this.pos.y);
        if (direction.x > 0) {
            this.facing = Facing.right;
        } else if (direction.x < 0) {
            this.facing = Facing.left;
        }
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
            this.target.hp -= this.damage;
            console.log(this.target.type, " TAKES HIT! hp:", this.target.hp);
        }
        if (this.cooldownTimer >= 600) {
            this.state = EnemyState.idle;
            this.hasLandedHit = false;
        }
    }

    seekTarget() {
        let minDist = Infinity;

        Object.values(Game.entities).forEach((entity) => {
            const sameTeam = (entity as Character).team === this.team;
            if (sameTeam) return;

            const dist = this.pos.distance(entity.pos);
            if (dist < minDist) {
                minDist = dist;

                // console.log({ dist, t: this.target });
                if (dist < this.sightRange) {
                    this.target = entity;
                }
            }
        });
    }

    update(delta: number) {
        if (this.target) {
            if (this.target.isDead()) {
                delete Game.entities[this.target.id];
                this.target = null;
                return;
            }

            this.turnToFaceTarget();

            const distanceToTarget = this.pos.distance(this.target.pos);
            if (distanceToTarget > this.attackRange) {
                this.walkTowards(this.target.pos, delta * 0.001);
            } else {
                this.performAttack();
            }
        } else {
            this.seekTarget();

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

        if (this.state == EnemyState.attack) {
            this.spriteIdx = Math.trunc(this.cooldownTimer / 100); // 0 - 5
        } else {
            this.spriteIdx =
                Math.trunc(Clock.elapsed / poseFrameSpeed[this.type][this.state]) %
                poseFrameCount[this.type][this.state];
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

        if (this.facing == Facing.left) {
            ctx.save();
            ctx.scale(-1, 1);
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
        }

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

class Game {
    static entities: Record<string, GameEntity> = {};
    // static target: Vec2 | null = null;

    constructor() {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const levelEntities = [
            new Orc(Team.red, 40, 0),
            new Orc(Team.red, 240, 0),
            new Soldier(Team.blue, 100, CANVAS_HEIGHT - 20),
            new Soldier(Team.blue, 200, CANVAS_HEIGHT - 20),
            new Soldier(Team.blue, 300, CANVAS_HEIGHT - 20),
            // new Soldier(Team.red, 340, 0),
            // ...Array(30)
            //     .fill(0)
            //     .map((_, i) => i * 20)
            //     .map((x) => new Orc(Team.red, x, 0)),
        ];

        levelEntities.forEach((entity) => {
            Game.entities[entity.id] = entity;
        });

        playBtn.addEventListener("click", this.toggleIsPlaying.bind(this));
        // canvas.addEventListener("click", this.toggleTarget.bind(this));

        this.toggleIsPlaying();
    }

    toggleIsPlaying() {
        Clock.togglePause();
        playBtn.textContent = Clock.isPaused ? "Pause" : "Play";

        // console.log("<toggleIsPlaying>", this);

        if (!Clock.isPaused) {
            this.tick();
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

new Game();
