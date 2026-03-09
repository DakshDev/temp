import React from "react";
import { LuGraduationCap } from "react-icons/lu";
import { LuBookMarked } from "react-icons/lu";
import { LuUsersRound } from "react-icons/lu";
import Personalized from '../../assets/Grower/Personalized.png';
import Grow from '../../assets/Grower/Grow.png';
import Learn from '../../assets/Grower/Learn.png';
import JoinWaitlist_Btn from "../../components/JoinWaitlist_Btn";

const FeaturesSec = () => {

    const GrowFeaturesCards = [
        {
            id : 1,
            icon: <LuGraduationCap size={24} color="#3E9218" />,
            image: Personalized,
            title: "Personalized Guidance",
            description: "Get matched with verified coaches who understand your journey and help you move forward with clarity.",
        },
         {
            id : 2,
            icon: <LuBookMarked size={24} color="#3E9218" />,
            image: Grow,
            title: "Grow at Your Own Pace",
            description: "Learn through practical, self-paced programs designed by experienced guides who’ve walked the same path.",
        },
         {
            id : 3,
            icon: <LuUsersRound size={24} color="#3E9218" />,
            image: Learn,
            title: "Learn Together",
            description: "Create or join communities where you can share ideas, exchange experiences, and learn alongside others on similar paths.",
        }
    ]
  return (
    <section id="features" className="bg-Primarybg py-20">
      <div className="mx-auto px-6 text-center flex flex-col items-center-safe 
                  xs:w-[90vw]
                  xl:w-[90vw] 2xl:w-[1400px]">
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
      

      {/* 3 feature cards to be added here later */}
      <div className="grid xs:grid-cols-1 lg:grid-cols-3 mt-12 gap-6 2xl:gap-8 w-[95%]">
        {/* Feature cards go here */}

        {GrowFeaturesCards.map((card) => (
        <div key={card.id} className="bg-btnGray overflow-hidden flex flex-col items-center-safe relative border border-btnGray shadow-lg
                              xs:rounded-xl xs:p-3 xs:w-full
                              sm:p-5
                              lg:p-5 lg:w-full
                              xl:p-8 xl:rounded-4xl">
            {/* Card Image */}
            <img src={card.image} alt={card.title} className="" />

            <div className="w-full space-y-2 mt-2">
                <h1 className="font-Urbanist font-semibold xs:text-Paragraph4 lg:text-Paragraph2 xl:text-Paragraph1 leading-tight tracking-tight capitalize text-left">{card.title}</h1>

                <p className="font-Urbanist font-normal xs:text-Paragraph6 md:text-Paragraph5 lg:text-Paragraph5 leading-relaxed tracking-normal text-textGray text-left">{card.description}</p>
            </div>

            {/* card icon */}
            <div className="absolute w-12 h-12 bg-[#208837]/10 rounded-full top-5 right-5 flex flex-col items-center-safe justify-center-safe">
                {card.icon}
            </div>
        </div>
        ))}
      </div>

      {/* join waitlist button */}
        <div className="w-[100%] mt-10">
            <JoinWaitlist_Btn />
        </div>

        </div>
        
    </section>
  );
};

export default FeaturesSec;
