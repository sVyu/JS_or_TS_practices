const {odd, even} = require('./var');
const checkNumber = require('./func');

function checkStringOddorEven(str){
    if (str.length%2){
        return odd;
    }else{
        return even;
    }
}

console.log(checkNumber(10))
console.log(checkStringOddorEven('hello'));