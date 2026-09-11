import styled from 'styled-components'
import UsageCard from '../../components/Card/UsageCard'
import SurveyCard from '../../components/Card/SurveyCard'
import SettlementCard from '../../components/Card/SettlementCard'

export default function MainPage() {
  return (
    <CardList>
      <UsageCard />
      <SurveyCard />
      <SettlementCard />
    </CardList>
  )
}

const CardList = styled.div`
  flex: 1;
  min-height: 0;
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`