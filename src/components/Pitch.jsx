import React from 'react';
import { roleById } from '../data/roles.js';

const W = 360, H = 500;

export default function Pitch({ lineup, selectedId, onSelect }) {
  return (
    <svg viewBox={'0 0 ' + W + ' ' + H} className="pitch">
      <rect x="0" y="0" width={W} height={H} rx="10" fill="#1a6b34" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x="0" y={i * (H / 5)} width={W} height={H / 10} fill="#1f7a3c" />
      ))}
      <g stroke="#e8f5e9" strokeWidth="2" fill="none" opacity="0.7">
        <rect x="8" y="8" width={W - 16} height={H - 16} rx="6" />
        <line x1="8" y1={H / 2} x2={W - 8} y2={H / 2} />
        <circle cx={W / 2} cy={H / 2} r="46" />
        <rect x={W / 2 - 80} y={H - 60} width="160" height="52" />
        <rect x={W / 2 - 80} y="8" width="160" height="52" />
        <rect x={W / 2 - 36} y={H - 30} width="72" height="22" />
        <rect x={W / 2 - 36} y="8" width="72" height="22" />
      </g>
      {lineup.map(l => {
        const x = (l.slot.x / 100) * (W - 40) + 20;
        const y = (1 - l.slot.y / 100) * (H - 60) + 30;
        const sel = l.player.id === selectedId;
        return (
          <g key={l.slot.id} className="pitch-player" onClick={() => onSelect(l.player.id)}>
            <circle cx={x} cy={y} r="17" className={sel ? 'dot sel' : 'dot'} />
            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" className="dot-fit">
              {l.fit}
            </text>
            <text x={x} y={y + 30} textAnchor="middle" className="dot-name">{l.player.name}</text>
            <text x={x} y={y + 43} textAnchor="middle" className="dot-role">{roleById[l.roleId].name}</text>
          </g>
        );
      })}
    </svg>
  );
}
