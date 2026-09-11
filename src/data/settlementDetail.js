export const BASE_RATE = 337
export const PENALTY_RATE = 137
export const SURVEY_THRESHOLD = 100

// 화장실 하나의 survey 객체({clean, break, item})에서 전체 설문 제기 건수 합산
export function sumSurveyCount(survey) {
  if (!survey) return 0
  const groupKeys = ['clean', 'break', 'item']
  return groupKeys.reduce((sum, groupKey) => {
    const fields = survey[groupKey] || {}
    return sum + Object.values(fields).reduce((s, v) => s + v, 0)
  }, 0)
}

// 화장실 하나의 정산 계산
// 그 달 설문 건수가 SURVEY_THRESHOLD 이상이면 전체 이용자 수를 PENALTY_RATE로,
// 미만이면 BASE_RATE로 계산 (구간 분리 없이 화장실 단위로 단가 자체가 바뀜)
export function computeSettlement(totalCount, surveyCount) {
  const isFlagged = surveyCount >= SURVEY_THRESHOLD
  const rate = isFlagged ? PENALTY_RATE : BASE_RATE
  return {
    rate,
    isFlagged,
    surveyCount,
    totalAmount: totalCount * rate,
  }
}

export function getNextSettlementDate() {
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const mm = String(next.getMonth() + 1).padStart(2, '0')
  const dd = String(next.getDate()).padStart(2, '0')
  return `${mm}.${dd}`
}
