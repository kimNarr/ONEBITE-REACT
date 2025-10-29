import { useParams } from "react-router-dom";

const Diary = () => {
  const params = useParams();
  return <div>{params.id}번 다이어리 입니다.</div>;
};

export default Diary;
