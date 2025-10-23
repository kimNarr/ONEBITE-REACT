// function add(a, b, callback) {
//   setTimeout(() => {
//     const sum = a + b;
//     callback(sum);
//   }, 3000);
// }

// add(1, 2, (value) => {
//   console.log(value);
// });

// 음식 주문하는 상황
function orderFood(callback) {
  setTimeout(() => {
    const food = "라면";
    callback(food);
  }, 3000);
}

function coolDownFood(food, callback) {
  setTimeout(() => {
    const coolDownedFood = `식은 ${food}`;
    callback(coolDownedFood);
  }, 3000);
}

function eatFood(coolDownedFood, callback) {
  setTimeout(() => {
    const eatedFood = `${coolDownedFood} 먹음`;
    callback(eatedFood);
  }, 3000);
}

orderFood((food) => {
  console.log(food);

  coolDownFood(food, (coolDownedFood) => {
    console.log(coolDownedFood);

    eatFood(coolDownedFood, (eatedFood) => {
      console.log(eatedFood);
    });
  });
});
