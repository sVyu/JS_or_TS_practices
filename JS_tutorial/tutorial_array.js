const mon = "mon";
const tue = "tue";
const wed = "wed";
const thu = "thu";
const fri = "fri";
const sat = "sat";
const sun = "sun";

// '+' → ',' 
// select set of '+' command : ctrl + D
// const daysOfWeek = mon , tue , wed , thu , fri , sat , sun;
// console.log(daysOfWeek);

const daysOfWeek = ["mon" , "tue" , "wed" , "thu" , "fri" , "sat" , "sun"];
// console.log(daysOfWeek);
// console.log(daysOfWeek[0+0]);

// Get Item from Array
// console.log(daysOfWeek[4]);
// when making to-do list, we can use array like this


// Add one more day to the Array
console.log(daysOfWeek);
daysOfWeek.push("haha");
console.log(daysOfWeek);

// pop deletes last index item
// daysOfWeek.pop("wed");
// console.log(daysOfWeek);
