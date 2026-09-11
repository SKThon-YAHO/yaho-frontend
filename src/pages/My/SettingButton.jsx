import styled from "styled-components";
import { ChevronRight } from "lucide-react";

export default function SettingButton({ children, onClick }) {
  return (
    <Button onClick={onClick}>
      <span>{children}</span>

      <ChevronRight size={16} strokeWidth={2} />
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 14px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;
  border-radius: 14px;

  font-size: 14px;
  font-weight: 600;

  color: #1e293b;

  cursor: pointer;

  svg {
    color: #cbd5e1;
  }

  &:active {
    background: #f1f5f9;
  }
`;
