import "./DiaryItem.css";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotionid, createdate, content }) => {
  const nav = useNavigate();

  const goDiaryPage = () => {
    nav(`/diary/${id}`);
  };

  const goEditPage = () => {
    nav(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDiaryPage}
        className={`img_section img_section_${emotionid}`}
      >
        <img src={getEmotionImage(Number(emotionid))} alt="" />
      </div>
      <div onClick={goDiaryPage} className="info_section">
        <div className="created_date">
          {new Date(createdate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={goEditPage} text={"수정"} />
      </div>
    </div>
  );
};

export default DiaryItem;
