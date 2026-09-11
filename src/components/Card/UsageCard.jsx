import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { User, Calendar, ChevronRight } from 'lucide-react'
import { fetchToiletsUsage } from '../../api/toilets'

export default function UsageCard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ today: 0, monthly: 0 })

  useEffect(() => {
    let ignore = false

    fetchToiletsUsage()
      .then((usage) => {
        if (!ignore) {
          const today = usage.reduce((sum, u) => sum + (u.today_count ?? 0), 0)
          const monthly = usage.reduce((sum, u) => sum + (u.month_count ?? 0), 0)
          setStats({ today, monthly })
        }
      })
      .catch(() => {})

    return () => {
      ignore = true
    }
  }, [])

  return (
    <Card>
      <HeaderRow>
        <TitleGroup>
          <Title>이용현황</Title>
          <Subtitle>오늘 · 이번 달 방문 현황</Subtitle>
        </TitleGroup>
        <ChevronRight
          size={16}
          strokeWidth={2}
          color="#CBD5E1"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/usage')}
        />
      </HeaderRow>

      <StatRow>
        <StatBox>
          <StatLabel>오늘 방문자</StatLabel>
          <StatValue>
            <User size={18} strokeWidth={2} />
            {stats.today.toLocaleString()}명
          </StatValue>
        </StatBox>
        <StatBox>
          <StatLabel>월별 방문자</StatLabel>
          <StatValue>
            <Calendar size={18} strokeWidth={2} />
            {stats.monthly.toLocaleString()}명
          </StatValue>
        </StatBox>
      </StatRow>
    </Card>
  )
}

const Card = styled.div`
  width: 100%;
  flex: 1;
  border-radius: 14px;
  border: 1.5px solid #bfdbfe;
  padding: 16px;
  background-color: #f1f6fe;
  display: flex;
  flex-direction: column;
  gap: 14px;
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
  gap: 2px;
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

const StatRow = styled.div`
  display: flex;
  gap: 10px;
`

const StatBox = styled.div`
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StatLabel = styled.span`
  color: #1e40af;
  font-size: 12px;
  font-family: 'Noto Sans KR';
  font-weight: 400;
  line-height: 18px;
`

const StatValue = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #1e40af;
  font-size: 22px;
  font-family: 'Noto Sans KR';
  font-weight: 800;
  line-height: 33px;
`