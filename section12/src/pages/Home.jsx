import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  const navigate = useNavigate();
  usePageTitle("감정 일기장");

  return (
    <>
      <Header title="감정 일기장" />
      <div className="navigation">
        <Button text="전체 일기 보기" onClick={() => navigate("/list")} />
        <Button text="새 일기 쓰기" onClick={() => navigate("/new")} />
        <Button text="내가 쓴 일기" onClick={() => navigate("/mydiary")} />
        <Button text="계정 관리" onClick={() => navigate("/account")} />
      </div>
    </>
  );
};

export default Home;
