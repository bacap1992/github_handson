const size = 300;//描画サイズ
const initialLength = 10;//へべの初期長さ
const extensionLength = 150;//餌を食べたときの伸長長さ
const snakePositionList = [];
const snakeWidth = 8;//へべの太さ
const foodSize = 10; // 餌の大きさ
const foodColor = 'hsl(${Math.random()*360}deg,100%,50%'; // 餌の色

let mx = size / 2;
let my = (size / 5) * 2;
let speed = 4;
let angle = -90;
let move = 0;
let ctx = null;
let score = 0;
let mouseX = size / 2;
let mouseY = size / 2;

let fx = 0;
let fy = 0;

let gameover = false;

const init = () => {
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  for (let i = 0; i < initialLength; i++) {
    snakePositionList.push([mx, my]);
  }

  // canvas.addEventListener("click", placeFood);

  // function placeFood(event) {
  //   const rect = canvas.getBoundingClientRect();
  //   const mouseX = event.clientX - rect.left;
  //   const mouseY = event.clientY - rect.top;
  // }
  // document.getElementById("left").onpointerdown = (e) => {
  //   e.preventDefault();
  //   move = -1;
  // };

  // document.getElementById("right").onpointerdown = (e) => {
  //   e.preventDefault();
  //   move = 1;
  // };
  // document.onpointerdown = (e) => {
  //   e.preventDefault();
  //   move = 0;
  // }


};

const render = () => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, size, size);

  if (gameover) {
    ctx.beginPath();
    ctx.arc(mx, my, snakeWidth, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = "#0c0";
  }
  for (let i = 0; i < snakePositionList.length; i++) {
    const [x, y] = snakePositionList[i];
    ctx.beginPath();
    ctx.arc(x, y, snakeWidth, 0, Math.PI * 2);
    ctx.fill();



    // ctx.fillStyle = foodColor;
    // ctx.fillRect(mouseX, mouseY, foodSize, foodSize);
    // ctx.beginPath();
    // ctx.arc(mouseX, mouseY, snakeWidth, 0, Math.PI * 2);
    // ctx.fill();


  }


};

// 餌をクリックで配置する




// 餌をGETしたら虫を増殖する
// 虫を画面外に出さない処理
const checkCollision = () => {
  if (mx < snakeWidth ||
    mx >= size - snakeWidth ||
    my < snakeWidth ||
    my >= size - snakeWidth 
  )  {
    gameover = true;
  }

};



// 虫がランダムに動く
const update = () => {
  const random = Math.random();
  if (random < 0.5) {
    abs = 1;
  } else {
    abs = -1;
  };
  mx += Math.cos(angle * Math.PI / 180) * speed;
  my += Math.sin(angle * Math.PI / 180) * speed;
  const move = Math.floor(random * 3) * 3 * abs;
  console.log(move);
  angle += move * 5;
  snakePositionList.push([mx, my]);
  snakePositionList.shift();
};

window.onload = async () => {
  init();
  while (true) {
    render();
    // gameover();
    update();
    await new Promise(r => setTimeout(r, 16));
  }

};