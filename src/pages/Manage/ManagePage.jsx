import styled from 'styled-components'

export default function ManagePage() {
  return (
    <Content>
      <Title>설문현황</Title>
    </Content>
  )
}

const Content = styled.div`
  padding: 24px 16px;
`

const Title = styled.h1`
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 700;
`
