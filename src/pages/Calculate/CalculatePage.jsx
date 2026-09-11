import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import RestroomSettlementCard from '../../components/Card/RestroomSettlementCard'
import {
  computeSettlement,
  sumSurveyCount,
  getNextSettlementDate,
} from '../../data/settlementDetail'
import { fetchToilets, fetchToiletsUsage, fetchToiletsSurvey } from '../../api/toilets'

export default function CalculatePage() {
  const navigate = useNavigate()
  const now = new Date()
  const [rawData, setRawData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    Promise.all([fetchToilets(), fetchToiletsUsage(), fetchToiletsSurvey()])
      .then(([toiletList, usageList, surveyList]) => {
        if (ignore) return
        const usageByCode = new Map(usageList.map((u) => [u.toilet_code, u.month_count]))
        const surveyByCode = new Map(surveyList.map((s) => [s.toilet_code, s.survey]))
        const merged = toiletList.map((t) => ({
          id: t.toilet_code,
          name: t.name,
          totalCount: usageByCode.get(t.toilet_code) ?? 0,
          surveyCount: sumSurveyCount(surveyByCode.get(t.toilet_code)),
        }))
        setRawData(merged)
      })
      .catch(() => {})
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [])

  const { restrooms, summary } = useMemo(() => {
    const computed = rawData.map((restroom) => ({
      ...restroom,
      ...computeSettlement(restroom.totalCount, restroom.surveyCount),
    }))

    const totalAmount = computed.reduce((sum, r) => sum + r.totalAmount, 0)
    const totalCount = computed.reduce((sum, r) => sum + r.totalCount, 0)

    return {
      restrooms: computed,
      summary: {
        totalAmount,
        totalCount,
        restroomCount: computed.length,
        nextDate: getNextSettlementDate(),
      },
    }
  }, [rawData])

  return (
    <Page>
      <HeaderRow>
        <ChevronLeft
          size={20}
          strokeWidth={2}
          color="#3B1F7A"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(-1)}
        />
        <Title>정산현황</Title>
      </HeaderRow>

      <SummaryCard>
        <AmountBlock>
          <DateLabel>
            {now.getFullYear()}년 {now.getMonth() + 1}월 · 총 정산 금액
          </DateLabel>
          <AmountRow>
            <Amount>{summary.totalAmount.toLocaleString()}</Amount>
            <Unit>원</Unit>
          </AmountRow>
        </AmountBlock>

        <StatRow>
          <StatBox>
            <StatLabel>화장실 수</StatLabel>
            <StatValue>{summary.restroomCount}개소</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>총 이용 건수</StatLabel>
            <StatValue>{summary.totalCount}건</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>정산 예정일</StatLabel>
            <StatValue>{summary.nextDate}</StatValue>
          </StatBox>
        </StatRow>
      </SummaryCard>

      {isLoading ? (
        <Empty>불러오는 중...</Empty>
      ) : (
        <CardList>
          {restrooms.map((restroom) => (
            <RestroomSettlementCard key={restroom.id} {...restroom} />
          ))}
        </CardList>
      )}

      <Notice>
        <AlertCircle size={13} strokeWidth={2} color="#B09ED8" />
        매월 1일 기준으로 금액이 초기화됩니다.
      </Notice>
    </Page>
  )
}

const Page = styled.div`
  flex: 1;
  padding: 0 20px 24px;
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
  color: #3b1f7a;
  font-size: 17px;
  font-family: Inter;
  font-weight: 700;
  line-height: 25.5px;
`

const SummaryCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #ede6ff;
  border-radius: 20px;
  box-shadow: 0 0 24px 4px #faf9fd;
  padding: 18px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const AmountBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const DateLabel = styled.span`
  color: #94a3b8;
  font-size: 11px;
  font-family: Inter;
  font-weight: 400;
  line-height: 16.5px;
`

const AmountRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
`

const Amount = styled.span`
  color: #6b35d0;
  font-size: 32px;
  font-family: Inter;
  font-weight: 800;
  line-height: 48px;
`

const Unit = styled.span`
  color: #9b7dcc;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 24px;
`

const StatRow = styled.div`
  display: flex;
  gap: 8px;
`

const StatBox = styled.div`
  flex: 1;
  background-color: #f1f5f9;
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

const StatLabel = styled.span`
  color: #94a3b8;
  font-size: 9px;
  font-family: Inter;
  font-weight: 400;
  line-height: 13.5px;
`

const StatValue = styled.span`
  color: #334155;
  font-size: 12px;
  font-family: Inter;
  font-weight: 700;
  line-height: 18px;
`

const Empty = styled.div`
  padding: 40px 0;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Notice = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #b09ed8;
  font-size: 11px;
  font-family: Inter;
  font-weight: 400;
  line-height: 16.5px;
`
