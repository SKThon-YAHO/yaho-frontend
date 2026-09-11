import client from './client'

export async function fetchTotalStats() {
  const { data } = await client.get('/api/users/total')
  return data.data
}