// 배정된 역할 조합 + 팀 능력치 분포로부터 전술 지침 도출
export function buildTactics(result) {
  const roles = result.lineup.map(l => l.roleId);
  const has = (...ids) => ids.some(id => roles.includes(id));
  const count = (...ids) => roles.filter(r => ids.includes(r)).length;
  const avg = (attr, filterCat) => {
    const ps = result.lineup
      .filter(l => !filterCat || l.slot.cat === filterCat)
      .map(l => l.player.attrs[attr] ?? 0);
    return ps.length ? ps.reduce((a, b) => a + b, 0) / ps.length : 0;
  };

  const notes = [];

  // 빌드업 방식
  if (has('gk_sweeper', 'cb_ballplaying', 'dm_dlp', 'fb_inverted')) {
    notes.push({
      title: '후방 빌드업',
      body: '골키퍼와 수비진부터 짧은 패스로 볼을 소유하며 전진하세요. 볼플레잉 자원이 후방에 있으므로 무리한 걷어내기보다 침착한 연결이 유리합니다.',
    });
  } else if (has('st_target')) {
    notes.push({
      title: '다이렉트 플레이',
      body: '타겟맨을 향한 롱볼과 얼리 크로스를 적극 활용하세요. 세컨드볼 경합에 미드필더들이 빠르게 가담해야 합니다.',
    });
  } else {
    notes.push({
      title: '실용적 전개',
      body: '후방에서 무리한 빌드업보다 미드필드로 빠르게 볼을 운반한 뒤 전개하는 편이 안전합니다.',
    });
  }

  // 공격 루트
  if (count('w_classic', 'wb_attacking') >= 2) {
    notes.push({
      title: '측면 공략',
      body: '양 측면의 스피드를 살려 돌파 후 크로스로 마무리하세요. 파이널 서드에서 풀백/윙백의 오버래핑이 핵심 무기입니다.',
    });
  }
  if (has('w_if', 'w_inverted', 'am_ss')) {
    notes.push({
      title: '하프스페이스 침투',
      body: '측면 자원이 안으로 좁혀 들어오는 움직임을 활용하세요. 풀백이 벌려주고 윙어가 중앙 침투하는 패턴이 유효합니다.',
    });
  }
  if (has('st_dlf', 'am_ap')) {
    notes.push({
      title: '연계 중심 공격',
      body: '최전방이 내려와 연계하며 만든 공간으로 2선이 침투하는 패턴을 반복 훈련하세요. 원터치 콤비네이션이 득점 루트입니다.',
    });
  }
  if (avg('pac', 'FW') >= 78) {
    notes.push({
      title: '뒷공간 역습',
      body: '전방 자원의 스피드가 뛰어납니다. 볼 탈취 즉시 상대 수비 뒷공간으로 향하는 빠른 역습 한 방을 노리세요.',
    });
  }

  // 수비 방식
  if (has('st_pf', 'dm_bwm') || avg('wrk') >= 75) {
    notes.push({
      title: '전방 압박',
      body: '활동량이 좋은 팀입니다. 상대 빌드업 단계부터 강하게 압박해 높은 위치에서 볼을 탈취하세요.',
    });
  } else {
    notes.push({
      title: '내려선 수비 블록',
      body: '무리한 전방 압박보다 미드필드 라인부터 촘촘한 블록을 형성하고, 볼을 따낸 뒤 신속히 전환하세요.',
    });
  }
  if (has('cb_cover') && avg('pac', 'DF') >= 72) {
    notes.push({
      title: '높은 수비 라인',
      body: '수비진 커버 속도가 받쳐주므로 라인을 올려 필드를 좁게 쓸 수 있습니다.',
    });
  } else if (avg('pac', 'DF') < 62) {
    notes.push({
      title: '낮은 수비 라인 유지',
      body: '수비진 스피드가 느린 편이므로 라인을 내려 뒷공간을 내주지 않는 것이 최우선입니다.',
    });
  }

  return notes;
}
