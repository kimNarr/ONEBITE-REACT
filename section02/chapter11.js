// 동기 : 여러 작업이 있을 때 순서대로 하나씩 처리하는 방식
// 쓰레드(Thread) - TaskA 실행 > 완료 > TaskB 실행 > 완료 > TaskC 실행 > 완료
// TaskA(0.2초) > TaskB(10초) > TaskC(0.3초)
// >> TaskB 작업이 오래 걸리면 전체 작업이 지연되는 문제 발생

// javascript는 기본적으로 동기적으로 코드를 실행한다.

// 비동기 : 작업을 요청하고 바로 다음작업 실행.

console.log(1);

setTimeout(() => {
  console.log(2);
}, 3000);

console.log(3);
