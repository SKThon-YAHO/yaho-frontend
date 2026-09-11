import styled from 'styled-components'
import qleanLogo from '../../assets/images/headerqlean-logo.svg'

export default function Header() {
  return (
    <Wrapper>
      <Logo src={qleanLogo} alt="Qlean" />
    </Wrapper>
  )
}        

const Wrapper = styled.header`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`

const Logo = styled.img`
  height: 40px;
  width: auto;
`