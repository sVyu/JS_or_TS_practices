// 5.0 Intervals
// 5.1 Timeouts and Dates
// 5.2 PadStart
const clock = document.querySelector("h2#clock");

// clock.innerText = "lalala";
// function sayHello(){
//     console.log("hello");
// }

// setInterval은 지정한 시간에 따라 반복해서 수행
// setInterval(sayHello, 1000);

// setTimeout은 지정한 시간 뒤에 한 번만 수행
// setTimeout(sayHello, 3000);

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    // clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds().toString().padStart(2,"0")}`;
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);