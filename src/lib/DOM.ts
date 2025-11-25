import type { BonusCard } from "./cards";
import { CANVAS_WIDTH, soldierAttrs, swordsmanAttrs, archerAttrs, CANVAS_HEIGHT } from "./constants";
import type { CharacterBlueprint } from "./types";

export class DOM {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;

    static playBtn: HTMLButtonElement;
    static speedControl: HTMLDivElement;

    static waveBonusScreen: HTMLDivElement;
    static waveBonusCardsList: HTMLUListElement;
    static waveBonusScreenHeading: HTMLHeadingElement;
    static nextWaveBtn: HTMLButtonElement;

    static gameOverBanner: HTMLDivElement;
    static tryAgainBtn: HTMLButtonElement;

    static pauseMenuScreen: HTMLDivElement;
    static pauseMenuCloseBtn: HTMLButtonElement;
    static pauseMenuResumeBtn: HTMLButtonElement;
    static bonusCardsList: HTMLUListElement;

    static bottomBar: HTMLDivElement;
    static displayTop: HTMLUListElement;
    static displayBottom: HTMLUListElement;
    static unitsDisplay: HTMLUListElement;
    static manaBar: HTMLDivElement;
    static manaDisplay: HTMLSpanElement;
    static manaBarFill: HTMLDivElement;
    static castleBar: HTMLDivElement;
    static castleDisplay: HTMLSpanElement;
    static castleBarFill: HTMLDivElement;

    constructor() {
        DOM.canvas = document.querySelector("#canvas") as HTMLCanvasElement;
        DOM.ctx = DOM.canvas?.getContext("2d") as CanvasRenderingContext2D;

        DOM.waveBonusScreen = document.querySelector("#wave-bonus-screen") as HTMLDivElement;
        DOM.waveBonusScreenHeading = document.querySelector("#wave-bonus-screen-head") as HTMLHeadingElement;
        DOM.waveBonusCardsList = document.querySelector("#wave-bonus-cards-list") as HTMLUListElement;

        DOM.gameOverBanner = document.querySelector("#gameover-banner") as HTMLDivElement;
        DOM.tryAgainBtn = DOM.gameOverBanner?.querySelector("#try-again-btn") as HTMLButtonElement;

        DOM.playBtn = document.querySelector("#play-btn") as HTMLButtonElement;
        DOM.speedControl = document.querySelector("#speed-control") as HTMLDivElement;

        DOM.pauseMenuScreen = document.querySelector("#pause-menu") as HTMLDivElement;
        DOM.pauseMenuCloseBtn = DOM.pauseMenuScreen?.querySelector("#pause-menu-close-btn") as HTMLButtonElement;
        DOM.pauseMenuResumeBtn = DOM.pauseMenuScreen?.querySelector("#pause-menu-resume-btn") as HTMLButtonElement;
        DOM.bonusCardsList = DOM.pauseMenuScreen?.querySelector("#bonus-card-list") as HTMLUListElement;

        DOM.bottomBar = document.querySelector("#bottom-bar") as HTMLDivElement;
        DOM.displayTop = DOM.bottomBar?.querySelector("#display-top") as HTMLUListElement;
        DOM.displayBottom = DOM.bottomBar?.querySelector("#display-bottom") as HTMLUListElement;
        DOM.unitsDisplay = DOM.bottomBar?.querySelector("#unit-display") as HTMLUListElement;

        DOM.manaBar = document.querySelector("#mana-bar") as HTMLDivElement;
        DOM.manaDisplay = document.querySelector("#mana-display") as HTMLSpanElement;
        DOM.manaBarFill = document.querySelector("#mana-bar-fill") as HTMLDivElement;
        DOM.castleBar = document.querySelector("#castle-bar") as HTMLDivElement;
        DOM.castleDisplay = document.querySelector("#castle-display") as HTMLSpanElement;
        DOM.castleBarFill = document.querySelector("#castle-bar-fill") as HTMLDivElement;
    }

    static renderBonusCard(card: BonusCard) {
        return `
            <li>
                <div role="button" tab-index="0" class="bonus-card">
                    <h3 style="line-height:normal;">${card.title}</h3>
                    <p>${card.type}</p>
                    <div style="background: ${card.iconName}; width: 25px; height: 25px; border-radius: 1000px"></div>
                    <small style="text-align: center;">${card.description}</small>
                </div>
            </li>
            `;
    }

    static renderUnitCard(unit: CharacterBlueprint) {
        return `
                <div role="button" tab-index="0" class="unit-card">
                    <h3 style="line-height:normal;">${unit.type}</h3>
                    <p>Cost: ${unit.cost} mana</p>
                    <small>${unit.description}</small>
                    <ul>
                        <li>HP: ${unit.hp}</li>
                        <li>Damage: ${unit.damage}</li>
                        <li>Speed: ${unit.speed}</li>
                        <li>Attack Range: ${unit.attackRange}</li>
                        <li>Attacks Per Minute: ${unit.attacksPerMinute}</li>
                        <li>Sight Range: ${unit.sightRange}</li>
                    </ul>       
                </div>
            `;
    }

    static enableGameoverBanner() {
        DOM.gameOverBanner.style.opacity = "0.9";
        DOM.gameOverBanner.style.pointerEvents = "all";
    }

    static initializeCanvas() {
        DOM.displayTop.style.width = CANVAS_WIDTH + "px";
        DOM.displayBottom.style.width = CANVAS_WIDTH + "px";
        [soldierAttrs, swordsmanAttrs, archerAttrs].forEach(({ type, cost }) => {
            DOM.unitsDisplay.innerHTML += `<li class="card" data-unit="${type}" data-cost="${cost}" style="user-select: none">${type} <br> ${cost}</li>`;
        });

        DOM.canvas.width = CANVAS_WIDTH;
        DOM.canvas.height = CANVAS_HEIGHT;
        // Disable image smoothing for crisp pixel art
        DOM.ctx.imageSmoothingEnabled = false;
        DOM.canvas.classList.remove("hidden");
    }
}
