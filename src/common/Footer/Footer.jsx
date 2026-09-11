import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ShieldCheck, House, User } from 'lucide-react'

const TABS = [
  { label: '관리', path: '/report', Icon: ShieldCheck },
  { label: '메인', path: '/main', Icon: House },
  { label: '마이페이지', path: '/my', Icon: User },
]

export default function Footer() {
  return (
    <Wrapper>
      {TABS.map(({ label, path, Icon }) => (
        <Tab key={path} to={path} draggable={false}>
          <Icon size={22} strokeWidth={2} />
          <Label>{label}</Label>
        </Tab>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  height: 64px;
  flex-shrink: 0;
  background-color: #ffffff;
  display: flex;
  user-select: none;
`

const Tab = styled(NavLink)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #9ca3af;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;

  &.active {
    color: #111827;
  }
`

const Label = styled.span`
  font-size: 11px;
  font-weight: 600;
` 