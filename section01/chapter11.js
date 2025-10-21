// 함수
// function greeting() {
//   console.log("hi");
// }

// console.log("호출전");
// greeting();
// console.log("호출후");

let area1 = getArea(10, 20); // 인수
console.log(area1);
let area2 = getArea(20, 30); // 인수
console.log(area2);
getArea(20, 100); // 인수

//호이스팅 : 선언문을 호출문 아래에 두어도 오류 x
function getArea(width, height) {
  // 매개 변수
  // let width = 10;
  // let height = 20;

  function another() {
    // 중첩 함수
    console.log("another");
  }
  another();

  let area = width * height;

  // console.log(area);
  return area; // 반환값(함수 결과값)
}
