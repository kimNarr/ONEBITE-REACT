import { useState } from "react";
import Header from "./component/Header";
import Editor from "./component/Editor";
import List from "./component/List";
import "./App.css";

const mockData = [
  {
    id: 0,
    isDone: false,
    constent: "react 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    constent: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    constent: "청소하기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);

  return (
    <div className="App">
      <Header />
      <Editor />
      <List />
    </div>
  );
}

export default App;
