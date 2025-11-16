import { CLOCK_DEFAULT_TIME_MULTIPLIER, FLOATING_TEXT_Y_OFFSET } from "../lib/constants";
import { DOM } from "../lib/DOM";
import { idMaker } from "../lib/helperFns";
import { Game } from "./game";

export class Vec2 {
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

export class GamePoint {
    pos: Vec2;
    id: string;

    constructor(x = 0, y = 0) {
        this.id = idMaker();
        this.pos = new Vec2(x, y);
    }
}

export class Updatable extends GamePoint {
    update(_delta: number) {
        throw Error("the update method must be overloaded!");
    }
    draw() {
        throw Error("the draw method must be overloaded!");
    }
}

type FloatingTextColor = "white" | "aquamarine" | "lightblue" | "goldenrod" | "orange" | "red" | "purple";
type FloatingTextSize = "s" | "m" | "l";

type FloatingTextOpts = {
    duration?: number;
    color?: FloatingTextColor;
    size?: FloatingTextSize;
};

const floatingTextFontSize = {
    s: 12,
    m: 16,
    l: 24,
};

export class FloatingText extends Updatable {
    text: string;
    duration: number;
    color: FloatingTextColor;
    size: FloatingTextSize;
    elapsed = 0;

    constructor(x = 0, y = 0, text: string, opts?: FloatingTextOpts) {
        super(x, y - FLOATING_TEXT_Y_OFFSET);
        this.text = text;
        this.color = opts?.color ?? "white";
        this.size = opts?.size ?? "m";
        this.duration = opts?.duration ?? 1000;
        Game.textEntities[this.id] = this;
    }

    draw() {
        DOM.ctx.font = `bold ${floatingTextFontSize[this.size]}px Arial`;
        DOM.ctx.fillStyle = this.color;
        DOM.ctx.textAlign = "center";
        DOM.ctx.textBaseline = "middle";

        const perc = Math.max((this.duration - this.elapsed) / this.duration, 0);
        DOM.ctx.filter = `opacity(${perc})`;
        DOM.ctx.fillText(this.text, this.pos.x, this.pos.y);
        DOM.ctx.filter = "none";
    }

    update(delta: number) {
        this.elapsed += delta;

        if (this.elapsed > this.duration) {
            this.destroy();
        } else {
            this.pos.y -= 0.02 * delta;
        }
    }

    destroy() {
        delete Game.textEntities[this.id];
    }
}

export class Clock {
    static isPaused = true;
    static elapsed = 0;
    static prevTime = Date.now();

    static speedMultiplier = CLOCK_DEFAULT_TIME_MULTIPLIER;
    static isSlowingDown = false;

    static togglePause(): void {
        Clock.isPaused = !Clock.isPaused;
    }

    static slowdownAndPause(): void {
        Clock.isSlowingDown = true;
    }

    static tick(): number {
        const currTime = Date.now();

        let delta = (currTime - Clock.prevTime) * Clock.speedMultiplier;

        if (delta > 20 * Clock.speedMultiplier) delta = 20; // <--- this line prevents time jumps after pausing

        Clock.elapsed += delta;

        if (Clock.isSlowingDown) {
            if (Clock.speedMultiplier >= 0.1) {
                Clock.speedMultiplier *= 0.9;
                // Clock.speedMultiplier -= 0.005;
            } else {
                Clock.isPaused = true;
                Clock.speedMultiplier = CLOCK_DEFAULT_TIME_MULTIPLIER;
                Clock.isSlowingDown = false;
                DOM.playBtn.textContent = Clock.isPaused ? "Play" : "Pause";
            }
        }

        Clock.prevTime = currTime;
        return delta;
    }
}
