import React from "react";
import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-image";

const EmotionItem = ({ emotionid, emotionName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionid}` : ""
      }`}
    >
      <img className="emotion_image" src={getEmotionImage(emotionid)} alt="" />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
