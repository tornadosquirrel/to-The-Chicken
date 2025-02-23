const container = document.getElementById('container');
const timer = document.getElementById('timer');
const resultNow = document.getElementById('resultNow');
const resultBest = document.getElementById('resultBest');
const stageSound = new Audio('./resources/sound/MP_Tiny Button Push.mp3');
const clearSound = new Audio('./resources/sound/MP_와우 (단체).mp3');
const playGame = document.getElementById('playGame');
const hardmode = document.getElementById('hardmode');
const arrows = document.getElementsByClassName('arrows');

let field = 4;  //초기 화살표 갯수
let cnt = 0;  // arrows 배열의 인덱스를 찾기 위한 변수
let personalBest = 0;  // 개인 최고 기록
let hardmodeBest = 0;
let elapsed = 0;
let second = 0;
let bestStorage = { "normal": 0, "hard": 0 };
let startTime = Date.now();
let isGameOver = true;

function createField() {  //필드 제조
  for (let i = 0; i < field; i++) {
    let arrow = document.createElement('div');
    arrow.tabIndex = 0;  // 포커스를 받을 수 있도록 설정
    arrowShape = Math.floor(Math.random() * 4);
    if (arrowShape == 0) {
      arrow.className = 'arrows arrowUp';
    }
    else if (arrowShape == 1) {
      arrow.className = 'arrows arrowDown';
    }
    else if (arrowShape == 2) {
      arrow.className = 'arrows arrowLeft';
    }
    else {
      arrow.className = 'arrows arrowRight';
    }
    container.appendChild(arrow);
  }
}

function eliminateArrow(shape) {  // 화살표 제거
  if (isGameOver) {
    document.activeElement.blur();  // 포커스 해제
    return;
  }

  const arrows = document.getElementsByClassName('arrows');  // arrows 변수를 함수 내에서 정의
  const popSound = new Audio('./resources/sound/MP_Blop.mp3');
  popSound.play();
  if (cnt < arrows.length - 1) {
    if (shape === "up") {
      if (arrows[cnt].className === "arrows arrowUp") {
        arrows[cnt].style.opacity = 0;
        arrows[cnt].style.scale = 1.1;
        cnt++;
        arrows[cnt].focus();  // 다음 화살표에 포커스
      }
    }
    else if (shape === "down") {
      if (arrows[cnt].className === "arrows arrowDown") {
        arrows[cnt].style.opacity = 0;
        arrows[cnt].style.scale = 1.1;
        cnt++;
        arrows[cnt].focus();
      }
    }
    else if (shape === "left") {
      if (arrows[cnt].className === "arrows arrowLeft") {
        arrows[cnt].style.opacity = 0;
        arrows[cnt].style.scale = 1.1;
        cnt++;
        arrows[cnt].focus();
      }
    }
    else {
      if (arrows[cnt].className === "arrows arrowRight") {
        arrows[cnt].style.opacity = 0;
        arrows[cnt].style.scale = 1.1;
        cnt++;
        arrows[cnt].focus();
      }
    }
  }
  else if (field < 14) {
    stageSound.play();
    container.innerHTML = "";
    field += 2;
    cnt = 0;
    start();
  }
  else {
    isGameOver = true;
    clearSound.play();
    stopTime();
    if (hardmode.textContent === "일반모드") { //일반모드 최고기록 저장
      if (personalBest > elapsed || personalBest === 0) {
        personalBest = elapsed;
        bestStorage["hard"] = timer.textContent;
        resultBest.textContent = `최고 기록: ${timer.textContent}`;
      }
    }
    else if (hardmode.textContent === "하드모드") { //하드모드 최고기록 저장
      if (hardmodeBest > elapsed || hardmodeBest === 0) {
        hardmodeBest = elapsed;
        bestStorage["normal"] = timer.textContent;
        resultBest.textContent = `최고 기록: ${timer.textContent}`;
      }
    }
    resultNow.textContent = `현재 기록: ${timer.textContent}`;
    container.innerHTML = "";
    field = 4;
    cnt = 0;
  }
}

