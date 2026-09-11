import { useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../../components/SearchBar'
import RestroomCard from '../../components/Card/RestroomCard'
import { RESTROOMS } from '../../data/restrooms'

export default function UsageStatusPage() {
  const [query, setQuery] = useState('')

  const keyword = query.trim()
  const filtered = keyword
    ? RESTROOMS.filter(
        (item) => item.name.includes(keyword) || item.address.includes(keyword),
      )
    : RESTROOMS

  return (
    <Container>
      <SearchSection>
        <SearchBar value={query} onChange={setQuery} placeholder="화장실 이름 또는 주소 검색" />
      </SearchSection>

      <List>
        {filtered.map((item) => (
          <RestroomCard
            key={item.id}
            name={item.name}
            address={item.address}
            daily={item.daily}
            monthly={item.monthly}
          />
        ))}
        {filtered.length === 0 && <Empty>검색 결과가 없습니다</Empty>}
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
