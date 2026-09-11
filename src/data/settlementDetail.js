export const BASE_RATE = 337
export const EXCESS_RATE = 117
export const BASE_THRESHOLD = 100

// 화장실별 정산 원본 데이터 (백엔드 연동 전 임시)
export const RESTROOM_SETTLEMENTS = [
  { id: 'A', name: 'A 화장실', totalCount: 85 },
  { id: 'B', name: 'B 화장실', totalCount: 130 },
  { id: 'C', name: 'C 화장실', totalCount: 152 },
]

export function computeSettlement(totalCount) {
  const baseCount = Math.min(totalCount, BASE_THRESHOLD)
  const excessCount = Math.max(totalCount - BASE_THRESHOLD, 0)
  const baseAmount = baseCount * BASE_RATE
  const excessAmount = excessCount * EXCESS_RATE
  return {
    baseCount,
    excessCount,
    baseAmount,
    excessAmount,
    totalAmount: baseAmount + excessAmount,
  }
}

export function getNextSettlementDate() {
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const mm = String(next.getMonth() + 1).padStart(2, '0')
  const dd = String(next.getDate()).padStart(2, '0')
  return `${mm}.${dd}`
}