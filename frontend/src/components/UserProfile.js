import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Spin, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserProfile = ({ userId, displayMode }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.isToken);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${userId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, token]);

  if (loading) return <Spin size="small" />;
  if (error) return <Alert message={error} type="error" />;

  if (displayMode === "header") {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          size={40}
          src={profile?.profilePicture || null}
          icon={!profile?.profilePicture && <UserOutlined />}
          alt={profile?.username}
          style={{ marginRight: "10px" }}
        />
        <span style={{ color: "white" }}>{profile?.username}</span>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Avatar
        size={80}
        src={profile?.profilePicture || null}
        icon={!profile?.profilePicture && <UserOutlined />}
        alt={profile?.username}
        style={{ marginBottom: "10px" }}
      />
      <div>{profile?.username}</div>
      <div>{profile?.email}</div>
    </div>
  );
};

export default UserProfile;