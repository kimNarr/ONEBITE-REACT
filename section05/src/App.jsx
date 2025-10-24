import "./App.css";
import { useState } from "react";
// import Main from "./components/Main";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Button from "./components/Button";

function App() {
  // const buttonProps = {
  //   text: "메일",
  //   color: "red",
  //   a: 1,
  //   b: 2,
  //   c: 3,
  // };

  const [count, setCount] = useState(0);

  const [light, setLight] = useState("off");

  return (
    <>
      {/* <Header />
      <Main />
      <Footer /> */}

      {/* <Button {...buttonProps} />
      <Button text={"카페"}>
        <Header />
      </Button>
      <Button text={"블로그"}>
        <div>자식요소</div>
      </Button> */}
      <div>
        <h1>{light}</h1>
        <button
          onClick={() => {
            setLight(light === "on" ? "off" : "on");
          }}
        >
          {light === "on" ? "끄기" : "켜기"}
        </button>
      </div>
      <div>
        <h1>{count}</h1>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
    </>
  );
}

export default App;
