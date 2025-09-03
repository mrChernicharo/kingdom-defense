import { idMaker, wait } from "./helperFns";

const playBtn = document.querySelector("#play-btn") as HTMLButtonElement;
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

export enum EnemyState {
    idle = "idle",
    walk = "walk",
    attack = "attack",
    dead = "dead",
}

const orcIdleImg = new Image();
orcIdleImg.src = "/src/assets/images/Orc-Idle.png";

const orcWalkImg = new Image();
orcWalkImg.src = "/src/assets/images/Orc-Walk.png";

const orcAttackImg = new Image();
orcAttackImg.src = "/src/assets/images/Orc-Attack01.png";

const orcDeadImg = new Image();
orcDeadImg.src = "/src/assets/images/Orc-Death.png";

const poseFrameCount = {
    [EnemyState.idle]: 6,
    [EnemyState.walk]: 8,
    [EnemyState.attack]: 6,
    [EnemyState.dead]: 4,
};

const poseFrameSpeed = {
    [EnemyState.idle]: 400,
    [EnemyState.walk]: 100,
    [EnemyState.attack]: 100,
    [EnemyState.dead]: 100,
};

const poseImage = {
    [EnemyState.idle]: orcIdleImg,
    [EnemyState.walk]: orcWalkImg,
    [EnemyState.attack]: orcAttackImg,
    [EnemyState.dead]: orcDeadImg,
};

// const orcAttack02Img = new Image();
// orcAttack02Img.src = "/src/assets/images/Orc-Attack02.png";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 800;
const SPRITE_IMG_SIZE = 100;
const SPRITE_HEIGHT = 20;
const SPRITE_WIDTH = 20;

class Vec2 {
    x = 0;
    y = 0;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // add(vec: Vec2) {
    //     this.x + vec.x;
    //     this.y + vec.y;
    // }

    // static add(vec1: Vec2, vec2: Vec2) {
    //     vec1.x + vec2.x;
    //     vec1.y + vec2.y;
    // }

    // static clone() {
    //     return new Vec2(x, this.y)
    // }
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

class Updatable {
    update(delta: number) {}
    draw() {}
}

class GameEntity {
    pos: Vec2;
    type: string;
    id: string;
    constructor(type: string, x = 0, y = 0) {
        this.id = idMaker();
        this.type = type;
        this.pos = new Vec2(x, y);
    }
}

class Enemy extends GameEntity implements Updatable {
    spriteIdx: number;
    speed: number;
    state: EnemyState;
    goal: Vec2;
    constructor(type: string, x = 0, y = 0) {
        super(type, x, y);
        this.state = EnemyState.idle;
        this.speed = 12;
        this.goal = new Vec2(x, CANVAS_HEIGHT);
        this.spriteIdx = Math.trunc(Clock.elapsed / poseFrameSpeed[this.state]) % poseFrameCount[this.state];
        // this.spriteIdx = Math.trunc(Clock.elapsed / 400) % 6;
    }

    walkTowards(targetPos: Vec2, delta: number): Vec2 {
        const direction = new Vec2(targetPos.x - this.pos.x, targetPos.y - this.pos.y);
        const magnitude = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2));
        const normalizedVec = new Vec2(direction.x / magnitude, direction.y / magnitude);
        const nextPos = new Vec2(
            this.pos.x + normalizedVec.x * this.speed * delta,
            this.pos.y + normalizedVec.y * this.speed * delta
        );
        // const nextPos = new Vec2(this.pos.x + normalizedVec.x, this.pos.y + normalizedVec.y);

        return nextPos;
    }

    update(delta: number) {
        this.spriteIdx = Math.trunc(Clock.elapsed / poseFrameSpeed[this.state]) % poseFrameCount[this.state];
        // this.spriteIdx = Math.trunc(Clock.elapsed / 400) % 6;

        // this.pos.y += this.speed * delta * 0.001;
        // console.log(this.type, delta);

        if (Game.target) {
            const nextPos = this.walkTowards(Game.target, delta * 0.001);

            this.pos = nextPos;
        } else {
        }
    }

    draw() {
        ctx.drawImage(
            poseImage[this.state],
            this.spriteIdx * 100,
            0,
            SPRITE_IMG_SIZE,
            SPRITE_IMG_SIZE,
            this.pos.x - SPRITE_IMG_SIZE / 2 + SPRITE_WIDTH / 2,
            this.pos.y - poseImage[this.state].height / 2 + SPRITE_HEIGHT / 2,
            SPRITE_IMG_SIZE,
            SPRITE_IMG_SIZE
        );
    }
}

