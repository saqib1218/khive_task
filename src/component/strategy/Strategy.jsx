import React, { useEffect, useState } from 'react';
import robot from '../../asset/strategy/robort.png';

export default function Strategy() {
  const [blurStage, setBlurStage] = useState(false);
  const [showRobot, setShowRobot] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setBlurStage(true), 1500);
    const t2 = setTimeout(() => setShowRobot(true), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return (
    <div className="relative w-full h-full flex-col flex items-center justify-center">
      <style>{`
        @keyframes stratSlideUp { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-50px); opacity: 1; } }
        @keyframes stratSlideDown { from { transform: translateY(0); opacity: 1; } to { transform: translateY(80px); opacity: 1; } }
        @keyframes cardInRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        /* First card special effects */
        @keyframes borderMove { 0% { background-position: 0% 0; } 100% { background-position: 200% 0; } }
        @keyframes shineSweep { 0% { transform: translateX(-120%) skewX(-20deg); opacity: 0; } 30% { opacity: 0.6; } 100% { transform: translateX(140%) skewX(-20deg); opacity: 0; } }
        @keyframes flipUp { from { transform: rotateX(90deg) translateY(6px); opacity: 0; } to { transform: rotateX(0deg) translateY(0); opacity: 1; } }
        /* Robot button slide */
        @keyframes robotSlide { from { transform: translateX(-40%) translateY(-50%); } to { transform: translateX(40%) translateY(-50%); } }
        /* Animate border to primary and image tint to primary */
        @keyframes borderToPrimary { from { border-color: rgba(255,255,255,0.7); } to { border-color: rgba(52,211,153,0.85); } }
        @keyframes robotTint { from { filter: none; } to { filter: sepia(1) saturate(6) hue-rotate(120deg) brightness(1.1); } }
        /* Border tint from white to primary (emerald) */
        @keyframes borderTint { from { background: rgba(255,255,255,0.7); } to { background: rgba(52,211,153,0.85); } }
        /* Image tint toward primary */
        @keyframes robotTint { from { filter: none; } to { filter: sepia(1) saturate(8) hue-rotate(120deg) brightness(1.1); } }
        .robot-button { position: relative; overflow: hidden; }
        .robot-button::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px; /* full pill */
          padding: 2px; /* border thickness */
          background: rgba(255,255,255,0.7);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; /* Safari */
          mask-composite: exclude; /* Others */
          animation: borderTint 1200ms ease-in-out 200ms forwards;
          pointer-events: none;
        }
        .shine-card { position: relative; overflow: hidden; }
        .shine-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 8px; /* match rounded-md */
          padding: 1px; /* border thickness */
          background: linear-gradient(90deg, rgba(255,255,255,0.10), rgba(255,255,255,0.6), rgba(255,255,255,0.10));
          background-size: 200% 100%;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; /* Safari */
          mask-composite: exclude; /* Others */
          animation: borderMove 1.8s linear infinite;
          pointer-events: none;
        }
        .shine-card::before {
          content: '';
          position: absolute;
          top: -20%; bottom: -20%; left: -30%;
          width: 40%;
          background: linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.45), rgba(255,255,255,0.0));
          filter: blur(2px);
          animation: shineSweep 1.4s ease-out 0.2s forwards;
          pointer-events: none;
        }
      `}</style>
      
      <div
        className={`relative w-full h-full z-0 flex flex-col items-center justify-center transition-all duration-500 ${
          showRobot ? 'opacity-0 pointer-events-none' : blurStage ? 'blur-[3px] opacity-60' : 'opacity-100'
        }`}
      >
      <div className="relative w-full px-0 h-10 mb-0" style={{ animation: 'stratSlideUp 700ms ease-out forwards' }}>
        <div
          className="w-full h-[2px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(52,211,153,1) 0 1px, rgba(52,211,153,0) 1px 6px)'
          }}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-0">
          
          <span className="px-3 py-1 rounded-l-md border border-emerald-400  bg-emerald-300/30  text-white text-xs md:text-sm font-medium leading-none">
            Take Profit
          </span>
          <span  className="-ml-px px-3 py-1 rounded-r-md bg-black text-white text-xs md:text-sm font-medium leading-none ring-1 ring-emerald-300/60 backdrop-blur-[1px]">
            200%
          </span>
        </div>
      </div>
      
      <div className="relative w-full px-0 h-10" style={{ animation: 'stratSlideDown 700ms ease-out 50ms forwards' }}>
        <div
          className="w-full h-[2px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(52,211,153,1) 0 1px, rgba(52,211,153,0) 1px 6px)'
          }}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-0">
          <span className="px-3 py-1 rounded-l-md border border-emerald-400  bg-emerald-300/30  text-white text-xs md:text-sm font-medium leading-none">
            Buy at Dip
          </span>
          <span className="-ml-px px-3 py-1 rounded-r-md bg-black text-white text-xs md:text-sm font-medium leading-none ring-1 ring-emerald-300/60 backdrop-blur-[1px]">
            20%
          </span>
        </div>
      </div>
      
      <div className="relative w-full h-0">
        <div className="absolute right-2 top-[-30px] -translate-y-1/2 z-10 pointer-events-none">
          <div className="flex items-center gap-2 overflow-hidden" style={{ width: '190px', perspective: '700px', transformStyle: 'preserve-3d' }}>
            {[0,1,2,3].map((i) => (
              <div
                key={i}
                className={`min-w-[68px] h-[60px] px-2 py-1 flex flex-col justify-between rounded-md bg-black/50 text-white text-xs font-semibold border border-gray-300/60 ring-1 ring-gray-100/40 shadow-[0_0_10px_rgba(255,255,255,0.15)] backdrop-blur-[1px] ${i===0 ? 'shine-card' : ''}`}
                style={{
                  animation: `${i===0 ? 'flipUp 600ms cubic-bezier(0.22,1,0.36,1) 60ms both, ' : ''}cardInRight 600ms ease-out ${100 + i*120}ms both`,
                  transformOrigin: 'bottom center'
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200/90 shadow-[0_0_6px_rgba(255,255,255,0.35)]" />
                <span className="text-white text-lg  leading-none">25</span>
                <span className="text-[10px] text-gray-300 leading-none">2 slots</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      
      {showRobot && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-30">
          
          <div className="relative w-[30%] max-w-[320px] h-12 rounded-full bg-black/50 border-2 border-white/70 shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden" style={{ animation: 'borderToPrimary 1200ms ease-in-out 200ms forwards' }}>
            <img
              src={robot}
              alt="robot"
              className="absolute right-2 top-1/2 h-[320px] w-[200px] object-contain"
              style={{ animation: 'robotSlide 1200ms ease-in-out 200ms forwards, robotTint 1200ms ease-in-out 200ms forwards' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
