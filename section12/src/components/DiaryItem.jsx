import "./DiaryItem.css";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({
  id,
  emotionid,
  createdate,
  content,
  nickname,
  user_id,
  currentUserId,
}) => {
  const nav = useNavigate();

  const goDiaryPage = () => {
    nav(`/diary/${id}`);
  };

  const goEditPage = () => {
    nav(`/edit/${id}`);
  };

  const isOwner = String(user_id) === String(currentUserId);

  return (
    <div className="DiaryItem">
      <section
        onClick={goDiaryPage}
        className={`img_section img_section_${emotionid}`}
      >
        <img src={getEmotionImage(Number(emotionid))} alt="" />
      </section>
      <section onClick={goDiaryPage} className="info_section">
        <div className="user_date_info">
          <div className="nickname">{nickname}</div>
          <div className="date">
            {new Date(createdate).toLocaleDateString()}
          </div>
        </div>
        <div className="content_info">
          <div className="content">{content}</div>
        </div>
      </section>
    </div>
  );
};

export default DiaryItem;
