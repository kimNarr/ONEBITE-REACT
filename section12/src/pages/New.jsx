import { useContext } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  const onSubmit = async (input) => {
    const success = await onCreate(
      new Date(input.createdate).toISOString(), // 또는 getTime(), DB 타입에 맞게
      input.emotionid,
      input.content
    );
    if (success) {
      nav("/", { replace: true });
    }
  };

  usePageTitle("새 일기 쓰기");

  return (
    <>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={() => nav(-1)} text={"<"} />}
      />
      <Editor onSubmit={onSubmit} />
    </>
  );
};

export default New;
