// prompt → javascript will be waiting for you
// we can't use any css on pop-up window
// very old method but we can easily use
// const age = prompt("How old are you?"); 

//console.log(age);           // 26
//console.log(typeof age);    // string
//console.log(typeof "15", typeof parseInt("15"));    // string number
//console.log(age, parseInt(age));

//const age = parseInt(prompt("How old are you?"));
let age = parseInt(prompt("How old are you?"));
checkAge();

function checkAge(){
    if(isNaN(age) || age < 0){
        console.log("Please write a real positive number !")
        age = parseInt(prompt("How old are you?"));
        checkAge();
    }else if (age < 18){
        //console.log("Thank you for writing your age.");
        console.log("You are too young.");
    }else if(age >= 18 && age <= 50) {
        console.log("You can drink");
    }else if(age > 50 && age <= 80) {
        console.log("You should exercise");
    }else if (age === 100){
        console.log("wow you are wise");
    }else if(age > 80){
        console.log("You can do whatever you want.");
    }
}

