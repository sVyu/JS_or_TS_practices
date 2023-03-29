// 3.3 ~ 3.5 Events
const title_body = document.querySelector("div.hello:first-child h1");

title_body.innerHTML = "Hello";

// wow
title_body.style.color = "blue"

console.dir(title_body);

// click event and function
function handleTitleClick(){
    title_body.style.color="red"
    console.log("title_body was clicked!");
}

function handleMouseEnter(){
    //console.log("mouse is here!");
    title_body.innerText="Mouse is here!";
}

function handleMouseLeave(){
    title_body.innerText = "Mouse is gone!";
}

function handleWindowResize(){
    document.body.style.backgroundColor = "tomato";
}

function handleWindowCopy(){
    alert("copier!");
}

function handleWindowOffline(){
    alert("SOS no wifi");
}

function handleWindowOnline(){
    alert("ALL GOOOD");
}
// title_body.addEventListener("click", handleTitleClick);
// title_body.addEventListener("mouseenter", handleMouseEnter);
// title_body.addEventListener("mouseleave", handleMouseLeave);
// title_body.removeEventListener("mouseleave", handleMouseLeave);

title_body.onclick = handleTitleClick;
title_body.onmouseenter = handleMouseEnter;
title_body.onmouseleave = handleMouseLeave;

window.addEventListener("resize", handleWindowResize);
window.addEventListener("copy", handleWindowCopy);

window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online", handleWindowOnline);