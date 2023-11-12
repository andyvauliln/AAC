import React from 'react';
import dynamic from 'next/dynamic';
import { config } from '@fortawesome/fontawesome-svg-core';
import AOS from 'aos';

import Analytics from '../components/Analytics';
import Contacts from '../components/Contacts';
import LazyShow from '../components/LazyShow';
// import MainHero from '../components/MainHero';
import Services from '../components/Services';
import Team from '../components/Team';
import 'aos/dist/aos.css';
// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';
const MainHero = dynamic(() => import('../components/MainHero'), { ssr: false });

// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
//className={`bg-black overflow-hidden`}
config.autoAddCss = false;
config.autoReplaceSvg = false;

const App = () => {
  React.useEffect(() => {
    AOS.init();
  });
  return (
    <div className='w-full h-full' >
      <MainHero />
      {/* <LazyShow>
        <Services />
      </LazyShow>
      <LazyShow>
        <Team />
      </LazyShow>
      <LazyShow>
        <Contacts />
      </LazyShow>
      <Analytics /> */}
    </div>
  );
};

export default App;
