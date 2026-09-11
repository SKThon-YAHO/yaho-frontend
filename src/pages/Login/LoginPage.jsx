import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PrimaryButton from '../../components/PrimaryButton'
import TextField from '../../components/TextField'
import FormError from '../../components/FormError'
import logo from '../../assets/images/qlean-logo.png'

// 백엔드 연동 전 임시 계정
const MOCK_USER = {
  id: 'qlean_user@qlean.com',
  password: 'qlean1234',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isLoading) return
    const timer = setTimeout(() => navigate('/main'), 1000)
    return () => clearTimeout(timer)
  }, [isLoading, navigate])

  const handleChangeId = (e) => {
    setId(e.target.value)
    if (isError) setIsError(false)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    if (isError) setIsError(false)
  }

  const enableInput = (e) => {
    e.target.removeAttribute('readonly')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id === MOCK_USER.id && password === MOCK_USER.password) {
      setIsLoading(true)
    } else {
      setIsError(true)
    }
  }

  return (
    <Container>
      <LogoWrapper>
        <Logo src={logo} alt="Qlean" />
      </LogoWrapper>

      <LoginCard>
        <Title>Login</Title>
        <SubTitle>Qlean의 아이디로 로그인</SubTitle>

        <Fields onSubmit={handleSubmit} noValidate>
          <TextField
            type="text"
            placeholder="이메일 또는 아이디"
            value={id}
            onChange={handleChangeId}
            onFocus={enableInput}
            autoComplete="off"
            readOnly
            error={isError}
          />
          <TextField
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleChangePassword}
            onFocus={enableInput}
            autoComplete="new-password"
            readOnly
            error={isError}
          />

          {isError && <FormError>아이디 또는 비밀번호가 올바르지 않습니다</FormError>}

          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </PrimaryButton>
        </Fields>
      </LoginCard>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
`

const LogoWrapper = styled.div`
  padding: 126px 32px 0 34px;
`

const Logo = styled.img`
  width: 100%;
  height: auto;
  display: block;
`

const LoginCard = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Title = styled.h1`
  margin: 0;
  color: #111827;
  font-size: 24px;
  font-weight: 800;
  word-wrap: break-word;
`

const SubTitle = styled.p`
  margin: 0;
  color: #111827;
  font-size: 16px;
  font-weight: 700;
  word-wrap: break-word;
`

const Fields = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`