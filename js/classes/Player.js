class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate }) {
    super({ imageSrc, frameRate });

    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };

    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;
  }

  update() {
    c.fillStyle = "rgba(0,0,255,0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.position.x += this.velocity.x;
    this.checkForHorizontalCollisions();

    this.applyGravity();

    this.checkForVerticalCollisions();

    this.checkForCanvasCollisions();
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      // If collision exists
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // collision left
        if (this.velocity.x < 0) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
        // collision right
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }
      }
    }
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      // If collision exists
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // collision top
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
        // collision bottom
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
      }
    }
  }

  checkForCanvasCollisions() {
    if (this.sides.bottom + this.velocity.y < canvas.height) {
    } else {
      this.velocity.y = 0;
    }
  }
}
