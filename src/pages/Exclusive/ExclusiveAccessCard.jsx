import React from 'react';
import frame1 from "../../assets/Exclusive/frame.png"
import PayButton from '../../components/PayButton';
import frame2 from "../../assets/Exclusive/frame2.png"
import { useTranslation } from '../../hooks/useTranslation';

const ExclusiveAccessCard = () => {

  const tr = useTranslation();

  return ( 
    <div className=" my-[10%] bg-gray-100 flex items-center justify-center ">
      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-[40px] overflow-hidden shadow-sm flex flex-col md:flex-row rtl:md:flex-row-reverse">
        
        {/* Background Gradient Slash (The Green Right Side) */}
        <div 
          className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-30 pointer-events-none"
          style={{ 
            background: 'linear-gradient(135deg, transparent 40%, #D4EFC7 100%)',
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)'
          }}
        ></div>

        {/* Content Section */}
        <div className="relative z-15 w-full md:w-3/5 p-8 md:p-16 flex flex-col items-start gap-6">
          <h1 className="text-2xl md:text-5xl font-semibold text-gray-900 tracking-tight">
            {tr("exclusive_access_title")}
          </h1>
          
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
{tr("exclusive_access_desc")}
          </p>

         

          <PayButton text={tr("exclusive_access_btn")} />
        </div>

         {/* Image Section */}
                <div className="relative  z-10 w-full  md:w-2/5 flex md:justify-center md:items-center justify-end items-end ">
                 
        
                  <img 
                    src={frame1} // Replace with your actual image path
                    alt="3D Abstract Knot" 
                    className="md:w-full rounded-[40px] md:flex hidden md:h-full object-cover h-[350px] w-[350px] text-right items-end justify-end drop-shadow-2xl"
                    />
               
        
                   <img 
                    src={frame2} // Replace with your actual image path
                    alt="3D Abstract Knot" 
                    className="md:w-full md:hidden rounded-[40px]  mt-[-20%]  flex md:h-full object-cover w-[100%]  text-right items-end justify-end drop-shadow-2xl"
                  />
                </div>
      </div>
    </div>
  );
};

export default ExclusiveAccessCard; 