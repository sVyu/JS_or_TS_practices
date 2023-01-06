// alert("hello")
const canvas = document.querySelector("canvas");

// ctx : context
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

// ctx.fillRect(30, 30, 50, 50);
// ctx.fillRect(30, 100, 50, 100);

// // ~ 1.2
// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// // ctx.stroke();
// ctx.fill();

// ctx.beginPath();
// ctx.rect(250, 250, 100, 100);
// ctx.rect(350, 350, 100, 100);
// ctx.fillStyle = "red"
// ctx.fill();
// // setTimeout(() => {
// //     ctx.fill();
// // }, 3000);

// # 1.3 ~
// lineTo
// ctx.moveTo(50, 50); // x, y
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// // ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// // ctx.stroke();
// ctx.fill();

// # 1.4 ~
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// // ctx.lineWidth = 2;
// // ctx.strokeRect(300, 300, 50, 100);
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100); // (200 + (400+50)) /2
// ctx.lineTo(450, 200);
// ctx.fill();


// #1.5 Drawing Project Two
// ctx.fillRect(210, 200, 15, 100);
// ctx.fillRect(355, 200, 15, 100);
// ctx.fillRect(260, 200, 60, 200);

// ctx.arc(290, 130 + 15, 40, 0, 2*Math.PI);
// ctx.fill();

// ctx.beginPath(); // this is important !!
// ctx.fillStyle = "cyan";
// ctx.arc(275, 130 + 15, 5, 1*Math.PI, 0*Math.PI);
// ctx.arc(313, 130 + 15, 5, 1*Math.PI, 0*Math.PI);
// ctx.fill();

