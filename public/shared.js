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
  // {
  //   id: 51,
  //   label: "David Alaba",
  //   appearance: 6,
  //   mins_played: 565,
  //   assist: 2,
  //   ball_recovery: 26,
  //   pass_accurate: 233,
  //   shots_total: 8,
  // },
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
