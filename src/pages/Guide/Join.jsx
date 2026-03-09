import React, { useContext } from 'react';
import { IoMdMail } from "react-icons/io";
import peopleImage from "../../assets/Guide/people.png"
import JoinWaitlist_Btn from '../../components/JoinWaitlist_Btn';
import { AppContext } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';

// Replace these with your actual image paths
const guides = [
  { id: 1, img: "https://i.pravatar.cc/150?u=1" },
  { id: 2, img: "https://i.pravatar.cc/150?u=2" },
  { id: 3, img: "https://i.pravatar.cc/150?u=3" },
  { id: 4, img: "https://i.pravatar.cc/150?u=4" },
  { id: 5, img: "https://i.pravatar.cc/150?u=5" },
  { id: 6, img: "https://i.pravatar.cc/150?u=6" },
];

const Join = () => {

  const tr = useTranslation();

  const { waitListEmail, setWaitListEmail } = useContext(AppContext);
  return (
    <section className="w-full py-16 px-4 md:px-10 bg-[#F2F2F2]">
      <div className="max-w-6xl mx-auto bg-white rounded-[40px] md:rounded-[60px] pt-16 md:pt-24 overflow-hidden shadow-sm border border-white relative">

        {/* Content Section */}
        <div className="text-center px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
            {tr("guide_cta_headline")}
          </h2>
          <p className="text-[#666666] text-sm md:text-lg mb-10 leading-relaxed font-medium">
            {tr("guide_cta_sub")}
          </p>

          {/* Subscription / Join Form */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-24">
            <div className="relative w-full sm:max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <IoMdMail className="text-gray-400 group-focus-within:text-[#94BD1C]" size={20} />
              </div>
              <input
                type="email"
                placeholder={tr("guide_cta_email_placeholder")}
                className="w-full pl-12 pr-6 py-4 bg-[#F4F6F2] border-2 border-transparent rounded-full outline-none focus:border-[#94BD1C]/20 focus:bg-white transition-all font-medium"
                value={waitListEmail}
                onChange={(e) => {
                  setWaitListEmail(e.target.value)
                }}
              />
            </div>
            <div>
              <JoinWaitlist_Btn label={tr("guide_cta_cta")} />
            </div>
          </div>
        </div>

        {/* Guides Images Section with Arch Backgrounds */}
        <div className="flex items-end justify-center gap-2 md:gap-4 px-4 overflow-hidden">
          <img src={peopleImage} alt="" />
        </div>

      </div>
    </section>
  );
};

export default Join;