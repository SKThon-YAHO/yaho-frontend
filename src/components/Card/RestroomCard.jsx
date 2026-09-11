import styled from 'styled-components'

export default function RestroomCard({ name, address, daily, monthly }) {
  return (
    <Card>
      <Name>{name}</Name>
      <Address>{address}</Address>
      <Stats>
        <Stat>
          <StatLabel>일별 이용자수</StatLabel>
          <StatValue>{daily.toLocaleString()}명</StatValue>
        </Stat>
        <Stat>
          <StatLabel>월별 이용자수</StatLabel>
          <StatValue>{monthly.toLocaleString()}명</StatValue>
        </Stat>
      </Stats>
    </Card>
  )
}

const Card = styled.div`
  width: 100%;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Name = styled.p`
  margin: 0;
  color: #111827;
  font-size: 16px;
  font-weight: 700;
`

const Address = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 13px;
`

const Stats = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
`

const Stat = styled.div`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const StatLabel = styled.span`
  color: #6b7280;
  font-size: 12px;
`

const StatValue = styled.span`
  color: #111827;
  font-size: 16px;
  font-weight: 700;
`
