import React, { useState } from "react";
import { Modal, Button } from "antd";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";

const UserProfileModal = ({ username}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = useSelector(state => state.auth.isUserId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        {username}
      </Button>
      <Modal
        title="User Profile"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <UserProfile userId={userId} displayMode="modal" />
      </Modal>
    </>
  );
};

export default UserProfileModal;
