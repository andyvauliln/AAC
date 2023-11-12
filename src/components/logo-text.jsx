'use client';

import React from 'react';

import { Unica_One } from 'next/font/google';

const roboto = Unica_One({
  weight: '400',
  subsets: ['latin'],
});

function LogoText() {
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="3000"
      className={`${roboto.className} gold-text z-50 `}
    >
      Pluto <br /> House
    </div>
  );
}

export default LogoText;
