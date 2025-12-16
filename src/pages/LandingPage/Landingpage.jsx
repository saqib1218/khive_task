import React from 'react';
import { ReactComponent as Ellipse } from '../../asset/App/elipse2.svg';
import Header from '../../component/Header/Header';
import centerImg from '../../asset/App/center.png';
import linesImg from '../../asset/App/lines.png';
import vectorImg from '../../asset/App/Vector.png';
function Landingpage() {
  return (
    <div className="flex  min-h-screen bg-transparent">
      <div className="relative w-4/5 border border-[#141519] rounded-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-10 bg-transparent">
          <Header />
          <div className="mt-4 px-4 text-center space-y-2">
  {/* Smart filters. Trusted sources. */}
  <p className="text-primary text-[24px] leading-[105%] tracking-[-1.2px]">
    Smart filters. Trusted sources.
  </p>
   {/* Let agents cut noise in */}
   
   <h1
    className="text-white font-normal text-[64px] leading-[95%] tracking-[-1.2px] text-center"
    style={{ fontFamily: 'Suisse Intl, ui-sans-serif, system-ui, sans-serif' }}
  >
    Let agents cut noise in
  </h1>

  {/* Bot image + Auto Trading! */}
  <div className="mt-6 flex items-center justify-center gap-2">
  <div className="flex items-center w-[96px]  h-[52px] p-0 border-2 border-primary rounded-[64px] bg-transparent gap-[10px] opacity-100 rotate-0">
    <img src={vectorImg} alt="vector" className="h-[102px] w-[102px] ml-3 " />
  </div>
  <span
    className="text-white font-normal text-[64px] leading-[145%] tracking-[-1.2px] text-center"
    style={{ fontFamily: 'Suisse Intl, ui-sans-serif, system-ui, sans-serif' }}
  >
    Auto Trading!
  </span>
</div>
</div>
        </div>
        <Ellipse className="w-full h-auto [&_*]:animate-dash [&_*]:[stroke-dasharray:2_14]" />
        {/* Centered overlay images */}
        <img
          src={linesImg}
          alt="lines"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full object-contain"
        />
        <img
          src={centerImg}
          alt="center"
          className="absolute top-1/2 left-[25%] -translate-y-1/2 -translate-x-1/2 z-10 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default Landingpage;

