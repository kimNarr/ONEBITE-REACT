import "./TodoItem.css";

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

export default TodoItem;
