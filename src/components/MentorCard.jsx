

export const MentorCard = ({ mentor }) => {
  return (
    <div className="mentor-card group relative flex-shrink-0 w-[280px] sm:w-[380px] md:w-[450px] lg:w-[500px] h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-shadow duration-300">
      {/* Background Image */}
      <img
        loading="lazy"
        src={mentor.image}
        alt={mentor.name}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
      />
      
      {/* Gradient Overlay - stronger on left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
      
      {/* Decorative Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500">
        {/* Hexagonal/Angular accent lines */}
        <svg className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 opacity-30" viewBox="0 0 100 100">
          <polygon 
            points="50,5 95,25 95,75 50,95 5,75 5,25" 
            fill="none" 
            stroke="#94BD1C" 
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
        </svg>
        <svg className="absolute right-10 md:right-16 top-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 opacity-20" viewBox="0 0 100 100">
          <polygon 
            points="50,5 95,25 95,75 50,95 5,75 5,25" 
            fill="none" 
            stroke="#29C28C" 
            strokeWidth="1"
          />
        </svg>
      </div>
      
      {/* Content - Left aligned */}
      <div className="absolute inset-0 flex flex-col justify-center p-4 sm:p-6 md:p-8 text-white max-w-[65%] md:max-w-[60%]">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-0.5 md:mb-1 transform transition-transform duration-300">
          {mentor.programTitle}
        </h3>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight mb-2 md:mb-3 transform transition-transform duration-300">
          {mentor.programSubtitle}
        </p>
        {mentor.sessions && (
          <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#94BD1C] mb-1 md:mb-2 transform transition-all duration-300">
            {mentor.sessions}
          </p>
        )}
        <p className="text-xs sm:text-sm text-white/80 font-medium uppercase tracking-wide transform transition-all duration-300">
          {mentor.name}
        </p>
      </div>
      
      {/* Hover Border Effect with gradient */}
      <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-transparent transition-all duration-300" />
      
      {/* Bottom gradient shine effect on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#94BD1C] via-[#29C28C] to-[#94BD1C] opacity-0 transition-opacity duration-500" />
    </div>
  );
};