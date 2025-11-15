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
    {
        name: "forest 04",
        bgColor: "#bf932dff",
        waves: [
            [
                [Orc, 20, -100],
                [Orc, 40, -20],
                [Orc, 60, 30],
                [Orc, 80, 10],
                [Orc, 100, -90],
                [Orc, 120, -40],
                [Orc, 140, -20],
                [Orc, 180, -100],
                [Skeleton, CANVAS_WIDTH - 40, 0],
                [Skeleton, CANVAS_WIDTH - 60, 20],
                [Skeleton, CANVAS_WIDTH - 70, 40],
                [Skeleton, CANVAS_WIDTH - 90, 60],
                [Skeleton, CANVAS_WIDTH - 120, 60],
                [Skeleton, CANVAS_WIDTH - 150, 40],
                [Skeleton, CANVAS_WIDTH - 170, 20],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
            [
                [Orc, 20, 0],
                [Orc, 40, 0],
                [Orc, 60, 0],
                [Orc, 80, 0],
                [Orc, 100, 0],
                [Orc, 120, 0],
                [Orc, 140, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 40, 0],
                [Skeleton, CANVAS_WIDTH - 60, 0],
                [Skeleton, CANVAS_WIDTH - 70, 0],
                [Skeleton, CANVAS_WIDTH - 90, 0],
                [Skeleton, CANVAS_WIDTH - 120, 0],
                [Skeleton, CANVAS_WIDTH - 150, 0],
                [Skeleton, CANVAS_WIDTH - 170, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
        ],
    },
];
