import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/getStringedDate";

const Diary = () => {
  const params = useParams();

  const nav = useNavigate();

  const currentDiaryItem = useDiary(params.id);

  if (currentDiaryItem === undefined) {
    return <div className="loading">로딩중입니다.</div>;
  }

  const { createDate, emotionId, content } = currentDiaryItem;
  const title = getStringedDate(new Date(createDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
