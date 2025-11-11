import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/getStringedDate";
import usePageTitle from "../hooks/usePageTitle";
import { DiaryUserContext } from "../App";
import { useContext } from "react";

const Diary = () => {
  const params = useParams();

  const nav = useNavigate();

  const currentDiaryItem = useDiary(params.id);

  const currentUserId = useContext(DiaryUserContext);

  // usePageTitle(`${params.id}번 일기`);
  usePageTitle(
    `${getStringedDate(new Date(currentDiaryItem?.createdate))} 일기`
  );

  if (currentDiaryItem === undefined) {
    return <div className="loading">로딩중입니다....!</div>;
  }

  const { createdate, emotionid, content, user_id } = currentDiaryItem;
  const title = getStringedDate(new Date(createdate));

  // 작성자 여부 확인
  const isOwner = String(user_id) === String(currentUserId.id);

  return (
    <>
      <Header
        title={`${title} 일기`}
        leftChild={<Button text={"<"} onClick={() => nav(-1)} />}
        rightChild={
          isOwner && ( // 작성자일 때만 수정 버튼 노출
            <Button text={"수정"} onClick={() => nav(`/edit/${params.id}`)} />
          )
        }
      />
      <Viewer emotionid={emotionid} content={content} />
    </>
  );
};

export default Diary;
