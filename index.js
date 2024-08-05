const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16; // 1024;
canvas.height = 64 * 9; // 576;

const player = new Player();

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

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.velocity.x = 0;

  if (keys.d.pressed && keys.lastKey === "d") {
    player.velocity.x = 2;
  } else if (keys.a.pressed && keys.lastKey === "a") {
    player.velocity.x = -2;
  }

  player.draw();
  player.update();
}

animate();
