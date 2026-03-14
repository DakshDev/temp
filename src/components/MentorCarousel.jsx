import { useEffect, useRef, useState } from "react";
import { MentorCard } from "./MentorCard";

export const MentorCarousel = ({tr, lang}) => {
  // const tr = useTranslation();
  const scrollRef = useRef(null);

  const mentors = [
    {
      id: 1,
      name: tr("mentor_1_name"),
      programTitle: tr("mentor_1_title"),
      programSubtitle: tr("mentor_1_subtitle"),
      image: "https://plus.unsplash.com/premium_photo-1661964252605-8ba0cd83b056?w=800&h=500&fit=crop&crop=faces",
    },
    {
      id: 2,
      name: tr("mentor_2_name"),
      programTitle: tr("mentor_2_title"),
      programSubtitle: tr("mentor_2_subtitle"),
      sessions: tr("mentor_2_sessions"),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=500&fit=crop&crop=faces",
    },
    {
      id: 3,
      name: tr("mentor_3_name"),
      programTitle: tr("mentor_3_title"),
      programSubtitle: tr("mentor_3_subtitle"),
      image: "https://plus.unsplash.com/premium_photo-1723795263183-cc780725a140?w=450&h=500&fit=crop&crop=faces",
    },
    { 
      id: 4,
      name: tr("mentor_4_name"),
      programTitle: tr("mentor_4_title"),
      programSubtitle: tr("mentor_4_subtitle"),
      sessions: tr("mentor_4_sessions"),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&crop=faces",
    },
    {
      id: 5,
      name: tr("mentor_5_name"),
      programTitle: tr("mentor_5_title"),
      programSubtitle: tr("mentor_5_subtitle"),
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&h=500&fit=crop&crop=faces",
    },
    {
      id: 6,
      name: tr("mentor_6_name"),
      programTitle: tr("mentor_6_title"),
      programSubtitle: tr("mentor_6_subtitle"),
      sessions: tr("mentor_6_sessions"),
      image: "https://images.unsplash.com/photo-1549045337-967927d923c0?w=800&h=500&fit=crop&crop=faces",
    },
    {
      id: 7,
      name: tr("mentor_7_name"),
      programTitle: tr("mentor_7_title"),
      programSubtitle: tr("mentor_7_subtitle"),
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=500&fit=crop&crop=faces",
    },
    {
      id: 8,
      name: tr("mentor_8_name"),
      programTitle: tr("mentor_8_title"),
      programSubtitle: tr("mentor_8_subtitle"),
      sessions: tr("mentor_8_sessions"),
      image: "https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?w=900&h=300&fit=crop&crop=faces",
    },
  ];
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const normalSpeed = 1.4;
    const slowSpeed = 0.75; // Reduced speed on hover
    const isRTL = lang === 'ar';

    const scroll = () => {
      if (scrollContainer) {
        // Use slower speed when hovered, normal speed otherwise
        const currentSpeed = isHovered ? slowSpeed : normalSpeed;
        scrollPosition += currentSpeed;
        
        // Reset scroll position when we've scrolled through the first set
        const singleSetWidth = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
        }
        
        // In RTL, we need to scroll in the opposite direction
        if (isRTL) {
          scrollContainer.scrollLeft = -scrollPosition;
        } else {
          scrollContainer.scrollLeft = scrollPosition;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, lang]);

  const duplicatedMentors = [...mentors, ...mentors];

  return (
    <section className="py-12 md:py-20 overflow-hidden bg-gradient-to-b from-background to-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 mb-12 md:mb-16">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-primary/80 uppercase mb-3 md:mb-4">
          {tr('mentor_carousel_label')}
        </p>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-4xl leading-tight mb-4 md:mb-6">
          {tr('mentor_carousel_headline')}
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {tr('mentor_carousel_sub')}
        </p>
      </div>
    
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-hidden cursor-grab active:cursor-grabbing select-none pl-4 md:pl-6"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        {duplicatedMentors.map((mentor, index) => (
          <MentorCard key={`${mentor.id}-${index}`} mentor={mentor} />
        ))}
      </div>
    </section>
  );
};
