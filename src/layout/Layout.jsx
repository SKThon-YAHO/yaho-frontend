import { Outlet, useLocation } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import Header from '../common/Header/Header'
import Footer from '../common/Footer/Footer'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <Container>
      <Header />
      <Content>
        <Page key={pathname}>
          <Outlet />
        </Page>
      </Content>
      <Footer />
    </Container>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`

const Content = styled.main`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Page = styled.div`
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.35s ease-out;
`