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

const Input = styled.input`
  flex: 1;
  border-radius: 4px 0 0 4px;
  border: none;
  padding: 0 16px;
  outline: none;
  background-color: #e9e6df;
  height: 35px;

  &::placeholder {
    font-size: 11.5px;
    //color: #7b7b7b;
  }
`;

export { CheckContainer, Input };
