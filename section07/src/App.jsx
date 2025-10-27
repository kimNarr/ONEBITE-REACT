import { useState, useEffect, useRef } from "react";
import Viewer from "./component/Viewer";
import Controller from "./component/Controller";
import Even from "./component/Even";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const isMount = useRef(false);

  // 1. 마운트: 탄생
  useEffect(() => {
    console.log("mount");
  }, []);

  // 2. 업데이트: 변화, 리렌더링
  // deps생략 callback 함수는 마운트 될 때와 리렌더링 될 때 실행됨
  // update 될 때만 실행 : useRef 사용
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return; // 강제 종료
    }
    console.log("update");
  });

  // 3. 언마운트: 죽음
  useEffect(() => {});

  // useEffect(() => {
  //   console.log(`count: ${count} / input: ${input}`);
  // }, [count, input]);
  // 의존성 배열
  // dependency array
  // deps

  const onClickButton = (value) => {
    setCount(count + value);
  };
  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
