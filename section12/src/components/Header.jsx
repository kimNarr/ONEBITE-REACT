import React from "react";
import "./Header.css";

const Header = ({ text, leftChild, rightChild }) => {
  return (
    <header>
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{text}</div>
      <div className="header_right">{rightChild}</div>
    </header>
  );
};

export default Header;
