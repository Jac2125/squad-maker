# Pickup Soccer Squad Maker

*[한국어 README](README.ko.md)*

Enter the attributes and a rough role (forward · midfielder · defender · goalkeeper) for 11 or more
players, and it assigns each player the **role (archetype)** that fits them best, then proposes the
**formation and tactics** that minimize the squad's total misfit. The computation solves an
assignment problem with the Hungarian algorithm.

**▶ Demo:** https://jac2125.github.io/assets/html/squad-maker.html

## ⚠️ Read this first — how to run it

Build the app:

```bash
npm install
npm run build      # creates dist/index.html
```

Then open **`dist/index.html`**.

## Development

```bash
npm install
npm run dev     # local dev server (http://localhost:5173)
npm run build   # creates dist/index.html — a self-contained single file
```

## How it works

1. **Role definitions** — each of 25 archetypes (target man, poacher, deep-lying playmaker,
   inverted winger, etc.) is defined by key attributes (weight 3, ideal 86) and secondary
   attributes (weight 2, ideal 74).
2. **Cost function** — the misfit of player *p* deployed in role *r*:

   ```
   cost(p, r) = 10 · sqrt( Σ wᵢ · max(0, idealᵢ − aᵢ)² / Σ wᵢ )  −  (Σ wᵢaᵢ / Σ wᵢ)
   ```

   Only shortfalls are penalized; exceeding the ideal costs nothing (this measures "can the player
   perform this role at all"). The trailing term is a bonus that biases selection toward players
   with stronger attributes.
3. **Optimal assignment** — for each formation, a player × slot cost matrix is built (a slot's cost
   is the minimum over the roles allowed at that position), and the **Hungarian algorithm** O(n³)
   computes the assignment minimizing total cost. When the roster exceeds 11, zero-cost dummy slots
   are padded in, so selecting the best XI is solved simultaneously as a single rectangular
   assignment problem.
4. **Formation comparison** — 7 formations (4-3-3, 4-2-3-1, 4-4-2, 3-5-2, 4-1-4-1, 3-4-3, diamond)
   ranked by total cost.
5. **Tactical output** — build-up style, attacking routes, and defensive approach are proposed
   through a rule-based system from the assigned role mix and the team's attribute distribution
   (forward pace, work rate, defensive line speed, etc.).

## Validation

- Hungarian implementation checked against brute-force exhaustive search on 300 random matrices of size 2–7 — all matched
- Goalkeeper constraint (only a GK in a GK slot) verified across all formations
- End-to-end test on a sample squad produced intuitive assignments — target man, poacher, ball-playing center back, etc.

## Structure

```
src/
├── data/       attributes, 25 roles, 7 formations, sample squad
├── logic/      hungarian.js (algorithm), matcher.js (cost + assignment), tactics.js
├── components/ Pitch.jsx, RadarChart.jsx
└── App.jsx
```

## ToDo

- Key player identification (who drives the play in each formation?)
- Adaptive formation switching (the ideal counter given the opponent's squad and player attributes)
- Real-world reference squads for each recommended formation (4-4-2 → 15/16 Leicester, etc.)
- Goalkeeper roulette (who's between the sticks today?)
- User data system (add teams, per-player match records, and post-match reviews)
- Objective attribute scales (what does pace 90 actually mean? what does shooting 80 amount to? → definitions needed)
- Individual stats and overall team assessment

## License

MIT