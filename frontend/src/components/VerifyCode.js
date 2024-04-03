import React, {  useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { DingtalkOutlined } from "@ant-design/icons";
import { verify } from "./ApiUtil";
import {  useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const VerifyCode = (props) => {
  
  const {state} = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {username} = state;
  
  const onFinish = (values) => {
    setLoading(true);
    
    const verifyRequest = {
      code: values.code,
      username: username,
    };

    console.log("verifyRequest : ");
    console.log(verifyRequest);
    verify(verifyRequest)
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        navigate("/",{state:{username: values.username,accessToken:response.accessToken}});
        setLoading(false);
      })
      .catch((error) => {
        if (error.status === 400) {
          notification.error({
            message: "Error",
            description: "Code is incorrect",
          });
        } else {
          notification.error({
            message: "Error",
            description: "Sorry! Something went wrong. Please try again!",
          });
        }
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <DingtalkOutlined style={{ fontSize: 50 }} />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="code"
          rules={[{ required: true, message: "Code is required" }]}
        >
          <Input size="large" placeholder="Enter code" />
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => navigate("/")}
            shape="round"
            size="large"
          >
            Cancel
          </Button>
          <Button
            shape="round"
            size="large"
            htmlType="submit"
            className="verify-form-button "
            loading={loading}
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyCode;