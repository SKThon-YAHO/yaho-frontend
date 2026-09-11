import styled from 'styled-components'

export default function MyPage() {
  return (
    <Content>
      <Title>My</Title>
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
