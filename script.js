var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var drawStatus;
var slimeList = [];
var k = 0;

var PLAYER = {
  x: 400,
  y: 640,
  width: 80,
  height: 80,
  xDirection: 50,
  yDirection: 50,
  radius: 5,
  playerImage: new Image(),
};

var BORDER = {
  widthLeft: 40,
  widthRight: 910,
  height: 710,
};

var HEARTS = {
  x: 100,
  y: 130,
  heartImage0: new Image(),
  heartImage1: new Image(),
  heartImage2: new Image(),
  heartImage3: new Image(),
};

var BG = {
  x: 0,
  y: 0,
  width: 950,
  height: 750,
  backGroundImage: new Image(),
  boardImage: new Image(),
};

var RESTART = {
  x: 330,
  y: 340,
  height: 50,
  width: 300,
  restartButtonImage: new Image(),
};

var PLAY = {
  x: 330,
  y: 330,
  height: 50,
  width: 300,
  playButtonImage: new Image(),
};
var GAMENAME = {
  x: 260,
  y: 150,
  height: 60,
  width: 400,
  gameName: new Image(),
};
canvas.height = BG.height;
canvas.width = BG.width;

function DrawBG() {
  BG.backGroundImage.src = "image/bg.png";
  BG.backGroundImage.onload = function () {
    canvasContext.drawImage(BG.backGroundImage, 0, 0);
  };
}

function DrawBoard() {
  BG.boardImage.src = "image/board.png";
  BG.boardImage.onload = function () {
    canvasContext.drawImage(BG.boardImage, 0, 0);
  };
}

function DrawGameName() {
  GAMENAME.gameName.src = "image/gamename.png";
  GAMENAME.gameName.onload = function () {
    canvasContext.drawImage(
      GAMENAME.gameName,
      GAMENAME.x,
      GAMENAME.y,
      GAMENAME.width,
      GAMENAME.height
    );
  };
}

function DrawPlayer() {
  PLAYER.playerImage.src = "image/player.png";
  PLAYER.playerImage.onload = function () {
    canvasContext.drawImage(
      PLAYER.playerImage,
      PLAYER.x,
      PLAYER.y,
      PLAYER.width,
      PLAYER.height
    );
  };
}

function DrawHeart0() {
  HEARTS.heartImage0.src = "image/0heart.png";
  HEARTS.heartImage0.onload = function () {
    canvasContext.drawImage(HEARTS.heartImage0, HEARTS.x, HEARTS.y);
  };
}

function DrawHeart1() {
  HEARTS.heartImage1.src = "image/1heart.png";
  HEARTS.heartImage1.onload = function () {
    canvasContext.drawImage(HEARTS.heartImage1, HEARTS.x, HEARTS.y);
  };
}

function DrawHeart2() {
  HEARTS.heartImage2.src = "image/2heart.png";
  HEARTS.heartImage2.onload = function () {
    canvasContext.drawImage(HEARTS.heartImage2, HEARTS.x, HEARTS.y);
  };
}

function DrawHeart3() {
  HEARTS.heartImage3.src = "image/3heart.png";
  HEARTS.heartImage3.onload = function () {
    canvasContext.drawImage(HEARTS.heartImage3, HEARTS.x, HEARTS.y);
  };
}

function DrawPlayButton() {
  PLAY.playButtonImage.src = "image/playButtonImage.png";
  PLAY.playButtonImage.onload = function () {
    canvasContext.drawImage(
      PLAY.playButtonImage,
      PLAY.x,
      PLAY.y,
      PLAY.width,
      PLAY.height
    );
  };
}

