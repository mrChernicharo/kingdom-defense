// export const waveBonusScreen = document.querySelector("#wave-bonus-screen") as HTMLDivElement;
// export const waveBonusScreenHeading = document.querySelector("#wave-bonus-screen-head") as HTMLHeadingElement;
// export const nextWaveBtn = waveBonusScreen?.querySelector("button") as HTMLButtonElement;
// export const gameOverBanner = document.querySelector("#gameover-banner") as HTMLDivElement;

// export const playBtn = document.querySelector("#play-btn") as HTMLButtonElement;

// export const bottomBar = document.querySelector("#bottom-bar") as HTMLDivElement;
// export const displayTop = bottomBar?.querySelector("#display-top") as HTMLUListElement;
// export const displayBottom = bottomBar?.querySelector("#display-bottom") as HTMLUListElement;
// export const unitsDisplay = bottomBar?.querySelector("#unit-display") as HTMLUListElement;
// export const manaBar = document.querySelector("#mana-bar") as HTMLDivElement;
// export const manaDisplay = document.querySelector("#mana-display") as HTMLSpanElement;
// export const manaBarFill = document.querySelector("#mana-bar-fill") as HTMLDivElement;

// export const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
// export const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

export class DOM {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;

    static playBtn: HTMLButtonElement;

    static waveBonusScreen: HTMLDivElement;
    static waveBonusScreenHeading: HTMLHeadingElement;
    static nextWaveBtn: HTMLButtonElement;
    static gameOverBanner: HTMLDivElement;

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
        DOM.nextWaveBtn = DOM.waveBonusScreen?.querySelector("button") as HTMLButtonElement;
        DOM.gameOverBanner = document.querySelector("#gameover-banner") as HTMLDivElement;

        DOM.playBtn = document.querySelector("#play-btn") as HTMLButtonElement;

        DOM.bottomBar = document.querySelector("#bottom-bar") as HTMLDivElement;
        DOM.displayTop = DOM.bottomBar?.querySelector("#display-top") as HTMLUListElement;
        DOM.displayBottom = DOM.bottomBar?.querySelector("#display-bottom") as HTMLUListElement;
        DOM.unitsDisplay = DOM.bottomBar?.querySelector("#unit-display") as HTMLUListElement;
        DOM.manaBar = document.querySelector("#mana-bar") as HTMLDivElement;
        DOM.manaDisplay = document.querySelector("#mana-display") as HTMLSpanElement;
        DOM.manaBarFill = document.querySelector("#mana-bar-fill") as HTMLDivElement;
    }
}
