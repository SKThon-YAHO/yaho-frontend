// 백엔드 연동 전 임시 데이터 — 추후 API 응답(카테고리별 count)으로 교체
// count 기준으로 정렬 → 퍼센트 자동 계산되므로 항목이 늘거나 줄어도 그대로 대응됨
export const SURVEY_ITEMS = [
  { id: 1, label: '소변기', status: '청결', count: 45 },
  { id: 2, label: '소변기', status: '파손', count: 42 },
  { id: 3, label: '대변기', status: '청결', count: 39 },
  { id: 4, label: '문', status: '파손', count: 33 },
  { id: 5, label: '대변기', status: '파손', count: 27 },
  { id: 6, label: '세면대', status: '청결', count: 26 },
  { id: 7, label: '바닥', status: '청결', count: 24 },
  { id: 8, label: '세면대', status: '파손', count: 22 },
  { id: 9, label: '문', status: '청결', count: 21 },
  { id: 10, label: '바닥', status: '파손', count: 21 },
]

// Figma 최종 디자인 도넛 팔레트 (정렬된 항목 순서대로 순환 적용)
export const CHART_COLORS = [
  '#F2E065',
  '#4150D0',
  '#4D64E2',
  '#6182EE',
  '#A7C4F8',
  '#467E45',
  '#59A055',
  '#87DA8A',
  '#AAECB2',
  '#B98C31',
]
