import { useState } from 'react';
import feature1 from '../../assets/Grower/feature1.webp';
import feature2 from '../../assets/Grower/feature2.webp';
import feature3 from '../../assets/Grower/feature3.webp';
import feature4 from '../../assets/Grower/feature4.webp';
import feature5 from '../../assets/Grower/feature5.webp';
import feature6 from '../../assets/Grower/feature6.webp';
// Import your other images here:
// import SET_GOALS_IMG from '../../assets/Grower/set-goals.png'; 

// --- DESIGN CONSTANTS ---
const PRIMARY_GREEN = '#3E9218';
const LIGHT_GREEN = '#0CBF95';
const DARK_GRAY = '#777E87';
const TEXT_GRAY = '#606060';
const LIGHT_GRAY = "#E6E8EB";

const JourneySec = ({tr}) => {
  const [activeStep, setActiveStep] = useState(2);
  // const tr = useTranslation();

  const steps = [
    { id: 1, title: tr("step_1_title"), content: tr("step_1_desc"), image: feature1 },
    { id: 2, title: tr("step_2_title"), content: tr("step_2_desc"), image: feature2 },
    { id: 3, title: tr("step_3_title"), content: tr("step_3_desc"), image: feature3 },
    { id: 4, title: tr("step_4_title"), content: tr("step_4_desc"), image: feature4 },
    { id: 5, title: tr("step_5_title"), content: tr("step_5_desc"), image: feature5 },
    { id: 6, title: tr("step_6_title"), content: tr("step_6_desc"), image: feature6 },
  ];

  const handleStepClick = (id) => {
    setActiveStep(id);
  };

  return (
    <section id='how_it_works' className="font-sans bg-GrayBg py-12 md:py-24">
      <div className="max-w-7xl px-8 mx-auto ">

        <div className='md:mb-8 mx-auto px-6 text-center flex flex-col items-center-safe'>
          <h3 className="font-Buenard font-bold xs:text-Paragraph4 lg:text-Paragraph2 text-textGreen">
            {tr("how_it_works_title")}
          </h3>

          <h1 className="font-Urbanist mt-1 font-semibold leading-tight tracking-tight capitalize text-textPrimary
                 xs:text-Heading8 sm:text-Heading6 md:text-Heading5 lg:text-Heading4 xl:text-Heading3 2xl:text-Heading1
                 text-center">
            {tr("how_it_works_headline")}
          </h1>

          <p className="font-Urbanist font-normal leading-relaxed tracking-normal text-textGray
                xs:text-Paragraph6 xs:mt-3 md:text-Paragraph5 lg:text-Paragraph4 lg:mt-6
                text-center">
            {tr("how_it_works_sub")}
          </p>
        </div>
        {/* Updated Container: items-stretch ensures columns share the same height */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-20 items-stretch">

          {/* LEFT COLUMN: Steps */}
          <div className="w-full  lg:w-1/3 order-2 lg:order-1">
            <div className={`p-2  lg:pt-0 rounded-2xl lg:rounded-none flex w-[98%] ml-[1%] lg:ml-0 lg:w-full lg:bg-[#F0F1F2] bg-white lg:flex-col justify-around flex-row lg:space-y-5`}>
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex  cursor-pointer transition-all justify-around md:justify-start duration-300 w-full
                    ${activeStep === step.id ? "lg:bg-white  lg:p-5 rounded-2xl shadow-sm" : "lg:bg-gray-50  lg:p-5 rounded-2xl hover:lg:bg-white/50"}
                  `}
                  onClick={() => handleStepClick(step.id)}
                >
                  <div
                    className="shrink-0 text-left w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold
             transition-all duration-300 ltr:mr-4 rtl:ml-4"
                    style={{
                      backgroundColor: activeStep === step.id ? `white` : LIGHT_GRAY,
                      color: activeStep === step.id ? PRIMARY_GREEN : DARK_GRAY,
                      border: activeStep !== step.id ? `none` : `2px solid ${PRIMARY_GREEN}`
                    }}
                  >
                    {step.id}
                  </div>

                  <div className="hidden lg:flex flex-col pt-1">
                    <h3
                      className="text-lg font-bold text-left rtl:text-right transition-colors duration-300"
                      style={{ color: activeStep === step.id ? "black" : DARK_GRAY }}
                    >
                      {step.title}
                    </h3>

                    {activeStep === step.id && (
                      <p className="mt-1 text-left rtl:text-right text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-300" style={{ color: TEXT_GRAY }}>
                        {step.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Image container now uses h-full to match left column */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2 relative min-h-[300px] lg:min-h-full">
            <div className="lg:sticky lg:top-24 w-full h-full">
              {steps.map((step) => (
                <img
                  loading='lazy'
                  key={step.id}
                  src={step.image}
                  alt={step.title}
                  className={`absolute inset-0 w-full h-full object-contain rounded-2xl transition-all duration-500 ease-in-out ${activeStep === step.id ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: Mobile Guides Accordion */}
        <div className="lg:hidden w-[95%] ml-[2.5%] bg-white rounded-2xl mt-4 p-4" >
          <h2 className="text-2xl font-Urbanist font-bold mb-3" style={{ color: "black" }}>
            {steps[activeStep - 1]?.title}
          </h2>
          <p className='font-Urbanist text-left rtl:text-right' style={{ color: DARK_GRAY }}>{steps[activeStep - 1]?.content}</p>
        </div>

      </div>
    </section>
  );
};

export default JourneySec;