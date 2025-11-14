import {
    canvas,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    cardsDisplay,
    playBtn,
    ctx,
    SPRITE_TRANSFORMS,
    poseImage,
    SPRITE_IMG_SIZE,
    gameOverBanner,
    afterWaveScreen,
    nextWaveBtn,
} from "../lib/constants";
import { wait } from "../lib/helperFns";
import { LEVELS } from "../lib/levels";
import { type CharacterType, Team } from "../lib/types";
import { GameEntity, Castle, Skeleton, Soldier, Character } from "./entities";
import { Clock, Vec2 } from "./shared";

class DragCardManager {
    isDraggingCard = false;
    selectedCard: CharacterType | null = null;
    dragPos: Vec2 | null = null;

    constructor() {
        // window.addEventListener("keypress", this.toggleCharToDeploy.bind(this));
        cardsDisplay.addEventListener("pointerdown", this.startDrag.bind(this));
        canvas.addEventListener("pointermove", this.dragCard.bind(this));
        canvas.addEventListener("pointerup", this.dragEnd.bind(this));
    }

    startDrag(ev: PointerEvent) {
        this.isDraggingCard = true;
        this.selectedCard = (ev.target as HTMLLIElement).dataset.unit as CharacterType;
        console.log("startDrag", this.selectedCard, ev);
    }

    dragCard(ev: PointerEvent) {
        if (!this.isDraggingCard) return;
        this.dragPos = new Vec2(ev.offsetX, ev.offsetY);
    }

    dragEnd(ev: PointerEvent) {
        this.dragPos = null;
        const soldier = new Soldier(Team.blue, ev.offsetX, ev.offsetY);
        Game.entities[soldier.id] = soldier;

        this.selectedCard = null;
        this.isDraggingCard = false;
    }

    tick() {
        if (this.dragPos) {
            const st = SPRITE_TRANSFORMS.md;

            ctx.save();
            ctx.scale(st.scale, st.scale);
            ctx.translate(-this.dragPos.x / st.translate, -this.dragPos.y / st.translate);
            ctx.filter = "opacity(0.5)";
            ctx.drawImage(
                poseImage.soldier.idle,
                0,
                0,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE,
                this.dragPos.x - SPRITE_IMG_SIZE / 2,
                this.dragPos.y - poseImage.soldier.idle.height / 2 - 6,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE
            );
            ctx.restore();
        }
    }
}

class WaveManager {
    waveIdx = 0;
    waveFinished = false;
    afterWaveScreenVisible = false;
    level: {
        name: string;
        waves: Skeleton[][];
    };

    constructor() {
        nextWaveBtn.addEventListener("click", this.onCallNextWave.bind(this));
        const levelIdx = Number(new URLSearchParams(location.search).get("level"));
        this.level = LEVELS[levelIdx];
    }

    async onCallNextWave() {
        this.waveIdx++;

        if (this.waveIdx >= this.level.waves.length) {
            console.log("Victory!");
            await wait(2000);
            return location.assign("/lobby.html");
        } else {
            console.log("Called next wave");
            this.toggleAfterWaveScreen();
            this.startWave();
            window.dispatchEvent(new CustomEvent("wave-start", { detail: null }));
        }
    }

    startWave() {
        Game.entities = {};
        this.waveFinished = false;
        console.log({ level: this.level, location, waveIdx: this.waveIdx });

        this.level.waves[this.waveIdx].forEach((entity) => {
            Game.entities[entity.id] = entity;
        });
    }

    toggleAfterWaveScreen() {
        this.afterWaveScreenVisible = !this.afterWaveScreenVisible;

        if (this.afterWaveScreenVisible) {
            afterWaveScreen.classList.remove("hidden");
        } else {
            afterWaveScreen.classList.add("hidden");
        }
    }
}

export class Game {
    static entities: Record<string, GameEntity> = {};
    static castle: Castle;

    charIdx = 0;
    dragCardManager: DragCardManager;
    waveManager: WaveManager;

    constructor() {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        cardsDisplay.style.width = CANVAS_WIDTH + "px";
        canvas.classList.remove("hidden");

        Game.castle = new Castle(400);

        this.dragCardManager = new DragCardManager();
        this.waveManager = new WaveManager();
        this.waveManager.startWave();

        this.toggleIsPlaying();

        playBtn.addEventListener("click", this.toggleIsPlaying.bind(this));
        window.addEventListener("wave-start", () => {
            console.log("wave-start");
            this.toggleIsPlaying();
        });
    }

    toggleIsPlaying() {
        Clock.togglePause();
        playBtn.textContent = Clock.isPaused ? "Play" : "Pause";

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

        Game.castle.update(delta);
        Game.castle.draw();

        Object.values(Game.entities)
            .sort((a, b) => a.pos.y - b.pos.y)
            .forEach((entity) => {
                entity.update(delta);
                entity.draw();
            });

        if (!Clock.isPaused) {
            requestAnimationFrame(this.tick.bind(this));
        }

        this.dragCardManager.tick();

        if (Game.castle.isDead()) {
            console.log("GAME OVER");
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            gameOverBanner.classList.remove("hidden");
            Clock.togglePause();
        }

        const isAnyEnemyAlive = Object.values(Game.entities).find(
            (entity) => (entity as Character).team === Team.red && entity.isAlive()
        );
        const areAllEnemiesDead = !isAnyEnemyAlive;
        if (areAllEnemiesDead && !this.waveManager.waveFinished) {
            this.waveManager.waveFinished = true;
            console.log("all enemies are DEAD!");
            wait(2000).then(() => {
                Clock.togglePause();
                this.waveManager.toggleAfterWaveScreen();
            });
        }
    }
}
