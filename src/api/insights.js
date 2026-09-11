import client from './client'

export async function fetchInsight() {
  const { data } = await client.get('/api/users/insights')
  return data.data
}
