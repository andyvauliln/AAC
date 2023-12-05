import React from 'react';
import Image from 'next/image';
import Spanizer from './Spanizer';
import { Playfair_Display, Nunito } from 'next/font/google';
import { LanguageSwitcher, LanguageContext } from './LanguageProvider';

const roboto2 = Playfair_Display({
  weight: '700',
  subsets: ['cyrillic'],
});
const roboto1 = Nunito({
  weight: '700',
  subsets: ['latin'],
});


const Header = () => {
  const lang = React.useContext(LanguageContext);
  return (
    <>
    <header className="w-[100vw] px-[5vw] flex-col absolute top-0 left-0 z-20">
      <div className='flex justify-between items-center w-full'>
          <Image 
            className='z-20 block mt-1'
            src="/images/logo_no_bg_800.png" // The path to your logo file
            alt="Logo" 
            width={90}// A descriptive alt text for your logo
            height={90} // Desired height (in pixels)
            priority // Optional: marks this image as high priority, and preloads it
            quality={100} // Optional: A value between 0 and 100. Defaults to 75
          />
           
       

         <LanguageSwitcher/>
         </div>

         <div className='flex w-full justify-center items-center '>
           <div className='black-mirror mt-10'  data-text={lang.data.company_title}>
              <span>{lang.data.company_title}</span>
          </div>
         </div>
         
    </header>
   
    </>
  );
};

export default Header;
