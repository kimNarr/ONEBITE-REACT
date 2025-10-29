import "./App.css";
import { useReducer } from "react";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";

const mockData = [
  {
    id: 1,
    createDate: new Date().getTime(),
    emotionId: 1,
    content: "1일차 일기",
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: "2일차 일기",
  },
  {
    id: 3,
    createDate: new Date().getTime(),
    emotionId: 3,
    content: "3일차 일기",
  },
];

function reducer(state, action) {
  return state;
}

const App = () => {
  const [data, dispatch] = useReducer(reducer, mockData);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
