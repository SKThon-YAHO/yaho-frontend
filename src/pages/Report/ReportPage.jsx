import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Check } from 'lucide-react'
import SearchBar from '../../components/SearchBar'
import RestroomDropdown from '../../components/Search/RestroomDropdown'
import { fetchToilets } from '../../api/toilets'
import { postCleaning } from '../../api/manage'
import { REPORT_GROUPS, buildCleaningTypePayload } from '../../data/reportIssues'

const createInitialGroups = () =>
  REPORT_GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item })),
  }))

export default function ReportPage() {
  const [keyword, setKeyword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [restrooms, setRestrooms] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [submitStatus, setSubmitStatus] = useState('idle') // 'idle' | 'submitting' | 'done'
  const [toastMessage, setToastMessage] = useState('')

  const submitTokenRef = useRef(0)
  const toastTimeoutRef = useRef(null)

  const [groups, setGroups] = useState(createInitialGroups)

  useEffect(() => {
    let ignore = false
    fetchToilets()
      .then((list) => {
        if (!ignore) {
          setRestrooms(
            list.map((t) => ({ id: t.toilet_code, name: t.name, address: t.locate }))
          )
        }
      })
      .catch(() => {})
    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  const filteredRestrooms = useMemo(() => {
    const q = keyword.trim()
    if (!q) return restrooms
    return restrooms.filter(
      (item) => item.name.includes(q) || (item.address ?? '').includes(q)
    )
  }, [keyword, restrooms])

  const resetSubmitState = () => {
    submitTokenRef.current += 1
    setSubmitStatus('idle')
  }

  const handleFocus = () => {
    setKeyword('')
    setIsOpen(true)
  }

  const handleBlur = () => {
    setIsOpen(false)
    const selected = restrooms.find((r) => r.id === selectedId)
    setKeyword(selected ? selected.name : '')
  }

  const handleSelectRestroom = (item) => {
    setSelectedId(item.id)
    setKeyword(item.name)
    setIsOpen(false)
    resetSubmitState()
    setGroups(createInitialGroups())
  }

  const handleSelectAll = () => {
    setSelectedId(null)
    setKeyword('')
    setIsOpen(false)
    resetSubmitState()
    setGroups(createInitialGroups())
  }

  const toggleItem = (groupKey, itemId) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.key === groupKey
          ? {
              ...group,
              items: group.items.map((item) =>
                item.id === itemId ? { ...item, resolved: !item.resolved } : item
              ),
            }
          : group
      )
    )
  }

  const resolvedCount = useMemo(
    () => groups.reduce((sum, group) => sum + group.items.filter((item) => item.resolved).length, 0),
    [groups]
  )

  const showToast = (message) => {
    setToastMessage(message)
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => setToastMessage(''), 1800)
  }

  const handleSubmit = async () => {
    if (submitStatus !== 'idle') return

    if (!selectedId) {
      showToast('화장실을 선택해주세요')
      return
    }

    if (resolvedCount === 0) {
      showToast('관리 항목 체크해주세요')
      return
    }

    const token = ++submitTokenRef.current
    setSubmitStatus('submitting')

    try {
      await postCleaning(selectedId, buildCleaningTypePayload(groups))
      if (submitTokenRef.current === token) {
        setSubmitStatus('done')
      }
    } catch (err) {
      if (submitTokenRef.current === token) {
        setSubmitStatus('idle')
        showToast('제출에 실패했습니다. 다시 시도해주세요')
      }
    }
  }

  return (
    <Page>
      <Title>관리현황</Title>

      <SearchWrapper>
        <SearchBar
          value={keyword}
          onChange={setKeyword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="화장실 주소를 입력하세요"
        />
        {isOpen && (
          <RestroomDropdown
            items={filteredRestrooms}
            onSelect={handleSelectRestroom}
            onSelectAll={handleSelectAll}
          />
        )}
      </SearchWrapper>

      <GroupList>
        {groups.map((group) => (
          <GroupCard key={group.key} $bg={group.cardBg} $border={group.cardBorder}>
            <GroupLabel $color={group.color}>{group.label}</GroupLabel>
            <ItemList>
              {group.items.map((item) => (
                <ItemRow key={item.id} $resolved={item.resolved} $checkedBg={group.checkedBg}>
                  <Checkbox
                    type="button"
                    $checked={item.resolved}
                    onClick={() => toggleItem(group.key, item.id)}
                  >
                    {item.resolved && <Check size={12} strokeWidth={3} color="#ffffff" />}
                  </Checkbox>
                  <ItemTextGroup>
                    <ItemLabel
                      $color={group.color}
                      $bg={item.resolved ? group.pillCheckedBg : group.pillBg}
                    >
                      {item.label}
                    </ItemLabel>
                    <ItemDescription $resolved={item.resolved}>
                      {item.description}
                    </ItemDescription>
                  </ItemTextGroup>
                  <StatusBadge $resolved={item.resolved}>
                    {item.resolved ? '해결' : '미해결'}
                  </StatusBadge>
                </ItemRow>
              ))}
            </ItemList>
          </GroupCard>
        ))}
      </GroupList>

      <SubmitButton
        type="button"
        $status={submitStatus}
        disabled={submitStatus !== 'idle'}
        onClick={handleSubmit}
      >
        {submitStatus === 'submitting'
          ? '제출 중...'
          : submitStatus === 'done'
            ? '✓ 제출 완료'
            : `청소 완료 제출 (${resolvedCount}건 해결)`}
      </SubmitButton>

      {toastMessage && <Toast>{toastMessage}</Toast>}
    </Page>
  )
}

