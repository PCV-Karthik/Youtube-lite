import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import Menu from "../components/Menu";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Videos = styled.div`
  padding:20px;
`;

const Search = ({darkMode,setDarkMode}) => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
      console.log(res.data);
    };
    fetchVideos();
  }, [query]);

  return <Container>
    <Menu position={"static"} darkMode={darkMode} setDarkMode={setDarkMode}/>
    <Videos>
      
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
    </Videos>
  </Container>;
};

export default Search;