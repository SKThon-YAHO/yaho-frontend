const SURVEY_GROUP_META = [
  {
    key: 'clean',
    label: '청결',
    color: '#1D4ED8',
    cardBg: '#EFF6FF',
    cardBorder: '#BFDBFE',
    itemMeta: [
      { label: '소변기', barColor: '#1E40AF', field: 'urinal' },
      { label: '대변기', barColor: '#3B82F6', field: 'toilet' },
      { label: '세면대', barColor: '#7DB7F8', field: 'sink' },
      { label: '바닥', barColor: '#BFDBFE', field: 'floor' },
    ],
  },
  {
    key: 'damage',
    label: '파손',
    color: '#15803D',
    cardBg: '#F0FDF4',
    cardBorder: '#BBF7D0',
    itemMeta: [
      { label: '소변기', barColor: '#166534', field: 'urinal' },
      { label: '문', barColor: '#22C55E', field: 'door' },
      { label: '세면대', barColor: '#6EE7A0', field: 'sink' },
      { label: '대변기', barColor: '#BBF7D0', field: 'toilet' },
    ],
  },
  {
    key: 'supply',
    label: '비품',
    color: '#CA8A04',
    cardBg: '#FEFCE8',
    cardBorder: '#FEF08A',
    itemMeta: [
      { label: '손세정제', barColor: '#A16207', field: 'soap' },
      { label: '휴지', barColor: '#FBBF24', field: 'paper' },
      { label: '휴지통', barColor: '#FDE68A', field: 'trash' },
    ],
  },
]

// 더미 그룹 key -> 실제 API(survey) 응답의 그룹 key 매핑
const API_GROUP_KEY = {
  clean: 'clean',
  damage: 'break',
  supply: 'item',
}

// 화장실 id별 더미 카운트 (API 로딩 실패 시 fallback용으로만 유지)
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

// 더미 fallback (API 로딩 실패 시에만 사용)
export function getAggregatedSurveyGroups() {
  return buildGroups((groupKey, index) =>
    RESTROOM_IDS.reduce((sum, id) => sum + SURVEY_COUNTS_BY_RESTROOM[id][groupKey][index], 0)
  )
}

// 실제 API의 survey 객체({clean, break, item})를 화면용 그룹 구조로 변환
// (화장실 하나의 survey를 넣으면 그 화장실 데이터, 합산된 survey를 넣으면 종합 데이터)
export function mapAggregatedSurveyGroups(surveyData) {
  if (!surveyData) return null
  return SURVEY_GROUP_META.map((group) => {
    const apiKey = API_GROUP_KEY[group.key]
    const counts = surveyData[apiKey] || {}
    return {
      key: group.key,
      label: group.label,
      color: group.color,
      cardBg: group.cardBg,
      cardBorder: group.cardBorder,
      items: group.itemMeta.map((item) => ({
        label: item.label,
        barColor: item.barColor,
        count: counts[item.field] ?? 0,
      })),
    }
  })
}

// 화장실별 survey 객체 배열을 하나로 합산 (지자체 종합 계산용)
export function sumSurveyData(surveyList) {
  const groupKeys = ['clean', 'break', 'item']
  const result = { clean: {}, break: {}, item: {} }
  surveyList.forEach((survey) => {
    if (!survey) return
    groupKeys.forEach((groupKey) => {
      const fields = survey[groupKey] || {}
      Object.keys(fields).forEach((field) => {
        result[groupKey][field] = (result[groupKey][field] || 0) + fields[field]
      })
    })
  })
  return result
}
