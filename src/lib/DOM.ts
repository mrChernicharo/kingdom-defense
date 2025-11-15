export const afterWaveScreen = document.querySelector("#after-wave-screen") as HTMLDivElement;
export const nextWaveBtn = afterWaveScreen?.querySelector("button") as HTMLButtonElement;
export const gameOverBanner = document.querySelector("#gameover-banner") as HTMLDivElement;
export const cardsDisplay = document.querySelector("#cards-display ul") as HTMLUListElement;
export const playBtn = document.querySelector("#play-btn") as HTMLButtonElement;
export const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
export const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
