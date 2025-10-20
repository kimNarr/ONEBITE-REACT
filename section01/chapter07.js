// 1. 대입 연산자
let var1 = 1;

// 2. 산술 연산자
let num1 = 3 + 2;
let num2 = 3 - 2;
let num3 = 3 * 2;
let num4 = 3 / 2;
let num5 = 3 % 2;

let calc = 1 + 2 * 10;

// 3. 복합 대입 연산자
let num7 = 10;
num7 += 20;
num7 -= 20;
num7 *= 20;
num7 /= 20;
num7 %= 10;
// console.log(num7);

// 4. 증감 연산자
let num8 = 10;
++num8; // 전위연산: 현재 라인에서 연산적용
num8++; // 후위연산: 다음 라인부터 연산 적용
// console.log(num8);

// 5. 논리 연산자
let or = true || false; //하나만 참이어도 됨

let and = true && false; // 모두 참이어야 됨

let not = !true;

// 6. 비교 연산자
let comp1 = 1 === "1";
let comp2 = 1 !== 2;

let comp3 = 2 > 1;
let comp4 = 2 < 1;

let comp5 = 2 >= 2;
let comp6 = 2 <= 2;