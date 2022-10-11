import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CheckContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  .span {
    color: #3c3c3c;
    font-size: 20px;
  }

  .spin {
    animation: 1.7s linear ${spin} infinite;
  }
`;

export { CheckContainer };
