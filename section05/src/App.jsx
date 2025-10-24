import "./App.css";
import Bulb from "./components/Bulb";
import Counter from "./components/Counter";

// import Main from "./components/Main";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Button from "./components/Button";

// 리렌더링
// 1. 자신이 관리하는 state가 변경 되었을 때
// 2. 자신이 제공 받는 props가 변경 되었을 때
// 3. 부모 컴포넌트가 리렌더링 될 때
//

function App() {
  // const buttonProps = {
  //   text: "메일",
  //   color: "red",
  //   a: 1,
  //   b: 2,
  //   c: 3,
  // };

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
      <Bulb />
      <Counter />
    </>
  );
}

export default App;
