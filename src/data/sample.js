// 데모용 샘플 스쿼드 (15명)
let seq = 1;
const P = (name, rough, attrs) => ({ id: 's' + seq++, name, rough, attrs });

export const SAMPLE_PLAYERS = [
  P('김민재', 'GK', { pac: 55, sta: 60, str: 78, dri: 30, tec: 45, pas: 52, vis: 55, sho: 25, hea: 60, tkl: 40, pos: 80, wrk: 55, ref: 84 }),
  P('박건우', 'GK', { pac: 68, sta: 62, str: 65, dri: 40, tec: 60, pas: 75, vis: 70, sho: 30, hea: 50, tkl: 45, pos: 68, wrk: 58, ref: 76 }),
  P('이도현', 'DF', { pac: 60, sta: 70, str: 85, dri: 40, tec: 45, pas: 50, vis: 48, sho: 35, hea: 84, tkl: 86, pos: 72, wrk: 68, ref: 30 }),
  P('최지훈', 'DF', { pac: 78, sta: 72, str: 70, dri: 50, tec: 55, pas: 58, vis: 62, sho: 30, hea: 68, tkl: 80, pos: 84, wrk: 70, ref: 30 }),
  P('정승민', 'DF', { pac: 58, sta: 65, str: 74, dri: 55, tec: 68, pas: 82, vis: 74, sho: 40, hea: 66, tkl: 76, pos: 70, wrk: 62, ref: 30 }),
  P('강태양', 'DF', { pac: 84, sta: 86, str: 60, dri: 72, tec: 62, pas: 64, vis: 55, sho: 45, hea: 50, tkl: 68, pos: 62, wrk: 82, ref: 30 }),
  P('조현우', 'DF', { pac: 66, sta: 74, str: 68, dri: 45, tec: 50, pas: 55, vis: 50, sho: 30, hea: 62, tkl: 82, pos: 78, wrk: 74, ref: 30 }),
  P('윤시우', 'MF', { pac: 62, sta: 68, str: 58, dri: 65, tec: 80, pas: 88, vis: 86, sho: 55, hea: 40, tkl: 50, pos: 64, wrk: 60, ref: 30 }),
  P('임재현', 'MF', { pac: 70, sta: 88, str: 72, dri: 60, tec: 58, pas: 66, vis: 60, sho: 62, hea: 60, tkl: 74, pos: 66, wrk: 90, ref: 30 }),
  P('한지호', 'MF', { pac: 64, sta: 76, str: 76, dri: 52, tec: 54, pas: 60, vis: 58, sho: 48, hea: 62, tkl: 84, pos: 76, wrk: 84, ref: 30 }),
  P('오세준', 'MF', { pac: 74, sta: 78, str: 55, dri: 80, tec: 74, pas: 76, vis: 70, sho: 66, hea: 42, tkl: 48, pos: 60, wrk: 72, ref: 30 }),
  P('신유찬', 'FW', { pac: 90, sta: 74, str: 52, dri: 84, tec: 70, pas: 62, vis: 58, sho: 72, hea: 40, tkl: 35, pos: 66, wrk: 64, ref: 30 }),
  P('배준서', 'FW', { pac: 86, sta: 70, str: 58, dri: 76, tec: 66, pas: 58, vis: 55, sho: 82, hea: 48, tkl: 30, pos: 74, wrk: 60, ref: 30 }),
  P('서동혁', 'FW', { pac: 58, sta: 66, str: 88, dri: 48, tec: 60, pas: 55, vis: 52, sho: 76, hea: 86, tkl: 40, pos: 72, wrk: 62, ref: 30 }),
  P('황민석', 'FW', { pac: 72, sta: 84, str: 74, dri: 55, tec: 52, pas: 50, vis: 48, sho: 68, hea: 64, tkl: 55, pos: 62, wrk: 88, ref: 30 }),
];
