import React from 'react';

import StarsAnimation from './StarsAnimation';
import FeaturesForm from './FeaturesForm';

const Contacts = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black">
       <section className='px-[5%] lg:w-1/2 lg:min-h-screen'>
        <div className="h-[50vh] lg:h-full flex items-center justify-center relative">
            <StarsAnimation />
            <Ball/>
        </div>
      </section>
      <section id="form" className='flex items-center justify-center px-[5%] lg:w-1/2 lg:min-h-screen'>
        <div className="w-full flex flex-col items-center">
          <SocialMedia/>
          <FeaturesForm/>
        </div>
      </section>
    </div>

  );
};

export default Contacts;

function Ball() {
  return (<>
            <div className="absolute inset-0 m-auto w-[50vw] h-[50vw] lg:w-[25vw] lg:h-[25vw] rounded-full shadow-[0_-1em_11em_#743fce]"></div>
            <div className="absolute inset-0 m-auto w-[50vw] h-[50vw]  lg:w-[25vw] lg:h-[25vw] bg-gray-400 shadow-small-screen lg:shadow-large-screen" style={{ borderRadius: "50%"}}>
            <div className="absolute w-[32vw] h-[32vw] lg:w-[15vw] lg:h-[15vw] m-auto rounded-full bg-black border-r-[0.3vw] border-b-[0.3vw] border-gray-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[13vw] border-r-[13vw] border-t-[18vw] lg:border-l-[5.5vw] lg:border-r-[5.5vw] lg:border-t-[8.75vw] border-t-[#bf3fce] blur-[5px] border-l-transparent border-r-transparent"></div>
              <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-[50%] w-[10vw]">
                  <div className="mirror" data-text="Never try, never know">
                      <div className='text-center mx-auto'>Never try <br/> never <br/> know</div>
                  </div>
              </div>
            </div>
          </div>
        </>
      )
}



function SocialMedia() {
  return (<div className='flex w-full flex-col'>
    <div className='flex w-full justify-between my-5'>
      <div className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent font-extrabold text-2xl md:text-3xl mr-8">
        Follow Us:
      </div>
      <div>
        <a href='https://www.instagram.com/areax_agency/' className='cursor-pointer' target='_blunk'>
          <i className="fa fa-twitter" id="twitter"></i>
        </a>
        <a href='https://www.instagram.com/areax_agency/' className='cursor-pointer' target='_blunk'>
          <i className="fa fa-instagram" id="instagram"></i>
        </a>
        <a href='https://t.me/AreaX_consulting' className='cursor-pointer' target='_blunk'>
          <i className="fa fa-linkedin" id="linkedin"></i>
        </a>
      </div>
    </div>
    <div className='flex w-full  justify-between  my-10'>
      <div className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent font-extrabold text-2xl md:text-3xl">
        Message Us:
      </div>
      <div>
        <a href='https://t.me/AreaX_consulting' className='cursor-pointer' target='_blunk'>
          <i className="fa fa-telegram" id="telegram"></i>
        </a>
        <a href='https://wa.me/6282131325939' className='cursor-pointer' target='_blunk'>
          <i className="fa fa-whatsapp" id="whatsapp"></i>
        </a>
      </div>
    </div>
    <div className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent  font-extrabold text-2xl md:text-3xl mr-8">
        Or Leave us a Message:
      </div>
  </div>)
}
