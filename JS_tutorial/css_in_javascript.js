//const h1 = document.querySelector("div.hello:first-child h1");

//h1.innerHTML = "Hello";

// 3.6
// function handleTitleClick(){
//     const currentColor = h1.style.color;
//     let newColor;
//     if(currentColor === "blue"){
//         newColor = "tomato";
//     }else{
//         newColor = "blue";
//     }
//     h1.style.color = newColor;
//     // console.log(h1.style.color);
// }

// 3.7
function handleTitleClick(){
    // h1.className은 getter 면서 setter다
    // 우리는 className을 얻어올 수도 있지만 바꿀 수도 있다
    // h1.className = "active"
    // console.log(h1.className);

    // string을 변수에 저장해서 사용하는 것이 좋다
    //const clickedClass = "active"
    // if (h1.className === clickedClass){
    //     h1.className = "";
    // } else{
    //     h1.className = clickedClass;
    // }

    // 3.8
    const clickedClass = "active"

    // if(h1.classList.contains(clickedClass)){
    //     h1.classList.remove(clickedClass);
    // }else{
    //     h1.classList.add(clickedClass);
    // }

    //h1.classList.toggle(clickedClass);
}

h1.addEventListener("click", handleTitleClick);