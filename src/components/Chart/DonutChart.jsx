import styled from 'styled-components'

export default function DonutChart({ segments, centerValue, centerLabel }) {
  let cursor = 0
  const stops = segments.map((seg) => {
    const start = cursor
    const end = cursor + seg.percent
    cursor = end
    return `${seg.color} ${start}% ${end}%`
  })
  if (cursor < 100) {
    stops.push(`#E5E7EB ${cursor}% 100%`)
  }

  return (
    <Ring style={{ backgroundImage: `conic-gradient(${stops.join(', ')})` }}>
      <Center>
        <CenterValue>{centerValue}</CenterValue>
        <CenterLabel>{centerLabel}</CenterLabel>
      </Center>
    </Ring>
  )
}

const Ring = styled.div`
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Center = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CenterValue = styled.span`
  color: #1e293b;
  font-size: 14px;
  font-weight: 800;
`

const CenterLabel = styled.span`
  color: #94a3b8;
  font-size: 10px;
`
