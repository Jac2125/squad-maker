import { ROLES, roleById, KEY_IDEAL, SEC_IDEAL, KEY_W, SEC_W } from '../data/roles.js';
import { FORMATIONS } from '../data/formations.js';
import { hungarian } from './hungarian.js';

const BIG = 1e7; // GK <-> 필드 플레이어 금지용

// 대략적 역할과 슬롯 카테고리 간 불일치 페널티
function famPenalty(rough, slotCat) {
  if (rough === 'GK' || slotCat === 'GK') return rough === slotCat ? 0 : BIG;
  if (rough === slotCat) return 0;
  const adj = (a, b) =>
    (a === 'DF' && b === 'MF') || (a === 'MF' && b === 'DF') ||
    (a === 'MF' && b === 'FW') || (a === 'FW' && b === 'MF');
  return adj(rough, slotCat) ? 120 : 400;
}

// 역할 적합 비용: 부족분만 벌점 (이상치 초과는 벌점 없음) + 핵심 능력치 절대수준 보너스
// cost = 10 * sqrt( Σ w_i * max(0, ideal_i - a_i)^2 / Σ w_i ) - keyAvg
export function roleFit(player, role) {
  let wsum = 0, def = 0, qsum = 0;
  for (const a of role.key) {
    const v = player.attrs[a] ?? 0;
    const d = Math.max(0, KEY_IDEAL - v);
    def += KEY_W * d * d; qsum += KEY_W * v; wsum += KEY_W;
  }
  for (const a of role.sec) {
    const v = player.attrs[a] ?? 0;
    const d = Math.max(0, SEC_IDEAL - v);
    def += SEC_W * d * d; qsum += SEC_W * v; wsum += SEC_W;
  }
  const defNorm = Math.sqrt(def / wsum);   // 가중 RMS 부족분 (0~86)
  const keyAvg = qsum / wsum;              // 가중 평균 능력 (0~100)
  const cost = 10 * defNorm - keyAvg;
  const fit = Math.max(0, Math.min(100, Math.round(100 - 1.6 * defNorm)));
  return { cost, fit, defNorm, keyAvg };
}

// 슬롯 비용 = 허용 역할 중 최소 비용 역할 + 카테고리 페널티
function slotCost(player, slot) {
  let best = null;
  for (const rid of slot.roles) {
    const f = roleFit(player, roleById[rid]);
    if (!best || f.cost < best.cost) best = { roleId: rid, ...f };
  }
  return { ...best, cost: best.cost + famPenalty(player.rough, slot.cat) };
}

// 한 포메이션 평가: 로스터에서 베스트 11 선발 + 최적 배정
export function evalFormation(players, formation) {
  const n = players.length;
  const m = formation.slots.length; // 11
  const N = Math.max(n, m);
  const OFFSET = 2000; // 비용을 양수로 만들기 위한 슬롯당 상수 (배정 순위에 영향 없음)

  const detail = players.map(p => formation.slots.map(s => slotCost(p, s)));
  const cost = [];
  for (let i = 0; i < N; i++) {
    cost.push([]);
    for (let j = 0; j < N; j++) {
      if (i < n && j < m) cost[i].push(detail[i][j].cost + OFFSET);
      else cost[i].push(0); // 더미 (선발 제외 선수 / 잉여 슬롯)
    }
  }

  const assign = hungarian(cost);
  const lineup = [];
  const bench = [];
  let total = 0;
  let feasible = true;

  players.forEach((p, i) => {
    const j = assign[i];
    if (j < m) {
      const d = detail[i][j];
      if (d.cost >= BIG) feasible = false;
      lineup.push({ slot: formation.slots[j], player: p, roleId: d.roleId, fit: d.fit });
      total += d.cost;
    } else {
      bench.push(p);
    }
  });
  lineup.sort((a, b) => a.slot.y - b.slot.y);
  return { formation, lineup, bench, total, feasible };
}

// 전 포메이션 비교
export function findBest(players) {
  const results = FORMATIONS.map(f => evalFormation(players, f))
    .filter(r => r.feasible)
    .sort((a, b) => a.total - b.total);
  return results;
}

// 선수 개인의 전체 역할 랭킹 (설명용)
export function playerRoleRanking(player, topN = 3) {
  return ROLES
    .filter(r => (player.rough === 'GK') === (r.cat === 'GK'))
    .map(r => ({ role: r, ...roleFit(player, r) }))
    .sort((a, b) => a.cost - b.cost)
    .slice(0, topN);
}
