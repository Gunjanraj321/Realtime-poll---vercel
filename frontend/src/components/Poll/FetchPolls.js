import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Card, Button, Radio, message, Modal } from "antd";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "../Comment"; 

const socket = io("http://localhost:3001");

const FetchPolls = () => {
  const [polls, setPolls] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [currentPollId, setCurrentPollId] = useState(null);
  const token = useSelector(state => state.auth.isToken); 

  useEffect(() => {
    fetchPolls();

    // Setup socket listener for real-time updates
    socket.on("vote", updatedPoll => {
      setPolls(prevPolls =>
        prevPolls.map(poll => (poll._id === updatedPoll._id ? updatedPoll : poll))
      );
    });

    return () => {
      socket.off("vote");
    };
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get("http://localhost:3001/poll");
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const handleVote = async (pollId) => {
    const optionId = selectedOption[pollId];
    if (!optionId) {
      message.warning("Please select an option before voting.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3001/poll/vote/${pollId}/${optionId}`,
        {},
        {
          headers: {
            Authorization: `${token}`
          }
        }
      );
      fetchPolls(); 
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleOptionChange = (pollId, optionId) => {
    setSelectedOption(prev => ({ ...prev, [pollId]: optionId }));
  };

  const openCommentModal = (pollId) => {
    setCurrentPollId(pollId);
    setCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setCommentModalVisible(false);
    setCurrentPollId(null);
  };

  return (
    <div>
      <h2>Polls</h2>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={polls}
        renderItem={poll => (
          <List.Item key={poll._id}>
            <Card title={poll.question}>
              <Radio.Group
                onChange={e => handleOptionChange(poll._id, e.target.value)}
              >
                {poll.options.map(option => (
                  <Radio key={option.id} value={option.id}>
                    {option.text} ({option.voteCount})
                  </Radio>
                ))}
              </Radio.Group>
              <Button
                type="primary"
                onClick={() => handleVote(poll._id)}
                style={{ marginTop: "10px" }}
              >
                Vote
              </Button>
              <Link to={`/poll/${poll._id}/results`}>
                <Button style={{ marginTop: "10px" }}>View Results</Button>
              </Link>
              <Button
                type="default"
                onClick={() => openCommentModal(poll._id)}
                style={{ marginTop: "10px" }}
              >
                Comment
              </Button>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Comments"
        open={commentModalVisible}
        onCancel={closeCommentModal}
        footer={null}
      >
        {currentPollId && <Comments pollId={currentPollId} />}
      </Modal>
    </div>
  );
};

export default FetchPolls;
