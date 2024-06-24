import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "" }, { text: "" }]);
  const token = useSelector((state) => state.auth.isToken);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "" }]);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3001/poll/createPoll",
        { question, options },
        {
          headers: {
            Authorization: `${token}`,
          }
        }
      );
      setQuestion("");
      setOptions([{ text: "" }, { text: "" }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
      <h2>Create Poll</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Question"
          rules={[{ required: true, message: "Please enter a question" }]}
        >
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
          />
        </Form.Item>
        <Form.Item label="Options">
          <Space direction="vertical">
            {options.map((option, index) => (
              <Input
                key={index}
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            ))}
            <Button type="dashed" onClick={handleAddOption}>
              <PlusOutlined /> Add Option
            </Button>
          </Space>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePoll;
