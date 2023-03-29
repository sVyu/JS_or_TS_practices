const playerName = "vyu";
// const playerPoints = 121212;
// const playerHandsome = false;
// const playerFat = "little bit";

// consolog.log()
// array.push()
// player.name
// player.points
// player.handsome

// const player = ["vyu", 1212, false, "little bit"]
// player[0] == name
// player[1] == points

// objects
// in objects, we use ':', instead of '='
const player = {
    name : "vyu",
    points : 10,
    fat : true,
};

//console.log(player);
//console.log(player.name);
//console.log(player["points"]);

// we can change value in object with no problem
console.log(player);
player.fat = false;             // update
player.points += 15;
player.lastName = "potato";     // add,, executed ! wow ..
console.log(player);