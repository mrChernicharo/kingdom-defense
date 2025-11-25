import { archerAttrs, soldierAttrs, swordsmanAttrs } from "../lib/constants";
import { DOM } from "../lib/DOM";

new DOM();

const unitList = document.querySelector("#unit-list") as HTMLUListElement;

[soldierAttrs, swordsmanAttrs, archerAttrs].forEach((blueprint) => {
    const card = DOM.renderUnitCard(blueprint);
    unitList.innerHTML += card;
});
