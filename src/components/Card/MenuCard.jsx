import styled from 'styled-components'

export default function MenuCard({ title, onClick }) {
  return (
    <Card type="button" onClick={onClick}>
      <Title>{title}</Title>
    </Card>
  )
}

const Card = styled.button`
  width: 100%;
  flex: 1;
  min-height: 0;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background-color: #ffffff;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f9fafb;
  }

  &:active {
    background-color: #f3f4f6;
  }
`

const Title = styled.span`
  color: #111827;
  font-size: 18px;
  font-weight: 700;
`
