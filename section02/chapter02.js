// 단락평가
// let varA = false;
// let varB = true;

// AND 연산자
// console.log(varA && varB);

// OR 연산자
// console.log(varB || varA);

// function returnFalse() {
//   console.log("false함수");
//   return false;
// }
// function returnTrue() {
//   console.log("true함수");
//   return true;
// }

// console.log(returnFalse() && returnTrue());
// console.log(returnTrue() || returnFalse());

// 단락평가 활용사례
function printName(person) {
  const name = person && person.name;
  console.log(name || "person 값 없음");
}

printName();
printName({ name: "Kim" });
