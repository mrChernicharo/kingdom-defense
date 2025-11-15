export const afterWaveScreen = document.querySelector("#after-wave-screen") as HTMLDivElement;
export const nextWaveBtn = afterWaveScreen?.querySelector("button") as HTMLButtonElement;
export const gameOverBanner = document.querySelector("#gameover-banner") as HTMLDivElement;
export const unitsDisplay = document.querySelector("#unit-display ul") as HTMLUListElement;
export const playBtn = document.querySelector("#play-btn") as HTMLButtonElement;
export const manaBar = document.querySelector("#mana-bar") as HTMLDivElement;
export const manaDisplay = document.querySelector("#mana-display") as HTMLSpanElement;
export const manaBarFill = document.querySelector("#mana-bar-fill") as HTMLDivElement;

export const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
export const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
