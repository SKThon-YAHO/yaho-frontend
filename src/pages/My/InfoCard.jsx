import styled from "styled-components";

export default function InfoCard({ region, password }) {
  return (
    <Container>
      <InfoRow>
        <Label>지자체</Label>
        <Value>{region}</Value>
      </InfoRow>

      <InfoRow>
        <Label>비밀번호</Label>
        <Password>{password}</Password>
      </InfoRow>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
  border-radius: 16px;
`;

const InfoRow = styled.div`
  min-height: 58px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px 18px;

  & + & {
    border-top: 1px solid #e2e8f0;
  }
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: 400;

  color: #98a6bd;
`;

const Value = styled.span`
  font-size: 15px;
  font-weight: 600;

  color: #1e293b;
`;

const Password = styled.span`
  font-size: 18px;
  font-weight: 600;

  letter-spacing: 4px;

  color: #1e293b;
`;
