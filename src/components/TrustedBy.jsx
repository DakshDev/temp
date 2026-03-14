// Import brand logos
import indiegogo from '../assets/brands/indiegogo.webp';
import stripe from '../assets/brands/stripe.png';
import featured from "../assets/brands/featured.png";
import mercury from "../assets/brands/mercury.png";

const TrustedBy = ({tr}) => {
  // const tr = useTranslation();

  // Partner logos - switch between local images and API
  const partners = [
    { name: 'Indiegogo', logo: indiegogo, height: 'h-6 md:h-7' },
    { name: 'Stripe', logo: stripe, height: 'h-8 md:h-10' },
    { name: 'Mercury', logo: mercury, height: 'h-8 md:h-10' },
    { name: 'Featured', logo: featured, height: 'h-auto md:h-auto' },
  ];

  return (
    <section className="w-full pt-12 pb-6 md:pt-16 md:pb-8 bg-GrayBg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Heading */}
        <h2 className="text-center text-sm md:text-base font-extrabold text-gray-800 uppercase tracking-wider mb-8 md:mb-12 font-Urbanist">
          {tr('trusted_by_title')}
        </h2>

        {/* Logo Grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-32 md:w-40 h-12 md:h-14 transition-all duration-300 hover:scale-110"
            >
              <img
                loading='lazy'
                src={partner.logo}
                alt={partner.name}
                className={`${partner.height} w-auto object-contain`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
