import React, { useEffect, useMemo, useState } from 'react';
import { ATTRS, ROUGH, DEFAULT_ATTRS } from './data/attributes.js';
import { roleById } from './data/roles.js';
import { SAMPLE_PLAYERS } from './data/sample.js';
import { findBest, playerRoleRanking, roleFit } from './logic/matcher.js';
import { buildTactics } from './logic/tactics.js';
import Pitch from './components/Pitch.jsx';
import RadarChart from './components/RadarChart.jsx';

let uid = 1;
const newPlayer = () => ({
  id: 'p' + Date.now() + '_' + uid++,
  name: '선수 ' + uid,
  rough: 'MF',
  attrs: DEFAULT_ATTRS(),
});

export default function App() {
  const [players, setPlayers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formIdx, setFormIdx] = useState(0);

  const results = useMemo(() => {
    if (players.length < 11) return [];
    return findBest(players);
  }, [players]);

  // 로스터가 바뀌면 포메이션 탭을 첫 번째로 리셋 (렌더가 아닌 커밋 이후에)
  useEffect(() => { setFormIdx(0); }, [players]);

  // formIdx가 결과 개수를 벗어나면 안전하게 0으로 클램프
  const safeIdx = formIdx < results.length ? formIdx : 0;
  const result = results[safeIdx] ?? null;

  // 왜 결과가 없는지 진단 (인원 부족 vs 골키퍼 없음 vs 성립 불가)
  const hasGK = players.some(p => p.rough === 'GK');
  const blockReason =
    players.length < 11 ? { kind: 'few', need: 11 - players.length }
    : !hasGK ? { kind: 'nogk' }
    : results.length === 0 ? { kind: 'infeasible' }
    : null;
  const tactics = useMemo(() => (result ? buildTactics(result) : []), [result]);
  const selected = players.find(p => p.id === selectedId) ?? null;
  const selectedLine = result?.lineup.find(l => l.player.id === selectedId) ?? null;
  const selectedRole = selectedLine
    ? roleById[selectedLine.roleId]
    : selected
      ? playerRoleRanking(selected, 1)[0]?.role
      : null;

  const update = (id, patch) =>
    setPlayers(ps => ps.map(p => (p.id === id ? { ...p, ...patch } : p)));
  const updateAttr = (id, attr, v) =>
    setPlayers(ps => ps.map(p => (p.id === id ? { ...p, attrs: { ...p.attrs, [attr]: v } } : p)));
  const remove = id => {
    setPlayers(ps => ps.filter(p => p.id !== id));
    if (selectedId === id) setSelectedId(null);
  };
  const add = () => {
    const p = newPlayer();
    setPlayers(ps => [...ps, p]);
    setSelectedId(p.id);
  };

  const avgFit = r => Math.round(r.lineup.reduce((s, l) => s + l.fit, 0) / r.lineup.length);

  return (
    <div className="app">
      <header>
        <h1>동네축구 스쿼드 메이커</h1>
        <p>선수 능력치를 넣으면 헝가리안 알고리즘이 전체 오차 최소의 포메이션·역할 배정을 찾아줍니다.</p>
      </header>

      <div className="layout">
        {/* ---------- 좌: 로스터 ---------- */}
        <section className="panel roster">
          <div className="panel-head">
            <h2>로스터 <span className="count">{players.length}명</span></h2>
            <div>
              <button onClick={add}>+ 선수 추가</button>
              <button className="ghost" onClick={() => { setPlayers(SAMPLE_PLAYERS); setSelectedId(null); }}>
                샘플 스쿼드
              </button>
            </div>
          </div>
          {players.length < 11 && (
            <p className="hint">11명 이상 등록하면 분석이 시작됩니다. (현재 {players.length}명)</p>
          )}
          <ul className="player-list">
            {players.map(p => {
              const line = result?.lineup.find(l => l.player.id === p.id);
              return (
                <li key={p.id}
                    className={p.id === selectedId ? 'sel' : ''}
                    onClick={() => setSelectedId(p.id)}>
                  <span className={'tag ' + p.rough}>{ROUGH.find(r => r.id === p.rough)?.name}</span>
                  <span className="pname">{p.name}</span>
                  {line
                    ? <span className="assigned">{line.slot.label} · {roleById[line.roleId].name} <b>{line.fit}</b></span>
                    : result && <span className="assigned bench-tag">벤치</span>}
                  <button className="del" onClick={e => { e.stopPropagation(); remove(p.id); }}>×</button>
                </li>
              );
            })}
          </ul>

          {selected && (
            <div className="editor">
              <div className="editor-head">
                <input value={selected.name} onChange={e => update(selected.id, { name: e.target.value })} />
                <select value={selected.rough} onChange={e => update(selected.id, { rough: e.target.value })}>
                  {ROUGH.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div className="sliders">
                {ATTRS.map(a => (
                  <label key={a.id}>
                    <span>{a.name}</span>
                    <input type="range" min="0" max="100" value={selected.attrs[a.id]}
                      onChange={e => updateAttr(selected.id, a.id, +e.target.value)} />
                    <b>{selected.attrs[a.id]}</b>
                  </label>
                ))}
              </div>
              <div className="radar-box">
                <RadarChart attrs={selected.attrs} role={selectedRole} />
                {selectedRole && (
                  <p className="radar-caption">
                    점선 = <b>{selectedRole.name}</b> 요구치 (<span className="key-txt">핵심</span>/<span className="sec-txt">보조</span>)
                  </p>
                )}
                <div className="ranking">
                  <h4>적합 역할 Top 3</h4>
                  {playerRoleRanking(selected, 3).map((r, i) => (
                    <div key={r.role.id} className="rank-row">
                      <span>{i + 1}. {r.role.name}</span><b>{r.fit}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ---------- 우: 결과 ---------- */}
        <section className="panel result">
          {!result ? (
            <div className="empty">
              <h2>{blockReason?.kind === 'nogk' ? '🧤' : '⚽'}</h2>
              {blockReason?.kind === 'few' && (
                <p>선수 <b>{blockReason.need}명</b> 더 등록하면 분석이 시작됩니다.<br />
                  또는 <b>샘플 스쿼드</b>를 불러와 보세요.</p>
              )}
              {blockReason?.kind === 'nogk' && (
                <p><b>골키퍼가 없습니다.</b><br />
                  선수 한 명을 골라 대략적 역할을 <b>골키퍼</b>로 바꿔주세요.<br />
                  <small>손으로 추가한 선수는 기본값이 미드필더라, GK를 최소 1명 지정해야 합니다.</small></p>
              )}
              {blockReason?.kind === 'infeasible' && (
                <p>현재 구성으로는 <b>성립 가능한 포메이션이 없습니다.</b><br />
                  역할 분포(골키퍼·수비·미드필더·공격)를 조정해 보세요.</p>
              )}
            </div>
          ) : (
            <>
              <div className="form-tabs">
                {results.map((r, i) => (
                  <button key={r.formation.id}
                          className={i === formIdx ? 'tab on' : 'tab'}
                          onClick={() => setFormIdx(i)}>
                    {r.formation.name}
                    <small>적합도 {avgFit(r)}</small>
                    {i === 0 && <em>최적</em>}
                  </button>
                ))}
              </div>
              <div className="result-body">
                <Pitch lineup={result.lineup} selectedId={selectedId} onSelect={setSelectedId} />
                <div className="side">
                  <h3>전술 지침</h3>
                  {tactics.map(t => (
                    <div key={t.title} className="tactic">
                      <h4>{t.title}</h4>
                      <p>{t.body}</p>
                    </div>
                  ))}
                  {result.bench.length > 0 && (
                    <>
                      <h3>벤치</h3>
                      <p className="bench-list">
                        {result.bench.map(p => p.name).join(', ')}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      <footer>
        선수×포지션 비용행렬(부족분 가중 RMS − 능력 보너스)을 Hungarian algorithm으로 최적 배정 · 7개 포메이션 × 25개 역할 비교
      </footer>
    </div>
  );
}
