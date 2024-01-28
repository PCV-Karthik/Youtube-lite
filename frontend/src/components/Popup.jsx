import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Title = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  padding-bottom:25px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 400px;
  height: 200px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Message =styled.div`
    color: ${({ theme }) => theme.text};
    padding-bottom: 20px;
`;

const Popup = (props) => {
  return props.triggered ? (
    <Container>
      <Wrapper>
      <Close onClick={() => props.setTriggered(false)}>X</Close>
        <Title>{props.title}</Title>
        <Message>{props.message}</Message>
        <Link to="/signin">
        <Button>{props.button}</Button>
        </Link>
      </Wrapper>
    </Container>
  ) : (
    ""
  );
};

export default Popup;