class Game {
    // updatables: Updatable[] = [
    //     new Enemy("orc", 0, 0),
    //     new Enemy("orc", 295, 0),
    //     new Enemy("orc", 590, 0),
    //     // new Enemy("orc", 0, 780),
    //     // new Enemy("orc", 580, 780),
    // ];
    updatables = [
        ...Array(30)
            .fill(0)
            .map((_, i) => i * SPRITE_WIDTH)
            .map((x) => new Enemy("orc", x, 0)),
        // ...Array(30)
        //     .fill(0)
        //     .map((_, i) => i * SPRITE_WIDTH)
        //     .map((x) => new Enemy("orc", x, 30)),
        // ...Array(30)
        //     .fill(0)
        //     .map((_, i) => i * SPRITE_WIDTH)
        //     .map((x) => new Enemy("orc", x, 60)),
        // ...Array(30)
        //     .fill(0)
        //     .map((_, i) => i * SPRITE_WIDTH)
        //     .map((x) => new Enemy("orc", x, 90)),
    ];

    static target: Vec2 | null = null;

    constructor() {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        playBtn.addEventListener("click", this.toggleIsPlaying.bind(this));
        canvas.addEventListener("click", this.toggleTarget.bind(this));

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

    toggleTarget(ev: MouseEvent) {
        // console.log(ev.offsetX, ev.offsetY);
        if (Game.target === null) {
            Game.target = new Vec2(ev.offsetX, ev.offsetY);
        } else {
            Game.target = null;
        }
    }

    tick() {
        const delta = Clock.tick();
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.fillStyle = "#007f00";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // console.log('<Game.tick>', { delta, elapsed: Clock.elapsed });

        this.updatables
            .sort((a, b) => a.pos.y - b.pos.y)
            .forEach((updatable) => {
                updatable.update(delta);
                updatable.draw();
            });

        if (Game.target) {
            ctx.fillStyle = "#ee0066";
            const [w, h] = [20, 20];
            ctx.fillRect(Game.target.x, Game.target.y, w, h);
        }

        // this.prevTime = this.currTime;
        if (!Clock.isPaused) {
            requestAnimationFrame(this.tick.bind(this));
        }
    }
}

const game = new Game();

// await wait(200);

// console.log("hello", { canvas, ctx });

// let isPlaying = true;
// let currTime = 0;
// let prevTime = 0;
// let delta = 0;
// let totalTime = 0;

// let x = 0;
// let moveRight = true;
// function animate() {
//     ctx.clearRect(0, 0, 800, 800);

//     currTime = Date.now();
//     delta = currTime - prevTime;
//     if (delta > 20) delta = 16;
//     totalTime += delta;

//     const attackFrame = Math.trunc(totalTime / 100) % 6;
//     const walkFrame = Math.trunc(totalTime / 100) % 8;
//     const attackFrame2 = Math.trunc(totalTime / 100) % 6;
//     const idleFrame = Math.trunc(totalTime / 400) % 6;

//     // console.log({ totalTime, delta, attackFrame });

//     // ctx.strokeStyle = "#FF0000";
//     // ctx.strokeRect(130, 160, 30, 40);

//     ctx.fillStyle = "#009900";
//     ctx.fillRect(0, 0, 800, 800);

//     // ctx.fillStyle = "#FFFF00";
//     // ctx.fillRect(530, 380, 30, 40);

//     // ctx.drawImage(orcIdleImg, 0, 0);

//     // DRAW 3 ORCS
//     ctx.drawImage(orcAttackImg, attackFrame * 100, 0, 100, 100, 0, 0, 100, 100);

//     ctx.drawImage(orcWalkImg, walkFrame * 100, 0, 100, 100, 0, 100, 100, 100);

//     ctx.drawImage(orcAttack02Img, attackFrame2 * 100, 0, 100, 100, 0, 200, 100, 100);

//     // DRAW 3 FLIPPED ORCS
//     ctx.save();
//     ctx.scale(-1, 1);
//     ctx.translate(0, 0);
//     ctx.drawImage(orcWalkImg, walkFrame * 100, 0, 100, 100, 0, 300, -100, 100);

//     ctx.drawImage(orcAttackImg, attackFrame * 100, 0, 100, 100, 0, 400, -100, 100);

//     ctx.drawImage(orcAttack02Img, attackFrame2 * 100, 0, 100, 100, 0, 500, -100, 100);
//     ctx.restore();

//     ctx.drawImage(orcIdleImg, idleFrame * 100, 0, 100, 100, 0, 600, 100, 100);

//     // DRAW ORC WALKING
//     if (moveRight) {
//         x += 0.2;
//         ctx.drawImage(orcWalkImg, walkFrame * 100, 0, 100, 100, x, 700, 100, 100);
//     } else {
//         x -= 0.2;
//         ctx.save();
//         ctx.scale(-1, 1);
//         ctx.translate(0, 0);
//         ctx.drawImage(orcWalkImg, walkFrame * 100, 0, 100, 100, -x, 700, -100, 100);
//         ctx.restore();
//     }
//     if (x > 500 || x < 0) moveRight = !moveRight;

//     prevTime = currTime;
//     if (!isPlaying) return;

//     requestAnimationFrame(animate);
// }

// animate();
