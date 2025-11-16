import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    SPRITE_TRANSFORMS,
    poseImage,
    SPRITE_IMG_SIZE,
    DRAG_UNIT_Y_LIMIT_PERCENT,
    soldierAttrs,
    swordsmanAttrs,
    unitCosts,
} from "../lib/constants";
import { DOM } from "../lib/DOM";
import { wait } from "../lib/helperFns";
import { LEVELS, type Level } from "../lib/levels";
import { CharacterType, Team } from "../lib/types";
import { GameEntity, Castle, Soldier, Character, Swordsman } from "./entities";
import { Clock, FloatingText, Vec2 } from "./shared";

new DOM();

class DragUnitManager {
    isDraggingUnit = false;
    selectedUnit: CharacterType | null = null;
    dragPos: Vec2 | null = null;
    TOP_DRAG_Y = CANVAS_HEIGHT - CANVAS_HEIGHT * DRAG_UNIT_Y_LIMIT_PERCENT;

    constructor() {
        DOM.unitsDisplay.addEventListener("pointerdown", this.startDrag.bind(this));
        DOM.canvas.addEventListener("pointermove", this.dragUnit.bind(this));
        DOM.canvas.addEventListener("pointerup", this.dragEnd.bind(this));
    }

    startDrag(ev: PointerEvent) {
        this.isDraggingUnit = true;
        const unit = (ev.target as HTMLLIElement).dataset.unit as CharacterType;

        const cost = unitCosts[unit];
        if (cost > PlayerStats.currentMana) return;

        this.selectedUnit = unit;
    }

    dragUnit(ev: PointerEvent) {
        if (!this.isDraggingUnit) return;
        this.dragPos = new Vec2(ev.offsetX, Math.max(ev.offsetY, this.TOP_DRAG_Y));
    }

    dragEnd(ev: PointerEvent) {
        if (!this.isDraggingUnit || !this.selectedUnit) return;
        this.dragPos = null;

        let entity: GameEntity | undefined = undefined;
        switch (this.selectedUnit) {
            case CharacterType.soldier:
                entity = new Soldier(Team.blue, ev.offsetX, Math.max(ev.offsetY, this.TOP_DRAG_Y));
                break;
            case CharacterType.swordsman:
                entity = new Swordsman(Team.blue, ev.offsetX, Math.max(ev.offsetY, this.TOP_DRAG_Y));
                break;
        }
        if (!entity) throw Error("entity error");

        Game.entities[entity.id] = entity;

        const cost = unitCosts[this.selectedUnit];

        PlayerStats.currentMana -= cost;

        this.selectedUnit = null;
        this.isDraggingUnit = false;
    }

    tick() {
        if (this.dragPos && this.selectedUnit) {
            const { scale, translate } = SPRITE_TRANSFORMS;
            // draw SPRITE PREVIEW
            DOM.ctx.save();
            DOM.ctx.scale(scale, scale);
            DOM.ctx.translate(-this.dragPos.x / translate, -this.dragPos.y / translate);
            DOM.ctx.filter = "opacity(0.5)";
            DOM.ctx.drawImage(
                poseImage[this.selectedUnit].idle,
                0,
                0,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE,
                this.dragPos.x - SPRITE_IMG_SIZE / 2,
                this.dragPos.y - poseImage[this.selectedUnit].idle.height / 2 - 6,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE
            );
            DOM.ctx.restore();
        }
    }
}

class WaveManager {
    level: Level;
    waveIdx: number;
    isWaveBonusScreenEnabled = false;
    waveFinished = false;

    constructor() {
        this.waveIdx = 0;

        const levelIdx = Number(new URLSearchParams(location.search).get("level"));
        this.level = LEVELS[levelIdx];

        DOM.nextWaveBtn.addEventListener("click", this.onCallNextWave.bind(this));
    }

    async onCallNextWave() {
        this.waveIdx++;

        if (this.waveIdx >= this.level.waves.length) {
            console.log("Victory!");
            await wait(2000);
            return location.assign("/lobby.html");
        } else {
            console.log("Called next wave");
            this.toggleWaveBonusScreen();
            this.startWave();
            window.dispatchEvent(new CustomEvent("wave-start", { detail: null }));
        }
    }

    startWave() {
        Game.entities = {};
        this.waveFinished = false;
        console.log({ level: this.level, location, waveIdx: this.waveIdx });

        this.level.waves[this.waveIdx].forEach((enemyBlueprint) => {
            const [EnemyClass, x, y] = enemyBlueprint;
            const enemy = new EnemyClass(Team.red, x, y);
            Game.entities[enemy.id] = enemy;
        });
    }

    toggleWaveBonusScreen() {
        this.isWaveBonusScreenEnabled = !this.isWaveBonusScreenEnabled;

        if (this.isWaveBonusScreenEnabled) {
            DOM.waveBonusScreen.classList.remove("hidden");
        } else {
            DOM.waveBonusScreen.classList.add("hidden");
        }
    }
}

