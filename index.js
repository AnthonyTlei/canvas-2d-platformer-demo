// Globals
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024;
canvas.height = 64 * 9; // 576;

const parsedCollisions = collisionsLevel1.parse2D();
const collisionBlocks = parsedCollisions.createObjectsFrom2D();

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  lastKey: "",
};

// Animation Loop
function animate() {
  window.requestAnimationFrame(animate);

  backgroundLevel1.draw();
  collisionBlocks.forEach((block) => {
    block.draw();
  });

  player.velocity.x = 0;
  if (keys.d.pressed && keys.lastKey === "d") {
    player.velocity.x = 2;
  } else if (keys.a.pressed && keys.lastKey === "a") {
    player.velocity.x = -2;
  }

  player.draw();
  player.update();
}

// Object Creation
const player = new Player({
  collisionBlocks,
  imageSrc: "img/king/idle.png",
  frameRate: 11,
});
const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/backgroundLevel1.png",
});

animate();
