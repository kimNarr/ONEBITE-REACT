import "./App.css";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";

function App() {
  const buttonProps = {
    text: "메일",
    color: "red",
    a: 1,
    b: 2,
    c: 3,
  };

  return (
    <>
      {/* <Header />
      <Main />
      <Footer /> */}
      <Button {...buttonProps} />
      <Button text={"카페"}>
        <Header />
      </Button>
      <Button text={"블로그"}>
        <div>자식요소</div>
      </Button>
    </>
  );
}

export default App;
