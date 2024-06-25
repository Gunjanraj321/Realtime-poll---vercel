import React from "react";
import { Layout, Row, Col, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState } from "./Redux/AuthSlice";

const { Header: AntHeader } = Layout;

const Header = () => {
    const token = useSelector((state) => state.auth.isToken);
    const userId = useSelector((state) => state.auth.isUserId);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearAuthState());
        navigate("/login");
    };

    return (
        <AntHeader className="header">
            <Row justify="space-between" align="middle" className="header-row">
                <Col xs={24} sm={24} md={6}>
                    <h1 className="logo">Polling App</h1>
                </Col>
                <Col xs={24} sm={24} md={18}>
                    {token ? (
                        <Row gutter={[8, 8]} align="middle" className="button-row">
                            <Col xs={24} sm={8} md={4}>
                                <UserProfile userId={userId} displayMode="header" />
                            </Col>
                            <Col xs={24} sm={8} md={4}>
                                <Button type="primary" block>
                                    <Link to="/">Home</Link>
                                </Button>
                            </Col>
                            <Col xs={24} sm={8} md={4}>
                                <Button type="primary" block>
                                    <Link to="/create">Create Poll</Link>
                                </Button>
                            </Col>
                            <Col xs={24} sm={8} md={4}>
                                <Button type="primary" block>
                                    <Link to="/fetch">Fetch Polls</Link>
                                </Button>
                            </Col>
                            <Col xs={24} sm={8} md={4}>
                                <Button type="primary" block onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Col>
                        </Row>
                    ) : (
                        <Row gutter={[8, 8]} align="middle" className="button-row">
                            <Col xs={24} sm={12} md={6}>
                                <Button type="primary" block>
                                    <Link to="/login">Login</Link>
                                </Button>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Button type="primary" block>
                                    <Link to="/signup">Sign Up</Link>
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;