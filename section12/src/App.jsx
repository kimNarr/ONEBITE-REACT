import "./App.css";
import { useReducer, createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
import AuthForm from "./components/AuthForm";
import UserInfo from "./components/UserInfo";
import { supabase } from "./lib/supabase";

// ========================
// Reducer
// ========================
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

// ========================
// Context
// ========================
export const DiaryStateContext = createContext([]);
export const DiaryDispatchContext = createContext();
export const DiaryUserContext = createContext(null);

// ========================
// App Component
// ========================
const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);

  // ✅ 잘못된 사용자 처리 (DB에 없는 계정)
  const handleInvalidUser = () => {
    alert("유효하지 않은 계정입니다. 다시 로그인해주세요.");
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ 로그인 초기화 및 유효성 검증
  useEffect(() => {
    const initAuth = async () => {
      const MIN_LOADING_TIME = 1500;
      const start = Date.now();

      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
          // DB에서 유저 존재 여부 확인
          const { data: existingUser, error } = await supabase
            .from("users")
            .select("id, user_id, nickname")
            .eq("id", savedUser.id)
            .single();

          if (error || !existingUser) {
            console.warn("DB에 없는 사용자 → 로그아웃 처리");
            handleInvalidUser();
          } else {
            // 닉네임 또는 user_id 변경 감지 → 갱신
            if (
              existingUser.nickname !== savedUser.nickname ||
              existingUser.user_id !== savedUser.user_id
            ) {
              console.log("DB 변경 감지 → 로컬 업데이트");
              localStorage.setItem("user", JSON.stringify(existingUser));
            }
            setUser(existingUser);
          }
        }
      } catch (err) {
        console.error("initAuth error:", err);
        handleInvalidUser();
      }

      // 최소 로딩 시간 유지
      const elapsed = Date.now() - start;
      const remaining = MIN_LOADING_TIME - elapsed;
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // ✅ 로그인/회원가입 후 Auth 상태 설정
  const onAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ 정상 로그아웃
  const onLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  // ✅ DB에서 유저 존재 확인 함수
  const ensureUserExists = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("id", userId)
      .single();
    return !error && !!data;
  };

  // ✅ 일기 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // 유저 유효성 재검증
      const isValid = await ensureUserExists(user.id);
      if (!isValid) return handleInvalidUser();

      const { data, error } = await supabase
        .from("diary")
        .select(
          `id,
          createdate,
          emotionid,
          content,
          user_id,
          users (nickname)`
        )
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

  // ✅ CREATE
  const onCreate = async (createdate, emotionid, content) => {
    if (!user) return alert("로그인 후 이용해주세요.");

    const valid = await ensureUserExists(user.id);
    if (!valid) return handleInvalidUser();

    const { data: newDiary, error } = await supabase
      .from("diary")
      .insert([{ createdate, emotionid, content, user_id: user.id }])
      .select(
        `id,
        createdate,
        emotionid,
        content,
        user_id,
        users (nickname)`
      );

    if (error) {
      console.error(error);
      alert("일기 저장 실패!");
      return;
    }

    dispatch({ type: "CREATE", data: newDiary[0] });
    return true;
  };

  // ✅ UPDATE
  const onUpdate = async (id, createdate, emotionid, content) => {
    const valid = await ensureUserExists(user.id);
    if (!valid) return handleInvalidUser();

    const { data: updated, error } = await supabase
      .from("diary")
      .update({ createdate, emotionid, content })
      .eq("id", id)
      .select(
        `id,
        createdate,
        emotionid,
        content,
        user_id,
        users (nickname)`
      );

    if (error) {
      console.error("수정 오류:", error);
      return;
    }

    dispatch({ type: "UPDATE", data: updated[0] });
  };

  // ✅ DELETE
  const onDelete = async (id) => {
    const valid = await ensureUserExists(user.id);
    if (!valid) return handleInvalidUser();

    const { error } = await supabase.from("diary").delete().eq("id", id);
    if (error) {
      console.error("삭제 오류:", error);
      return;
    }
    dispatch({ type: "DELETE", data: { id } });
  };

  // ✅ 로딩 중
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

  // ✅ 로그인 안 된 상태
  if (!user) {
    return <AuthForm onAuth={onAuth} />;
  }

  // ✅ 로그인된 상태 → 앱 실행
  return (
    <>
      <UserInfo user={user} onLogout={onLogout} />

      <DiaryUserContext.Provider value={user}>
        <DiaryStateContext.Provider value={data}>
          <DiaryDispatchContext.Provider
            value={{ onCreate, onUpdate, onDelete }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </DiaryUserContext.Provider>
    </>
  );
};

export default App;