function DrawRestartButton() {
  RESTART.restartButtonImage.src = "image/restartButtonImage.png";
  RESTART.restartButtonImage.onload = function () {
    canvasContext.drawImage(
      RESTART.restartButtonImage,
      RESTART.x,
      RESTART.y,
      RESTART.width,
      RESTART.height
    );
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function newSlimesFunc() {
  var newSlime = {
    x: getRandomInt(50, 820),
    y: 60,
    width: 50,
    height: 50,
    xDirection: 3,
    yDirection: 1,
    radius: 20,
    slime1image: new Image(),
    isLoaded: false,
  };
  newSlime.slime1image.onload = function () {
    newSlime.isLoaded = true;
  };
  newSlime.slime1image.src = "image/slime.png";
  slimeList.push(newSlime);
}
setInterval(() => {
  newSlimesFunc();
}, 500);

function DrawSlimeImage() {
  for (var i = 0; i < slimeList.length; i++) {
    if (slimeList[i].isLoaded) {
      canvasContext.drawImage(
        slimeList[i].slime1image,
        slimeList[i].x,
        slimeList[i].y,
        slimeList[i].width,
        slimeList[i].height
      );
    }
  }
}

function bulletSlime() {
  for (var i = 0; i < slimeList.length; i++) {
    slimeList[i].x += slimeList[i].xDirection;
    slimeList[i].y += slimeList[i].yDirection;
    if (slimeList[i].y + slimeList[i].height > BG.height)
      slimeList.splice(i, 1);
    if (slimeList[i].x + slimeList[i].width > 890) {
      replace();
    } else if (slimeList[i].x < 60) {
      replace();
    }
    function replace() {
      slimeList[i].xDirection = -slimeList[i].xDirection;
      slimeList[i].y += slimeList[i].yDirection;
    }
    if (slimeList[i].y + slimeList[i].height > BG.height - 60) {
      slimeList.splice(i, 1);
    }
  }
}

function AddEventLIsteners() {
  window.addEventListener("keydown", KeyDown);
  window.addEventListener("click", ClickPlay);
}

AddEventLIsteners();

function KeyDown(event) {
  console.log(event.key);
  if (event.key === "ArrowLeft") {
    PLAYER.x -= PLAYER.xDirection;
  }
  if (event.key === "ArrowRight") {
    PLAYER.x += PLAYER.xDirection;
  }
  if (event.key === "ArrowUp") {
    PLAYER.y -= PLAYER.yDirection;
  }
  if (event.key === "ArrowDown") {
    PLAYER.y += PLAYER.yDirection;
  }
  ClampPlayerPosition();
}

function ClampPlayerPosition() {
  console.log(PLAYER.x, PLAYER.y);
  if (PLAYER.x <= 40) {
    PLAYER.x = 40;
  }
  if (PLAYER.y <= 40) {
    PLAYER.y = 40;
  }
  if (PLAYER.x >= 850) {
    PLAYER.x = 830;
  }
  if (PLAYER.y >= 640) {
    PLAYER.y = 640;
  }
}

function collision() {
  for (var i = 0; i < slimeList.length; i++) {
    var collisionUp =
      PLAYER.y - PLAYER.radius / 2 < slimeList[i].y + slimeList[i].height;
    var collisionLeft =
      PLAYER.x + PLAYER.radius < slimeList[i].x + slimeList[i].width;
    var collisionRight = PLAYER.x + PLAYER.radius * 7 > slimeList[i].x;
    var collisionDown =
      PLAYER.y + PLAYER.radius > slimeList[i].y - slimeList[i].width;
    if (collisionUp && collisionLeft && collisionRight && collisionDown) {
      slimeList.splice(i, 1, 0);
      return (k += 1);
    }
  }
}

function isOnPlayButton(event) {
  if (
    event.x > PLAY.x &&
    event.x < PLAY.x + PLAY.width &&
    event.y > PLAY.y &&
    event.y < PLAY.y + PLAY.height
  ) { 
    return true;
  }
  return false;
}

function DrawPlayFrame() {
  DrawBG();
  AddEventLIsteners();
  DrawBoard();
  DrawPlayButton();
  DrawGameName();
}

function DrawMainFrame() {
  DrawBG();
  DrawBoard();
  DrawSlimeImage();
  collision();
}

function DrawRestartFrame() {
  DrawBG();
  DrawBoard();
  DrawRestartButton();
}

function ClickPlay(event) {
  // console.log(event.x, event.y)
  if (isOnPlayButton(event)) {
    console.log("meow")
    play();
  }
}

function play() {
  console.log(slimeList)
  // console.log(PLAYER.x, PLAYER.y)
  DrawMainFrame();
  bulletSlime();
  drawStatus = requestAnimationFrame(play);
  {
    if (k === 0) {
      DrawHeart3();
      DrawPlayer();
    }
    if (k === 1) {
      DrawHeart2();
      DrawPlayer();
    }
    if (k === 2) {
      DrawHeart1();
      DrawPlayer();
    }
    if (k >= 3) {
      DrawHeart0();
      cancelAnimationFrame(drawStatus)
      k = 0
      Res();
      PLAYER.x = playerX
      PLAYER.y = playerY
      for (var i = 0; i < slimeList.length; i++) {
      slimeList[i] = 0;

      }
    if (slimeList.length > 10.000) {

    }

  }
}
}

function Play () {
  DrawPlayFrame();
  ClickPlay();
}

function Res () {
  DrawRestartFrame();
  ClickPlay();
}

Play();