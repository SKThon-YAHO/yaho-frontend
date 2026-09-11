export const FIELD_KEY_LABELS = {
  'clean.toilet': '대변기 청결',
  'clean.urinal': '소변기 청결',
  'clean.sink': '세면대 청결',
  'clean.floor': '바닥 청결',
  'break.toilet': '대변기 파손',
  'break.urinal': '소변기 파손',
  'break.sink': '세면대 파손',
  'break.door': '문 파손',
  'item.soap': '비누 부족',
  'item.paper': '휴지 부족',
  'item.trash': '쓰레기통 가득참',
}

const FIELD_KEY_PATTERN = /\b(clean|break|item)\.(toilet|urinal|sink|floor|door|soap|paper|trash)\b/g

export function translateFieldKeys(text) {
  return text.replace(FIELD_KEY_PATTERN, (match) => FIELD_KEY_LABELS[match] ?? match)
}