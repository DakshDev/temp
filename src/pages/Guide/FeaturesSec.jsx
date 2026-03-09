import React from "react";
import ReachPeople from "../../assets/Guide/ReachPeople.png";
import SimpleSetup from "../../assets/Guide/SimpleSetup.png";
import Earn from "../../assets/Guide/Earn.png";
import Track from "../../assets/Guide/Track.png";
import JoinWaitlist_Btn from "../../components/JoinWaitlist_Btn";
import { useTranslation } from "../../hooks/useTranslation";

const FeaturesSec = () => {

  const tr = useTranslation();

const GuideFeaturesCards = [
  {
    id: 1,
    image: ReachPeople,
    title: tr("guide_features_card_1_title"),
    description: tr("guide_features_card_1_desc"),
  },
  {
    id: 2,
    image: SimpleSetup,
    title: tr("guide_features_card_2_title"),
    description: tr("guide_features_card_2_desc"),
  },
  {
    id: 3,
    image: Earn,
    title: tr("guide_features_card_3_title"),
    description: tr("guide_features_card_3_desc"),
  },
  {
    id: 4,
    image: Track,
    title: tr("guide_features_card_4_title"),
    description: tr("guide_features_card_4_desc"),
  },
];


  return (
    <section id="features" className="bg-Primarybg py-8 md:py-20">
      <div className="xs:w-[95vw] xl:w-[950px] mx-auto px-6 text-center flex flex-col items-center-safe">
        <h3 className="font-Buenard font-bold text-Paragraph2 text-textGreen">
          {tr("guide_features_label")}
        </h3>
        <h1 className="font-Urbanist font-semibold text-3xl sm:text-Heading1 leading-tight tracking-tight capitalize ">
          {tr("guide_features_headline")}
        </h1>
        <p className="font-Urbanist font-normal text-Paragraph6 rtl:text-xl leading-relaxed tracking-normal text-textGray ">
         {tr("guide_features_sub_l1")}
          <br />
          {tr("guide_features_sub_l2")}
        </p>

        {/* 3 feature cards to be added here later */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-6 xl:gap-10 w-full max-w-[1200px] mx-auto px-4 md:px-0">
  {GuideFeaturesCards.map((card) => (
    <div
      key={card.id}
      className="bg-btnGray p-6 sm:p-8 lg:p-10 rounded-3xl xl:rounded-[40px] 
                 overflow-hidden flex flex-col items-start border border-btnGray 
                 shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
    >
      {/* Card Image - Ensures alignment stays consistent */}
      <div className="mb-6">
        <img 
          src={card.image} 
          alt={card.title} 
          className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain" 
        />
      </div>

      <div className="w-full space-y-3">
        <h1 className="font-Urbanist font-bold text-[#111111]
                       text-xl sm:text-2xl xl:text-3xl 
                       leading-tight tracking-tight capitalize text-left rtl:text-right">
          {card.title}
        </h1>

        <p className="font-Urbanist font-normal text-textGray
                      text-sm sm:text-base xl:text-lg 
                      leading-relaxed tracking-normal text-left rtl:text-right">
          {card.description}
        </p>
      </div>
    </div>
  ))}
</div>        {/* join waitlist button */}
        <div className="mt-10">
          <JoinWaitlist_Btn label={tr("guide_features_cta")} />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSec;
