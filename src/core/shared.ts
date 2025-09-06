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

export class Clock {
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
