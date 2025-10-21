// 반복문
// for (초기식; 조건식; 증감식) {
//   console.log("반복문")
// }
// for (let idx = 0; idx < 5; idx++) {
//   console.log("반복문" + idx);
// }

for (let idx = 0; idx <= 10; idx++) {
  if (idx % 2 === 0) {
    continue;
  }
  console.log("반복문" + idx);
  if (idx === 5) {
    break;
  }
}
