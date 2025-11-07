import React from "react";
import "./Button.css";

const Button = ({ text, type, onClick }) => {
  return (
    <button className={`button button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
