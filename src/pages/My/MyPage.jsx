import styled from "styled-components";

import ProfileSection from "./ProfileSection";
import InfoCard from "./InfoCard";
import SettingButton from "./SettingButton";

export default function MyPage() {
  return (
    <PageContainer>
      <PageTitle>마이페이지</PageTitle>

      <ProfileSection name="서경대학교" />

      <Content>
        <InfoCard region="서울특별시 성북구" password="••••••" />

        <SettingButton>지자체 변경</SettingButton>

        <SettingButton>비밀번호 변경</SettingButton>
      </Content>

      <LogoutArea>
        <LogoutButton>로그아웃</LogoutButton>
      </LogoutArea>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  width: 100%;
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;

  background: #ffffff;
`;

const PageTitle = styled.h1`
  margin: 0;
  padding: 16px 16px 4px;

  font-size: 18px;
  font-weight: 700;

  color: #1e293b;
  line-height: 27px;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 0px 16px;
`;

const LogoutArea = styled.div`
  margin-top: auto;
  padding: 16px;
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 52px;

  background: #ffffff;

  border: 1px solid #fecaca;
  border-radius: 14px;

  font-size: 15px;
  font-weight: 700;
  color: #ef4444;

  cursor: pointer;

  &:active {
    background: #fff5f4;
  }
`;
