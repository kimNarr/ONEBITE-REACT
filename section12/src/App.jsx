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

const supabaseUrl = "https://zucdhmiaymzpzvevollp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1Y2RobWlheW16cHp2ZXZvbGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMTg5MjMsImV4cCI6MjA3Nzc5NDkyM30.t1kfVVzLtvpBDGx6XzZzNHkCmfG1b0RFtvwBzJGOg5U";
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
  // localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext([]);
export const DiaryDispatchContext = createContext();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  // const idRef = useRef(0);

  // useEffect(() => {
  //   const storeData = localStorage.getItem("diary");
  //   if (!storeData) {
  //     setIsLoading(false);
  //     return;
  //   }
  //   const parseData = JSON.parse(storeData);

  //   if (!Array.isArray(parseData)) {
  //     setIsLoading(false);
  //     return;
  //   }

  //   let maxId = 0;
  //   parseData.forEach((item) => {
  //     if (Number(item.id) > maxId) {
  //       maxId = item.id;
  //     }
  //   });

  //   idRef.current = maxId + 1;

  //   dispatch({
  //     type: "INIT",
  //     data: parseData,
  //   });

  //   setIsLoading(false);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const MIN_LOADING_TIME = 1500;
      const start = Date.now();

      const { data, error } = await supabase
        .from("diary")
        .select("*")
        .order("id", { ascending: false });

      const elapsed = Date.now() - start;
      const remaining = MIN_LOADING_TIME - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      if (error) {
        console.error(error);
        alert("데이터를 불러오지 못했습니다.");
        setIsLoading(false);
        return;
      }
      dispatch({
        type: "INIT",
        data: data,
      });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // localStorage.setItem("test", "hello");
  // localStorage.setItem("person", JSON.stringify({ name: "Kim" }));
  // console.log(localStorage.getItem("test"));
  // console.log(JSON.parse(localStorage.getItem("person")));

  // JASON.stringify()  문자열로 변환
  // JSON.parse()      다시 객체로 변환
  // JSON.parse(null 또는 undefined) => 오류

  // const onCreate = (createDate, emotionId, content) => {
  //   // 새로운 일기 추가하는 기능
  //   dispatch({
  //     type: "CREATE",
  //     data: {
  //       id: idRef.current++,
  //       createDate,
  //       emotionId,
  //       content,
  //     },
  //   });
  // };

  // const onUpdate = (id, createDate, emotionId, content) => {
  //   // 일기 수정하는 기능
  //   dispatch({
  //     type: "UPDATE",
  //     data: {
  //       id,
  //       createDate,
  //       emotionId,
  //       content,
  //     },
  //   });
  // };

  //   const onDelete = (id) => {
  //   dispatch({
  //     type: "DELETE",
  //     data: {
  //       id,
  //     },
  //   });
  // };

  const onCreate = async (createDate, emotionId, content) => {
    // 새로운 일기 추가하는 기능
    const { data: newDiary, error } = await supabase
      .from("diary")
      .insert([{ createDate, emotionId, content }])
      .select();
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
          delay={30}
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
