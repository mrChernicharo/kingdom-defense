import { Orc, Skeleton } from "../core/entities";
import { CANVAS_WIDTH } from "./constants";
import { Team } from "./types";

export const LEVELS = [
    {
        name: "forest 01",
        waves: [
            [
                // new Orc(Team.red, 180, 0),
                // new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
            ],
            [
                new Orc(Team.red, 20, 0),
                new Orc(Team.red, 180, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
            ],
            [
                new Orc(Team.red, 20, 0),
                new Orc(Team.red, 100, 0),
                new Orc(Team.red, 180, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 110, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
            ],
        ],
    },
    {
        name: "forest 02",
        waves: [
            [
                new Orc(Team.red, 20, 0),
                new Orc(Team.red, 180, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 110, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
            ],
            [
                new Orc(Team.red, 20, 0),
                new Orc(Team.red, 100, 0),
                new Orc(Team.red, 180, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 110, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
            ],
        ],
    },
    {
        name: "forest 03",
        waves: [
            [
                new Orc(Team.red, 20, 0),
                new Orc(Team.red, 100, 0),
                new Orc(Team.red, 180, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
            ],
            [
                new Orc(Team.red, 20, 0),
                new Orc(Team.red, 100, 0),
                new Orc(Team.red, 180, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 20, 0),
                new Skeleton(Team.red, CANVAS_WIDTH - 200, 0),
            ],
        ],
    },
];
