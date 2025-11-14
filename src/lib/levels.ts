import { Orc, Skeleton } from "../core/entities";
import { CANVAS_WIDTH } from "./constants";

export type EnemyClass = typeof Skeleton | typeof Orc;

export type EnemyBlueprint = [EnemyClass, number, number];

export type Level = {
    name: string;
    waves: EnemyBlueprint[][];
};

export const LEVELS: Level[] = [
    {
        name: "forest 01",
        waves: [
            [
                [Skeleton, 60, 0],
                [Skeleton, CANVAS_WIDTH - 100, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
            [
                [Orc, 20, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 20, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
            [
                [Orc, 20, 0],
                [Orc, 100, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 20, 0],
                [Skeleton, CANVAS_WIDTH - 110, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
        ],
    },

    {
        name: "forest 02",
        waves: [
            [
                [Orc, 20, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 20, 0],
                [Skeleton, CANVAS_WIDTH - 110, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
            [
                [Orc, 20, 0],
                [Orc, 100, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 20, 0],
                [Skeleton, CANVAS_WIDTH - 110, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
        ],
    },
    {
        name: "forest 03",
        waves: [
            [
                [Orc, 20, 0],
                [Orc, 100, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 20, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
            [
                [Orc, 20, 0],
                [Orc, 100, 0],
                [Orc, 180, 0],
                [Skeleton, CANVAS_WIDTH - 20, 0],
                [Skeleton, CANVAS_WIDTH - 200, 0],
            ],
        ],
    },
];

// export const LEVELS = [
//     {
//         name: "forest 01",
//         waves: [
//             [
//                 // new Orc(Team.red, 180, 0),
//                 // new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
//             ],
//             [
//                 new Orc(Team.red, 20, 0),
//                 new Orc(Team.red, 180, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
//             ],
//             [
//                 new Orc(Team.red, 20, 0),
//                 new Orc(Team.red, 100, 0),
//                 new Orc(Team.red, 180, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 110, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
//             ],
//         ],
//     },
//     {
//         name: "forest 02",
//         waves: [
//             [
//                 new Orc(Team.red, 20, 0),
//                 new Orc(Team.red, 180, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 110, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
//             ],
//             [
//                 new Orc(Team.red, 20, 0),
//                 new Orc(Team.red, 100, 0),
//                 new Orc(Team.red, 180, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 110, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
//             ],
//         ],
//     },
//     {
//         name: "forest 03",
//         waves: [
//             [
//                 new Orc(Team.red, 20, 0),
//                 new Orc(Team.red, 100, 0),
//                 new Orc(Team.red, 180, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
//             ],
//             [
//                 new Orc(Team.red, 20, 0),
//                 new Orc(Team.red, 100, 0),
//                 new Orc(Team.red, 180, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
//                 new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
//             ],
//         ],
//     },
// ];
