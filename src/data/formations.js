// 슬롯 좌표: x 0~100 (좌→우), y 0~100 (자기 골문→상대 골문)
const GK = ['gk_classic', 'gk_sweeper'];
const CB = ['cb_stopper', 'cb_cover', 'cb_ballplaying'];
const FB = ['fb_defensive', 'wb_attacking', 'fb_inverted'];
const WB = ['wb_attacking', 'fb_defensive'];
const DM = ['dm_anchor', 'dm_bwm', 'dm_dlp'];
const CM = ['cm_b2b', 'cm_mezzala', 'cm_carrilero', 'dm_dlp', 'dm_bwm'];
const AM = ['am_ap', 'am_ss'];
const WG = ['w_classic', 'w_inverted', 'w_if', 'w_wp'];
const WM = ['w_classic', 'w_inverted', 'w_wp', 'cm_carrilero'];
const ST = ['st_target', 'st_poacher', 'st_dlf', 'st_af', 'st_pf'];

export const FORMATIONS = [
  {
    id: 'f433', name: '4-3-3',
    slots: [
      { id: 'GK', label: 'GK', x: 50, y: 5, cat: 'GK', roles: GK },
      { id: 'LB', label: 'LB', x: 14, y: 25, cat: 'DF', roles: FB },
      { id: 'LCB', label: 'CB', x: 37, y: 18, cat: 'DF', roles: CB },
      { id: 'RCB', label: 'CB', x: 63, y: 18, cat: 'DF', roles: CB },
      { id: 'RB', label: 'RB', x: 86, y: 25, cat: 'DF', roles: FB },
      { id: 'DM', label: 'DM', x: 50, y: 38, cat: 'MF', roles: DM },
      { id: 'LCM', label: 'CM', x: 31, y: 52, cat: 'MF', roles: CM },
      { id: 'RCM', label: 'CM', x: 69, y: 52, cat: 'MF', roles: CM },
      { id: 'LW', label: 'LW', x: 14, y: 74, cat: 'FW', roles: WG },
      { id: 'RW', label: 'RW', x: 86, y: 74, cat: 'FW', roles: WG },
      { id: 'ST', label: 'ST', x: 50, y: 88, cat: 'FW', roles: ST },
    ],
  },
  {
    id: 'f4231', name: '4-2-3-1',
    slots: [
      { id: 'GK', label: 'GK', x: 50, y: 5, cat: 'GK', roles: GK },
      { id: 'LB', label: 'LB', x: 14, y: 25, cat: 'DF', roles: FB },
      { id: 'LCB', label: 'CB', x: 37, y: 18, cat: 'DF', roles: CB },
      { id: 'RCB', label: 'CB', x: 63, y: 18, cat: 'DF', roles: CB },
      { id: 'RB', label: 'RB', x: 86, y: 25, cat: 'DF', roles: FB },
      { id: 'LDM', label: 'DM', x: 39, y: 40, cat: 'MF', roles: DM },
      { id: 'RDM', label: 'DM', x: 61, y: 40, cat: 'MF', roles: DM },
      { id: 'AM', label: 'AM', x: 50, y: 60, cat: 'MF', roles: AM },
      { id: 'LW', label: 'LW', x: 14, y: 68, cat: 'FW', roles: WG },
      { id: 'RW', label: 'RW', x: 86, y: 68, cat: 'FW', roles: WG },
      { id: 'ST', label: 'ST', x: 50, y: 88, cat: 'FW', roles: ST },
    ],
  },
  {
    id: 'f442', name: '4-4-2',
    slots: [
      { id: 'GK', label: 'GK', x: 50, y: 5, cat: 'GK', roles: GK },
      { id: 'LB', label: 'LB', x: 14, y: 25, cat: 'DF', roles: FB },
      { id: 'LCB', label: 'CB', x: 37, y: 18, cat: 'DF', roles: CB },
      { id: 'RCB', label: 'CB', x: 63, y: 18, cat: 'DF', roles: CB },
      { id: 'RB', label: 'RB', x: 86, y: 25, cat: 'DF', roles: FB },
      { id: 'LM', label: 'LM', x: 14, y: 55, cat: 'MF', roles: WM },
      { id: 'LCM', label: 'CM', x: 38, y: 48, cat: 'MF', roles: CM },
      { id: 'RCM', label: 'CM', x: 62, y: 48, cat: 'MF', roles: CM },
      { id: 'RM', label: 'RM', x: 86, y: 55, cat: 'MF', roles: WM },
      { id: 'LST', label: 'ST', x: 40, y: 85, cat: 'FW', roles: ST },
      { id: 'RST', label: 'ST', x: 60, y: 85, cat: 'FW', roles: ST },
    ],
  },
  {
    id: 'f352', name: '3-5-2',
    slots: [
      { id: 'GK', label: 'GK', x: 50, y: 5, cat: 'GK', roles: GK },
      { id: 'LCB', label: 'CB', x: 28, y: 18, cat: 'DF', roles: CB },
      { id: 'CCB', label: 'CB', x: 50, y: 15, cat: 'DF', roles: CB },
      { id: 'RCB', label: 'CB', x: 72, y: 18, cat: 'DF', roles: CB },
      { id: 'LWB', label: 'LWB', x: 10, y: 50, cat: 'DF', roles: WB },
      { id: 'RWB', label: 'RWB', x: 90, y: 50, cat: 'DF', roles: WB },
      { id: 'DM', label: 'DM', x: 50, y: 38, cat: 'MF', roles: DM },
      { id: 'LCM', label: 'CM', x: 33, y: 55, cat: 'MF', roles: CM },
      { id: 'RCM', label: 'CM', x: 67, y: 55, cat: 'MF', roles: CM },
      { id: 'LST', label: 'ST', x: 40, y: 85, cat: 'FW', roles: ST },
      { id: 'RST', label: 'ST', x: 60, y: 85, cat: 'FW', roles: ST },
    ],
  },
  {
    id: 'f4141', name: '4-1-4-1',
    slots: [
      { id: 'GK', label: 'GK', x: 50, y: 5, cat: 'GK', roles: GK },
      { id: 'LB', label: 'LB', x: 14, y: 25, cat: 'DF', roles: FB },
      { id: 'LCB', label: 'CB', x: 37, y: 18, cat: 'DF', roles: CB },
      { id: 'RCB', label: 'CB', x: 63, y: 18, cat: 'DF', roles: CB },
      { id: 'RB', label: 'RB', x: 86, y: 25, cat: 'DF', roles: FB },
      { id: 'DM', label: 'DM', x: 50, y: 36, cat: 'MF', roles: DM },
      { id: 'LM', label: 'LM', x: 14, y: 58, cat: 'MF', roles: WM },
      { id: 'LCM', label: 'CM', x: 38, y: 55, cat: 'MF', roles: CM },
      { id: 'RCM', label: 'CM', x: 62, y: 55, cat: 'MF', roles: CM },
      { id: 'RM', label: 'RM', x: 86, y: 58, cat: 'MF', roles: WM },
      { id: 'ST', label: 'ST', x: 50, y: 87, cat: 'FW', roles: ST },
    ],
  },
  {
    id: 'f343', name: '3-4-3',
    slots: [
      { id: 'GK', label: 'GK', x: 50, y: 5, cat: 'GK', roles: GK },
      { id: 'LCB', label: 'CB', x: 28, y: 18, cat: 'DF', roles: CB },
      { id: 'CCB', label: 'CB', x: 50, y: 15, cat: 'DF', roles: CB },
      { id: 'RCB', label: 'CB', x: 72, y: 18, cat: 'DF', roles: CB },
      { id: 'LWB', label: 'LWB', x: 10, y: 48, cat: 'DF', roles: WB },
      { id: 'LCM', label: 'CM', x: 38, y: 45, cat: 'MF', roles: CM },
      { id: 'RCM', label: 'CM', x: 62, y: 45, cat: 'MF', roles: CM },
      { id: 'RWB', label: 'RWB', x: 90, y: 48, cat: 'DF', roles: WB },
      { id: 'LW', label: 'LW', x: 18, y: 76, cat: 'FW', roles: WG },
      { id: 'RW', label: 'RW', x: 82, y: 76, cat: 'FW', roles: WG },
      { id: 'ST', label: 'ST', x: 50, y: 88, cat: 'FW', roles: ST },
    ],
  },
  {
    id: 'f442d', name: '4-4-2 다이아몬드',
    slots: [
      { id: 'GK', label: 'GK', x: 50, y: 5, cat: 'GK', roles: GK },
      { id: 'LB', label: 'LB', x: 14, y: 25, cat: 'DF', roles: FB },
      { id: 'LCB', label: 'CB', x: 37, y: 18, cat: 'DF', roles: CB },
      { id: 'RCB', label: 'CB', x: 63, y: 18, cat: 'DF', roles: CB },
      { id: 'RB', label: 'RB', x: 86, y: 25, cat: 'DF', roles: FB },
      { id: 'DM', label: 'DM', x: 50, y: 36, cat: 'MF', roles: DM },
      { id: 'LCM', label: 'CM', x: 30, y: 50, cat: 'MF', roles: CM },
      { id: 'RCM', label: 'CM', x: 70, y: 50, cat: 'MF', roles: CM },
      { id: 'AM', label: 'AM', x: 50, y: 63, cat: 'MF', roles: AM },
      { id: 'LST', label: 'ST', x: 40, y: 85, cat: 'FW', roles: ST },
      { id: 'RST', label: 'ST', x: 60, y: 85, cat: 'FW', roles: ST },
    ],
  },
];
