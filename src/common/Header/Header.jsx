import styled from 'styled-components'
import logo from '../../assets/images/qlean-logo.png'

export default function Header() {
  return (
    <Wrapper>
      <Logo src={logo} alt="Qlean" />
    </Wrapper>
  )
}

const Wrapper = styled.header`
  height: 72px;
  padding: 16px 16px 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`

const Logo = styled.img`
  height: 28px;
  width: auto;
`
