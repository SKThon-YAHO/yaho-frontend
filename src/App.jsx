import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Layout from './layout/Layout'
import LoginPage from './pages/Login/LoginPage'
import MainPage from './pages/Main/MainPage'
import UsageStatusPage from './pages/Usage-status/UsageStatusPage'
import ManagePage from './pages/Manage/ManagePage'
import CalculatePage from './pages/Calculate/CalculatePage'
import ReportPage from './pages/Report/ReportPage'
import MyPage from './pages/My/MyPage'

function App() {
  return (
    <BrowserRouter>
      <Viewport>
        <MobileFrame>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/usage" element={<UsageStatusPage />} />
              <Route path="/manage" element={<ManagePage />} />
              <Route path="/calculate" element={<CalculatePage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/my" element={<MyPage />} />
            </Route>
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
  overflow: hidden;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`
