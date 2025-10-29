import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import NotFound from "./pages/NotFound";
import Button from "./components/Button";
import Header from "./components/Header";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getEmotionImage } from "./util/get-emotion-image";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

// 동적경로(Dynamic Segments)

// URL Parameter : / 뒤에 아이템의 id를 명시  ~/product/1, ~/product/2, ~/product/3
// 아이템의 id 등의 변경되지 않는 값을 주소로 명시하기 위해 사용

// Query String : ? 뒤에 변수명과 값 명시  ~/search?q=검색어
// 검색어 등의 자주 변경되는 값을 주소로 명시하기 위해 사용

//

const App = () => {
  const nav = useNavigate();

  const onClickButton = () => {
    nav("/");
  };

  return (
    <>
      {/* build 시 vite 에서 제공하는 최적화 X */}
      {/* <div>
        <img src="/emotion1.png" alt="매우 좋음" />
        <img src="/emotion2.png" alt="좋음" />
        <img src="/emotion3.png" alt="보통" />
        <img src="/emotion4.png" alt="나쁨" />
        <img src="/emotion5.png" alt="매우 나쁨" />
      </div> */}
      {/* build 시 vite 에서 제공하는 최적화 O / Data URI 로 제공됨 (캐시 이용) */}
      {/* but 이미지 개수 및 용량이 많을 경우 public 폴더에 저장하는게 유리 할 수 도있음 */}
      {/* <div>
        <img src={getEmotionImage(1)} alt="매우 좋음" />
        <img src={getEmotionImage(2)} alt="좋음" />
        <img src={getEmotionImage(3)} alt="보통" />
        <img src={getEmotionImage(4)} alt="나쁨" />
        <img src={getEmotionImage(5)} alt="매우 나쁨" />
      </div>
      <div>
        <Link to={"/"}>home</Link>
        <Link to={"/new"}>new</Link>
        <Link to={"/diary"}>diary</Link>
      </div> */}
      <Header
        text={"Header"}
        leftChild={<Button text={"left"} />}
        rightChild={<Button text={"right"} />}
      />
      <Button
        text={"123"}
        type={"DEFAULT"}
        onClick={() => {
          console.log("클릭됨");
        }}
      />
      <Button
        text={"123"}
        type={"POSITIVE"}
        onClick={() => {
          console.log("클릭됨");
        }}
      />
      <Button
        text={"123"}
        type={"NEGATIVE"}
        onClick={() => {
          console.log("클릭됨");
        }}
      />
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
