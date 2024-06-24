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
    const userId = useSelector((state)=>state.auth.isUserId)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearAuthState());
        navigate("/login");
    };

    return (
        <AntHeader className="header">
            <Row justify="space-between" align="middle">
                <Col>
                    <h1 className="logo">Polling App</h1>
                </Col>
                <Col>
                    {token ? (
                        <Row gutter={16} align="middle">
                            <Col>
                                <UserProfile userId={userId} displayMode="header"/>
                            </Col>
                            <Col>
                                <Button type="primary">
                                    <Link to="/">Home</Link>
                                </Button>
                            </Col>
                            <Col>
                                <Button type="primary">
                                    <Link to="/create">Create Poll</Link>
                                </Button>
                            </Col>
                            <Col>
                                <Button type="primary">
                                    <Link to="/fetch">Fetch Polls</Link>
                                </Button>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Col>
                        </Row>
                    ) : (
                        <Row gutter={16} align="middle">
                            <Col>
                                <Button type="primary">
                                    <Link to="/login">Login</Link>
                                </Button>
                            </Col>
                            <Col>
                                <Button type="primary">
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
