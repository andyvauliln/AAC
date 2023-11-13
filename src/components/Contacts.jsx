import React from 'react';

import StarsAnimation from './StarsAnimation'; // Import the StarsAnimation component

const Contacts = () => {
  return (
    <section className="mast h-[100vh] md:h-[100vh]" id="product">
      <StarsAnimation />
      <div className="eightball-shadow center2"></div>
      <div className="eightball center2">
        <div className="inner-circle center2">
          <div className="triangle center2"></div>
          <div className="answer-wrapper center2">
            <div className="mirror" data-text="Better Call Them">
              <span>Better Call Them</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
