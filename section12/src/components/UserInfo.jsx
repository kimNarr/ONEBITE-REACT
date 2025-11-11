import React from "react";
import "./UserInfo.css";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ user, onLogout }) => {
  const nav = useNavigate();

  const homeLink = () => {
    nav("/");
  };

  return (
    <div className="user-info">
      <h2 onClick={homeLink} className="title">
        EMOTION DIARY
      </h2>
      <div className="user">
        <div className="user-name">{user.nickname} 님</div>
        <button onClick={onLogout} className="logout">
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
