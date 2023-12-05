import React from 'react';
import Image from "next/image"

const Services = () => {
  return (
    <div className='hidden md:flex justify-center items-center'>
    <section className={`mast py-8 h-auto md:h-[100vh]`} id="product">
      <figure
        className="mast__bg2 hidden md:block opacity-20"
        style={{
          backgroundImage: 'url(/images/bg_purple2.webp)',
        }}
      ></figure>
      <div className="flex flex-col z-10  items-center justify-center w-full h-full">
        <div className="stars z-10 text-4xl md:text-6xl mb-16">
          Services
        </div>
        <div className="grid grid-cols-3 gap-10">
          <div className="w-[400px] h-[300px]">
          <div  className="p-4">
          <div className="mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">Automation Solutions</div>
          <div className="text-zinc-400">
            <div><strong className='text-white'>Automate Work with Any Site:</strong> Custom automation scripts and tools to streamline your online interactions, saving time and reducing errors. Perfect for e-commerce, data entry, and more.</div>
            <div className='mt-4'><strong className='text-white'>Custom Workflow Automation:</strong> Tailored solutions to automate your specific business processes, increasing efficiency and productivity.</div>
          </div>
        </div>
          </div>
          
          <div className="w-[400px] h-[300px]">
            <div  className="p-4">
            <div className="mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">AI Development</div>
            <div className="text-zinc-400">
              <div className='mb-4'><strong className='text-white'>AI Agents Development:</strong> Create intelligent agents for various applications, from customer service bots to advanced analytical tools.</div>
              <div><strong className='text-white'>Conversational Agents:</strong>  Interactive AI that can engage customers, answer queries, and provide support, enhancing user experience.</div>
            </div>
          </div>
          </div>
          <div className="w-[400px] h-[300px]">
            <div  className="p-4">
            <div className="mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">Knowledge and Content Services</div>
            <div className="text-zinc-400">
              <div><strong className='text-white'>Knowledge Base Q&A:</strong> Develop AI-powered question-and-answer systems for customer support or internal knowledge management.</div>
              <div className='mt-4'><strong className='text-white'>AI Summarization:</strong> Get quick, accurate summaries of large documents or datasets, ideal for research, reporting, and analysis.</div>
            </div>
          </div>
          </div>
          <div className="w-[400px] h-[300px]">
            <div  className="p-4">
            <div className="mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">AI Development</div>
            <div className="text-zinc-400">
              <div className='mb-4'><strong className='text-white'>Custom AI Models:</strong> Custom Large Language Models (LLM).</div>
              <div><strong className='text-white'>Custom Image Generative Model:</strong>  Unique AI models for creating specific styles or types of images, useful in design, marketing, and more.</div>
            </div>
          </div>
          </div>
          <div className="w-[400px] h-[300px]">
            <div  className="p-4">
            <div className="mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">Data Management</div>
            <div className="text-zinc-400">
              <div><strong className='text-white'>Data Scraping:</strong> Extract and utilize data from the web or other sources. This service is essential for market research, competitor analysis, and data-driven decision-making.</div>
            </div>
          </div>
          </div>
          
          <div className="w-[400px] h-[300px]"> 
            <div className="p-4">
            <div className="mb-4 from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">Consultation Services</div>
            <div className="text-zinc-400">
              <strong className='text-white'>Expert Consultations:</strong> Receive personalized advice to identify and implement the most effective AI solutions. Ideal for businesses looking to modernize processes or solve complex problems with AI.
            </div>
         </div>
        </div>
      </div>
        {/* 
        <div className='z-30'>
         
       
        
       
        
      
        <div  className="p-4">
          <div className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r background-animate bg-clip-text text-transparent text-xl font-extrabold">AI Modalities</div>
          <div className="text-zinc-400">
            <div><strong>Text-to-Image:</strong> Turn text descriptions into images, great for creative industries, advertising, and media.</div>
            <div><strong>Text-to-Voice:</strong> Convert text into natural speech for accessibility, content creation, or customer service.</div>
            <div><strong>Voice-to-Text:</strong> Accurate speech-to-text services for transcription, documentation, and more.</div>
            <div><strong>Image-to-Text:</strong> Extract and interpret text from images for data entry, archiving, and analysis.</div>
            <div><strong>Text-to-Text:</strong> Sophisticated text modification, including translation, paraphrasing, and summarization.</div>
            <div><strong>Text-to-Video:</strong> Create engaging video content directly from text inputs, ideal for social media, marketing, and educational content.</div>
          </div>
        </div>
        </div> */}
      </div>
    </section>
    </div>
  );
};

export default Services;
