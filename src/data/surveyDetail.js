const SURVEY_GROUP_META = [
  {
    key: 'clean',
    label: '청결',
    color: '#1D4ED8',
    cardBg: '#EFF6FF',
    cardBorder: '#BFDBFE',
    itemMeta: [
      { label: '소변기', barColor: '#1E40AF' },
      { label: '대변기', barColor: '#3B82F6' },
      { label: '세면대', barColor: '#7DB7F8' },
      { label: '바닥', barColor: '#BFDBFE' },
    ],
  },
  {
    key: 'damage',
    label: '파손',
    color: '#15803D',
    cardBg: '#F0FDF4',
    cardBorder: '#BBF7D0',
    itemMeta: [
      { label: '소변기', barColor: '#166534' },
      { label: '문', barColor: '#22C55E' },
      { label: '세면대', barColor: '#6EE7A0' },
      { label: '대변기', barColor: '#BBF7D0' },
    ],
  },
  {
    key: 'supply',
    label: '비품',
    color: '#CA8A04',
    cardBg: '#FEFCE8',
    cardBorder: '#FEF08A',
    itemMeta: [
      { label: '손세정제', barColor: '#A16207' },
      { label: '휴지', barColor: '#FBBF24' },
      { label: '휴지통', barColor: '#FDE68A' },
    ],
  },
]

// 화장실 id별 더미 카운트 (백엔드 연동 전 임시 데이터)
const SURVEY_COUNTS_BY_RESTROOM = {
  1: { clean: [30, 26, 20, 16], damage: [28, 22, 18, 14], supply: [16, 10, 6] },
  2: { clean: [23, 20, 15, 12], damage: [21, 17, 14, 11], supply: [12, 8, 5] },
  3: { clean: [49, 43, 33, 26], damage: [46, 36, 30, 23], supply: [26, 16, 10] },
  4: { clean: [17, 15, 12, 9], damage: [16, 13, 10, 8], supply: [9, 6, 3] },
  5: { clean: [71, 62, 48, 38], damage: [67, 52, 43, 33], supply: [38, 24, 14] },
  6: { clean: [44, 38, 29, 23], damage: [41, 32, 26, 20], supply: [23, 15, 9] },
  7: { clean: [59, 52, 40, 32], damage: [55, 44, 36, 28], supply: [32, 20, 12] },
  8: { clean: [14, 12, 9, 7], damage: [13, 10, 8, 6], supply: [7, 5, 3] },
  9: { clean: [10, 8, 6, 5], damage: [9, 7, 6, 4], supply: [5, 3, 2] },
  10: { clean: [21, 18, 14, 11], damage: [19, 15, 13, 10], supply: [11, 7, 4] },
  11: { clean: [15, 13, 10, 8], damage: [14, 11, 9, 7], supply: [8, 5, 3] },
  12: { clean: [12, 11, 8, 6], damage: [11, 9, 7, 6], supply: [6, 4, 2] },
}

const RESTROOM_IDS = Object.keys(SURVEY_COUNTS_BY_RESTROOM).map(Number)

function buildGroups(getCount) {
  return SURVEY_GROUP_META.map((group) => ({
    key: group.key,
    label: group.label,
    color: group.color,
    cardBg: group.cardBg,
    cardBorder: group.cardBorder,
    items: group.itemMeta.map((item, index) => ({
      label: item.label,
      barColor: item.barColor,
      count: getCount(group.key, index),
    })),
  }))
}

// 화장실 하나의 설문 데이터
export function getSurveyGroups(restroomId) {
  const counts = SURVEY_COUNTS_BY_RESTROOM[restroomId]
  if (!counts) return getAggregatedSurveyGroups()
  return buildGroups((groupKey, index) => counts[groupKey][index])
}

// 지자체(구) 전체 화장실 합산 데이터 — 화장실 선택 안 했을 때 기본값
export function getAggregatedSurveyGroups() {
  return buildGroups((groupKey, index) =>
    RESTROOM_IDS.reduce((sum, id) => sum + SURVEY_COUNTS_BY_RESTROOM[id][groupKey][index], 0)
  )
}

// 기존 코드 호환용 (지자체 전체 기준 기본값)
export const SURVEY_GROUPS = getAggregatedSurveyGroups()