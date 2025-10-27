import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter(
      (todo) => todo.content.toLowerCase().includes(search.toLowerCase())
      // todo 의 content 를 소문자로, search state의 값도 소문자로 통일해서
      // 대소문자 관계없이 검색가능
    );
  };

  const filteredTodos = getFilteredData();

  return (
    <div className="List">
      <h4>Todo List👌</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="TodosWrapper">
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
