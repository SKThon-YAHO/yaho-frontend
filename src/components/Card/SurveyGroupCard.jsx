import styled from 'styled-components'
import ProgressRow from '../Chart/ProgressRow'

export default function SurveyGroupCard({ label, count, color, cardBg, cardBorder, items }) {
  return (
    <Card $bg={cardBg} $border={cardBorder}>
      <Header $color={color}>
        <HeaderLabel>{label}</HeaderLabel>
        <HeaderCount>({count}회)</HeaderCount>
      </Header>
      <ItemList>
        {items.map((item) => (
            <ProgressRow
                key={item.label}
                label={item.label}
                percent={item.percent}
                count={item.count}
                color={item.barColor}
                widthPercent={item.widthPercent}
            />
        ))}
    </ItemList>
    </Card>
  )
}

const Card = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  display: flex;
  flex-direction: column;
  gap: 13px;
`

const Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: ${({ $color }) => $color};
`

const HeaderLabel = styled.span`
  font-size: 11px;
  font-family: Inter;
  font-weight: 700;
  line-height: 16.5px;
`

const HeaderCount = styled.span`
  font-size: 11px;
  font-family: Inter;
  font-weight: 400;
  line-height: 16.5px;
`

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`