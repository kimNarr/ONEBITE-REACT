import { useState, useContext } from "react";
import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { emotionList } from "../util/constants";

const Viewer = ({ emotionid, content }) => {
  const emotionItem = emotionList.find(
    (item) => String(item.emotionid) === String(emotionid)
  ) || {
    emotionName: "알 수 없음",
    emotionid: 0,
  };

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionid}`}>
          <img
            src={getEmotionImage(Number(emotionid))}
            alt={emotionItem.emotionName}
          />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
