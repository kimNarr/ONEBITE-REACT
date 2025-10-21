// 1. 상수 객체
const animal = {
  type: "고양이",
  name: "나비",
  color: "black",
};

animal.age = 2;
animal.name = "먼지";
delete animal.color;

// animal = 123; // 불가능

// console.log(animal);

// 2. 메서드
// -> 값이 함수인 프로퍼티를 말함

const person = {
  name: "이정환",
  // 메서드 선언
  // 객체의 동작 정의
  sayHi: function () {
    console.log("안녕!");
  },

  sayHi: () => {
    console.log("안녕!");
  },

  sayHi() {
    console.log("안녕!");
  },
};

person.sayHi();
person["sayHi"]();
