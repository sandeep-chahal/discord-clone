import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
`;

const Spinner = styled.div`
  position: absolute;
  height: 60px;
  width: 60px;
  border: 3px solid transparent;
  border-top-color: #a04668;
  top: 50%;
  left: 50%;
  margin: -30px;
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;

  &:before,
  &:after {
    content: "";
    position: absolute;
    border: 3px solid transparent;
    border-radius: 50%;
  }

  &:before {
    border-top-color: #254e70;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    animation: ${spin} 3s linear infinite;
  }

  &:after {
    border-top-color: #f3f169;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    animation: ${spin} 4s linear infinite;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
);
