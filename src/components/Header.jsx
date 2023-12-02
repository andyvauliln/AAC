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
    <header className="w-full flex p-4 opacity-60  absolute top-0 left-0 z-20">
      <div className='hidden lg:flex justify-between items-center w-full'>
          <Image 
            className='z-20 block'
            src="/images/logo_no_bg_800.png" // The path to your logo file
            alt="Logo" 
            width={100}// A descriptive alt text for your logo
            height={100} // Desired height (in pixels)
            priority // Optional: marks this image as high priority, and preloads it
            quality={100} // Optional: A value between 0 and 100. Defaults to 75
          />
           
       
        <div className='black-mirror' data-text={lang.data.company_title}>
             <span>{lang.data.company_title}</span>
         </div>
         <LanguageSwitcher/>
         </div>

         <div className='flex lg:hidden flex-col items-center w-full'>
          <div className='flex w-full justify-between items-center'>
            <Image 
              className='z-20 block'
              src="/images/logo_no_bg_800.png" // The path to your logo file
              alt="Logo" 
              width={80}// A descriptive alt text for your logo
              height={80} // Desired height (in pixels)
              priority // Optional: marks this image as high priority, and preloads it
              quality={100} // Optional: A value between 0 and 100. Defaults to 75
            />
            <LanguageSwitcher/>
           </div>
           <div className='black-mirror mt-10'  data-text={lang.data.company_title}>
              <span>{lang.data.company_title}</span>
          </div>
         </div>
    </header>
    </>
  );
};

export default Header;
