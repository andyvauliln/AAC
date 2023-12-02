import React from 'react';
import dynamic from 'next/dynamic';
//import { config } from '@fortawesome/fontawesome-svg-core';
import AOS from 'aos';

import Analytics from '../components/Analytics';
import Contacts from '../components/Contacts';
import LazyShow from '../components/LazyShow';
import MainHero from '../components/MainHero';
import Services from '../components/Services';
import { LanguageProvider } from '../components/LanguageProvider';
// import Team from '../components/Team';
import 'aos/dist/aos.css';
// import Font Awesome CSS
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import '@fortawesome/fontawesome-svg-core/styles.css';
// const MainHero = dynamic(() => import('../components/MainHero'), { ssr: false });


// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
//className={`bg-black overflow-hidden`}
// config.autoAddCss = false;
// config.autoReplaceSvg = false;


const App = () => {
  React.useEffect(() => {
    AOS.init();
  });
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
    <div className='w-full h-full bg-black' >
     
      <MainHero />
{/*       
      <LazyShow>
        <Team />
      </LazyShow> */}
       
      <div className='hidden md:flex justify-center items-center'>
      <LazyShow>
          <Services />
      </LazyShow>
      </div> 
      <LazyShow>
        <Contacts />
      </LazyShow>
      <Analytics />
    </div>
    </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
