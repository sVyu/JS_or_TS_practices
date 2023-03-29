const guessNumberForm = document.querySelector("#guessNumberForm");
const inputRangeNumber = document.querySelector("#inputRangeNumber");
const inputWinningNumber = document.querySelector("#inputWinningNumber");
const resultSentences = document.querySelector("#resultSentences");
const numberResultSentence = document.querySelector("#resultSentences h4:nth-child(1)")
const winResultSentence = document.querySelector("#resultSentences h4:nth-child(2)")
const HIDDEN_CLASS = "hidden";

function handleNumberFormSubmit(event){
    event.preventDefault();

    // parseInt, radix
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    const RangeNumber = parseInt(inputRangeNumber.value, 10);
    const WinningNumber = parseInt(inputWinningNumber.value, 10);

    // 숫자인지에 대한 검사는 html 내에서 수행
    if((inputRangeNumber.value ==="") || (inputWinningNumber.value === "")){
        alert("[ ! ] 값을 입력해주세요 ㅡ !")
    }else if((RangeNumber < 0) || (WinningNumber < 0)){
        alert("[ ! ] 0 이상의 숫자값을 입력해주세요 ㅡ !");
    }else if(RangeNumber < WinningNumber){
        alert("[ ! ] WinningNumber를 범위값 내의 숫자로 지정해주세요 ㅡ !");
    }else{
        if(resultSentences.classList.contains(HIDDEN_CLASS))
            resultSentences.classList.remove(HIDDEN_CLASS);

        // ex. RangeNumber가 40인 경우 0부터 40까지의 값이 필요
        // const RandomNumber = Math.ceil(Math.random() * RangeNumber);
        // 0이 나올 확률이 적으므로 확률 공정성을 위해 다음과 같이 코딩 가능
        let RandomNumber = Math.ceil(Math.random() * (RangeNumber+1)) -1;
        if(RandomNumber == -1){
            RandomNumber = RangeNumber;
        }
 
        numberResultSentence.innerText = `You Chose: ${WinningNumber}, the machine chose: ${RandomNumber}.`;
        if(RandomNumber === WinningNumber){
            // 숫자를 맞춘 경우, 즉 게임에서 이긴 경우
            winResultSentence.innerText = "You Won!";
        } else{
           // 숫자를 맞추지 못한 경우, 즉 게임에서 진 경우
            winResultSentence.innerText = "You lost!";
        }
    }
}

guessNumberForm.addEventListener("submit", handleNumberFormSubmit);