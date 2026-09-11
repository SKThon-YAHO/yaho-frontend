// group 배열(surveyDetail.js의 group 구조)을 SurveyCard용 평탄화된 아이템 목록으로 변환
export function buildSurveyItems(groups) {
  let autoId = 0
  return groups.flatMap((group) =>
    group.items.map((item) => ({
      id: ++autoId,
      label: item.label,
      status: group.label,
      count: item.count,
      color: item.barColor,
    }))
  )
}
