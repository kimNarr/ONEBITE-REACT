// 함수 선언문
function funcA() {
  // console.log("funcA");
}

let varA = funcA;
varA();

// 함수 표현식
// 변수에 담긴 값
// 함수 표현식은 호이스팅 대상이 안됨
let varB = function () {
  // 익명함수
  // console.log("funcB");
};

varB();

// 화살표 함수
let varC = (value) => {
  console.log(value);
  return value + 1;
};
let varD = (value) => value + 1;

console.log(varC(20));
console.log(varD(10));
