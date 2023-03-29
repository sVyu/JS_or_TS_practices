const age = 96;

function calculateKrAge(ageOfForeigner){
    return ageOfForeigner + 2;
}

const krAge = calculateKrAge(age);

console.log(krAge);

const calculator = {
    plus:function(a,b){
        // alert(a+b);
        return (a+b);
    },
    minus:function(a,b){
        return (a-b);
    },
    times:function(a,b){
        return (a*b);
    },
    divide:function(a,b){
        return (a/b);
    },
    power:function(a,b){ // 제곱
        return (a**b);
    },
};

let a = 2;
let b = 3;

//calculator.plus(a, b);

const plusResult = calculator.plus(a, b);
const minusResult = calculator.minus(plusResult, 10);
const timesResult = calculator.times(10, minusResult);
const divideResult = calculator.divide(timesResult, plusResult);
const powerResult = calculator.power(divideResult, minusResult);