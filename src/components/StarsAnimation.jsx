import React, { useEffect, useRef } from 'react';

const Z_RANGE = 100; // How deep is your love
const Z_VELOCITY = -0.0015; // How fast
const STARS_COUNT = 100; // How many

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

  getPosition(canvasWidth, canvasHeight) {
    this.x = this.x * Math.cos(this.angle) - this.y * Math.sin(this.angle);
    this.y = this.y * Math.cos(this.angle) + this.x * Math.sin(this.angle);
    this.z += Z_VELOCITY;

    this.xPos = (canvasWidth * this.x) / this.z + canvasWidth / 2;
    this.yPos = (canvasHeight * this.y) / this.z + canvasHeight / 2;

    if (
      Math.sqrt(
        (this.xPos - HOLE.x) * (this.xPos - HOLE.x) +
        (this.yPos - HOLE.y) * (this.yPos - HOLE.y)
      ) <= HOLE.r || this.z >= Z_RANGE
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
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if the code is running on the client side
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      HOLE.x = containerWidth / 2;
      HOLE.y = containerHeight / 2;
      HOLE.r = containerWidth > containerHeight ? containerHeight / 4 : containerWidth / 4;

      const canvas = canvasRef.current;
      canvas.width = containerWidth;
      canvas.height = containerHeight;
      const ctx = canvas.getContext('2d');

      const updateCanvasSize = () => {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        canvasRef.current.width = containerWidth;
        canvasRef.current.height = containerHeight;
        HOLE.x = containerWidth / 2;
        HOLE.y = containerHeight / 2;
        HOLE.r = Math.min(containerWidth, containerHeight) / 4;
      };
  
      const handleResize = () => {
        updateCanvasSize();
        animate();
      };
  
      const animate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        stars.forEach((star) => {
          star.getPosition(canvas.width, canvas.height);
          star.draw(ctx);
        });
  
        requestAnimationFrame(animate);
      };
  
      window.addEventListener('resize', handleResize);
      updateCanvasSize();
      animate();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    }, []);

  return <div ref={containerRef} className='w-full h-full'>
  <canvas ref={canvasRef} className='w-full h-full' />
</div>
};

export default StarsAnimation;
{/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> */}