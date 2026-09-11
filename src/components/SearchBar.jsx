import styled from 'styled-components'
import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = '검색', onFocus, onBlur }) {
  return (
    <Wrapper>
      <Search size={18} strokeWidth={2} />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #f1f5f9;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 8px;
`

const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: 14px;
  color: #111827;

  &::placeholder {
    color: #9ca3af;
  }
`