import "./TodoItem.css";
import { memo } from "react";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckBox = () => {
    onUpdate(id);
  };
  const onDeleteTodo = () => {
    onDelete(id);
  };
  return (
    <div className="TodoItem">
      <input
        readOnly
        type="checkbox"
        checked={isDone}
        onChange={onChangeCheckBox}
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onDeleteTodo}>삭제</button>
    </div>
  );
};

// 고차 컴포넌트 (HOC : High Order Component)
// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환값에 따라, Props가 바뀌었는지 안바뀌었지 판단
//   // True -> Props 바뀌지 않음 -> 리렌더링 X
//   // False -> Props 바뀜 -> 리렌더링 O

//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;

//   return true;
// });
export default memo(TodoItem);
