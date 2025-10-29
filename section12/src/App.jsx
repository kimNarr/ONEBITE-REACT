import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import NotFound from "./pages/NotFound";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

// 동적경로(Dynamic Segments)

// URL Parameter : / 뒤에 아이템의 id를 명시  ~/product/1, ~/product/2, ~/product/3
// 아이템의 id 등의 변경되지 않는 값을 주소로 명시하기 위해 사용

// Query String : ? 뒤에 변수명과 값 명시  ~/search?q=검색어
// 검색어 등의 자주 변경되는 값을 주소로 명시하기 위해 사용

const App = () => {
  const nav = useNavigate();

  const onClickButton = () => {
    nav("/");
  };

  return (
    <>
      <div>
        <Link to={"/"}>home</Link>
        <Link to={"/new"}>new</Link>
        <Link to={"/diary"}>diary</Link>
      </div>
      <div>
        <button onClick={onClickButton}>Home으로 이동</button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
