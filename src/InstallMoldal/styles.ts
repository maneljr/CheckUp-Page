import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  background-color: #e9e6df;
  margin: 0;
  color: black;
  flex-direction: column;
  display: flex;
  width: 100%;
  min-height: 100vh;

  .span {
    color: #3c3c3c;
    font-size: 20px;
  }

  .spin {
    animation: 1.7s linear ${spin} infinite;
  }

  .footer {
    color: #3c3c3c;
    font-size: 15px;
    font-weight: bold;
  }
`;

const Image = styled.img`
  width: 250px;
`;

const Card = styled.div`
  border-radius: 2px;
  width: 410px;
  background-color: #fff;
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const CheckContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const TitleContainer = styled.div`
  font-size: 19px;
  color: #3c3c3c;

  font-weight: bold;
`;

const Button = styled.button`
  height: 37px;
  width: 200px;
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
  background-color: #18ab4e;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover:enabled {
    background-color: #37be76;
  }

  &:active:enabled {
    background-color: #206f45;
  }

  &:disabled {
    background-color: #ccc;
    color: #777;
    cursor: not-allowed;
  }
`;

const FailButton = styled.button`
  height: 37px;
  width: 200px;
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
  background-color: #ae0000;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover:enabled {
    background-color: #d03541;
  }

  &:active:enabled {
    background-color: #740000;
  }

  &:disabled {
    background-color: #ccc;
    color: #777;
    cursor: not-allowed;
  }
`;

export {
  Container,
  Image,
  Card,
  CheckContainer,
  TitleContainer,
  Button,
  FailButton,
};
