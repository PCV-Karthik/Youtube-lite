import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import styled from 'styled-components';
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

const Container = styled.div`
    position: absolute;
    z-index: 2;
    background-color:${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    border-radius: 5px;
    top:50px;
    right:20px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 250px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px 20px;
  flex-wrap: nowrap;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const DropDown = ({darkMode,setDarkMode,setOpenDropDown}) => {
    const dispatch = useDispatch();
  return (
    <Container>
        <Wrapper>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        <Item
          onClick={() => {
            dispatch(logout());
            setOpenDropDown(false);
          }}
        >
        <LogoutIcon/>
          Logout
        </Item>
        </Wrapper>
    </Container>
  )
}

export default DropDown