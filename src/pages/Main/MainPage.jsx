import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MenuCard from '../../components/Card/MenuCard'

const MENUS = [
  { title: '이용현황', path: '/usage' },
  { title: '설문현황', path: '/manage' },
  { title: '정산', path: '/calculate' },
]

export default function MainPage() {
  const navigate = useNavigate()

  return (
    <CardList>
      {MENUS.map((menu) => (
        <MenuCard key={menu.path} title={menu.title} onClick={() => navigate(menu.path)} />
      ))}
    </CardList>
  )
}

const CardList = styled.div`
  flex: 1;
  padding: 12px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
