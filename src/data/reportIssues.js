export const REPORT_GROUPS = [
  {
    key: 'clean',
    label: '청결',
    color: '#1D4ED8',
    cardBg: '#EFF6FF',
    cardBorder: '#BFDBFE',
    checkedBg: '#F8FBFF',
    pillBg: '#DBEAFE',
    pillCheckedBg: '#E4EFFE',
    items: [
      { id: 'clean-urinal', label: '소변기', description: '소변기 주변 청결 상태 불량', resolved: false },
      { id: 'clean-toilet', label: '대변기', description: '대변기 내부 오염 신고', resolved: false },
      { id: 'clean-sink', label: '세면대', description: '세면대 배수구 이물질', resolved: false },
      { id: 'clean-floor', label: '바닥', description: '바닥 물기 방치', resolved: false },
    ],
  },
  {
    key: 'damage',
    label: '파손',
    color: '#15803D',
    cardBg: '#F0FDF4',
    cardBorder: '#BBF7D0',
    checkedBg: '#F8FEFA',
    pillBg: '#DCFCE7',
    pillCheckedBg: '#E5FCED',
    items: [
      { id: 'damage-urinal', label: '소변기', description: '소변기 센서 작동 불량', resolved: false },
      { id: 'damage-toilet', label: '대변기', description: '대변기 변기 뚜껑 파손', resolved: false },
      { id: 'damage-sink', label: '세면대', description: '세면대 수도꼭지 누수', resolved: false },
      { id: 'damage-door', label: '문', description: '문 잠금장치 파손', resolved: false },
    ],
  },
  {
    key: 'supply',
    label: '비품',
    color: '#CA8A04',
    cardBg: '#FEFCE8',
    cardBorder: '#FEF08A',
    checkedBg: '#FFFEF5',
    pillBg: '#FEF9C3',
    pillCheckedBg: '#FEFAD4',
    items: [
      { id: 'supply-soap', label: '손세정제', description: '손세정제 용기 비어 있음', resolved: false },
      { id: 'supply-trashcan', label: '휴지통', description: '휴지통 가득 참으로 비우기 필요', resolved: false },
      { id: 'supply-paper', label: '휴지', description: '휴지 부족으로 보충 필요', resolved: false },
    ],
  },
]

const GROUP_KEY_TO_API_KEY = {
  clean: 'clean',
  damage: 'break',
  supply: 'item',
}

const FIELD_NAME_OVERRIDES = {
  trashcan: 'trash',
}

export function buildCleaningTypePayload(groups) {
  return groups.reduce((payload, group) => {
    const apiKey = GROUP_KEY_TO_API_KEY[group.key]
    const fields = group.items.reduce((fieldAcc, item) => {
      const rawField = item.id.replace(`${group.key}-`, '')
      const fieldName = FIELD_NAME_OVERRIDES[rawField] ?? rawField
      fieldAcc[fieldName] = item.resolved
      return fieldAcc
    }, {})
    payload[apiKey] = fields
    return payload
  }, {})
}
