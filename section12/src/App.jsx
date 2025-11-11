import "./App.css";
import { useReducer, createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
import AuthForm from "./components/AuthForm";
import { supabase } from "./lib/supabase";
import UserInfo from "./components/UserInfo";

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.data.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext([]);
export const DiaryDispatchContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);

  // 로그인 상태 초기화
  useEffect(() => {
    const initAuth = async () => {
      const MIN_LOADING_TIME = 1500; // ✅ 강제 로딩 시간
      const start = Date.now();
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) setUser(savedUser);
      } catch (e) {
        console.error(e);
      }

      // 최소 2.5초 로딩 유지
      const elapsed = Date.now() - start;
      const remaining = MIN_LOADING_TIME - elapsed;
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const onAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const onLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  // 데이터 불러오기 (로그인 후)
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // 로그인 안됐으면 패스

      const { data, error } = await supabase
        .from("diary")
        .select("*")
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
        alert("데이터를 불러오지 못했습니다.");
        return;
      }

      dispatch({ type: "INIT", data });
    };

    fetchData();
  }, [user]);

  const onCreate = async (createdate, emotionid, content) => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const { data: newDiary, error } = await supabase
      .from("diary")
      .insert([
        {
          createdate: createdate,
          emotionid: emotionid,
          content,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.error("onCreate error:", error);
      alert("일기 저장 실패!");
      return;
    }

    dispatch({ type: "CREATE", data: newDiary[0] });
    return true;
  };

  const onUpdate = async (id, createdate, emotionid, content) => {
    const { data: updated, error } = await supabase
      .from("diary")
      .update({ createdate: createdate, emotionid: emotionid, content })
      .eq("id", id)
      .select();

    if (error) {
      console.error("수정 오류:", error);
      return;
    }

    dispatch({ type: "UPDATE", data: updated[0] });
  };

  const onDelete = async (id) => {
    const { error } = await supabase.from("diary").delete().eq("id", id);
    if (error) {
      console.error("삭제 오류:", error);
      return;
    }
    dispatch({ type: "DELETE", data: { id } });
  };

  // 🔥 로딩 중이면 로딩 화면
  if (isLoading) {
    return (
      <Loading
        text="LOADING...!"
        className="loading"
        delay={20}
        duration={1.5}
        ease="elastic.out(1,0.3)"
        splitType="chars"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
    );
  }

  // 🔥 로그인 안된 상태면 로그인 페이지 표시
  if (!user) {
    return <AuthForm onAuth={onAuth} />;
  }

  // 🔥 로그인 되어 있으면 정상 앱 실행
  return (
    <>
      <UserInfo user={user} onLogout={onLogout} />

      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
};

export default App;
