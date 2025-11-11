import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/getStringedDate";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
  const params = useParams();

  const nav = useNavigate();

  const currentDiaryItem = useDiary(params.id);

  // usePageTitle(`${params.id}번 일기`);
  usePageTitle(
    `${getStringedDate(new Date(currentDiaryItem?.createdate))} 일기`
  );

  if (currentDiaryItem === undefined) {
    return <div className="loading">로딩중입니다....!</div>;
  }

  const { createdate, emotionid, content } = currentDiaryItem;
  const title = getStringedDate(new Date(createdate));

  return (
    <>
      <Header
        title={`${title} 일기`}
        leftChild={<Button text={"<"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"수정"} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionid={emotionid} content={content} />
    </>
  );
};

export default Diary;
