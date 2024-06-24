import React from "react";
import { Button, Typography, Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>Welcome!</Title>
          <Paragraph>You are ready to create a poll and vote.</Paragraph>
          <Row gutter={16} justify="center" style={{ marginTop: "20px" }}>
            <Col>
              <Link to="/create">
                <Button type="primary" size="large">Create Poll</Button>
              </Link>
            </Col>
            <Col>
              <Link to="/fetch">
                <Button type="default" size="large">Fetch Polls</Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
