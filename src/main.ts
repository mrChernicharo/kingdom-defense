// import './style.css';
import { wait } from "./helperFns";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
const playBtn = document.querySelector("#play-btn")!;
const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

const orcAttackImg = new Image();
orcAttackImg.src = "/src/assets/images/Orc-Attack01.png";

const orcWalkImg = new Image();
orcWalkImg.src = "/src/assets/images/Orc-Walk.png";

const orcAttack02Img = new Image();
orcAttack02Img.src = "/src/assets/images/Orc-Attack02.png";

canvas.width = 600;
canvas.height = 800;

await wait(200);

console.log("hello", { canvas, ctx });

let isPlaying = true;
let currTime = 0;
let prevTime = 0;
let delta = 0;
let totalTime = 0;

playBtn.addEventListener("click", (e) => {
    isPlaying = !isPlaying;

    const btn = e.target as HTMLButtonElement;
    btn.textContent = isPlaying ? "Pause" : "Play";

    if (isPlaying) {
        currTime = Date.now();
        animate();
    }
});

let x = 0;
let moveRight = true;
function animate() {
    ctx.clearRect(0, 0, 600, 800);

    currTime = Date.now();
    delta = currTime - prevTime;
    if (delta > 20) delta = 16;
    totalTime += delta;

    const attackFrame = Math.trunc(totalTime / 100) % 6;
    const walkFrame = Math.trunc(totalTime / 100) % 8;
    const attackFrame2 = Math.trunc(totalTime / 100) % 6;

    // console.log({ totalTime, delta, attackFrame });

    // ctx.strokeStyle = "#FF0000";
    // ctx.strokeRect(130, 160, 30, 40);

    // ctx.fillStyle = "#FFFFFF";
    // ctx.fillRect(230, 620, 30, 40);

    // ctx.fillStyle = "#FFFF00";
    // ctx.fillRect(530, 380, 30, 40);

    // ctx.drawImage(orcImg, 0, 0);

    // DRAW 3 ORCS
    ctx.drawImage(orcAttackImg, attackFrame * 100, 0, 100, 100, 0, 0, 100, 100);

    ctx.drawImage(orcWalkImg, walkFrame * 100, 0, 100, 100, 0, 100, 100, 100);

    ctx.drawImage(orcAttack02Img, attackFrame2 * 100, 0, 100, 100, 0, 200, 100, 100);

    // DRAW 3 FLIPPED ORCS
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(0, 0);
    ctx.drawImage(orcWalkImg, walkFrame * 100, 0, 100, 100, 0, 300, -100, 100);

    ctx.drawImage(orcAttackImg, attackFrame * 100, 0, 100, 100, 0, 400, -100, 100);

    ctx.drawImage(orcAttack02Img, attackFrame2 * 100, 0, 100, 100, 0, 500, -100, 100);
    ctx.restore();

    // DRAW ORC WALKING
    if (moveRight) {
        x += 2;
        ctx.drawImage(orcWalkImg, walkFrame * 100, 0, 100, 100, x, 600, 100, 100);
    } else {
        x -= 2;
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(0, 0);
        ctx.drawImage(orcWalkImg, walkFrame * 100, 0, 100, 100, -x, 600, -100, 100);
        ctx.restore();
    }
    if (x > 500 || x < 0) moveRight = !moveRight;

    prevTime = currTime;
    if (!isPlaying) return;

    requestAnimationFrame(animate);
}

animate();
