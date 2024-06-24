import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated, setEmail, setToken, setUserId } from "../Redux/AuthSlice";
import { Form, Input, Button, Card, Typography } from "antd";

const { Title } = Typography;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formData
      );
      const { token, email, id } = response.data;
      dispatch(setAuthenticated(true));
      dispatch(setToken(token));
      dispatch(setEmail(email));
      dispatch(setUserId(id));

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: 300 }}>
        <Title level={2} style={{ textAlign: "center" }}>Log In</Title>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
