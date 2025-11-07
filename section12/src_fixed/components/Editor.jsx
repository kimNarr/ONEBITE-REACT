import { useState, useEffect } from "react";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/getStringedDate";

const Editor = ({ onSubmit, initData }) => {
  const [input, setInput] = useState({
    createDate: new Date(),
    emotionId: 3,
    content: "",
  });

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createDate") {
      value = new Date(e.target.value);
    }

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickSubmitButton = () => {
    if (!input.content.trim()) {
      alert("일기 내용을 입력해주세요!");
      return;
    }
    onSubmit({
      ...input,
      createDate: new Date(input.createDate).toISOString(),
    });
  };

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createDate: new Date(initData.createDate),
      });
    }
  }, [initData]);

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createDate"
          onChange={onChangeInput}
          type="date"
          value={getStringedDate(input.createDate)}
          readOnly
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList?.map((item) => (
            <EmotionItem
              onClick={() => {
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                });
              }}
              key={item.emotionId}
              {...item}
              isSelected={String(item.emotionId) === String(input.emotionId)}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button
          onClick={() => {
            nav("/");
          }}
          text={"취소"}
        />
        <Button onClick={onClickSubmitButton} text={"저장"} type={"POSITIVE"} />
      </section>
    </div>
  );
};

export default Editor;
