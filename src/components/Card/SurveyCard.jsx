import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ChevronRight } from 'lucide-react'
import DonutChart from '../Chart/DonutChart'
import { fetchToiletsSurvey } from '../../api/toilets'
import { mapAggregatedSurveyGroups, sumSurveyData } from '../../data/surveyDetail'
import { buildSurveyItems } from '../../data/surveyStats'

export default function SurveyCard() {
  const navigate = useNavigate()
  const [surveyItems, setSurveyItems] = useState([])

  useEffect(() => {
    let ignore = false
    fetchToiletsSurvey()
      .then((list) => {
        if (ignore) return
        const combined = sumSurveyData(list.map((t) => t.survey))
        const groups = mapAggregatedSurveyGroups(combined)
        setSurveyItems(groups ? buildSurveyItems(groups) : [])
      })
      .catch(() => {})
    return () => {
      ignore = true
    }
  }, [])

  const { segments, topItems, totalCount } = useMemo(() => {
    const sorted = [...surveyItems].sort((a, b) => b.count - a.count)
    const total = sorted.reduce((sum, item) => sum + item.count, 0)
    const withPercent = sorted.map((item) => ({
      ...item,
      percent: total === 0 ? 0 : Math.round((item.count / total) * 100),
    }))
    return {
      segments: withPercent,
      topItems: withPercent.slice(0, 4),
      totalCount: sorted.length,
    }
  }, [surveyItems])

  return (
    <Card>
      <HeaderRow>
        <TitleGroup>
          <Title>설문현황</Title>
          <Subtitle>이용자 만족도 결과</Subtitle>
        </TitleGroup>
        <ChevronRight
          size={16}
          strokeWidth={2}
          color="#CBD5E1"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/manage')}
        />
      </HeaderRow>

      <Body>
        <DonutChart
          segments={segments}
          centerValue={`${totalCount}개`}
          centerLabel="항목"
        />
        <List>
          {topItems.map((item) => (
            <ListItem key={item.id}>
              <Dot $color={item.color} />
              <ListLabel>
                {item.label} <ListStatus>({item.status})</ListStatus>
              </ListLabel>
              <ListPercent>{item.percent}%</ListPercent>
            </ListItem>
          ))}
        </List>
      </Body>
    </Card>
  )
}

const Card = styled.div`
  width: 100%;
  flex: 1;
  border-radius: 14px;
  border: 1.5px solid #bbf7d0;
  padding: 16px;
  background-color: #f4fdf5;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Title = styled.span`
  color: #1e293b;
  font-size: 17px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  line-height: 25.5px;
`

const Subtitle = styled.span`
  color: #94a3b8;
  font-size: 11px;
  font-family: 'Noto Sans KR';
  font-weight: 400;
  line-height: 16.5px;
`

const Body = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const List = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const Dot = styled.span`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`

const ListLabel = styled.span`
  flex: 1;
  min-width: 0;
  color: #475569;
  font-size: 12px;
  font-family: 'Noto Sans KR';
  font-weight: 400;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ListStatus = styled.span`
  color: #94a3b8;
  font-size: 10px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  line-height: 15px;
`

const ListPercent = styled.span`
  color: #1e293b;
  font-size: 13px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  line-height: 19.5px;
`
