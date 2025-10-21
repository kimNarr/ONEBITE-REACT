// 콜백함수
function main(value) {
  // console.log("1");
  // console.log("2");
  // value();
  // console.log("end");
}

// function sub() {
//   console.log("sub func");
// }

// main(sub);

main(() => {
  // console.log("sub func");
});

// function repeat(count) {
//   for (let idx = 1; idx <= count; idx++) {
//     console.log(idx);
//   }
// }

// function repeatDouble(count) {
//   for (let idx = 1; idx <= count; idx++) {
//     console.log(idx * 2);
//   }
// }

// repeat(5);
// repeatDouble(5);

function repeat(count, callback) {
  for (let idx = 1; idx <= count; idx++) {
    callback(idx);
  }
}

repeat(5, (idx) => {
  console.log(idx);
});
repeat(5, (idx) => {
  console.log(idx * 2);
});
