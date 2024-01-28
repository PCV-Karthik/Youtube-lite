import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [hide,setHide] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Navbar hide = {hide} setHide={setHide} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home type="trend"/>} />
                  <Route path="subscriptions" element={<Home type="sub"/>} />
                  <Route path="signin" element={<SignIn hide={hide} />} />
                  <Route path="search" element={<Search darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  <Route path="video">
                    <Route path=":id" element={<Video hide={hide} darkMode={darkMode} setDarkMode={setDarkMode}/>} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
