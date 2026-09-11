import client from './client'

export async function fetchToilets() {
  const { data } = await client.get('/api/users/toilets')
  return data.data
}

export async function fetchToiletsUsage() {
  const { data } = await client.get('/api/users/toilets/usage')
  return data.data
}
