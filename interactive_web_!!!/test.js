// console.log("hi");
const $input = document.getElementsByTagName("input");
const $value = document.querySelector("h1");
const $button = document.querySelector("button");

// console.log(Array.from(Array($input.length).keys()));
Array.from(Array($input.length).keys()).map((i) => {
  $input[i].value = parseInt(Math.random() * 100);
});

// $input[0].value = parseInt(Math.random() * 100);
// $input[1].value = parseInt(Math.random() * 100);

const setValue = () => {
  $value.innerText = `정답은 ${
    Number($input[0].value) + Number($input[1].value)
  }입니다.`;
};

// $button.addEventListener("click", () => {
//   setValue();
// });

setValue();
