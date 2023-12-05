'use client';

import React, { useEffect, useRef } from 'react';
import Spanizer from "./Spanizer"
import { Playfair_Display, Nunito } from 'next/font/google';
import { LanguageContext } from './LanguageProvider';

const roboto2 = Playfair_Display({
  weight: '700',
  subsets: ['cyrillic'],
});
const roboto1 = Nunito({
  weight: '700',
  subsets: ['latin'],
});



function LogoSubText() {
  const lang = React.useContext(LanguageContext);
  return (
    <>
      <div data-aos="zoom-in"  className="text-center">
        <Spanizer
          tag="p"
          className={`${roboto2.className} mast__text text-2xl`}
        >
       {lang.data.company_tag_line}
        </Spanizer>
        <hr className="sep" />
        <Spanizer tag="p" className={`${roboto2.className} mast__text text-md`}>
        {lang.data.company_what_we_doing}
        </Spanizer>
        
      </div>
    </>
  );
}

export default LogoSubText;
