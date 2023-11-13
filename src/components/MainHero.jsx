'use client'
import React, { useRef, useEffect } from 'react';
import Logo from './Logo'
import LogoText from './logo-sub-text'
import { Roboto_Slab } from 'next/font/google';
import Testimonials from './testimonials';
import TestimonialsMobile from './testimonials2';

const font = Roboto_Slab({
  weight: '900',
  subsets: ['latin'],
});

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
      constructor(origin, size, length, color, style = "pattern", speed = 1) {
        this.size = size;
        this.origin = origin;
        this.length = length;
        this.color = color;
        this.style = style;
        this.origin = `M${origin.x},${origin.y}`;
        this.offSet = 0;
        this.line = null;
        this.offSetSpeed = length / size;
        this.speed = speed;
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
        this.offSet += this.offSetSpeed * this.speed;
        ctx.strokeStyle = this.getColorString(); // ctx should be defined here
        this.renderStyle(ctx, this.style); // Make sure ctx is passed
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke(new Path2D(this.line.path));
        return this;
      }
    }
    
    const clear = () => {
      ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1)'; // Black color with 10% opacity
      ctx.fillRect(0, 0, width, height);
    };

    const generateLines = (amount, width, height, ctx) => {
      let lines = [];
      let styles = [
        // { size: 20, style: "pattern", color: { h: 210, s: 100, l: 70, a: 0.5 } },
        // { size: 35, style: "pattern", color: { h: 190, s: 90, l: 50, a: 0.3 } },
        { size: 5, style: "pattern", color: { h: 270, s: 90, l: 60, a: 0.3 } },
        { size: 5, style: "pattern", color: { h: 210, s: 70, l: 60, a: 0.3 } },
        { size: 5, style: "pattern", color: { h: 210, s: 70, l: 60, a: 0.3 } },
        { size: 20, style: "pattern", color: { h: 270, s: 100, l: 50, a: 0.5 } },
        { size: 35, style: "pattern", color: { h: 270, s: 90, l: 60, a: 0.3 } },
        { size: 20, style: "pattern", color: { h: 310, s: 80, l: 55, a: 0.3 } },
        { size: 20, style: "pattern", color: { h: 200, s: 25, l: 35, a: 0.12 } },
        { size: 20, style: "pattern", color: { h: 200, s: 25, l: 35, a: 0.12 } },
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
            if (!(id % (5 / line.speed)) && Math.random() > 0.95) {
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

  return <canvas className='absolute top-0 l-0 w-[100vw] h-[100vh]'  ref={canvasRef} />;
};

function MainHero() {
  return (
    <>
    <div className='h-[100vh] w-[100vw] relative flex items-center justify-center'>
    <LineAnimation/>
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-1/3 hidden md:flex md:flex-col md:justify-center md:items-center'>
      <div  className="p-4 z-30 max-w-[400px] ">
        <div className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">Preparation for YouTube Interviews</div>
        <div className="text-zinc-400">
          Our AI tool helped a YouTube channel host prepare for interviews. It finds what questions were asked in past interviews on YouTube and other websites. This helps the host know what to ask next and avoid repeating questions
        </div>
      </div>
      <div  className="p-4 z-30 max-w-[400px]">
        <div className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">Company Social Media AI Agent</div>
        <div className="text-zinc-400">
          Our AI helps with social media like Instagram and Twitter. It finds and shares interesting information and makes unique images using AI.
        </div>
      </div>
      <div  className="p-4 z-30 max-w-[400px]">
        <div className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">Discord Community AI Agent</div>
        <div className="text-zinc-400">
          Our AI helps manage Discord communities. It finds and shares news, answers questions, summarizes daily messages, creates fun activities, sorts messages for different actions, and gives advice to the community leader based on data and statistics
        </div>
      </div>
      </div>
      <div className='w-full md:w-1/3 flex items-center justify-center relative flex-col '>
        
        {/* <div className={`${font.className} text-[135px] z-10 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent`}>Area</div> */}
        {/* <div className={`${font.className} text-[135px] z-10 stars`}>Area</div> */}
        <div className={`${font.className} stars  text-white  text-[100px] opacity-70 z-20 mb-[40px]`}>Area X</div>
        <Logo/>
        <LogoText/> 
        
      </div>
      <div className='w-1/3 hidden md:flex md:flex-col md:justify-center md:items-center'>
      <div className="p-4 z-30 max-w-[400px]">
        <div className="to-purple-600 via-pink-600 from-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">Property Management AI Agent</div>
        <div className="text-zinc-400">
          A customer managing 70 properties saved lots of time with our AI Automation. It checks other property prices and suggests the best prices for his properties. It also replies to messages about availability, helps find the right apartments for tenants, checks payments, organizes cleaning, sends contracts, and makes monthly reports
        </div>
      </div>
      
      <div  className="p-4 z-30 max-w-[400px]">
        <div className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">Land Search AI Agent</div>
        <div className="text-zinc-400">
          We made an AI tool for a client who needed help finding land. The AI gets information about who owns land from the land office and contacts the owner to see if they want to sell and how much they want.
        </div>
      </div>
      <div  className="p-4 z-30 max-w-[400px]">
        <div className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">News Aggregation and Summarization</div>
        <div className="text-zinc-400">
          A customer needed to know the latest news about their business and additional information from special sources. Our AI collects all the information related to their business and makes short summaries to keep them updated every day.
        </div>
      </div>
      </div>
      </div>
    </div>
    <TestimonialsMobile/>
    </>
  );
}

function Text(){
  return (<div>
    
  </div>)
}

export default MainHero;
//className="absolute top-0 left-0 w-full h-full"