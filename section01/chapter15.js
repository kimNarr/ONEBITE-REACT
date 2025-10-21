// 1. 객체 생성
let obj1 = new Object(); // 객체 생성자
let obj2 = {}; // 객체 리터럴

// 2. 객체 프로퍼티(객체 속성) key : value
let person = {
  name: "Kim",
  age: 27,
  hobby: "game",
  extra: {},
  10: 20,
  "like cat": 11, // key 띄어쓰기 >> "" 쌍따옴표로 표기
};

// 3. 객체 프로퍼티를 다루는 방법
// 3.1 특정 프로퍼티에 접근 (점 표기법, 괄호 표기법)
let name = person.name;
// console.log(name);

let age = person["age"];
// console.log(age);

let property = "hobby";
let hobby = person[property];

// console.log(hobby);

// 3.2 새로운 프로퍼티 추가
person.money = "100";
person["food"] = "족발";

// console.log(person);

// 3.3 프로퍼티를 수정하는 방법
person.job = "educator";
person["food"] = "초콜릿";

// console.log(person);

// 3.4 프로퍼티 삭제
delete person.job;
delete person["food"];

// console.log(person);

// 3.5 프로퍼티의 존재 유무를 확인하는 방법 (in 연산자)
let result1 = "name" in person;
let result2 = "job" in person;

console.log(result1);
console.log(result2);
