import React from "react";
import "./UserInfo.css";

const UserInfo = ({ user, onLogout }) => {
  return (
    <div className="user-info">
      <h2 className="title">EMOTION DIARY</h2>
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
