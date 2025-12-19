import { ALL_CARDS, pickRandomCards, type BonusCard } from "../lib/cards";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    SPRITE_TRANSFORMS,
    SPRITE_IMG_SIZE,
    DRAG_UNIT_Y_LIMIT_PERCENT,
    unitCosts,
    INITIAL_MANA,
    MANA_PER_MINUTE,
    finishLinesYpos,
} from "../lib/constants";
import { DOM } from "../lib/DOM";
import { wait } from "../lib/helperFns";
import { LEVELS, type Level } from "../lib/levels";
import { spriteData } from "../lib/spritesConfig";
import { CharacterType, Team } from "../lib/types";
import { GameEntity, Castle, Soldier, Character, Swordsman, Archer, Projectile } from "./entities";
import { Clock, FloatingText, Vec2 } from "./shared";

new DOM();

console.log(ALL_CARDS);

export class Game {
    static entities: Record<string, GameEntity> = {};
    static castle: Castle;
    static textEntities: Record<string, FloatingText> = {};
    static projectiles: Record<string, Projectile> = {};

    dragCardManager: DragUnitManager;
    waveManager: WaveManager;
    collisionManager: CollisionManager;
    playerStats: PlayerStats;

    constructor() {
        DOM.initializeCanvas();

        this.dragCardManager = new DragUnitManager();
        this.collisionManager = new CollisionManager();
        this.waveManager = new WaveManager();
        this.playerStats = new PlayerStats();
        Game.castle = new Castle(CANVAS_WIDTH / 2, finishLinesYpos.red, 400);

        this.waveManager.startWave();
        this.toggleIsPlaying();

        DOM.playBtn.addEventListener("click", this.toggleIsPlaying.bind(this));
        DOM.tryAgainBtn.addEventListener("click", this.restartGame.bind(this));
        DOM.pauseMenuResumeBtn.addEventListener("click", this.toggleIsPlaying.bind(this));
        DOM.pauseMenuCloseBtn.addEventListener("click", this.toggleIsPlaying.bind(this));
        DOM.speedControl.addEventListener("change", this.changeGameSpeed.bind(this));
        window.addEventListener("wave-start", this.toggleIsPlaying.bind(this));
    }

    restartGame() {
        location.reload();
    }

    changeGameSpeed(ev: Event) {
        const input = ev.target as HTMLInputElement;
        if (!input.checked) return;
        const speed = Number(input.value);
        Clock.speedMultiplier = speed;
    }

    toggleIsPlaying() {
        Clock.togglePause();
        const isPlaying = !Clock.isPaused;
        DOM.playBtn.textContent = !isPlaying ? "Play" : "Pause";

        if (isPlaying) {
            if (!DOM.pauseMenuScreen.classList.contains("hidden")) {
                DOM.pauseMenuScreen.classList.add("hidden");
            }
            this.tick();
        } else {
            // setTimeout(() => {
            if (Game.castle.isAlive() && !this.waveManager.isWaveBonusScreenEnabled) {
                DOM.pauseMenuScreen.classList.remove("hidden");
                DOM.bonusCardsList.innerHTML = "";
                DOM.waveDisplay.textContent = `wave ${Number(this.waveManager.waveIdx) + 1}`;

                PlayerStats.bonusCards.forEach((card) => {
                    const li = document.createElement("li");
                    li.onclick = () => console.log(card);
                    li.innerHTML = DOM.renderBonusCard(card);
                    DOM.bonusCardsList.appendChild(li);
                });
            } else {
                DOM.pauseMenuScreen.classList.add("hidden");
            }
            // }, 0);
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

        Object.values(Game.projectiles)
            .sort((a, b) => a.pos.y - b.pos.y)
            .forEach((projectile) => {
                projectile.update(delta);
                projectile.draw();
            });

        Object.values(Game.textEntities)
            .sort((a, b) => a.pos.y - b.pos.y)
            .forEach((textEntity) => {
                textEntity.update(delta);
                textEntity.draw();
            });

        this.dragCardManager.tick();
        this.playerStats.tick(delta);

        // handle end of wave or game over
        const allEnemiesDead = !Object.values(Game.entities).find(
            (entity) => (entity as Character).team === Team.red && entity.isAlive()
        );

        if (allEnemiesDead && !this.waveManager.waveFinished) {
            console.log("all enemies are DEAD!");
            this.waveManager.waveFinished = true;
            setTimeout(() => {
                this.toggleIsPlaying();
                this.waveManager.toggleWaveBonusScreen();
            }, 2000);
        }

        if (!Clock.isPaused && Game.castle.isDead()) {
            console.log("==== GAME OVER ====");
            this.toggleIsPlaying();
            DOM.enableGameoverBanner();
        }

        // continue the loop
        if (!Clock.isPaused) {
            requestAnimationFrame(this.tick.bind(this));
        }
    }
}

class DragUnitManager {
    isDraggingUnit = false;
    selectedUnit: CharacterType | null = null;
    dragPos: Vec2 | null = null;
    dragOriginPos: Vec2 | null = null;
    TOP_DRAG_Y = CANVAS_HEIGHT - CANVAS_HEIGHT * DRAG_UNIT_Y_LIMIT_PERCENT;

