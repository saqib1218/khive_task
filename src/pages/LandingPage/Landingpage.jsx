import React from 'react';
import { ReactComponent as Ellipse } from '../../asset/App/elipse2.svg';
import Header from '../../component/Header/Header';
import centerImg from '../../asset/App/center.png';
import linesImg from '../../asset/App/lines.png';

function Landingpage() {
  return (
    <div className="flex  min-h-screen bg-transparent">
      <div className="relative w-4/5 border border-[#141519] rounded-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-10 bg-transparent">
          <Header />
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

