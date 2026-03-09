import React from 'react';
import icon1 from "../../assets/Exclusive/icon1.png"
import icon2 from "../../assets/Exclusive/icon2.png"
import icon3 from "../../assets/Exclusive/icon3.png"
import icon4 from "../../assets/Exclusive/icon4.png"
import { useTranslation } from '../../hooks/useTranslation';

const Card = () => {

  const tr = useTranslation();

  const features = [
    {
      icon: icon1,
      title: tr("exclusive_benefit_1_title"),
      description: tr("exclusive_benefit_1_desc"),
    },
    {
      icon: icon2,
      title: tr("exclusive_benefit_2_title"),
      description: tr("exclusive_benefit_2_desc"),
    },
    {
      icon: icon3,
      title: tr("exclusive_benefit_3_title"),
      description: tr("exclusive_benefit_3_desc"),
    },
    {
      icon: icon4,
      title: tr("exclusive_benefit_4_title"),
      description: tr("exclusive_benefit_4_desc"),
    },
  ];

  return (
    <section className="w-full py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">

        {/* Centered Heading Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-2xl font-Urbanist md:text-5xl font-bold text-[#1A1A1A] mb-6">
            {tr("exclusive_benefits_heading")}
          </h2>
          {/* Centered Gradient Underline */}

        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group md:p-10 md:py-16 p-8 rounded-[45px] bg-[#F5F6F7] border border-gray-100/50 flex flex-col items-center text-center transition-all duration-300 "
            //   hover:shadow-2xl hover:-translate-y-2
            >
              {/* Centered Icon Container */}
              <div className="w-20 h-20 rounded-[100%] bg-[#2088371A] shadow-sm flex items-center justify-center text-3xl mb-10  transition-transform duration-300">
                {/* group-hover:scale-110 */}
                <img src={item.icon} className='w-10' alt="" />
              </div>

              {/* Centered Text Content */}
              <h3 className="text-md font-bold font-Urbanist text-[#111111] mb-2 leading-tight">
                {item.title}
              </h3>

              <p className="text-[#474D55] text-xs md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Card;