    constructor() {
        DOM.unitsDisplay.addEventListener("pointerdown", this.startDrag.bind(this));
        window.addEventListener("pointermove", this.dragUnit.bind(this));
        window.addEventListener("pointerup", this.dragEnd.bind(this));
    }

    startDrag(ev: PointerEvent) {
        ev.stopPropagation();
        const unit = (ev.target as HTMLLIElement).dataset.unit as CharacterType;

        const unitCost = unitCosts[unit];
        if (unitCost > PlayerStats.currentMana) return;

        const cardRect = (ev.target as HTMLLIElement).getBoundingClientRect();
        const clickedElemCenterPos = new Vec2(cardRect.x + cardRect.width / 2, cardRect.y + cardRect.height / 2);

        this.dragOriginPos = clickedElemCenterPos;
        this.selectedUnit = unit;
        this.isDraggingUnit = true;
    }

    dragUnit(ev: PointerEvent | TouchEvent) {
        ev.preventDefault();
        let clientX = -1;
        let clientY = -1;

        if (ev instanceof PointerEvent) {
            clientX = ev.clientX;
            clientY = ev.clientY;
        } else if (ev instanceof TouchEvent) {
            clientX = ev.touches[0].clientX;
            clientY = ev.touches[0].clientY;
        }

        // console.log(clientX, clientY);
        const rect = DOM.canvas.getBoundingClientRect();

        // 1. Calculate the Scale Factors
        const scaleX = CANVAS_WIDTH / rect.width; // 720 / scaled_width
        const scaleY = CANVAS_HEIGHT / rect.height; // 1280 / scaled_height

        // 2. Convert to Game Coordinates
        const gameX = (clientX - rect.left) * scaleX;
        const gameY = (clientY - rect.top) * scaleY;

        if (this.isDraggingUnit) {
            this.dragPos = new Vec2(gameX, gameY);
            // this.dragPos = new Vec2(gameX, Math.max(gameY, this.TOP_DRAG_Y));
        } else {
            this.isDraggingUnit = false;
            this.selectedUnit = null;
        }
    }

    dragEnd(_: PointerEvent) {
        if (this.dragPos && this.isDraggingUnit && this.selectedUnit) {
            // console.log(this.dragOriginPos);

            console.log({
                dragPos: this.dragPos,
                dragOriginPos: this.dragOriginPos,
                CANVAS_WIDTH,
                CANVAS_HEIGHT,
            });

            const x = this.dragPos.x;
            const y = this.dragPos.y;
            const isInsideCanvas = x >= 0 && x <= CANVAS_WIDTH && y >= 0 && y <= CANVAS_HEIGHT;

            if (isInsideCanvas) {
                let entity: GameEntity | undefined = undefined;

                switch (this.selectedUnit) {
                    case CharacterType.soldier:
                        entity = new Soldier(Team.blue, x, y);
                        // entity = new Soldier(Team.blue, x, Math.max(y, this.TOP_DRAG_Y));
                        break;
                    case CharacterType.swordsman:
                        entity = new Swordsman(Team.blue, x, y);
                        // entity = new Swordsman(Team.blue, x, Math.max(y, this.TOP_DRAG_Y));
                        break;
                    case CharacterType.archer:
                        entity = new Archer(Team.blue, x, y);
                        // entity = new Archer(Team.blue, x, Math.max(y, this.TOP_DRAG_Y));
                        break;
                }

                if (!entity) throw Error("entity error");

                Game.entities[entity.id] = entity;

                const cost = unitCosts[this.selectedUnit];

                PlayerStats.currentMana -= cost;
            } else {
                console.log("Dropped outside :: CANCEL");
            }
        }
        this.dragPos = null;
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
                spriteData[this.selectedUnit].idle.image,
                0,
                0,
                SPRITE_IMG_SIZE,
                SPRITE_IMG_SIZE,
                this.dragPos.x - SPRITE_IMG_SIZE / 2,
                this.dragPos.y - spriteData[this.selectedUnit].idle.image.height / 2 - 6,
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
    }

    async onCallNextWave() {
        // reset mana for next wave
        PlayerStats.currentMana = INITIAL_MANA;

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

        DOM.waveBonusCardsList.innerHTML = "";
        const pickedCards = pickRandomCards(3, PlayerStats.bonusCards);

        pickedCards.forEach((card) => {
            const li = document.createElement("li");

            li.onclick = () => {
                PlayerStats.bonusCards.push(card);
                this.onCallNextWave();
            };
            li.innerHTML = DOM.renderBonusCard(card);
            DOM.waveBonusCardsList.appendChild(li);
        });

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

class PlayerStats {
    static currentMana = INITIAL_MANA;
    manaPerMinute = MANA_PER_MINUTE;
    buildInterval: number;
    manaTimer = 0;

    static bonusCards: BonusCard[] = [];

    constructor() {
        this.buildInterval = 60_000 / this.manaPerMinute;
    }

    tick(delta: number) {
        if (Game.castle.isDead()) return;

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
