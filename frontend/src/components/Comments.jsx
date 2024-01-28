import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  background-color: #3da6ff;
  color: black;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
`;

const Comments = ({videoId}) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {

    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const handelComment = async()=>{
    try{
      if(!addComment)
        return;
      await axios.post('/comments',{
        videoId : videoId,
        desc: addComment,
      })
      fetchComments();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Container>
      <NewComment>
        {
          currentUser? <Avatar src={currentUser.img} /> : 
          <Avatar src="frontend/src/img/unknownProfilePic.jpeg" />
        }
        <Input placeholder={currentUser? 'Add a comment...' : 'Sign In to add a comment' } onChange={(e) => setAddComment(e.target.value)} disabled = {currentUser? false : true}/>
        {currentUser && <Button onClick={handelComment}>Comment</Button>}
      </NewComment>
      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;
