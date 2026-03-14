import { useContext } from 'react';
import frame1 from "../../assets/Exclusive/frame.webp"
import frame2 from "../../assets/Exclusive/frame2.webp"
import JoinWaitlist_Btn from '../../components/JoinWaitlist_Btn';
import { IoMdMail } from "react-icons/io";
import { AppContext } from '../../context/AppContext';

const ExclusiveAccessCard = ({ headline, subheadline, body, tr }) => {
  const { waitListEmail, setWaitListEmail } = useContext(AppContext);

  return (
    <div className="py-10 bg-gray-100 flex items-center justify-center">
      <div className="relative mx-[5%] w-full h-auto md:h-[350px] max-w-5xl bg-white rounded-[40px] overflow-hidden shadow-sm flex flex-col md:flex-row rtl:md:flex-row-reverse">

        {/* Background Gradient */}
        <div
          className="absolute top-0 right-0 h-full w-full md:w-1/2 opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, #D4EFC7 100%)',
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)'
          }}
        />

        {/* Text Section */}
        <div className="relative z-15 w-full md:w-3/5 p-8 md:p-16 flex flex-col gap-6
                        text-left rtl:text-right">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-900 tracking-tight">
            {headline}
          </h1>

          <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed max-w-md">
            {subheadline}
          </p>

          <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-md">
            {body}
          </p>

          {/* Input + Button */}
          <div className="flex w-full md:w-[120%] rtl:md:w-full flex-col sm:flex-row items-center justify-center gap-4 rtl:gap-2 mb-16 md:mb-24">
            <div className="relative w-full sm:max-w-md group">
              <div className="absolute inset-y-0 flex items-center pointer-events-none
                              ltr:left-0 ltr:pl-5 rtl:right-0 rtl:pr-5">
                <IoMdMail className="text-gray-400 group-focus-within:text-[#94BD1C]" size={20} />
              </div>

              <input
                type="email"
                placeholder={tr("exclusive_placeholder")}
                value={waitListEmail}
                onChange={(e) => setWaitListEmail(e.target.value)}
                className="w-full py-3 bg-[#F4F6F2] border-2 border-transparent rounded-full outline-none 
                           focus:border-[#94BD1C]/20 focus:bg-white transition-all font-medium
                           ltr:pl-12 ltr:pr-6 rtl:pr-12 rtl:pl-6"
              />
            </div>

            <div className="w-full sm:w-auto sm:flex-shrink-0 flex justify-center sm:rtl:justify-normal">
              <JoinWaitlist_Btn label={tr("btn_join_waitlist")} compactArabic={true} />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative z-10 w-full md:w-2/5 flex md:justify-center md:items-center justify-end items-end">
          <img loading='lazy' src={frame1} alt="3D Abstract Knot"
            className="md:w-full rounded-[40px] md:flex hidden md:h-full object-cover h-[350px] w-[350px] drop-shadow-2xl"
          />

          <img loading='lazy' src={frame2} alt="3D Abstract Knot"
            className="md:w-full md:hidden rounded-[40px] mt-[-30%] flex md:h-full object-cover w-full drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ExclusiveAccessCard; 