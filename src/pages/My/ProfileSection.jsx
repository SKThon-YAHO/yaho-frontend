import styled from "styled-components";
import { UserRound } from "lucide-react";

export default function ProfileSection({ name }) {
  return (
    <Container>
      <ProfileIcon>
        <UserRound width={46} height={46} strokeWidth={1.7} />
      </ProfileIcon>

      <Name>{name}</Name>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 14px 16px 18px;
`;

const ProfileIcon = styled.div`
  width: 90px;
  height: 90px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 14px;

  border-radius: 50%;

  color: #6366f1;

  background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%);

  box-shadow: 0 4px 16px 0 rgba(99, 102, 241, 0.12);
`;

const Name = styled.strong`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  line-height: 30px;
`;
