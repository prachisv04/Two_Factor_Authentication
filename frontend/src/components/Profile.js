import React, { useEffect, useState } from "react";
import {Card, Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { getCurrentUser } from "./ApiUtil";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const { Meta } = Card;

export default function Profile(props) {
  const navigate = useNavigate();
  const state = useLocation();
  const {username} = state;
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/login");
    }
    loadCurrentUser(username);
  });

  const loadCurrentUser = (username) => {
    getCurrentUser(username)
      .then((response) => {
        console.log(response);
        setCurrentUser(response);
      })
      .catch((error) => {
        logout();
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {/* <p>Trying</p> */}
      <Card
        style={{ width: 420, border: "1px solid #e1e0e0" }}
        actions={[<LogoutOutlined onClick={logout} />]}
      >
        <Meta
          avatar={
            <Avatar
              src={currentUser.profilePicture}
              className="user-avatar-circle"
            />
          }
          title={currentUser.name}
          description={"@" + currentUser.username}
        />
      </Card>
    </div>
  );
};
