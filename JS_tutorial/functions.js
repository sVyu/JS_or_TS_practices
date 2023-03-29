// console.log("Hello my name is Nico");
// console.log("Hello my name is Dal");
// console.log("Hello my name is Shigatsu");
// console.log("Hello my name is Flynn");

function sayHello(nameOfPerson, age){
    console.log("Hello my name is " + nameOfPerson + " and I'm " + age);
}

// alert("haha");
console.log();

sayHello("nico", 10);
sayHello("dal", 23);
sayHello("lynn", 21);


function plus(firstNumber, secondNumber){
    console.log(firstNumber + secondNumber);
}

function divide(a, b){
    console.log(a / b);
}

plus(2, 5);
divide(3, 7);

const player = {
    name : "vyu",
    sayHello: function(otherPersonsName){
        console.log("hello " + otherPersonsName + " nice to meet you !");
    }
}

console.log(player.name);
player.sayHello("lynn");
player.sayHello("nico");


// Recap 2
// it works,,

function minusFive(potato){
    console.log(potato - 5);
}

minusFive(6, 10, 12, 34, 4, 5, 6, 7);

const calculator = {
    add:function(a,b){
        // alert(a+b);
        console.log(a+b);
    },
    sub:function(a,b){
        console.log(a-b);
    },
    mul:function(a,b){
        console.log(a*b);
    },
    div:function(a,b){
        console.log(a/b);
    },
    powerof:function(a,b){ // 제곱
        console.log(a**b);
    },
};

let a = 5;
let b = 3;

calculator.add(a, b);       // plus
calculator.sub(a, b);       // minus
calculator.mul(a, b);       // times
calculator.div(a, b);       // divide
calculator.powerof(a, b);   // power