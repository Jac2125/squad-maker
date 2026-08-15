// 역할 archetype 정의
// key: 핵심 능력치 (가중치 3, 이상치 86)
// sec: 보조 능력치 (가중치 2, 이상치 74)
export const KEY_IDEAL = 86;
export const SEC_IDEAL = 74;
export const KEY_W = 3;
export const SEC_W = 2;

export const ROLES = [
  // ---- GK ----
  { id: 'gk_classic', name: '클래식 골키퍼', cat: 'GK', key: ['ref', 'pos'], sec: ['str'],
    desc: '라인을 지키며 선방에 집중. 안정적인 처리 우선.' },
  { id: 'gk_sweeper', name: '스위퍼 키퍼', cat: 'GK', key: ['ref', 'pas'], sec: ['pac', 'vis', 'pos'],
    desc: '수비 뒷공간을 커버하고 빌드업의 시발점 역할.' },
  // ---- DF ----
  { id: 'cb_stopper', name: '스토퍼', cat: 'DF', key: ['tkl', 'str', 'hea'], sec: ['pos'],
    desc: '전진해서 공격수를 압박·차단하는 파이터형 센터백.' },
  { id: 'cb_cover', name: '커버형 센터백', cat: 'DF', key: ['pos', 'pac', 'tkl'], sec: ['vis'],
    desc: '뒷공간을 읽고 커버하는 스위퍼형 센터백.' },
  { id: 'cb_ballplaying', name: '볼플레잉 센터백', cat: 'DF', key: ['pas', 'tkl'], sec: ['vis', 'str', 'pos'],
    desc: '후방에서 전진 패스로 빌드업을 주도.' },
  { id: 'fb_defensive', name: '수비형 풀백', cat: 'DF', key: ['tkl', 'pos'], sec: ['pac', 'sta'],
    desc: '오버래핑보다 측면 수비 봉쇄에 집중.' },
  { id: 'wb_attacking', name: '공격형 윙백', cat: 'DF', key: ['pac', 'sta'], sec: ['dri', 'tkl'],
    desc: '측면을 왕복하며 공격 시 윙어처럼 전진.' },
  { id: 'fb_inverted', name: '인버티드 풀백', cat: 'DF', key: ['pas', 'pos'], sec: ['tkl', 'vis'],
    desc: '공격 시 중앙으로 좁혀 미드필더처럼 플레이.' },
  // ---- MF ----
  { id: 'dm_anchor', name: '앵커맨', cat: 'MF', key: ['pos', 'tkl'], sec: ['str', 'vis'],
    desc: '수비라인 앞을 지키는 위치 중심의 방패.' },
  { id: 'dm_bwm', name: '볼 위닝 미드필더', cat: 'MF', key: ['tkl', 'wrk'], sec: ['sta', 'str'],
    desc: '적극적으로 뛰며 볼을 탈취하는 사냥꾼.' },
  { id: 'dm_dlp', name: '딥라잉 플레이메이커', cat: 'MF', key: ['pas', 'vis'], sec: ['tec', 'pos'],
    desc: '후방에서 긴 패스로 경기를 조립.' },
  { id: 'cm_b2b', name: '박스 투 박스', cat: 'MF', key: ['sta', 'wrk'], sec: ['tkl', 'pas', 'sho'],
    desc: '양쪽 박스를 오가며 공수 모두 관여.' },
  { id: 'cm_mezzala', name: '메짤라', cat: 'MF', key: ['dri', 'pas'], sec: ['sta', 'vis'],
    desc: '하프스페이스로 침투하는 공격형 중앙 미드필더.' },
  { id: 'cm_carrilero', name: '카릴레로', cat: 'MF', key: ['wrk', 'pos'], sec: ['pas', 'tkl'],
    desc: '측면 채널을 커버하는 셔틀형 미드필더.' },
  { id: 'am_ap', name: '어드밴스드 플레이메이커', cat: 'MF', key: ['vis', 'pas', 'tec'], sec: ['dri'],
    desc: '최전방 바로 아래에서 결정적 패스를 공급.' },
  { id: 'am_ss', name: '섀도 스트라이커', cat: 'FW', key: ['sho', 'pos'], sec: ['dri', 'wrk'],
    desc: '2선에서 침투해 득점을 노리는 숨은 공격수.' },
  // ---- WING ----
  { id: 'w_classic', name: '클래식 윙어', cat: 'FW', key: ['pac', 'dri'], sec: ['tec', 'pas'],
    desc: '측면 돌파 후 크로스로 기회 창출.' },
  { id: 'w_inverted', name: '인버티드 윙어', cat: 'FW', key: ['dri', 'pas'], sec: ['pac', 'vis'],
    desc: '반대발 측면에서 안으로 좁혀 연계 플레이.' },
  { id: 'w_if', name: '인사이드 포워드', cat: 'FW', key: ['pac', 'sho'], sec: ['dri', 'tec'],
    desc: '측면에서 중앙으로 침투해 직접 득점을 노림.' },
  { id: 'w_wp', name: '와이드 플레이메이커', cat: 'MF', key: ['vis', 'pas'], sec: ['tec', 'dri'],
    desc: '측면에서 안쪽으로 들어와 경기를 조립.' },
  // ---- FW ----
  { id: 'st_target', name: '타겟맨', cat: 'FW', key: ['str', 'hea'], sec: ['sho', 'pos'],
    desc: '롱볼과 크로스의 목표점. 등지고 버티는 기둥.' },
  { id: 'st_poacher', name: '포처', cat: 'FW', key: ['pos', 'sho'], sec: ['pac'],
    desc: '박스 안 한 번의 기회를 골로 만드는 여우.' },
  { id: 'st_dlf', name: '딥라잉 포워드 (폴스 나인)', cat: 'FW', key: ['tec', 'pas'], sec: ['vis', 'sho', 'str'],
    desc: '내려와서 연계하며 공간을 만드는 가짜 9번.' },
  { id: 'st_af', name: '어드밴스드 포워드', cat: 'FW', key: ['pac', 'sho'], sec: ['dri', 'pos'],
    desc: '뒷공간으로 달려드는 스피드형 최전방.' },
  { id: 'st_pf', name: '프레싱 포워드', cat: 'FW', key: ['wrk', 'sta'], sec: ['str', 'sho', 'pac'],
    desc: '최전방부터 상대 수비를 압박하는 첫 수비수.' },
];

export const roleById = Object.fromEntries(ROLES.map(r => [r.id, r]));
