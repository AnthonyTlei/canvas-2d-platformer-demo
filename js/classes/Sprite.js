class Sprite {
  constructor({
    position,
    imageSrc,
    frameRate = 1,
    frameBuffer = 1,
    animations,
    loop = true,
    autoplay = true,
  }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = frameBuffer;
    this.animations = animations;
    this.loop = loop;
    this.autoplay = autoplay;

    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
  }

  draw() {
    if (!this.loaded) {
      return;
    }
    const cropBox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };
    c.drawImage(
      this.image,
      cropBox.position.x, // Crop X
      cropBox.position.y, // Crop Y
      cropBox.width, // Crop width
      cropBox.height, // Crop height
      this.position.x, // X
      this.position.y, // Y
      this.width, // width
      this.height // height
    );

    this.updateFrames();
  }

  play() {
    this.autoplay = true;
  }

  updateFrames() {
    if (!this.autoplay) {
      return;
    }
    this.elapsedFrames++;
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else if (this.loop) {
        this.currentFrame = 0;
      }
    }
  }
}
