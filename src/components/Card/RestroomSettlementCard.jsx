import styled from 'styled-components'
import { BASE_RATE, EXCESS_RATE } from '../../data/settlementDetail'

export default function RestroomSettlementCard({
  name,
  totalCount,
  baseCount,
  excessCount,
  baseAmount,
  excessAmount,
  totalAmount,
}) {
  const hasExcess = excessCount > 0

  return (
    <Card>
      <HeaderRow>
        <TitleGroup>
          <Name>{name}</Name>
          <CountBadge>총 {totalCount}건</CountBadge>
        </TitleGroup>
        <TotalAmount>{totalAmount.toLocaleString()}원</TotalAmount>
      </HeaderRow>

      <DetailBox>
        <DetailRow>
          <Left>
            <Badge $variant="base">기본</Badge>
            <Label>
              {BASE_RATE.toLocaleString()}원 × {baseCount}건
            </Label>
          </Left>
          <Amount>{baseAmount.toLocaleString()}원</Amount>
        </DetailRow>

        <DetailRow>
          <Left>
            <Badge $variant={hasExcess ? 'excess' : 'excessDisabled'}>초과</Badge>
            <Label $muted={!hasExcess}>
              {EXCESS_RATE.toLocaleString()}원 × {excessCount}건
            </Label>
          </Left>
          <Amount $muted={!hasExcess}>
            {hasExcess ? `${excessAmount.toLocaleString()}원` : '—'}
          </Amount>
        </DetailRow>
      </DetailBox>
    </Card>
  )
}

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ede6ff;
  border-radius: 16px;
  box-shadow: 0 0 24px 4px #faf9fd;
  overflow: hidden;
`

const HeaderRow = styled.div`
  padding: 12px 14px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`

const Name = styled.span`
  color: #1e293b;
  font-size: 14px;
  font-family: Inter;
  font-weight: 700;
  line-height: 21px;
`

const CountBadge = styled.span`
  padding: 1px 6px;
  background-color: #f1f5f9;
  border-radius: 5px;
  color: #64748b;
  font-size: 10px;
  font-family: Inter;
  font-weight: 600;
  line-height: 15px;
`

const TotalAmount = styled.span`
  color: #6b35d0;
  font-size: 15px;
  font-family: Inter;
  font-weight: 800;
  line-height: 22.5px;
`

const DetailBox = styled.div`
  margin: 0 14px 14px;
  padding: 10px 12px;
  background-color: #f8fafc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Badge = styled.span`
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-family: Inter;
  font-weight: 700;
  line-height: 15px;
  background-color: ${({ $variant }) =>
    $variant === 'base' ? '#6B35D0' : $variant === 'excess' ? '#A78BFA' : '#E2E8F0'};
  color: ${({ $variant }) => ($variant === 'excessDisabled' ? '#94A3B8' : '#ffffff')};
`

const Label = styled.span`
  color: ${({ $muted }) => ($muted ? '#94a3b8' : '#1e293b')};
  font-size: 13px;
  font-family: Inter;
  font-weight: 600;
  line-height: 19.5px;
`

const Amount = styled.span`
  color: ${({ $muted }) => ($muted ? '#94a3b8' : '#1e293b')};
  font-size: 13px;
  font-family: Inter;
  font-weight: 800;
  line-height: 19.5px;
`