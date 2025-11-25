import { LEVELS } from "../lib/levels";
import { DOM } from "../lib/DOM";

new DOM();

const uList = document.querySelector("#level-select-list");

console.log(LEVELS);

const lItems: string[] = [];
LEVELS.forEach((level, idx) => {
    lItems.push(`<a href="./game.html?level=${idx}">${idx + 1}. ${level.name}</a><br>`);
});

uList!.innerHTML = lItems.join("");
