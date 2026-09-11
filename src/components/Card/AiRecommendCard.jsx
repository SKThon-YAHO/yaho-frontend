import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchInsight } from '../../api/insights'
import { translateFieldKeys } from '../../data/fieldLabels'

export default function AiRecommendCard() {
  const [insight, setInsight] = useState(null)

  useEffect(() => {
    let ignore = false
    fetchInsight()
      .then((data) => {
        if (ignore) return
        setInsight(data)
      })
      .catch(() => {})
    return () => {
      ignore = true
    }
  }, [])

  if (!insight) return null

  const translated = translateFieldKeys(insight.insight)
  const parts = translated.split(/(\{[^}]*\})/g).filter(Boolean)

  return (
    <Card>
      <Title>AI 관리 추천</Title>
      <Body>
        {parts.map((part, i) =>
          part.startsWith('{') && part.endsWith('}') ? (
            <Highlight key={i}>{part.slice(1, -1)}</Highlight>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </Body>
    </Card>
  )
}

const Card = styled.div`
  width: 100%;
  border-radius: 14px;
  border: 1.5px solid #fef08a;
  background-color: #fefce8;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
`

const Title = styled.span`
  color: #1e293b;
  font-size: 17px;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  line-height: 25.5px;
`

const Body = styled.p`
  margin: 0;
  color: #1e293b;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-break: keep-all;
`

const Highlight = styled.span`
  background-color: #fef08a;
`
