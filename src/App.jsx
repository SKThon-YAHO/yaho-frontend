import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import LoginPage from './pages/Login/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Viewport>
        <MobileFrame>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </MobileFrame>
      </Viewport>
    </BrowserRouter>
  )
}

export default App

/* 데스크톱에서도 Figma 프레임(361 x 770) 크기로 가운데 표시 */
const Viewport = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MobileFrame = styled.div`
  width: 361px;
  height: 770px;
  flex-shrink: 0;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`