function start() {
  createField();
  playGame.textContent = "재도전(f4)"

  const arrows = document.getElementsByClassName('arrows');
  const arrowUp = document.getElementsByClassName('arrowUp');
  const arrowDown = document.getElementsByClassName('arrowDown');
  const arrowLeft = document.getElementsByClassName('arrowLeft');
  const arrowRight = document.getElementsByClassName('arrowRight');

  arrows[0].focus();  //첫번째 화살표에 포커스

  // 포커스가 다른 곳으로 이동하지 않도록 설정
  document.addEventListener('focusout', function () {
    if (isGameOver) return;
    arrows[cnt].focus();
  });

  for (let i = 0; i < arrowUp.length; i++) {
    arrowUp[i].addEventListener('keydown', function (event) {
      if (event.key === 'ArrowUp') {
        eliminateArrow("up");
      }
      else if (event.key === 'ArrowDown') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();

      }
      else if (event.key === 'ArrowLeft') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();

      }
      else if (event.key === 'ArrowRight') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();
      }
    });
  }

  for (let i = 0; i < arrowDown.length; i++) {
    arrowDown[i].addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown') {
        eliminateArrow("down");

      }
      else if (event.key === 'ArrowUp') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();

      }
      else if (event.key === 'ArrowLeft') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();

      }
      else if (event.key === 'ArrowRight') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();
      }
    });
  }

  for (let i = 0; i < arrowLeft.length; i++) {
    arrowLeft[i].addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        eliminateArrow("left");
      }
      else if (event.key === 'ArrowUp') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();
      }
      else if (event.key === 'ArrowDown') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();
      }
      else if (event.key === 'ArrowRight') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();
      }
    });
  }

  for (let i = 0; i < arrowRight.length; i++) {
    arrowRight[i].addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') {
        eliminateArrow("right");
      }
      else if (event.key === 'ArrowUp') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();
      }
      else if (event.key === 'ArrowDown') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();
      }
      else if (event.key === 'ArrowLeft') {
        startTime -= 200;
        const failSound = new Audio('./resources/sound/MP_Dog Toy Squeaks.mp3');
        failSound.play();
      }
    });
  }
}

let animationId = null; // requestAnimationFrame ID를 저장할 변수
let isRunning = false; // 실행 여부 체크

function countTime() {
  if (isRunning) return; // 이미 실행 중이면 중복 실행 방지
  isRunning = true;


  function updateTime() {
    if (!isRunning) return; // 실행 중이 아니면 즉시 종료
    elapsed = (Date.now() - startTime) / 1000; // 경과 시간(초) 계산
    second = Math.floor(elapsed * 10) / 10; // 소수점 한 자리까지 표시
    let minute = 0;
    if (second >= 60) {
      minute = Math.floor(second / 60);
      second = Math.floor((elapsed - minute * 60) * 10) / 10;
    }
    let formattedMinute = String(minute).padStart(2, "0"); // 두 자리로 표시
    if (second === Math.floor(second)) {
      timer.textContent = `${formattedMinute}:${second}.0`;
    }
    else {
      timer.textContent = `${formattedMinute}:${second}`;
    }
    animationId = requestAnimationFrame(updateTime); // 반복 실행
  }

  animationId = requestAnimationFrame(updateTime);
}

function stopTime() {
  isRunning = false; // 실행 상태 변경
  if (animationId) {
    cancelAnimationFrame(animationId); // 타이머 중지
    animationId = null; // animationId 초기화
  }
}

function startGame() {
  isGameOver = false;

  const stageSound = new Audio('./resources/sound/MP_Tiny Button Push.mp3');
  stageSound.play();
  container.innerHTML = "";
  field = 4;
  cnt = 0;
  startTime = Date.now();
  countTime();
  start();
}

hardmode.addEventListener('click', function () {
  if (hardmode.textContent === "일반모드") {
    warn.style.visibility = "hidden";
    hardmode.textContent = "하드모드";
    if (bestStorage["normal"] === 0) {
      resultBest.textContent = "최고 기록: 없음";
    }
    else {
      resultBest.textContent = `최고 기록: ${bestStorage["normal"]}`;
    }
    container.style.transform = "rotateY(0deg)";
    startGame();
  }
  else if (hardmode.textContent === "하드모드") {
    warn.style.visibility = "visible";
    hardmode.textContent = "일반모드";
    if (bestStorage["hard"] === 0) {
      resultBest.textContent = "최고 기록: 없음";
    }
    else {
      resultBest.textContent = `최고 기록: ${bestStorage["hard"]}`;
    }
    container.style.transform = "rotateY(9999deg)";
    startGame();
  }
});

playGame.addEventListener('click', startGame);

window.addEventListener('keydown', function (event) {
  if (event.key === "F4") {
    startGame();
  }
});
