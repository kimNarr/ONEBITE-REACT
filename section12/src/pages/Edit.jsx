import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const params = useParams();

  const nav = useNavigate();

  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const currentDiaryItem = useDiary(params.id);

  usePageTitle(`${params.id}번 일기 수정`);

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하겠습니까? 삭제하면 복구되지 않습니다.")) {
      onDelete(params.id);
      nav("/list", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("수정 하시겠습니까?")) {
      onUpdate(
        params.id,
        new Date(input.createdate).toISOString(),
        input.emotionid,
        input.content
      );
    }
    nav(`/list`, { replace: true });
  };

  return (
    <>
      <Header
        title={"일기 수정 하기"}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={"<"}
          />
        }
        rightChild={
          <Button onClick={onClickDelete} text={"삭제"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={currentDiaryItem} onSubmit={onSubmit} />
    </>
  );
};

export default Edit;
