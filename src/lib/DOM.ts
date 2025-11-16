import type { BonusCard } from "./cards";

export class DOM {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;

    static playBtn: HTMLButtonElement;

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

    constructor() {
        DOM.canvas = document.querySelector("#canvas") as HTMLCanvasElement;
        DOM.ctx = DOM.canvas?.getContext("2d") as CanvasRenderingContext2D;

        DOM.waveBonusScreen = document.querySelector("#wave-bonus-screen") as HTMLDivElement;
        DOM.waveBonusScreenHeading = document.querySelector("#wave-bonus-screen-head") as HTMLHeadingElement;
        DOM.waveBonusCardsList = document.querySelector("#wave-bonus-cards-list") as HTMLUListElement;
        DOM.nextWaveBtn = DOM.waveBonusScreen?.querySelector("button") as HTMLButtonElement;

        DOM.gameOverBanner = document.querySelector("#gameover-banner") as HTMLDivElement;
        DOM.tryAgainBtn = DOM.gameOverBanner?.querySelector("#try-again-btn") as HTMLButtonElement;

        DOM.playBtn = document.querySelector("#play-btn") as HTMLButtonElement;

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
    }

    static renderBonusCard(card: BonusCard) {
        return `
                <div role="button" tab-index="0" class="bonus-card">
                    <h3 style="line-height:normal;">${card.title}</h3>
                    <p>${card.type}</p>
                    <div style="background: ${card.iconName}; width: 25px; height: 25px; border-radius: 1000px"></div>
                    <small style="text-align: center;">${card.description}</small>
                </div>
            `;
    }
}
