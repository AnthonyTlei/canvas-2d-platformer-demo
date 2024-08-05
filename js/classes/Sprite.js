class Sprite {
  constructor({ position, imageSrc, frameRate = 1 }) {
    this.position = position;
    this.image = new Image();
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = 10;
    this.loaded = false;

    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };

    this.image.src = imageSrc;
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

  updateFrames() {
    this.elapsedFrames++;
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
}
