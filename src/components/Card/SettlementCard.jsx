import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ChevronRight, AlertCircle } from 'lucide-react'
import { SETTLEMENT } from '../../data/settlement'

export default function SettlementCard() {
  const navigate = useNavigate()

  return (
    <Card>
      <HeaderRow>
        <Title>정산현황</Title>
        <ChevronRight
          size={16}
          strokeWidth={2}
          color="#CBD5E1"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/calculate')}
        />
      </HeaderRow>

      <Body>
        <Amount>
          {SETTLEMENT.amount.toLocaleString()}
          <Unit>원</Unit>
        </Amount>

        <StatRow>
          <StatBox>
            <StatLabel>건당 단가</StatLabel>
            <StatValue>{SETTLEMENT.unitPrice.toLocaleString()}원</StatValue>
          </StatBox>
          <StatBox>
            <StatLabel>청소 건수</StatLabel>
            <StatValue>{SETTLEMENT.count.toLocaleString()}건</StatValue>
          </StatBox>
        </StatRow>

        <Notice>
          <AlertCircle size={12} strokeWidth={2} />
          매월 1일 기준으로 금액이 초기화됩니다.
        </Notice>
      </Body>
    </Card>
  )
}

const Card = styled.div`
  width: 100%;
  flex: 1;
  border-radius: 14px;
  border: 1.5px solid #e9d5ff;
  background-color: #faf5ff;
  display: flex;
  flex-direction: column;
`

const HeaderRow = styled.div`
  padding: 14px 16px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const Title = styled.span`
  color: #1e293b;
  font-size: 17px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  line-height: 25.5px;
`

const Body = styled.div`
  padding: 0 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Amount = styled.p`
  margin: 0;
  text-align: center;
  color: #6d28d9;
  font-family: 'Noto Sans KR';
  font-size: 30px;
  font-weight: 800;
  line-height: 45px;
`

const Unit = styled.span`
  margin-left: 4px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`

const StatRow = styled.div`
  display: flex;
  gap: 8px;
`

const StatBox = styled.div`
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  background-color: #f3e8ff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StatLabel = styled.span`
  color: #a78bfa;
  font-size: 10px;
  font-family: 'Noto Sans KR';
  font-weight: 400;
  line-height: 15px;
`

const StatValue = styled.span`
  color: #6d28d9;
  font-size: 16px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  line-height: 24px;
`

const Notice = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #a78bfa;
  font-size: 11px;
`