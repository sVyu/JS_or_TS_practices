const searchInputText = document.querySelector('.SearchInput__input');
const suggestionBox = document.querySelector('.Suggestion');
const searchInput = document.querySelector('.SearchInput');

let jsonData = "";

const onInputChange = async () => {
    if (searchInputText.value != ''){
        jsonData = await(await fetch(`https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=${searchInputText.value}`)).json();
        // console.log(jsonData);
        if (jsonData.length === 0){
            suggestionBox.style.display = "none";
            return;
        }
        suggestionBox.style.display = "block";

        suggestionBox.innerHTML = '<ul>';
        jsonData.map((data) => suggestionBox.innerHTML += `<li>${data}</li>`)
        suggestionBox.innerHTML += '</ul>';

    } else{
        jsonData = "";
        suggestionBox.style.display = "none";
    }
};


function keyUpHandler (event) {
    if (event.keyCode == 38){
        console.log("Up pressed");
        console.log(event);
    } else if (event.keyCode == 40) {
        console.log("down pressed");
        console.log(event);
    }
}

function onSubmit (event) {
    event.preventDefault();
}

searchInputText.addEventListener("input", onInputChange);
searchInputText.addEventListener("keyup", keyUpHandler, false);
searchInput.addEventListener("submit", onSubmit);