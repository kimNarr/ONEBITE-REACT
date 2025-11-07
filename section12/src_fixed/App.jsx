import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Loading from "./components/Loading";
import { supabase } from "./lib/supabase";
import AuthForm from "./components/AuthForm";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter(
        (item) => String(item.id) !== String(action.data.id)
      );
      break;
    }
    default:
      return state;
  }
  return nextState;
}

export const DiaryStateContext = createContext([]);
export const DiaryDispatchContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);

  // initialize auth state listener
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (!mounted) return;
        setUser(authData?.user ?? null);
      } catch (err) {
        console.error("auth init error", err);
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);


  
useEffect(() => {
  // initial data fetch (show public diaries and, if logged in, also user's diaries)
  const fetchData = async () => {
    const MIN_LOADING_TIME = 1500;
    const start = Date.now();
    try {
      // get current user (non-blocking)
      const { data: authData } = await supabase.auth.getUser();
      const user = authData?.user;

      let query = supabase.from("diary").select("*").order("id", { ascending: false });
      if (user && user.id) {
        // include both user's diaries and public (user_id IS NULL)
        query = supabase.from("diary").select("*").or(`user_id.eq.${user.id},user_id.is.null`).order("id", { ascending: false });
      } else {
        // only public diaries (no user_id)
        query = supabase.from("diary").select("*").is("user_id", null).order("id", { ascending: false });
      }

      const { data, error } = await query;

      const elapsed = Date.now() - start;
      const remaining = MIN_LOADING_TIME - elapsed;
      if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));

      if (error) {
        console.error(error);
        alert("데이터를 불러오지 못했습니다.");
      } else {
        dispatch({
          type: "INIT",
          data: data,
        });
      }
    } catch (err) {
      console.error(err);
      alert("데이터를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);


  const onCreate = async (createDate, emotionId, content) => {
    // 새로운 일기 추가하는 기능
    const { data: newDiary, error } = await supabase
      .from("diary")
      .insert([{ createDate, emotionId, content, user_id: user?.id }]).select();
    if (error) {
      console.error("onCreate error:", error);
      return;
    }
    dispatch({
      type: "CREATE",
      data: newDiary[0],
    });

    return true;
  };

  const onUpdate = async (id, createDate, emotionId, content) => {
    // 일기 수정하는 기능
    const { data: updated, error } = await supabase
      .from("diary")
      .update({ createDate, emotionId, content })
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

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  if (isLoading) {
    return (
      <>
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
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-bold">Emotion Diary</h1>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.email}</span>
              <button onClick={async ()=>{await supabase.auth.signOut();}} className="bg-gray-200 px-3 py-1 rounded text-sm">로그아웃</button>
            </>
          ) : (
            <button onClick={()=>setShowAuth(true)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">로그인</button>
          )}
        </div>
      </div>
      {showAuth && !user && <div className="fixed inset-0 bg-black/40 flex items-center justify-center"><div className="bg-white p-6 rounded"><AuthForm onAuth={(u)=>{setUser(u); setShowAuth(false);}}/><div className="text-right mt-3"><button onClick={()=>setShowAuth(false)} className="text-sm text-gray-500">닫기</button></div></div></div>}

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
