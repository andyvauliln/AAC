/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import Image from 'next/image';

import LogoSubText from './logo-sub-text';
// import LogoText from './logo-text';
import Storm from './storm';
import Testimonials from './testimonials';
import TestimonialsMobile from './testimonials2';

const MainHero = () => {
  return (
    // <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
    <SliderComponent />
    // </main>
  );
};

export default MainHero;

function SliderComponent() {
  return (
    <>
      <div className="slide__content">
        <Navigation />
        <Storm />
        <PlutoPlanet />
        <Testimonials />
        {/* <LogoText /> */}
        <LogoSubText />
      </div>
      <TestimonialsMobile />
    </>
  );
}

const PlutoPlanet = () => {
  return (
    <>
      <div className="solar">
        <div className="solar_systm">
          <div className="planet mercury top-[50%] md:top-[55%] h-[65vw] w-[65vw] md:h-[50vw] md:w-[50vw]">
            <div className="overlay"></div>
          </div>
        </div>
      </div>
    </>
  );
};
const Navigation = () => {
  return (
    <div className="z-1 absolute left-0 top-0 w-full p-4 flex justify-center items-center">
      <Image
        src="/images/logoHD.png"
        width={100}
        height={100}
        alt="Logo"
        className="cursor-pointer"
      />
    </div>
  );
};

{
  /* <div className="flex w-full justify-around">
        <a
          href="#"
          className="flex w-1/5 md:w-1/3 justify-center cursor-pointer"
        >
          <div className="stars cursor-pointer underline underline-offset-8">
            Services
          </div>
        </a>
        <a className="hidden w-1/3 md:flex justify-center cursor-pointer">
          <Image
            src="/images/logoHD.png"
            width={100}
            height={100}
            alt="Logo"
            className="cursor-pointer"
          />
        </a>
        <a
          href="#"
          className="flex w-1/5 md:w-1/3 justify-center cursor-pointer"
        >
          <div className="stars cursor-pointer underline underline-offset-8">
            Team
          </div>
        </a>
      </div> */
}
