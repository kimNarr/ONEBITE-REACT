// 비동기 작업 처리 Promise
// 대기(pending) >> 성공 fulfilled / 실패 rejected

// const promise = new Promise((resolve, reject) => {
//   // 비동기 작업 수행
//   // excutor
//   setTimeout(() => {
//     console.log("Hi");
//     resolve("Hi success");
//     reject("failed....why?");
//   }, 3000);
// });

// setTimeout(() => {
//   console.log("Hi");
// }, 3000);

// then 메서드 / catch 메서드
// promise chaining
// promise
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

function addTen(num) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof num === "number") {
        resolve(num + 10);
      } else {
        reject("num이 숫자가 아닙니다.");
      }
    }, 3000);
  });

  return promise;
}

addTen(0)
  .then((result) => {
    console.log(result);
    return addTen(result);
  })
  .then((result) => {
    console.log(result);
    return addTen(result);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
