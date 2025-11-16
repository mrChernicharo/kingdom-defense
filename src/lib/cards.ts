import { CharacterType, type CharacterAttrs } from "./types";

export type BonusCardType = "ALL_UNITS" | "SPECIFIC_UNIT" | "ECONOMIC" | "DEFENSE" | "UTILITY";
export type BonusCard = {
    id: string;
    title: string;
    description: string;
    type: BonusCardType;
    iconName: string;
    effect: {
        attr: keyof Omit<CharacterAttrs, "team" | "type"> | "mana" | "gold" | "xp";
        target: CharacterType | "ALL" | null;
        modifier: number;
        isPercent: boolean;
    };
};

export const ALL_CARDS: BonusCard[] = [
    {
        id: "soldier_attack_rate_1",
        title: "sword training",
        description: "boosts all soldiers' attack rate by 10%",
        type: "SPECIFIC_UNIT",
        iconName: "gray",
        effect: {
            attr: "attacksPerMinute",
            isPercent: true,
            modifier: 0.1,
            target: CharacterType.soldier,
        },
    },
    {
        id: "util_mana_1",
        title: "mana source",
        description: "boosts mana creation speed by 10%",
        type: "UTILITY",
        iconName: "purple",
        effect: {
            attr: "mana",
            isPercent: true,
            modifier: 0.1,
            target: null,
        },
    },
    {
        id: "swordsman_attack_range_1",
        title: "master swordsman",
        description: "increases swordsman attack range by 25%",
        type: "SPECIFIC_UNIT",
        iconName: "blue",
        effect: {
            attr: "attackRange",
            isPercent: true,
            modifier: 0.25,
            target: CharacterType.swordsman,
        },
    },
    {
        id: "all_hp_1",
        title: "iron skin",
        description: "boosts all units' HP by 15%",
        type: "ALL_UNITS",
        iconName: "silver",
        effect: {
            attr: "hp",
            isPercent: true,
            modifier: 0.15,
            target: "ALL",
        },
    },
    {
        id: "all_damage_1",
        title: "battle fury",
        description: "increases all units' damage by 10%",
        type: "ALL_UNITS",
        iconName: "red",
        effect: {
            attr: "damage",
            isPercent: true,
            modifier: 0.1,
            target: "ALL",
        },
    },
    {
        id: "all_speed_1",
        title: "swift march",
        description: "boosts all units' speed by 12%",
        type: "ALL_UNITS",
        iconName: "yellow",
        effect: {
            attr: "speed",
            isPercent: true,
            modifier: 0.12,
            target: "ALL",
        },
    },
    {
        id: "econ_gold_1",
        title: "gold mine",
        description: "increases gold generation by 20%",
        type: "ECONOMIC",
        iconName: "gold",
        effect: {
            attr: "gold",
            isPercent: true,
            modifier: 0.2,
            target: null,
        },
    },
    {
        id: "econ_cost_all_1",
        title: "cost reduction",
        description: "reduces all unit costs by 10%",
        type: "ECONOMIC",
        iconName: "peru",
        effect: {
            attr: "cost",
            isPercent: true,
            modifier: -0.1,
            target: "ALL",
        },
    },
    {
        id: "util_sight_all_1",
        title: "eagle eye",
        description: "increases all units' sight range by 30%",
        type: "UTILITY",
        iconName: "cyan",
        effect: {
            attr: "sightRange",
            isPercent: true,
            modifier: 0.3,
            target: "ALL",
        },
    },
    {
        id: "all_attack_rate_1",
        title: "rapid assault",
        description: "boosts all units' attack rate by 15%",
        type: "ALL_UNITS",
        iconName: "orange",
        effect: {
            attr: "attacksPerMinute",
            isPercent: true,
            modifier: 0.15,
            target: "ALL",
        },
    },
    {
        id: "soldier_hp_1",
        title: "veteran soldiers",
        description: "increases soldier HP by 25%",
        type: "SPECIFIC_UNIT",
        iconName: "darkgray",
        effect: {
            attr: "hp",
            isPercent: true,
            modifier: 0.25,
            target: CharacterType.soldier,
        },
    },
    {
        id: "swordsman_damage_1",
        title: "blade mastery",
        description: "boosts swordsman damage by 20%",
        type: "SPECIFIC_UNIT",
        iconName: "slategray",
        effect: {
            attr: "damage",
            isPercent: true,
            modifier: 0.2,
            target: CharacterType.swordsman,
        },
    },
    {
        id: "util_xp_1",
        title: "experience boost",
        description: "increases XP gain by 25%",
        type: "UTILITY",
        iconName: "violet",
        effect: {
            attr: "xp",
            isPercent: true,
            modifier: 0.25,
            target: null,
        },
    },
    {
        id: "all_attack_range_1",
        title: "long reach",
        description: "increases all units' attack range by 15%",
        type: "ALL_UNITS",
        iconName: "brown",
        effect: {
            attr: "attackRange",
            isPercent: true,
            modifier: 0.15,
            target: "ALL",
        },
    },
    {
        id: "econ_cost_soldier_1",
        title: "cheap soldiers",
        description: "reduces soldier cost by 20%",
        type: "ECONOMIC",
        iconName: "lightgray",
        effect: {
            attr: "cost",
            isPercent: true,
            modifier: -0.2,
            target: CharacterType.soldier,
        },
    },
    {
        id: "soldier_speed_1",
        title: "soldier's vigor",
        description: "increases soldier speed by 18%",
        type: "SPECIFIC_UNIT",
        iconName: "green",
        effect: {
            attr: "speed",
            isPercent: true,
            modifier: 0.18,
            target: CharacterType.soldier,
        },
    },
    {
        id: "soldier_damage_1",
        title: "heavy strike",
        description: "boosts soldier damage by 22%",
        type: "SPECIFIC_UNIT",
        iconName: "crimson",
        effect: {
            attr: "damage",
            isPercent: true,
            modifier: 0.22,
            target: CharacterType.soldier,
        },
    },
    {
        id: "soldier_attack_range_1",
        title: "soldier's reach",
        description: "increases soldier attack range by 20%",
        type: "SPECIFIC_UNIT",
        iconName: "olive",
        effect: {
            attr: "attackRange",
            isPercent: true,
            modifier: 0.2,
            target: CharacterType.soldier,
        },
    },
    {
        id: "soldier_sight_1",
        title: "keen sight",
        description: "boosts soldier sight range by 35%",
        type: "SPECIFIC_UNIT",
        iconName: "teal",
        effect: {
            attr: "sightRange",
            isPercent: true,
            modifier: 0.35,
            target: CharacterType.soldier,
        },
    },
    {
        id: "swordsman_hp_1",
        title: "elite swordsman",
        description: "increases swordsman HP by 30%",
        type: "SPECIFIC_UNIT",
        iconName: "navy",
        effect: {
            attr: "hp",
            isPercent: true,
            modifier: 0.3,
            target: CharacterType.swordsman,
        },
    },
    {
        id: "swordsman_speed_1",
        title: "swift blade",
        description: "boosts swordsman speed by 25%",
        type: "SPECIFIC_UNIT",
        iconName: "lime",
        effect: {
            attr: "speed",
            isPercent: true,
            modifier: 0.25,
            target: CharacterType.swordsman,
        },
    },
    {
        id: "swordsman_attack_rate_1",
        title: "dual wielding",
        description: "increases swordsman attack rate by 20%",
        type: "SPECIFIC_UNIT",
        iconName: "maroon",
        effect: {
            attr: "attacksPerMinute",
            isPercent: true,
            modifier: 0.2,
            target: CharacterType.swordsman,
        },
    },
    {
        id: "swordsman_sight_1",
        title: "swordsman's vision",
        description: "boosts swordsman sight range by 28%",
        type: "SPECIFIC_UNIT",
        iconName: "aqua",
        effect: {
            attr: "sightRange",
            isPercent: true,
            modifier: 0.28,
            target: CharacterType.swordsman,
        },
    },
    {
        id: "econ_cost_swordsman_1",
        title: "affordable swordsmen",
        description: "reduces swordsman cost by 18%",
        type: "ECONOMIC",
        iconName: "tan",
        effect: {
            attr: "cost",
            isPercent: true,
            modifier: -0.18,
            target: CharacterType.swordsman,
        },
    },
    {
        id: "util_mana_2",
        title: "mana surge",
        description: "boosts mana creation speed by 25%",
        type: "UTILITY",
        iconName: "indigo",
        effect: {
            attr: "mana",
            isPercent: true,
            modifier: 0.25,
            target: null,
        },
    },
    {
        id: "econ_gold_2",
        title: "treasure vault",
        description: "increases gold generation by 30%",
        type: "ECONOMIC",
        iconName: "goldenrod",
        effect: {
            attr: "gold",
            isPercent: true,
            modifier: 0.3,
            target: null,
        },
    },
    {
        id: "all_hp_2",
        title: "fortified armor",
        description: "boosts all units' HP by 20%",
        type: "ALL_UNITS",
        iconName: "lightsteelblue",
        effect: {
            attr: "hp",
            isPercent: true,
            modifier: 0.2,
            target: "ALL",
        },
    },
    {
        id: "all_speed_2",
        title: "war drums",
        description: "increases all units' speed by 18%",
        type: "ALL_UNITS",
        iconName: "coral",
        effect: {
            attr: "speed",
            isPercent: true,
            modifier: 0.18,
            target: "ALL",
        },
    },
    {
        id: "all_damage_2",
        title: "sharpened weapons",
        description: "boosts all units' damage by 15%",
        type: "ALL_UNITS",
        iconName: "darkred",
        effect: {
            attr: "damage",
            isPercent: true,
            modifier: 0.15,
            target: "ALL",
        },
    },
    {
        id: "util_sight_all_2",
        title: "tactical advantage",
        description: "increases all units' sight range by 40%",
        type: "UTILITY",
        iconName: "mediumseagreen",
        effect: {
            attr: "sightRange",
            isPercent: true,
            modifier: 0.4,
            target: "ALL",
        },
    },
];

export function pickRandomCards(count: number, existingCards: BonusCard[]) {
    const playerSet = new Set(existingCards);
    const globalSet = new Set(ALL_CARDS);

    const availableCards = [...globalSet.difference(playerSet)];

    const result = [];

    while (count > 0) {
        const idx = Math.floor(Math.random() * availableCards.length);
        result.push(availableCards[idx]);
        availableCards.splice(idx, 1);
        count--;
    }

    return result;
}
