import React, { useEffect, useRef } from 'react';

const Z_RANGE = 100; // How deep is your love
const Z_VELOCITY = -0.0025; // How fast
const STARS_COUNT = 2000; // How many

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = 1 - Math.random() * 2;
    this.y = 1 - Math.random() * 2;
    this.z = Math.random() * -Z_RANGE;
    this.xPos = 0;
    this.yPos = 0;
    this.angle = 0.001;
  }

  getPosition() {
    this.x = this.x * Math.cos(this.angle) - this.y * Math.sin(this.angle);
    this.y = this.y * Math.cos(this.angle) + this.x * Math.sin(this.angle);
    this.z += Z_VELOCITY;

    this.xPos =
      ((window.innerHeight / window.innerWidth) * window.innerWidth * this.x) /
      this.z +
      window.innerWidth / 2;
    this.yPos = (window.innerHeight * this.y) / this.z + window.innerHeight / 2;

    // Detect collision with black hole
    if (
      Math.sqrt(
        (this.xPos - HOLE.x) * (this.xPos - HOLE.x) +
        (this.yPos - HOLE.y) * (this.yPos - HOLE.y)
      ) <= HOLE.r ||
      this.z >= Z_RANGE
    )
      this.reset();
  }

  draw(ctx) {
    const size = 3 - -this.z / 2;

    ctx.globalAlpha = (Z_RANGE + this.z) / (Z_RANGE * 2);
    ctx.fillStyle = 'white';
    ctx.fillRect(this.xPos, this.yPos, size, size);
    ctx.globalAlpha = 1;
  }
}

const stars = new Array(STARS_COUNT);

for (let i = 0; i < STARS_COUNT; i++) stars[i] = new Star();

const HOLE = {
  x: 0, // Initialize with default values
  y: 0,
  r: 0,
};

const StarsAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== 'undefined') {
      HOLE.x = window.innerWidth / 2;
      HOLE.y = window.innerHeight / 2;
      HOLE.r =
        window.innerWidth > window.innerHeight
          ? window.innerHeight / 4
          : window.innerWidth / 4;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.fillStyle = 'white';
        stars.forEach((star) => {
          star.getPosition();
          star.draw(ctx);
        });
        ctx.fill();

        requestAnimationFrame(animate);
      };

      animate();

      function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        HOLE.r =
          window.innerWidth > window.innerHeight
            ? window.innerHeight / 4
            : window.innerWidth / 4;
        HOLE.x = window.innerWidth / 2;
        HOLE.y = window.innerHeight / 2;
      }
      handleResize();

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        HOLE.r =
          window.innerWidth > window.innerHeight
            ? window.innerHeight / 4
            : window.innerWidth / 4;
        HOLE.x = window.innerWidth / 2;
        HOLE.y = window.innerHeight / 2;
      });
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default StarsAnimation;
