// Raw data (only the fields use for PCP/radar)
window.DATA = [
  // {
  //   id: 42,
  //   label: "James Rodríguez",
  //   appearance: 11,
  //   mins_played: 746,
  //   assist: 2,
  //   pass_accurate: 474,
  //   ball_recovery: 50,
  //   shots_total: 15,
  // },
  {
    id: 4,
    label: "Andrés Iniesta",
    appearance: 8,
    mins_played: 640,
    assist: 2,
    ball_recovery: 46,
    challenge_lost: 9,
    clearance_total: 3,
    dispossessed: 12,
    dribble_lost: 1,
    dribble_won: 15,
    duel_aerial_lost: 1,
    final_third: 201,
    foul_committed: 3,
    foul_given: 19,
    interception_all: 9,
    pass_key: 8,
    pass_inaccurate: 49,
    pass_accurate: 450,
    possession: 500,
    tackle_lost: 3,
    tackle_won: 8,
    touches: 611,
    shot_off_target: 4,
    shots_total: 8,
    sub_off: 8,
  },

  {
    id: 36,
    label: "Joshua Kimmich",
    appearance: 10,
    mins_played: 870,
    assist: 3,
    pass_accurate: 478,
    ball_recovery: 51,
    shots_total: 6,
  },
  {
    id: 5,
    label: "Ivan Rakitic",
    appearance: 10,
    mins_played: 806,
    man_of_the_match: 1,
    ball_recovery: 50,
    big_chance_scored: 1,
    challenge_lost: 11,
    clearance_total: 2,
    dispossessed: 2,
    dribble_lost: 3,
    dribble_won: 4,
    duel_aerial_lost: 6,
    duel_aerial_won: 5,
    final_third: 210,
    foul_committed: 10,
    foul_given: 8,
    interception_all: 16,
    pass_key: 9,
    pass_inaccurate: 68,
    pass_accurate: 677,
    possession: 764,
    yellow_card: 1,
    tackle_lost: 5,
    tackle_won: 9,
    touches: 847,
    shot_on_target: 2,
    shot_off_target: 1,
    shots_total: 5,
    sub_off: 1,
    sub_on: 2,
    goal_normal: 1,
    goals: 1,
  },
  // {
  //   id: 58,
  //   label: "Pepe",
  //   appearance: 6,
  //   mins_played: 590,
  //   ball_recovery: 33,
  //   challenge_lost: 3,
  //   clearance_total: 35,
  //   dispossessed: 3,
  //   dribble_lost: 1,
  //   dribble_won: 4,
  //   duel_aerial_lost: 6,
  //   duel_aerial_won: 20,
  //   final_third: 45,
  //   foul_committed: 6,
  //   foul_given: 9,
  //   interception_all: 13,
  //   pass_inaccurate: 69,
  //   pass_accurate: 165,
  //   possession: 234,
  //   yellow_card: 2,
  //   tackle_lost: 6,
  //   tackle_won: 11,
  //   touches: 340,
  //   shot_on_target: 1,
  //   shot_off_target: 2,
  //   shots_total: 3,
  // },
  {
    id: 88,
    label: "Álvaro Morata",
    appearance: 7,
    mins_played: 407,
    ball_recovery: 7,
    challenge_lost: 4,
    clearance_total: 6,
    dispossessed: 12,
    dribble_lost: 9,
    dribble_won: 4,
    duel_aerial_lost: 12,
    duel_aerial_won: 4,
    final_third: 32,
    foul_committed: 8,
    foul_given: 9,
    interception_all: 1,
    pass_key: 3,
    pass_inaccurate: 20,
    pass_accurate: 63,
    possession: 84,
    yellow_card: 1,
    tackle_won: 1,
    touches: 169,
    shot_on_target: 9,
    shot_off_target: 9,
    shots_total: 21,
    sub_off: 3,
    sub_on: 3,
    goal_normal: 1,
    goal_head: 1,
    goals: 1,
  },

  {
    id: 39,
    label: "Arjen Robben",
    appearance: 9,
    mins_played: 537,
    man_of_the_match: 1,
    assist: 1,
    ball_recovery: 35,
    challenge_lost: 6,
    clearance_total: 1,
    dispossessed: 9,
    dribble_lost: 8,
    dribble_won: 19,
    duel_aerial_won: 2,
    final_third: 220,
    foul_committed: 1,
    foul_given: 5,
    interception_all: 1,
    pass_key: 14,
    pass_inaccurate: 38,
    pass_accurate: 237,
    possession: 291,
    tackle_lost: 2,
    tackle_won: 4,
    touches: 401,
    shot_on_target: 3,
    shot_off_target: 10,
    shots_total: 19,
    sub_off: 3,
    sub_on: 3,
  },
];

// The 6 axes used across the whole concept
window.DIMS = [
  "appearance",
  "mins_played",
  "assist",
  "pass_accurate",
  "ball_recovery",
  "shots_total",
];

// Shared extents (computed once so all panels share identical scales)
window.EXTENTS = (() => {
  const ext = {};
  for (const dim of window.DIMS) {
    const vals = window.DATA.map((d) => Number(d[dim])).filter((v) =>
      Number.isFinite(v)
    );

    let min = Math.min(...vals);
    let max = Math.max(...vals);

    if (min === max) {
      min -= 1;
      max += 1;
    }

    const pad = (max - min) * 0.05;
    ext[dim] = [min - pad, max + pad];
  }
  return ext;
})();

// Normalized [0..1] version for radar (optional)
window.DATA_NORM = window.DATA.map((row) => {
  const out = { id: row.id, label: row.label };
  for (const dim of window.DIMS) {
    const [min, max] = window.EXTENTS[dim];
    out[dim] = (row[dim] - min) / (max - min);
  }
  return out;
});

// Cross-window channel
window.PCP_CHANNEL = new BroadcastChannel("pcp-sync");
