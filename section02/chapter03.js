// 1. 배열 구조 분해 할당
let arr = [1, 2, 3];

let { one, two, three, four = 4 } = arr; // 네번째 값이 없으므로 기본값 4 할당
// console.log(one, two, three, four);

// 2. 객체 구조 분해 할당
let person = {
  name: "Kim",
  age: 30,
  address: "Seoul",
};

let { name, age: myAge, address } = person;
// console.log(name, myAge, address);

const func = ({ name, myAge, address }) => {
  console.log(name, myAge, address);
};

func(person);
