import React, { useState } from 'react';
import { Plus, Minus, Target, TrendingUp, Clock } from 'lucide-react';
import  DASHBOARD_IMAGE_URL from '../../assets/Grower/journey.png';
import PLACEHOLDER_IMAGE from '../../assets/Grower/journey.png';
// --- DESIGN CONSTANTS ---
const PRIMARY_GREEN = '#3E9218'; // Main accent color
const LIGHT_GREEN = '#0CBF95'; // Light background/shadow color
const DARK_GRAY = '#777E87';   // Main header and dark text color
const TEXT_GRAY = '#606060';   // Secondary descriptive text color
const LIGHT_GRAY = "#E6E8EB"

// --- SECTION 1 CONTENT: Benefit Cards ---


// --- SECTION 2 CONTENT: Steps List (Confirmed 6 steps) ---
const steps = [
  { id: 1, title: 'Set your goals', content: 'Define your next milestones and the features needed to reach them.' }, 
  { id: 2, title: 'Access your dashboard', content: 'See a real-time overview of your progress and key metrics and insights.' },
  { id: 3, title: 'Visualize your progress', content: 'Track your growth over time with beautiful, customizable data visualizations.' },
  { id: 4, title: 'Collaborate seamlessly', content: 'Invite your team and share progress in a single, unified workspace.' },
  { id: 5, title: 'Receive personalized insights', content: 'Get AI-driven recommendations to optimize your path to success.' },
  { id: 6, title: 'Launch and iterate', content: 'Deploy your features quickly and gather feedback for continuous improvement.' },
];




const JourneySec = () => {
  // State for the active step, defaulting to 2 to show the visible content
  const [activeStep, setActiveStep] = useState(2);
  // State for the mobile guide accordion

  const handleStepClick = (id) => {
    setActiveStep(id);
  };

  return (
    <section className="font-sans bg-[#F0F1F2] py-12 md:py-24">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

       
        <div className='mb-8 mx-auto px-6 text-center flex flex-col items-center-safe 
                  xs:w-[90vw]
                  xl:w-[90vw] 2xl:w-[1400px]'>
          <h3 className="font-Buenard font-bold xs:text-Paragraph4 lg:text-Paragraph2 text-textGreen">
          Features
        </h3>
        <h1 className="font-Urbanist mt-1 font-semibold leading-tight tracking-tight capitalize text-textPrimary
                xs:text-Heading8 sm:text-Heading6 md:text-Heading5 lg:text-Heading4 xl:text-Heading3 2xl:text-Heading1">
          Made for real learning
        </h1>
        <p className="font-Urbanist font-normal leading-relaxed tracking-normal text-textGray 
                xs:text-Paragraph6 xs:mt-3 md:text-Paragraph5 lg:text-Paragraph4 lg:mt-6">
          Discover guides, programs, and circles that make learning personal, 
          <br className="hidden md:inline" />
          practical, and easy to stay consistent with.
        </p>
        </div>
       

        {/* SECTION 2 & 3: Steps (6 items) and Large Image (Grid Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          
          {/* LEFT COLUMN (Desktop) / TOP (Mobile): Steps (Section 2) */}
          <div className="order-1">
            
            {/* Title "Your growth journey" is only visible on mobile, above the steps */}
            
            
            <div className={`p-2 lg:pt-0 rounded-2xl lg:rounded-none flex w-[90%] ml-[5%] lg:bg-[#F0F1F2] bg-white lg:flex-col justify-around flex-row lg:space-y-5`}>
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`flex  cursor-pointer transition-all duration-300
                    ${activeStep === step.id ? "lg:bg-white lg:p-5 rounded-2xl" : "lg:bg-[#FAFAFA] lg:p-2 rounded-2xl"}
                    `}
                  onClick={() => handleStepClick(step.id)}
                >
                  
                  {/* Step Number Circle (Always Visible) */}
                  <div 
                    className="flex-shrink-0 text-left w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold mr-4 transition-all duration-300"
                    style={{ 
                      // Active state styling
                      textAlign : "left",
                      backgroundColor: activeStep === step.id ? `white` : LIGHT_GRAY,
                      color: activeStep === step.id ? PRIMARY_GREEN : DARK_GRAY,
                      // Inactive number border
                      border: activeStep !== step.id ? `none` : `2px solid ${PRIMARY_GREEN}`
                    }}
                  >
                    {step.id}
                  </div>

                  {/* Step Content: Hidden on mobile, Visible on desktop */}
                  <div className="hidden  lg:flex flex-col pt-1">
                    <h3 
                      className="text-lg   font-bold transition-colors duration-300"
                      // Title is PRIMARY_GREEN when active, DARK_GRAY when inactive
                      style={{ color: activeStep === step.id ? "black" : DARK_GRAY }}
                    >
                      {step.title}
                    </h3>
                    
                    {/* Sub-description is ONLY visible for the active step on desktop */}
                    {activeStep === step.id && (
                      <p className="mt-1  text-sm font-medium" style={{ color: TEXT_GRAY }}>
                        {step.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* RIGHT COLUMN (Desktop) / BELOW STEPS (Mobile): Large Image (Section 3) */}
          <div className="order-2  space-y-8 w-full relative">
            {/* Image styling matches the soft shadow and high border radius of the reference */}
            <img 
              src={DASHBOARD_IMAGE_URL} 
              alt="Application Dashboard Screenshot" 
              className="w-full h-full  object-cover rounded-2xl" 
              // style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)' }}
              // Fallback styling using the SVG placeholder
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = PLACEHOLDER_IMAGE; 
                e.target.style.height = '400px'; 
              }}
            />
           
          </div>
        </div>
        
        {/* SECTION 4: Mobile Guides Accordion (Hidden on Desktop, Visible on Mobile) */}
        <div className="lg:hidden w-[95%] ml-[2.5%] bg-white rounded-2xl mt-16 p-4" >
          <h2 className="text-2xl font-Urbanist  font-bold mb-6" style={{ color: "black" }}>
            Guides
          </h2>
          
          <p className='font-Urbanist' style={{color : DARK_GRAY}}>Find the right guide for your journey. Explore experienced coaches who understand your goals and can help you grow in career, health, and personal life.</p>
              
        </div>

      </div>
    </section>
  );
};


export default JourneySec