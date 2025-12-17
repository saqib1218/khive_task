import React, { useRef } from 'react';
import vectorImg from '../../asset/App/Vector.png';
import whitebot from '../../asset/App/whitebot.png';

function About() {
  const scrollerRef = useRef(null);

  // Let parent scroll container handle scrolling; no custom wheel trapping here.

  return (
    <div
      ref={scrollerRef}
      className="mt-0  px-4 text-center space-y-2 py-10"
    >
      {/* Smart filters. Trusted sources. */}
      <p className="text-primary text-[24px] leading-[105%] tracking-[-1.2px]">
        Smart filters. Trusted sources.
      </p>

      {/* Let agents cut noise in */}
      <h1
        className="text-white font-normal text-[54px] leading-[95%] tracking-[-1.2px] text-center"
        style={{ fontFamily: 'Suisse Intl, ui-sans-serif, system-ui, sans-serif' }}
      >
        Let agents cut noise in
      </h1>

      {/* Box + Auto Trading! */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="flex items-center w-[96px] h-[52px] p-0 border-2 border-primary rounded-[64px] bg-transparent gap-[10px] opacity-100 rotate-0 overflow-hidden">
          {/* Keep image size as-is; align to right edge */}
          <img src={vectorImg} alt="vector" className="h-[102px] w-[102px] ml-3 object-contain" />
        </div>

        <span
          className="text-white font-normal text-[54px] leading-[145%] tracking-[-1.2px] text-center"
          style={{ fontFamily: 'Suisse Intl, ui-sans-serif, system-ui, sans-serif' }}
        >
          Auto Trading!
        </span>
      </div>

      {/* Create AutoBot button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="relative inline-flex items-center justify-center px-4 py-2 rounded-[12px] border-2 border-primary bg-[#114337] w-[220px] h-[62px]"
        >
          <span className="text-white text-[16px] leading-[16px]">Create AutoBot</span>
          <img
            src={whitebot}
            alt="white bot"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 object-contain"
          />
        </button>
      </div>
    </div>
  );
}

export default About;