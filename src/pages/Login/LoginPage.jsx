import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PrimaryButton from '../../components/PrimaryButton'
import TextField from '../../components/TextField'
import FormError from '../../components/FormError'
import logo from '../../assets/images/qlean-logo.png'
import { login } from '../../api/auth'

const ERROR_MESSAGES = {
  MISSING_REQUIRED_FIELDS: '지자체 코드와 비밀번호를 모두 입력해주세요',
  INVALID_CREDENTIALS: '지자체 코드 또는 비밀번호가 올바르지 않습니다',
  ACCOUNT_DELETED: '삭제된 계정입니다',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [localCode, setLocalCode] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeLocalCode = (e) => {
    setLocalCode(e.target.value)
    if (errorMessage) setErrorMessage('')
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    if (errorMessage) setErrorMessage('')
  }

  const enableInput = (e) => {
    e.target.removeAttribute('readonly')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = await login(localCode, password)
      localStorage.setItem('token', token)
      navigate('/main')
    } catch (err) {
      const code =
        err.response?.data?.error ||
        err.response?.data?.code ||
        err.response?.data?.message
      setErrorMessage(ERROR_MESSAGES[code] || '로그인에 실패했습니다')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <LogoWrapper>
        <Logo src={logo} alt="Qlean" />
      </LogoWrapper>

      <LoginCard>
        <Title>Login</Title>
        <SubTitle>Qlean 지자체 코드로 로그인</SubTitle>

        <Fields onSubmit={handleSubmit} noValidate>
          <TextField
            type="text"
            placeholder="지자체 코드를 입력해주세요"
            value={localCode}
            onChange={handleChangeLocalCode}
            onFocus={enableInput}
            autoComplete="off"
            readOnly
            error={!!errorMessage}
          />
          <TextField
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleChangePassword}
            onFocus={enableInput}
            autoComplete="new-password"
            readOnly
            error={!!errorMessage}
          />

          {errorMessage && <FormError>{errorMessage}</FormError>}

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