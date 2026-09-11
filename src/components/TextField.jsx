import styled from 'styled-components'

export default function TextField({ error = false, ...props }) {
  return <Input $error={error} {...props} />
}

const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border: 1px solid ${({ $error }) => ($error ? '#EF4444' : '#E5E7EB')};
  border-radius: 12px;
  background-color: #ffffff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  color: #111827;
  outline: none;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: ${({ $error }) => ($error ? '#EF4444' : '#4B5BE0')};
  }
`
