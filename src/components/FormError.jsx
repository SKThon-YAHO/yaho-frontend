import styled from 'styled-components'
import { CircleAlert } from 'lucide-react'

export default function FormError({ children }) {
  return (
    <Message>
      <CircleAlert size={14} strokeWidth={2.2} />
      {children}
    </Message>
  )
}

const Message = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: -4px 0 0;
  color: #ef4444;
  font-size: 12px;
  font-weight: 600;
  word-wrap: break-word;
`
