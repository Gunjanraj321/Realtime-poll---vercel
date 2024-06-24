import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Avatar, Form, Button, Input, message } from "antd";
import { useSelector } from "react-redux";
import UserProfileModal from "./UserProfileModal";

const { TextArea } = Input;

const Comments = ({ pollId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = useSelector((state) => state.auth.isToken);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/poll/${pollId}/comments`, {
        headers: {
          Authorization: `${token}`
        }
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) {
      message.warning("Please enter a comment.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/poll/${pollId}/comments`,
        { text: newComment },
        {
          headers: {
            Authorization: `${token}`
          }
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
      fetchComments(); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <List
        dataSource={comments}
        renderItem={comment => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{comment.user.username}</Avatar>}
              title={<UserProfileModal username={comment.user.username}/>}
              description={comment.text}
            />
          </List.Item>
        )}
      />
      <Form.Item>
        <TextArea
          rows={4}
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );
};

export default Comments;
