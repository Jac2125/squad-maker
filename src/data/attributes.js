// 13개 능력치 — 25개 역할을 구분하기에 충분한 차원
export const ATTRS = [
  { id: 'pac', name: '스피드' },
  { id: 'sta', name: '체력' },
  { id: 'str', name: '피지컬' },
  { id: 'dri', name: '드리블' },
  { id: 'tec', name: '테크닉' },
  { id: 'pas', name: '패스' },
  { id: 'vis', name: '시야' },
  { id: 'sho', name: '슛' },
  { id: 'hea', name: '헤딩' },
  { id: 'tkl', name: '태클' },
  { id: 'pos', name: '위치선정' },
  { id: 'wrk', name: '활동량' },
  { id: 'ref', name: '반사신경' },
];

export const ROUGH = [
  { id: 'FW', name: '공격' },
  { id: 'MF', name: '미드필더' },
  { id: 'DF', name: '수비' },
  { id: 'GK', name: '골키퍼' },
];

export const DEFAULT_ATTRS = () =>
  Object.fromEntries(ATTRS.map(a => [a.id, 60]));
