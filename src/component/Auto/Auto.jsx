import React, { useMemo } from 'react';
import chart1 from '../../asset/auto/chart1.png';
import chart2 from '../../asset/auto/chart2.png';
import chart3 from '../../asset/auto/chart3.png';
import s1 from '../../asset/auto/s1.png';
import s2 from '../../asset/auto/s2.png';
import s3 from '../../asset/auto/s3.png';

export default function Auto() {
  // Duplicate sequence to reinforce seamless loop
  const frames = useMemo(() => [chart1, chart2, chart3, chart1, chart2, chart3], []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* keyframes: seamless infinite slide (no scale to keep edges aligned) */}
      <style>{`
        @keyframes runTrackInfinite {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes markerInLeft {
          0%   { transform: translate(-70%, -50%) scale(0.8); opacity: 0; }
          60%  { transform: translate(-55%, -50%) scale(0.95); opacity: 0.65; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
        }
        @keyframes markerInCenter {
          0%   { transform: translate(-50%, -55%) scale(0.8); opacity: 0; }
          60%  { transform: translate(-50%, -52%) scale(0.95); opacity: 0.65; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
        }
        @keyframes markerInRight {
          0%   { transform: translate(70%, -50%) scale(0.8); opacity: 0; }
          60%  { transform: translate(55%, -50%) scale(0.95); opacity: 0.65; }
          100% { transform: translate(50%, -50%) scale(1); opacity: 0.85; }
        }
      `}</style>
      <div className="relative w-[92%] h-[92%] overflow-hidden">
        {/* Moving track: 600% width so six frames (1,2,3,1,2,3) sit side by side; slide by 50% (3 frames) and loop infinitely */}
        <div
          className="absolute inset-0 flex w-[600%] h-full will-change-transform"
          style={{ animation: 'runTrackInfinite 42000ms linear infinite' }}
        >
          {frames.map((src, i) => (
            <div key={i} className="w-1/6 h-full flex items-center justify-center overflow-hidden relative">
              <img
                src={src}
                alt={`chart frame ${i + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
                draggable={false}
              />
              {/* markers for each chart */}
              <img src={s1} alt="marker start" className="pointer-events-none select-none absolute z-10 top-1/2 left-[8%] w-5 h-5 opacity-80" style={{ transform: 'translate(-50%, -50%)' }} />
              <img src={s2} alt="marker middle" className="pointer-events-none select-none absolute z-10 top-1/2 left-1/2 w-5 h-5 opacity-80" style={{ transform: 'translate(-50%, -50%)' }} />
              <img src={s3} alt="marker end" className="pointer-events-none select-none absolute z-10 top-1/2 right-[8%] w-5 h-5 opacity-80" style={{ transform: 'translate(50%, -50%)' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
