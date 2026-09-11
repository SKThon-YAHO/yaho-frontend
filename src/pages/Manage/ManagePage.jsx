import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ChevronLeft } from 'lucide-react'
import SearchBar from '../../components/SearchBar'
import RestroomDropdown from '../../components/Search/RestroomDropdown'
import DonutChart from '../../components/Chart/DonutChart'
import SurveyGroupCard from '../../components/Card/SurveyGroupCard'
import {
  getAggregatedSurveyGroups,
  mapAggregatedSurveyGroups,
  sumSurveyData,
} from '../../data/surveyDetail'
import { fetchToilets, fetchToiletsSurvey } from '../../api/toilets'

export default function ManagePage() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [restrooms, setRestrooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    Promise.all([fetchToilets(), fetchToiletsSurvey()])
      .then(([toiletList, surveyList]) => {
        if (ignore) return
        const surveyByCode = new Map(surveyList.map((t) => [t.toilet_code, t.survey]))
        const merged = toiletList.map((t) => ({
          id: t.toilet_code,
          name: t.name,
          address: t.locate,
          survey: surveyByCode.get(t.toilet_code) || null,
        }))
        setRestrooms(merged)
      })
      .catch(() => {})
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

  const selectedRestroom = selectedId ? restrooms.find((r) => r.id === selectedId) : null

  const filteredRestrooms = useMemo(() => {
    const q = keyword.trim()
    if (!q) return restrooms
    return restrooms.filter(
      (item) => item.name.includes(q) || (item.address ?? '').includes(q)
    )
  }, [keyword, restrooms])

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
    let surveyData = null
    if (selectedRestroom) {
      surveyData = selectedRestroom.survey
    } else if (restrooms.length > 0) {
      surveyData = sumSurveyData(restrooms.map((r) => r.survey))
    }

    const surveyGroups = mapAggregatedSurveyGroups(surveyData) || getAggregatedSurveyGroups()

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
  }, [selectedRestroom, restrooms])

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

      {isLoading ? (
        <Empty>불러오는 중...</Empty>
      ) : (
        <>
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
        </>
      )}
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

const Empty = styled.div`
  padding: 40px 0;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
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
