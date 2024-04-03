import React from "react";
import { Button, Typography } from "antd";
import { DingtalkOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const QrCode = (props) => {

  const {state} = useLocation();
  console.log("state:");
  console.log(state);
  const navigate = useNavigate();
  const { Title } = Typography;
  const {username,imageUrl} = state;
  return (
    <div className="qrcode-container">
      <DingtalkOutlined style={{ fontSize: 50 }} />
      <p>{username}</p>
      <Title level={4}>Scan the QrCode using authenticator app</Title>
      <img src={imageUrl} alt="ImageAlt" />
      <Button
        onClick={() => navigate("/verify", {state:{username: username , code: "dummy"}})}
        shape="round"
        className="login-form-button"
        size="large"
      >
        Continue to login
      </Button>
    </div>
  );
};

export default QrCode;