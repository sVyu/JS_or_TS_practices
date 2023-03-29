const colors = [
    "#ef5777",
    "#575fcf",
    "#4bcffa",
    "#34e7e4",
    "#0be881",
    "#f53b57",
    "#3c40c6",
    "#0fbcf9",
    "#00d8d6",
    "#05c46b",
    "#ffc048",
    "#ffdd59",
    "#ff5e57",
    "#d2dae2",
    "#485460",
    "#ffa801",
    "#ffd32a",
    "#ff3f34"
];

const colorChangeButton = document.querySelector("body button");

// linear-gradient()
// https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient()

function colorChange() {
    const randomColorsArray = [ getRandomColor(), getRandomColor()];
    // document.body.style.background = "green";
    document.body.style.background = `linear-gradient(135deg, ${randomColorsArray[0]}, ${randomColorsArray[1]})`;
}

function getRandomColor(){
    const randomNumber = Math.floor(Math.random() * (colors.length));
    return colors[randomNumber];
}

colorChangeButton.addEventListener("click", colorChange);