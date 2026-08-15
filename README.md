# Pickup Soccer Squad Maker

Give it the attributes and a rough role for 11+ players, and it assigns each player the role
(archetype) that fits them best, then proposes the formation and tactics that minimize the
squad's total misfit — solved as an assignment problem with the Hungarian algorithm.

**▶ Live demo:** https://USERNAME.github.io/squad-maker/   ← replace USERNAME after enabling Pages

## ⚠️ Read this first — how to actually run it

There is **no runnable file in this repository.** The app has to be built:

```bash
npm install
npm run build      # creates dist/index.html
```

Then open **`dist/index.html`** — that one file is the whole app, self-contained.

| File | What it is |
|---|---|
| `src/` | The actual source code. Edit here. |
| `index.html` (root) | Build template only. Opening it directly shows a "this is not the app" notice. |
| `dist/index.html` | ✅ The built app. Created by `npm run build`, not committed to git. |

Build output is gitignored on purpose — GitHub Actions rebuilds and deploys it on every push
to `main`, so the repository stays source-only.

## Development

```bash
npm install
npm run dev     # local dev server (http://localhost:5173)
npm run build   # produces dist/index.html — one self-contained file
```

The build inlines all JS and CSS into one HTML file (`vite-plugin-singlefile`), so the result
works from `file://` and from any static host with zero dependencies.

## Deploying to GitHub Pages

Settings → Pages → Source: **GitHub Actions**. That's it — `.github/workflows/deploy.yml`
builds the site and publishes it on every push to `main`.

## How it works

1. **Roles** — 25 archetypes (target man, poacher, deep-lying playmaker, inverted winger…), each
   defined by key attributes (weight 3, ideal 86) and secondary attributes (weight 2, ideal 74).
2. **Cost function** — misfit of player *p* in role *r*:

   ```
   cost(p, r) = 10 · sqrt( Σ wᵢ · max(0, idealᵢ − aᵢ)² / Σ wᵢ )  −  (Σ wᵢaᵢ / Σ wᵢ)
   ```

   Only shortfalls are penalized (exceeding the ideal costs nothing); the trailing term biases
   selection toward stronger players.
3. **Optimal assignment** — a player × slot cost matrix per formation, solved with the
   **Hungarian algorithm** in O(n³). Rosters larger than 11 are padded with zero-cost dummy slots,
   so picking the best XI is solved simultaneously as one rectangular assignment problem.
4. **Formation comparison** — 7 formations ranked by total cost.
5. **Tactics** — build-up, attacking routes and defensive approach derived from the assigned role
   mix and the team's attribute distribution.

## Validation

- Hungarian implementation checked against brute-force search on 300 random 2–7 matrices — all matched
- Goalkeeper constraint verified across all formations
- End-to-end test on a sample squad produced intuitive assignments

## Structure

```
src/
├── data/       attributes, 25 roles, 7 formations, sample squad
├── logic/      hungarian.js (algorithm), matcher.js (cost + assignment), tactics.js
├── components/ Pitch.jsx, RadarChart.jsx
└── App.jsx
```

## License

MIT
