import client from './client'

export async function postCleaning(toiletCode, cleaningType) {
  const { data } = await client.post(`/api/manage/${toiletCode}/cleaning`, {
    cleaning_type: cleaningType,
  })
  return data
}
