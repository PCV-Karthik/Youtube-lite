import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/Menu";

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  flex: 5;
  display: flex;
  padding: 22px 26px;
  flex-wrap: wrap;
`;

const Home = ({ type,setDarkMode,darkMode }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`videos/${type}`);
      console.log(type);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <>
    <Container>
    <Menu position={"static"} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Wrapper>
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </Wrapper>
    </Container>
    </>
  );
};

export default Home;
