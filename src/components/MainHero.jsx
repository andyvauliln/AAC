'use client'
import React, { useRef, useEffect } from 'react';
import Logo from './Logo'

const LineAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure the canvas is not null
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    let id;

    class Line {
      constructor(origin, size, length, color, style = "pattern") {
        this.size = size;
        this.origin = origin;
        this.length = length;
        this.color = color;
        this.style = style;
        this.origin = `M${origin.x},${origin.y}`;
        this.offSet = 0;
        this.line = null;
        this.offSetSpeed = length / size;
      }
    
      getColorString() {
        return `hsla(${this.color.h}deg,${this.color.s}%,${this.color.l}%,${this.color.a})`;
      }
    
      generators() {
        return [
          { line: `h${this.size}`, mag: this.size },
          { line: `h-${this.size}`, mag: this.size },
          { line: `v${this.size}`, mag: this.size },
          { line: `v-${this.size}`, mag: this.size },
          { line: `l${this.size},${this.size}`, mag: Math.hypot(this.size, this.size) },
          { line: `l${this.size}-${this.size}`, mag: Math.hypot(this.size, this.size) },
          { line: `l-${this.size},${this.size}`, mag: Math.hypot(this.size, this.size) },
          { line: `l-${this.size}-${this.size}`, mag: Math.hypot(this.size, this.size) }
        ];
      }
    
      generate() {
        let segments = this.generators(this.size);
        let path = this.origin;
        let mag = 0;
        let fragment;
        let i;
        for (i = 0; i < this.length; i += 1) {
          fragment = segments[(Math.random() * segments.length) | 0];
          path += ` ${fragment.line}`;
          mag += fragment.mag;
        }
        this.line = { path, mag };
        return this;
      }
    
      renderStyle(ctx, style) {
        if (style === "glitches") {
          ctx.lineDashOffset = this.line.mag + this.offSet;
          ctx.setLineDash([this.size ** 1.5, (this.line.mag / this.length) * this.size ** 2]);
          this.offSet += 20;
          ctx.lineWidth = 2;
          return this;
        }
        if (style === "pattern") {
          ctx.lineDashOffset = this.line.mag - this.offSet;
          ctx.setLineDash([this.line.mag, this.line.mag]);
          this.offSet += 10;
          ctx.lineWidth = 0.2;
        }
      }
    
      mutatePath() {
        let lineFragment = this.line.path.split(" ").slice(1);
        let generator = this.generators();
        lineFragment[(Math.random() * lineFragment.length) | 0] =
          generator[(Math.random() * generator.length) | 0].line;
        this.line.path = `${this.line.path.split(" ")[0]} ${lineFragment.join(" ")}`;
      }
    
      draw(ctx) {
        if (!this.line) this.generate();
        console.log(ctx)
    
        ctx.strokeStyle = this.getColorString(); // ctx should be defined here
        this.renderStyle(ctx, this.style); // Make sure ctx is passed
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke(new Path2D(this.line.path));
        return this;
      }
    }
    
    const clear = () => {
      ctx.fillStyle = `hsla(200deg, 20%, 10%, 0.3)`;
      ctx.fillRect(0, 0, width, height);
    };

    const generateLines = (amount, width, height, ctx) => {
      let lines = [];
      let styles = [
        { size: 20, style: "pattern", color: { h: 210, s: 100, l: 70, a: 0.5 } },
        { size: 35, style: "pattern", color: { h: 190, s: 90, l: 50, a: 0.3 } },
        { size: 5, style: "pattern", color: { h: 210, s: 70, l: 60, a: 0.3 } },
        { size: 20, style: "pattern", color: { h: 310, s: 80, l: 55, a: 0.3 } },
        { size: 20, style: "pattern", color: { h: 200, s: 25, l: 35, a: 0.12 } },
        { size: 20, style: "pattern", color: { h: 210, s: 20, l: 40, a: 0.12 } },
        { size: 40, style: "pattern", color: { h: 190, s: 40, l: 50, a: 0.12 } },
        { size: 80, style: "pattern", color: { h: 220, s: 50, l: 60, a: 0.12 } },
        // { size: 40, style: "glitches", color: { h: 300, s: 100, l: 50, a: 0.3 } },
        // { size: 20, style: "glitches", color: { h: 210, s: 100, l: 50, a: 0.3 } },
        // { size: 60, style: "glitches", color: { h: 30, s: 100, l: 50, a: 0.3 } }
      ];
    
      for (let i = 0; i < amount; i += 1) {
        let style = styles[(Math.random() ** 2 * styles.length) | 0];
        lines.push(
          new Line(
            { x: width * 0.5, y: height * 0.5 },
            style.size,
            500 + Math.random() * 1000,
            style.color,
            style.style
          )
        );
      }
    
      return lines;
    }; 
    
    const lines = generateLines(40, width, height); 

    const resize = () => {
      cancelAnimationFrame(id);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // If you want to regenerate the lines for the new size
      const lines = generateLines(40, width, height); 

      const update = () => {
        if (!(id % 3)) {
          clear();
          lines.forEach((line) => {
            line.draw(ctx);
            if (!(id % 5) && Math.random() > 0.95) {
              line.mutatePath();
            }
          });
        }
        id = requestAnimationFrame(update);
      };

      id = requestAnimationFrame(update);
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(id);
    };
  }, []);

  return <canvas  ref={canvasRef} />;
};

function MainHero() {
  return (
    <Logo/>
  );
}

export default MainHero;
//className="absolute top-0 left-0 w-full h-full"