import styled from 'styled-components'

export default function ProgressRow({ label, percent, count, color, widthPercent }) {
  return (
    <Row>
      <TopLine>
        <Label>{label}</Label>
        <RightGroup>
          <Percent>{percent}%</Percent>
          <Count>({count}회)</Count>
        </RightGroup>
      </TopLine>
      <Track>
        <Fill style={{ width: `${widthPercent}%`, backgroundColor: color }} />
      </Track>
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const TopLine = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const Label = styled.span`
  color: #334155;
  font-size: 11px;
  font-family: Inter;
  font-weight: 400;
  line-height: 16.5px;
`

const RightGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`

const Percent = styled.span`
  color: #1e293b;
  font-size: 11px;
  font-family: Inter;
  font-weight: 700;
  line-height: 16.5px;
`

const Count = styled.span`
  color: #94a3b8;
  font-size: 10px;
  font-family: Inter;
  font-weight: 400;
  line-height: 15px;
`

const Track = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 99px;
  background-color: #e2e8f0;
  overflow: hidden;
`

const Fill = styled.div`
  height: 100%;
  border-radius: 99px;
`