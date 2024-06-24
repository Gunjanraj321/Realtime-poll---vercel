import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import { Card, Typography, List } from "antd";

const { Title } = Typography;

const PollResults = () => {
  const { pollId } = useParams(); 
  console.log(pollId)
  const [pollResult, setPollResult] = useState(null);

  useEffect(() => {
    fetchPollResults();
  }, []);

  const fetchPollResults = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/poll/${pollId}/pollResult`);
      setPollResult(response.data);
    } catch (error) {
      console.error("Error fetching poll results:", error);
    }
  };

  if (!pollResult) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Title level={2}>Poll Results</Title>
      <Card title={pollResult.question}>
        <List
          dataSource={pollResult.options}
          renderItem={option => (
            <List.Item>
              {option.text}: {option.voteCount} votes
            </List.Item>
          )}
        />
        <p>Total Votes: {pollResult.totalVotes}</p>
      </Card>
    </div>
  );
};

export default PollResults;
