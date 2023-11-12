import React from 'react';

import Logo from './logo-text';

const Testimonials = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
        {/* Left column (hidden on mobile) */}
        <div className="hidden md:block max-w-[300px] m-auto text-left">
          <div
            data-aos="zoom-in-right"
            data-aos-delay="0"
            className="py-4 pl-20 "
          >
            <div className="gold-text2 font-extrabold">High Profile Client</div>
            <div className="bg-gradient-to-t from-gray-900 via-gray-300 to-gray-900 bg-clip-text text-transparent text-zinc-400">
              "When the odds were stacked against us, Pluto House delivered.
              They're the legal team you want in your corner when things get
              tough."
            </div>
          </div>
          <div
            data-aos="zoom-in-right"
            data-aos-delay="0"
            className="px-4 py-10"
          >
            <div className="gold-text2 font-extrabold">High Profile Client</div>
            <div className="bg-gradient-to-t from-gray-900 via-gray-300 to-gray-900 bg-clip-text text-transparent text-zinc-400">
              "When the odds were stacked against us, Pluto House delivered.
              They're the legal team you want in your corner when things get
              tough."
            </div>
          </div>
          <div
            data-aos="zoom-in-right"
            data-aos-delay="0"
            className="py-4 pl-20  "
          >
            <div className="gold-text2 font-extrabold">High Profile Client</div>
            <div className="bg-gradient-to-t from-gray-900 via-gray-300 to-gray-900 bg-clip-text text-transparent text-zinc-400">
              "When the odds were stacked against us, Pluto House delivered.
              They're the legal team you want in your corner when things get
              tough."
            </div>
          </div>
        </div>
        <div className="z-20 flex items-center justify-center">
          <Logo />
        </div>

        {/* Right column */}
        <div className="hidden md:block max-w-[300px] m-auto text-left">
          <div
            data-aos="zoom-in-right"
            data-aos-delay="0"
            className="py-4 pr-20 "
          >
            <div className="gold-text2 font-extrabold">High Profile Client</div>
            <div className="bg-gradient-to-t from-gray-900 via-gray-300 to-gray-900 bg-clip-text text-transparent text-zinc-400">
              "When the odds were stacked against us, Pluto House delivered.
              They're the legal team you want in your corner when things get
              tough."
            </div>
          </div>
          <div
            data-aos="zoom-in-right"
            data-aos-delay="0"
            className="px-4 py-10 "
          >
            <div className="gold-text2 font-extrabold">High Profile Client</div>
            <div className="bg-gradient-to-t from-gray-900 via-gray-300 to-gray-900 bg-clip-text text-transparent text-zinc-400">
              "When the odds were stacked against us, Pluto House delivered.
              They're the legal team you want in your corner when things get
              tough."
            </div>
          </div>
          <div
            data-aos="zoom-in-right"
            data-aos-delay="0"
            className="py-4 pr-20"
          >
            <div className="gold-text2 font-extrabold">High Profile Client</div>
            <div className="bg-gradient-to-t from-gray-900 via-gray-300 to-gray-900 bg-clip-text text-transparent text-zinc-400">
              "When the odds were stacked against us, Pluto House delivered.
              They're the legal team you want in your corner when things get
              tough."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
