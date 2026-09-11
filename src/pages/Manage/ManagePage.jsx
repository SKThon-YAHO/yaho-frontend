import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ChevronLeft } from 'lucide-react'
import SearchBar from '../../components/SearchBar'
import RestroomDropdown from '../../components/Search/RestroomDropdown'
import DonutChart from '../../components/Chart/DonutChart'
import SurveyGroupCard from '../../components/Card/SurveyGroupCard'
import { getSurveyGroups, getAggregatedSurveyGroups } from '../../data/surveyDetail'
import { RESTROOMS } from '../../data/restrooms'

export default function ManagePage() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const selectedRestroom = selectedId ? RESTROOMS.find((r) => r.id === selectedId) : null

  const filteredRestrooms = useMemo(() => {
    const q = keyword.trim()
    if (!q) return RESTROOMS
    return RESTROOMS.filter(
      (item) => item.name.includes(q) || item.address.includes(q)
    )
  }, [keyword])

  const handleFocus = () => {
    setKeyword('')
    setIsOpen(true)
  }

  const handleBlur = () => {
    setIsOpen(false)
    setKeyword(selectedRestroom ? selectedRestroom.name : '')
  }

  const handleSelectRestroom = (item) => {
    setSelectedId(item.id)
    setKeyword(item.name)
    setIsOpen(false)
  }

  const handleSelectAll = () => {
    setSelectedId(null)
    setKeyword('')
    setIsOpen(false)
  }

  const { groups, segments, totalItemCount } = useMemo(() => {
    const surveyGroups = selectedId ? getSurveyGroups(selectedId) : getAggregatedSurveyGroups()

    const grandTotal = surveyGroups.reduce(
      (sum, group) => sum + group.items.reduce((s, item) => s + item.count, 0),
      0
    )

    const computedGroups = surveyGroups.map((group) => {
      const sortedItems = [...group.items].sort((a, b) => b.count - a.count)
      const groupCount = sortedItems.reduce((s, item) => s + item.count, 0)
      const itemsWithPercent = sortedItems.map((item) => ({
        ...item,
        percent: grandTotal === 0 ? 0 : Math.round((item.count / grandTotal) * 100),
      }))
      const maxPercent = Math.max(...itemsWithPercent.map((i) => i.percent), 1)
      return {
        ...group,
        count: groupCount,
        percent: grandTotal === 0 ? 0 : Math.round((groupCount / grandTotal) * 100),
        items: itemsWithPercent.map((item) => ({
          ...item,
          widthPercent: (item.percent / maxPercent) * 100,
        })),
      }
    })

    const itemCount = surveyGroups.reduce((sum, group) => sum + group.items.length, 0)

    return {
      groups: computedGroups,
      segments: computedGroups.flatMap((g) =>
        g.items.map((item) => ({ percent: item.percent, color: item.barColor }))
      ),
      totalItemCount: itemCount,
    }
  }, [selectedId])

  return (
    <Page>
      <HeaderRow>
        <ChevronLeft
          size={20}
          strokeWidth={2}
          color="#1E293B"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />
        <Title>설문현황</Title>
      </HeaderRow>

      <SearchWrapper>
        <SearchBar
          value={keyword}
          onChange={setKeyword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="주소를 입력하세요"
        />
        {isOpen && (
          <RestroomDropdown
            items={filteredRestrooms}
            onSelect={handleSelectRestroom}
            onSelectAll={handleSelectAll}
          />
        )}
      </SearchWrapper>

      {!selectedRestroom && <ScopeLabel>지자체 종합 데이터</ScopeLabel>}

      <Summary>
        <DonutChart segments={segments} centerValue={`${totalItemCount}개`} centerLabel="항목" />
        <Legend>
          {groups.map((group) => (
            <LegendRow key={group.key}>
              <Dot $color={group.color} />
              <LegendLabel>{group.label}</LegendLabel>
              <LegendPercent>{group.percent}%</LegendPercent>
            </LegendRow>
          ))}
        </Legend>
      </Summary>

      <GroupList>
        {groups.map((group) => (
          <SurveyGroupCard
            key={group.key}
            label={group.label}
            count={group.count}
            color={group.color}
            cardBg={group.cardBg}
            cardBorder={group.cardBorder}
            items={group.items}
          />
        ))}
      </GroupList>
    </Page>
  )
}

const Page = styled.div`
  flex: 1;
  padding: 0 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Title = styled.span`
  color: #1e293b;
  font-size: 17px;
  font-family: Inter;
  font-weight: 700;
  line-height: 25.5px;
`

const SearchWrapper = styled.div`
  position: relative;
`

const ScopeLabel = styled.span`
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  padding-left: 6px;
`

const Summary = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const Legend = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const LegendRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${({ $color }) => $color};
`

const LegendLabel = styled.span`
  color: #475569;
  font-size: 13px;
  font-family: Inter;
  font-weight: 600;
  line-height: 19.5px;
`

const LegendPercent = styled.span`
  color: #1e293b;
  font-size: 13px;
  font-family: Inter;
  font-weight: 700;
  line-height: 19.5px;
`

const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`