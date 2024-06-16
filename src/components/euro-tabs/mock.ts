import { GroupType } from "./groups/groups";
import { PlayOffMatch } from "./play-off/play-off";

type Resp = {
  groups: GroupType[];
  eight: PlayOffMatch[][];
  four: PlayOffMatch[][];
  two: PlayOffMatch[][];
  final: PlayOffMatch[][];
};

export const mockResponse: Resp = {
  groups: [
    {
      group: "Group A",
      info: [
        {
          team: "GER",
          games: 1,
          goals: [5, 1],
          points: 3,
        },
        {
          team: "SUI",
          games: 1,
          goals: [3, 1],
          points: 3,
        },
        {
          team: "HUN",
          games: 1,
          goals: [1, 3],
          points: 3,
        },
        {
          team: "SCO",
          games: 1,
          goals: [1, 5],
          points: 3,
        },
      ],
    },
    {
      group: "Group A",
      info: [
        {
          team: "GER",
          games: 1,
          goals: [5, 1],
          points: 3,
        },
        {
          team: "SUI",
          games: 1,
          goals: [3, 1],
          points: 3,
        },
        {
          team: "HUN",
          games: 1,
          goals: [1, 3],
          points: 3,
        },
        {
          team: "SCO",
          games: 1,
          goals: [1, 5],
          points: 3,
        },
      ],
    },
    {
      group: "Group A",
      info: [
        {
          team: "GER",
          games: 1,
          goals: [5, 1],
          points: 3,
        },
        {
          team: "SUI",
          games: 1,
          goals: [3, 1],
          points: 3,
        },
        {
          team: "HUN",
          games: 1,
          goals: [1, 3],
          points: 3,
        },
        {
          team: "SCO",
          games: 1,
          goals: [1, 5],
          points: 3,
        },
      ],
    },
    {
      group: "Group A",
      info: [
        {
          team: "GER",
          games: 1,
          goals: [5, 1],
          points: 3,
        },
        {
          team: "SUI",
          games: 1,
          goals: [3, 1],
          points: 3,
        },
        {
          team: "HUN",
          games: 1,
          goals: [1, 3],
          points: 3,
        },
        {
          team: "SCO",
          games: 1,
          goals: [1, 5],
          points: 3,
        },
      ],
    },
    {
      group: "Group A",
      info: [
        {
          team: "GER",
          games: 1,
          goals: [5, 1],
          points: 3,
        },
        {
          team: "SUI",
          games: 1,
          goals: [3, 1],
          points: 3,
        },
        {
          team: "HUN",
          games: 1,
          goals: [1, 3],
          points: 3,
        },
        {
          team: "SCO",
          games: 1,
          goals: [1, 5],
          points: 3,
        },
      ],
    },
    {
      group: "Group A",
      info: [
        {
          team: "GER",
          games: 1,
          goals: [5, 1],
          points: 3,
        },
        {
          team: "SUI",
          games: 1,
          goals: [3, 1],
          points: 3,
        },
        {
          team: "HUN",
          games: 1,
          goals: [1, 3],
          points: 3,
        },
        {
          team: "SCO",
          games: 1,
          goals: [1, 5],
          points: 3,
        },
      ],
    },
  ],
  eight: [
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
  ],
  four: [
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
  ],
  two: [
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
  ],
  final: [
    [
      {
        team: "GER",
        score: 3,
      },
      {
        team: "SCO",
        score: 1,
      },
    ],
  ],
};
