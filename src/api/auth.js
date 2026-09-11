import client from './client'

export async function login(localCode, password) {
  const { data } = await client.post('/api/auth/login', {
    local_code: localCode,
    password,
  })
  return data.data.token
}