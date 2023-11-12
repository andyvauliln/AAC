import React from 'react';
import Image from "next/image"

const Services = () => {
  return (
    <section className={`mast py-8 h-auto md:h-[100vh]`} id="product">
      <figure
        className="mast__bg hidden md:block"
        style={{
          backgroundImage: 'url(/images/bg4.jpeg)',
        }}
      ></figure>
      <div className="flex flex-col  items-center w-full h-full">
        <div className="stars cursor-pointer underline underline-offset-8 z-10 text-4xl md:text-6xl">
          Services
        </div>

        <div id="cards">
          <div className="card">
            <div className="card-content">
              <div className="card-image">
                <Image src="/images/construction.svg" alt="Construction" width="100" height="100"/>
              </div>
              <div className="card-info-wrapper">
                <div className="card-info">
                  <div className="card-info-title">
                    <h3>Common</h3>
                    <h4>Drafting</h4>
                    <h4>International Law</h4>
                    <h4>FIDIC</h4>
                    <h4>IPR</h4>
                    <h4>Humanitarian Law</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-image">
              <Image src="/images/construction.svg" alt="Construction" width="100" height="100"/>
              </div>
              <div className="card-info-wrapper">
                <div className="card-info">
                  <div className="card-info-title">
                    <h3>Visa Managment</h3>
                    <h4>Creating Social Visa 24f</h4>
                    <h4>Creating Marrige Visa</h4>
                    <h4>Dealing with Overstate</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-image">
              <Image src="/images/construction.svg" alt="Construction" width="100" height="100"/>
              </div>
              <div className="card-info-wrapper">
                <div className="card-info">
                  <div className="card-info-title">
                    <h3>Consultations</h3>
                    <h4>10 min free cosultation.</h4>
                    <h4>1h 50$.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-image">
              <Image src="/images/construction.svg" alt="Construction" width="100" height="100"/>
              </div>
              <div className="card-info-wrapper">
                <div className="card-info">
                  <div className="card-info-title">
                    <h3>IT Legality</h3>
                    <h4>Making Site Terms</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-image">
              <Image src="/images/construction.svg" alt="Construction" width="100" height="100"/>
              </div>
              <div className="card-info-wrapper">
                <div className="card-info">
                  <div className="card-info-title">
                    <h3>Open Company</h3>
                    <h4>Contract drafting.</h4>
                    <h4>Shady staff.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-image">
              <Image src="/images/construction.svg" alt="Construction" width="100" height="100"/>
              </div>
              <div className="card-info-wrapper">
                <div className="card-info">
                  <div className="card-info-title">
                    <h3>Other</h3>
                    <h4>Washing Money.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
