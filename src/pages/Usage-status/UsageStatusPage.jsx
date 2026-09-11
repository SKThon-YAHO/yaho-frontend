import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../../components/SearchBar'
import RestroomCard from '../../components/Card/RestroomCard'
import { fetchToilets, fetchToiletsUsage } from '../../api/toilets'

export default function UsageStatusPage() {
  const [query, setQuery] = useState('')
  const [restrooms, setRestrooms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function load() {
      setIsLoading(true)
      setError('')
      try {
        const [toilets, usage] = await Promise.all([fetchToilets(), fetchToiletsUsage()])
        const usageMap = new Map(
          usage.map((u) => [u.toilet_code, { daily: u.today_count, monthly: u.month_count }])
        )
        const merged = toilets.map((t) => {
          const u = usageMap.get(t.toilet_code) ?? { daily: 0, monthly: 0 }
          return {
            code: t.toilet_code,
            name: t.name,
            address: t.locate,
            daily: u.daily,
            monthly: u.monthly,
          }
        })
        if (!ignore) setRestrooms(merged)
      } catch (err) {
        if (!ignore) setError('화장실 정보를 불러오지 못했습니다')
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    load()
    return () => {
      ignore = true
    }
  }, [])

  const keyword = query.trim()
  const filtered = useMemo(() => {
    if (!keyword) return restrooms
    return restrooms.filter(
      (item) => item.name.includes(keyword) || item.address.includes(keyword)
    )
  }, [restrooms, keyword])

  return (
    <Container>
      <SearchSection>
        <SearchBar value={query} onChange={setQuery} placeholder="화장실 이름 또는 주소 검색" />
      </SearchSection>

      <List>
        {isLoading && <Empty>불러오는 중...</Empty>}
        {!isLoading && error && <Empty>{error}</Empty>}
        {!isLoading &&
          !error &&
          filtered.map((item) => (
            <RestroomCard
              key={item.code}
              name={item.name}
              address={item.address}
              daily={item.daily}
              monthly={item.monthly}
            />
          ))}
        {!isLoading && !error && filtered.length === 0 && <Empty>검색 결과가 없습니다</Empty>}
      </List>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchSection = styled.div`
  padding: 12px 16px;
`

const List = styled.div`
  padding: 4px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Empty = styled.p`
  margin: 40px 0 0;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
`
