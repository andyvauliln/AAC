'use client';

import React, { useEffect, useRef } from 'react';

import { Playfair_Display, Nunito } from 'next/font/google';

const roboto2 = Playfair_Display({
  weight: '700',
  subsets: ['cyrillic'],
});
const roboto1 = Nunito({
  weight: '700',
  subsets: ['latin'],
});

const Spanizer = ({ tag: Tag = 'div', className, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const text = ref.current.textContent;
      ref.current.textContent = '';
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'text-white';
        ref.current.appendChild(span);
      });
    }
  }, [children]);

  return React.createElement(Tag, { className, ref }, children);
};

function LogoSubText() {
  return (
    <>
      {/* <h1 className={`${roboto.className} gold-text2 text-2xl text-center text-yellow-400 mb-20 z-20 absolute left-1/2 -translate-x-1/2 top-[15%]`}>Law Firm & Speakeasy Bar</h1> */}
      <div className="text-center mt-6 px-4">
        <Spanizer
          tag="p"
          className={`${roboto2.className} mast__text text-2xl`}
        >
        A place for people who value their time and embrace the future
        </Spanizer>
        <hr className="sep" />
        <Spanizer tag="p" className={`${roboto2.className} mast__text text-md`}>
          Designing Custom Automation Solutions with AI
        </Spanizer>
        <Spanizer
          tag="p"
          className={`${roboto2.className} mast__text text-3xl mt-8`}
        >
          Book Free Consultation (+6281338571519 )
        </Spanizer>

        {/* <div className="container social-wrapper">
          <div className="flex flex-col md:flex-row">
            <div className="flex cursor-pointer">
              <svg
                id="whatsapp"
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 0 448 512"
                fill="#000"
                className="fa fa-whatsapp fa-5x fa-social fill-slate-50"
              >
                <path
                  fill="#fff"
                  d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"
                ></path>
              </svg>
               <Image width="100" height="100" src="/images/phone.jpg" />
              <span className="ml-4 text-yellow-300 text-lg">
                +6281338571519
              </span>
            </div>
            <div className="flex cursor-pointer ml-4 md:ml-0">
              <svg
                id="email"
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 0 512 512"
                className="fa fa-envelope fa-5x fa-social fill-slate-50"
              >
                <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
              </svg>
              <span className="ml-4 text-yellow-300 text-lg">
                pluto.house@gmail.com
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default LogoSubText;
