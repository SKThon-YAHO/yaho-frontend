import styled from 'styled-components'

export default function RestroomDropdown({ items, onSelect, onSelectAll }) {
  return (
    <Wrapper>
      <AllItem
        onMouseDown={(e) => {
          e.preventDefault()
          onSelectAll()
        }}
      >
        <AllTitle>전체 보기</AllTitle>
        <AllSubtitle>성북구 전체 화장실 데이터</AllSubtitle>
      </AllItem>

      {items.length === 0 ? (
        <Empty>검색 결과가 없습니다</Empty>
      ) : (
        items.map((item) => (
          <Item
            key={item.id}
            onMouseDown={(e) => {
              e.preventDefault()
              onSelect(item)
            }}
          >
            <Name>{item.name}</Name>
            <Address>{item.address}</Address>
          </Item>
        ))
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  z-index: 20;
`

const AllItem = styled.div`
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
  background-color: #f8fafc;
  border-bottom: 1px solid #f1f5f9;

  &:hover {
    background-color: #f1f5f9;
  }
`

const AllTitle = styled.span`
  color: #1e293b;
  font-size: 13px;
  font-weight: 700;
`

const AllSubtitle = styled.span`
  color: #94a3b8;
  font-size: 11px;
`

const Item = styled.div`
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
  }

  & + & {
    border-top: 1px solid #f1f5f9;
  }
`

const Name = styled.span`
  color: #1e293b;
  font-size: 13px;
  font-weight: 600;
`

const Address = styled.span`
  color: #94a3b8;
  font-size: 11px;
`

const Empty = styled.p`
  margin: 0;
  padding: 16px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
`