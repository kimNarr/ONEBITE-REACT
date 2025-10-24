import "./Main.css";

// JSX 주의  사항
// 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다.(if문, for문 사용 불가)
// 2. 숫자, 문자열, 배열 값만 렌더링 된다
// 3. 모든 태그는 닫혀있어야 한다.
// 4. 최사위 태그는 하나여야 한다.
const Main = () => {
  // const number = 10;
  // const obj = { a: 1 };

  const user = {
    name: "Kim",
    isLogin: true,
  };

  const styledButton = {
    backgroundColor: "green",
    color: "#fff",
  };

  // return (
  //   <main>
  //     <h2>Main</h2>
  //     <h3>{number % 2 === 0 ? "짝수" : "홀수"}</h3>
  //     {10}
  //     {"Hello"}
  //     {number}
  //     {[1, 2, 3, 4, 5]}
  //     {true}
  //     {undefined}
  //     {null}
  //     {obj.a}
  //   </main>
  // );

  // return (
  //   <>{user.isLogin ? <button>로그아웃</button> : <button>로그인</button>}</>
  // );

  if (user.isLogin) {
    return <button style={styledButton}>로그아웃</button>;
  } else {
    return <button className="logout">로그인</button>;
  }
};

export default Main;