const Page = styled.div`
  position: relative;
  flex: 1;
  padding: 0 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Title = styled.h1`
  margin: 0;
  color: #1e293b;
  font-size: 18px;
  font-family: Inter;
  font-weight: 700;
  line-height: 27px;
`

const SearchWrapper = styled.div`
  position: relative;
`

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const GroupCard = styled.div`
  border-radius: 16px;
  border: 1.5px solid ${({ $border }) => $border};
  background-color: ${({ $bg }) => $bg};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const GroupLabel = styled.span`
  padding-left: 2px;
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-family: Inter;
  font-weight: 700;
  line-height: 18px;
`

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

const ItemRow = styled.div`
  background-color: ${({ $resolved, $checkedBg }) => ($resolved ? $checkedBg : '#ffffff')};
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Checkbox = styled.button`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1.5px solid ${({ $checked }) => ($checked ? '#22C55E' : '#CBD5E1')};
  background-color: ${({ $checked }) => ($checked ? '#22C55E' : '#ffffff')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
`

const ItemTextGroup = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ItemLabel = styled.span`
  align-self: flex-start;
  padding: 1px 8px;
  border-radius: 5px;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  font-size: 11px;
  font-family: Inter;
  font-weight: 600;
  line-height: 16.5px;
`

const ItemDescription = styled.p`
  margin: 0;
  color: #475569;
  font-size: 12px;
  font-family: Inter;
  font-weight: 400;
  line-height: 18px;
  text-decoration: ${({ $resolved }) => ($resolved ? 'line-through' : 'none')};
`

const StatusBadge = styled.span`
  flex-shrink: 0;
  padding: 3px 8px;
  border-radius: 6px;
  background-color: ${({ $resolved }) => ($resolved ? '#DCFCE7' : '#FEF3C7')};
  color: ${({ $resolved }) => ($resolved ? '#22C55E' : '#F59E0B')};
  font-size: 10px;
  font-family: Inter;
  font-weight: 600;
  line-height: 15px;
`

const SubmitButton = styled.button`
  margin-top: 4px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 14px;
  background-color: ${({ $status }) =>
    $status === 'submitting' ? '#6B35D0' : $status === 'done' ? '#22C55E' : '#0F172A'};
  color: #ffffff;
  font-size: 15px;
  font-family: Inter;
  font-weight: 700;
  line-height: 22.5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    cursor: default;
  }
`

const Toast = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(15, 23, 42, 0.9);
  color: #ffffff;
  font-size: 13px;
  font-family: Inter;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 10px;
  z-index: 50;
  pointer-events: none;
  white-space: nowrap;
`