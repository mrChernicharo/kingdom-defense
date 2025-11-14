import { Orc, Skeleton } from "../core/entities";
import { CANVAS_WIDTH } from "./constants";

export type EnemyClass = typeof Skeleton | typeof Orc;

export type EnemyBlueprint = [EnemyClass, number, number];

export type Level = {
    name: string;
    bgColor: string;
    waves: EnemyBlueprint[][];
};

export const LEVELS: Level[] = [
    {
        name: "forest 01",
        bgColor: "#007f00",
        waves: [
            [
                [Skeleton, 60, 0],
                [Skeleton, CANVAS_WIDTH - 100, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
            [
                [Orc, 20, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 40, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
            [
                [Orc, 20, 0],
                [Orc, 100, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 40, 0],
                [Skeleton, CANVAS_WIDTH - 110, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
        ],
    },
    {
        name: "forest 02",
        bgColor: "#999e17ff",
        waves: [
            [
                [Orc, 20, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 40, 0],
                [Skeleton, CANVAS_WIDTH - 110, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
            [
                [Orc, 20, 0],
                [Orc, 100, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 40, 0],
                [Skeleton, CANVAS_WIDTH - 110, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
        ],
    },
    {
        name: "forest 03",
        bgColor: "#0d620dff",
        waves: [
            [
                [Orc, 20, 0],
                [Orc, 100, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 40, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
            [
                [Orc, 20, 0],
                [Orc, 100, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 40, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
        ],
    },
];
