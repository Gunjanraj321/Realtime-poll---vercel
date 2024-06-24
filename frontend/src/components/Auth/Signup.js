import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated, setEmail, setToken, setUserId } from "../Redux/AuthSlice";
import { Form, Input, Button, Card, Typography } from "antd";

const { Title } = Typography;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/signup",
        formData
      );

      const token = response.data.token;
      const email = response.data.email;
      const userId = response.data.id;

      dispatch(setAuthenticated(true));
      dispatch(setToken(token));
      dispatch(setEmail(email));
      dispatch(setUserId(userId));

      alert(response.data.message || "Signup successful!");
      navigate("/");
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-container" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: 300 }}>
        <Title level={2} style={{ textAlign: "center" }}>Create an account</Title>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Item>
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
              Create an account
            </Button>
          </Form.Item>
          <Link to="/Login" style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
            Already Have Account? Login
          </Link>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
