import { getAggregatedSurveyGroups } from './surveyDetail'

const AGGREGATED_GROUPS = getAggregatedSurveyGroups()

let autoId = 0
export const SURVEY_ITEMS = AGGREGATED_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    id: ++autoId,
    label: item.label,
    status: group.label,
    count: item.count,
    color: item.barColor,
  }))
)