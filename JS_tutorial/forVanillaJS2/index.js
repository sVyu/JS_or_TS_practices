// backgroundClass array
const backgroundClass = [
    "skyblueBackground",
    "purpleBackground",
    "goldBackground"
  ];
  
  const h1 = document.querySelector("body h1");
  const whiteTextClass = "whiteText";
  
  // 조건문에 수행할 size 크기는 임의로 지정하였습니다 !
  const documentBody = document.body;
  function handleWindowResize() {
    // window size 조절 시 h1을 흰 색으로
    if (!h1.classList.contains(whiteTextClass)) {
      h1.classList.add(whiteTextClass);
    }
  
    // innerWidth : 브라우저의 가로 길이를 나타내는 Window 객체의 프로퍼티
    // https://developer.mozilla.org/ko/docs/Web/API/Window/innerWidth
    if (window.innerWidth < 400) {
      // 기존 backgroundClass가 있다면 제거
      if (documentBody.classList.contains(backgroundClass[1])) {
        documentBody.classList.remove(backgroundClass[1]);
      }
      // backgroundClass[0] 즉, skyblueBackground class 추가
      documentBody.classList.add(backgroundClass[0]);
    } else if (window.innerWidth < 800) {
      // 기존 backgroundClass가 있다면 제거
      if (documentBody.classList.contains(backgroundClass[0])) {
        documentBody.classList.remove(backgroundClass[0]);
      } else if (documentBody.classList.contains(backgroundClass[2])) {
        documentBody.classList.remove(backgroundClass[2]);
      }
      // backgroundClass[1] 즉, purpleBackground class 추가
      documentBody.classList.add(backgroundClass[1]);
    } else {
      // 기존 backgroundClass가 있다면 제거
      if (documentBody.classList.contains(backgroundClass[1])) {
        documentBody.classList.remove(backgroundClass[1]);
      }
      // backgroundClass[2] 즉, goldBackground class 추가
      documentBody.classList.add(backgroundClass[2]);
    }
  }
  
  window.addEventListener("resize", handleWindowResize);
  