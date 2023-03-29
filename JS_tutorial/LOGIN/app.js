// #4.0 Input Values
// const loginForm = document.querySelector("#login-form")
// const loginInput = loginForm.querySelector("input");
// const loginButton = loginForm.querySelector("button");

// const loginInput = document.querySelector("#login-form input");
// const loginButton = document.querySelector("#login-form button");

// // 4.1 Form Submission
// function onLoginBtnClick(){
//     // console.log("click");
//     // console.dir(loginInput);
//     // console.log("hello", loginInput.value);

//     const username = loginInput.value;
//     // if(username === ""){
//     //     alert("Please write your name");
//     // }else if(username.length >= 15){
//     //     alert("Your name is too long.");
//     // }
//     console.log("username");
// }

// loginButton.addEventListener("click", onLoginBtnClick)


// 4.2 Events
// 4.4 Getting Username
// 4.5 Saving Username
// 4.6 Loading Username
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
// const link = document.querySelector("a");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event){
    // we can check event info when it's executed -- my expression
    // we can check info about the event that just happened -- nico's expression
    // and it prevents refreshing of browser
    event.preventDefault();
    console.log(event);
    loginForm.classList.add(HIDDEN_CLASSNAME);

    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);

    // greeting.innerText = "Hello " + username;
    // greeting.innerText = `Hello ${username}`;   // so sexy method
    // greeting.classList.remove(HIDDEN_CLASSNAME);
    paintGreetings(username);
}

function paintGreetings(username){
    greeting.classList.remove(HIDDEN_CLASSNAME);
    greeting.innerText = `Hello ${username} !`;
}

// 4.3 Events part Two
// function handleLinkClick(event){
//     // console.log(event);
//     // alert("clicked!");

//     event.preventDefault();
//     console.dir(event);
// }

// loginForm.addEventListener("submit", onLoginSubmit);
// link.addEventListener("click", handleLinkClick);

const savedUsername = localStorage.getItem(USERNAME_KEY);
// console.log(savedUsername);

if(savedUsername === null){
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else{
    // show the greetings
    // greeting.classList.remove(HIDDEN_CLASSNAME);
    // greeting.innerText = `Hello ${savedUsername} !`;
    // paintGreetings(savedUsername);
    paintGreetings(savedUsername);
}