class CollisionManager {
    update() {
        const allEntities = Object.values(Game.entities);

        for (let i = 0; i < allEntities.length; i++) {
            const entityA = allEntities[i];

            if (entityA.isDead()) continue;

            for (let j = i + 1; j < allEntities.length; j++) {
                const entityB = allEntities[j];

                if (entityB.isDead()) continue;

                if (this.checkCollision(entityA, entityB)) {
                    this.resolveCollision(entityA, entityB);
                }
            }
        }
    }
    checkCollision(entityA: GameEntity, entityB: GameEntity) {
        return entityA.pos.distance(entityB.pos) < entityA.radius + entityB.radius;
    }
    resolveCollision(entityA: GameEntity, entityB: GameEntity) {
        const dx = entityA.pos.x - entityB.pos.x;
        const dy = entityA.pos.y - entityB.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = entityA.radius + entityB.radius;

        if (distance < minDistance && distance !== 0) {
            // 1. Calculate the amount of overlap
            const overlap = minDistance - distance;

            // 2. Calculate the normalized direction vector (vector from B to A)
            // This vector points *out* of the collision
            const nx = dx / distance;
            const ny = dy / distance;

            // 3. Calculate the total separation distance to move
            const separationX = nx * (overlap / 2);
            const separationY = ny * (overlap / 2);

            // 4. Move each entity by half the separation distance
            // This splits the responsibility for the move between the two entities
            entityA.pos.x += separationX;
            entityA.pos.y += separationY;

            entityB.pos.x -= separationX; // Subtract because we want to move B in the opposite direction
            entityB.pos.y -= separationY;
        }
    }
}

const INITIAL_MANA = 3;
class PlayerStats {
    static currentMana = INITIAL_MANA;
    manaPerMinute = 120;
    buildInterval: number;
    manaTimer = 0;

    constructor() {
        this.buildInterval = 60_000 / this.manaPerMinute;
    }

    tick(delta: number) {
        const manaPercent = this.manaTimer / this.buildInterval;
        DOM.manaBarFill.style.width = `${manaPercent * 100}%`;
        DOM.manaDisplay.textContent = String(PlayerStats.currentMana);

        Array.from(DOM.unitsDisplay.children).forEach((ele) => {
            const unitLI = ele as HTMLLIElement;
            const cost = Number(unitLI.dataset["cost"]);

            unitLI.style.color = PlayerStats.currentMana < cost ? "gray" : "white";
        });

        if (this.manaTimer >= this.buildInterval) {
            PlayerStats.currentMana++;

            const overflow = this.manaTimer - this.buildInterval;
            this.manaTimer = overflow;
        }

        this.manaTimer += delta;
    }
}

export class Game {
    static entities: Record<string, GameEntity> = {};
    static castle: Castle;
    static textEntities: Record<string, FloatingText> = {};

    dragCardManager: DragUnitManager;
    waveManager: WaveManager;
    collisionManager: CollisionManager;
    playerStats: PlayerStats;

    constructor() {
        DOM.displayTop.style.width = CANVAS_WIDTH + "px";
        DOM.displayBottom.style.width = CANVAS_WIDTH + "px";
        [soldierAttrs, swordsmanAttrs].forEach(({ type, cost }) => {
            DOM.unitsDisplay.innerHTML += `<li class="card" data-unit="${type}" data-cost="${cost}" style="user-select: none">${type} <br> ${cost}</li>`;
        });

        DOM.canvas.width = CANVAS_WIDTH;
        DOM.canvas.height = CANVAS_HEIGHT;
        // Disable image smoothing for crisp pixel art
        DOM.ctx.imageSmoothingEnabled = false;
        DOM.canvas.classList.remove("hidden");

        Game.castle = new Castle(400);

        this.dragCardManager = new DragUnitManager();
        this.collisionManager = new CollisionManager();
        this.waveManager = new WaveManager();
        this.playerStats = new PlayerStats();

        this.waveManager.startWave();
        this.toggleIsPlaying();

        DOM.playBtn.addEventListener("click", this.toggleIsPlaying.bind(this));
        DOM.tryAgainBtn.addEventListener("click", this.restartGame.bind(this));
        window.addEventListener("wave-start", this.toggleIsPlaying.bind(this));
    }

    restartGame() {
        location.reload();
    }

    toggleIsPlaying() {
        Clock.togglePause();
        DOM.playBtn.textContent = Clock.isPaused ? "Play" : "Pause";

        if (!Clock.isPaused) {
            this.tick();
        }
    }

    tick() {
        const delta = Clock.tick();
        DOM.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        DOM.ctx.fillStyle = this.waveManager.level.bgColor;
        DOM.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        Game.castle.update(delta);
        Game.castle.draw();

        Object.values(Game.entities).forEach((entity) => {
            entity.update(delta);
        });

        // alter entities positions in case of collisions
        this.collisionManager.update();

        // sorting by y pos ensures sprites are drawn with the right Z-index
        Object.values(Game.entities)
            .sort((a, b) => a.pos.y - b.pos.y)
            .forEach((entity) => {
                entity.draw();
            });

        Object.values(Game.textEntities)
            .sort((a, b) => a.pos.y - b.pos.y)
            .forEach((entity) => {
                entity.update(delta);
                entity.draw();
            });

        this.dragCardManager.tick();

        this.playerStats.tick(delta);

        if (Game.castle.isDead()) {
            DOM.gameOverBanner.style.opacity = "0.9";
            // Clock.slowdownAndPause();
            this.toggleIsPlaying();
            console.log("==== GAME OVER ====");
        }

        const isAnyEnemyAlive = Object.values(Game.entities).find(
            (entity) => (entity as Character).team === Team.red && entity.isAlive()
        );
        const allEnemiesDead = !isAnyEnemyAlive;
        if (allEnemiesDead && !this.waveManager.waveFinished) {
            this.waveManager.waveFinished = true;
            console.log("all enemies are DEAD!");

            setTimeout(() => {
                // Clock.slowdownAndPause();
                this.toggleIsPlaying();
                this.waveManager.toggleWaveBonusScreen();
            }, 2000);
        }

        if (!Clock.isPaused) {
            requestAnimationFrame(this.tick.bind(this));
        }
    }
}
