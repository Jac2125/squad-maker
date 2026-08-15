import React from 'react';
import { ATTRS } from '../data/attributes.js';
import { KEY_IDEAL, SEC_IDEAL } from '../data/roles.js';

// 13축 레이더 차트. role이 주어지면 역할 요구치를 점선으로 오버레이.
export default function RadarChart({ attrs, role, size = 260 }) {
  const cx = size / 2, cy = size / 2;
  const R = size / 2 - 34;
  const n = ATTRS.length;
  const angle = i => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, v) => [cx + R * (v / 100) * Math.cos(angle(i)), cy + R * (v / 100) * Math.sin(angle(i))];
  const poly = vals => vals.map((v, i) => pt(i, v).map(x => x.toFixed(1)).join(',')).join(' ');

  const playerVals = ATTRS.map(a => attrs[a.id] ?? 0);
  let roleVals = null;
  if (role) {
    roleVals = ATTRS.map(a => {
      if (role.key.includes(a.id)) return KEY_IDEAL;
      if (role.sec.includes(a.id)) return SEC_IDEAL;
      return 0;
    });
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="radar">
      {[25, 50, 75, 100].map(g => (
        <polygon key={g} points={poly(ATTRS.map(() => g))} className="radar-grid" />
      ))}
      {ATTRS.map((a, i) => {
        const [x, y] = pt(i, 100);
        const [lx, ly] = pt(i, 118);
        const isKey = role && role.key.includes(a.id);
        const isSec = role && role.sec.includes(a.id);
        return (
          <g key={a.id}>
            <line x1={cx} y1={cy} x2={x} y2={y} className="radar-grid" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              className={'radar-label' + (isKey ? ' key' : isSec ? ' sec' : '')}>
              {a.name}
            </text>
          </g>
        );
      })}
      {roleVals && <polygon points={poly(roleVals)} className="radar-role" />}
      <polygon points={poly(playerVals)} className="radar-player" />
    </svg>
  );
}
