import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Ellipse } from '../../asset/App/elipse2.svg';
import Header from '../../component/Header/Header';
import centerImg from '../../asset/App/center.png';
import linesImg from '../../asset/App/lines.png';
import leftline from '../../asset/App/leftline3.png';
import rightline from '../../asset/App/rightline.png';
import leftbranch from '../../asset/App/leftbranch.png';
import rightbranch from '../../asset/App/rightbranch.png';
import l1 from '../../asset/App/l1.png';
import l2 from '../../asset/App/l2.png';
import l3 from '../../asset/App/l3.png';
import l4 from '../../asset/App/l4.png';
import l5 from '../../asset/App/l5.png';

import About from '../About/About';
import Card from '../../component/Card/Card';
function Landingpage() {
  const scrollAreaRef = useRef(null);
  const contentRef = useRef(null);
  const [virtOffset, setVirtOffset] = useState(0); // virtual translate when no native scroll

  // Manually handle wheel inside the scroll area and block page scroll
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;

    const logState = (label, extra = {}) => {
      const info = {
        label,
        scrollTop: el.scrollTop,
        clientHeight: el.clientHeight,
        scrollHeight: el.scrollHeight,
        maxScroll: el.scrollHeight - el.clientHeight,
        atTop: el.scrollTop <= 0,
        atBottom: el.scrollTop >= el.scrollHeight - el.clientHeight,
        ...extra,
      };
      // eslint-disable-next-line no-console
      console.log('[AboutArea]', info);
    };

    // Initial metrics
    logState('mount');

    const onWheel = (e) => {
      const { deltaY } = e;

      const prev = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const canScrollUp = prev > 0;
      const canScrollDown = prev < maxScroll;

      // If native scroll exists, use it. Otherwise, virtually move content upward.
      if (maxScroll > 0) {
        let next = prev + deltaY;
        if (next < 0) next = 0;
        if (next > maxScroll) next = maxScroll;
        logState('wheel', { deltaY, prev, next, canScrollUp, canScrollDown });
        el.scrollTop = next;
      } else {
        // No native overflow; simulate by translating content wrapper
        // We want: scroll down (deltaY > 0) -> move content up (increase virtOffset)
        //          scroll up (deltaY < 0)  -> move content down (decrease virtOffset)
        const viewport = el.clientHeight;
        const maxVirt = Math.max(0, viewport);
        setVirtOffset((prevVirt) => {
          let nextVirt = prevVirt + (deltaY > 0 ? Math.abs(deltaY) : -Math.abs(deltaY));
          if (nextVirt < 0) nextVirt = 0;
          if (nextVirt > maxVirt) nextVirt = maxVirt;
          logState('wheel-virtual', { deltaY, prevVirt, nextVirt, viewport });
          return nextVirt;
        });
      }

      // Prevent page scroll regardless of edge state
      e.stopPropagation();
      e.preventDefault();
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!(e.touches && e.touches.length > 0)) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY; // positive means scroll down

      const prev = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const canScrollUp = prev > 0;
      const canScrollDown = prev < maxScroll;
      if (maxScroll > 0) {
        let next = prev + deltaY;
        if (next < 0) next = 0;
        if (next > maxScroll) next = maxScroll;
        logState('touchmove', { deltaY, prev, next, canScrollUp, canScrollDown });
        el.scrollTop = next;
      } else {
        const viewport = el.clientHeight;
        const maxVirt = Math.max(0, viewport);
        setVirtOffset((prevVirt) => {
          // For touch: deltaY = touchStartY - currentY (positive means scroll down)
          let nextVirt = prevVirt + (deltaY > 0 ? Math.abs(deltaY) : -Math.abs(deltaY));
          if (nextVirt < 0) nextVirt = 0;
          if (nextVirt > maxVirt) nextVirt = maxVirt;
          logState('touchmove-virtual', { deltaY, prevVirt, nextVirt, viewport });
          return nextVirt;
        });
      }

      e.stopPropagation();
      e.preventDefault();
      // update baseline for smooth continuous scroll
      touchStartY = currentY;
    };

    const onScroll = () => {
      logState('scroll');
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="flex  min-h-screen bg-transparent">
      <div className="relative w-4/5 min-h-screen border border-[#141519] rounded-2xl overflow-hidden">
        {/* Header fixed to the top of the inner container */}
        <div className="absolute inset-x-0 top-0 z-40 bg-transparent">
          <Header />
        </div>
        {/* Scrollable About area between header and bottom */}
        <div
          ref={scrollAreaRef}
          className="absolute h-fit inset-x-0 top-10 bottom-0 z-20 overflow-hidden"
        >
          <div
            ref={contentRef}
            style={{
              transform: `translateY(-${virtOffset}px)`,
              willChange: 'transform',
              // Hide the top 26px so content becomes invisible as it goes under the header divider
              WebkitClipPath: 'inset(26px 0 0 0)',
              clipPath: 'inset(26px 0 0 0)'
            }}
          >
            <About />
          </div>
        </div>

        {/* Non-scrolling decorative circle, centered with slight margin below About */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 'calc(44% + 24px)' }}>
          <div className="w-[306px] rounded-full h-[304.776px]  relative ">
            {/* branches close to the circle (full length, no mask) */}
            <img
              src={leftbranch}
              alt="left branch"
              className="absolute h-[420.776px] w-[376px] pointer-events-none select-none"
              style={{ right: 'calc(70% )', bottom: 'calc(6%)' }}
            />
            <img
              src={rightbranch}
              alt="right branch"
              className="absolute h-[420.776px] w-[376px] pointer-events-none select-none"
              style={{ left: 'calc(70% )', bottom: 'calc(10%)' }}
            />
            {/* eraser circle: hides only the branch area behind the circle while keeping the circle visually transparent */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[306px] h-[304.776px] rounded-full bg-[#1E1E24] z-[5] pointer-events-none" />
            {/* circle */}
            <div className="w-full h-full rounded-full bg-transparent border-[2px] z-10 shadow-[inset_0px_4px_60px_0px_rgba(255,255,255,0.28),_0px_4px_120px_70px_#010101]" />
            {/* original lines further out with overlay icons stacked vertically along the left curved line */}
            <div className="absolute left-[-260px] top-[30%] -translate-y-1/2 pointer-events-none select-none" style={{ position: 'absolute' }}>
              {/* Left curved line */}
              <img src={leftline} alt="left line" className="block" />
              {/* Overlay icons positioned vertically (tweakable) */}
              <div className="absolute left-[70px] top-[8%] -translate-x-1/2 -translate-y-1/2">
                <img src={l1} alt="l1" className="w-full h-full" />
              </div>
              <div className="absolute left-[20px] top-[27%] -translate-x-1/2 -translate-y-1/2">
                <img src={l2} alt="l2" className="w-full h-full" />
              </div>
              <div className="absolute left-[10px] top-[47%] -translate-x-1/2 -translate-y-1/2">
                <img src={l3} alt="l3" className="w-full h-full" />
              </div>
              <div className="absolute left-[20px] top-[67%] -translate-x-1/2 -translate-y-1/2">
                <img src={l4} alt="l4" className="w-full h-full" />
              </div>
              <div className="absolute right-[20px] top-[75%] ">
                <img src={l5} alt="l5" className="w-full h-full" />
              </div>
            </div>
            {/* Right curved line with overlay icons stacked vertically (mirroring left side) */}
            <div className="absolute right-[-260px] top-[30%] -translate-y-1/2 pointer-events-none select-none" style={{ position: 'absolute' }}>
              {/* Right curved line */}
              <img src={rightline} alt="right line" className="block" />
              {/* Overlay icons positioned vertically (tweakable) */}
              <div className="absolute right-[30px] top-[8%] translate-x-1/2 -translate-y-1/2">
              <Card rotation={-12} />
              </div>
              <div className="absolute right-[10px] top-[26%] translate-x-1/2 -translate-y-1/2">
                <Card rotation={-12}/>
              </div>
              <div className="absolute right-[0px] top-[44%] translate-x-1/2 -translate-y-1/2">
              <Card rotation={-12}/>
              </div>
              <div className="absolute right-[10px] top-[68%] translate-x-1/2 -translate-y-1/2">
              <Card rotation={16} />
              </div>
              <div className="absolute left-[140px] top-[85%] -translate-x-1/2 -translate-y-1/2">
              <Card rotation={22}/>
              </div>
            </div>
          </div>
        </div>

        <Ellipse className="w-full h-auto [&_*]:animate-dash [&_*]:[stroke-dasharray:2_14]" />
        {/* Centered overlay images */}
        <img
          src={linesImg}
          alt="lines"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full object-contain pointer-events-none"
        />
        <img
          src={centerImg}
          alt="center"
          className="absolute top-1/2 left-[25%] -translate-y-1/2 -translate-x-1/2 z-10 w-full h-full object-contain pointer-events-none"
        />
      </div>
    </div>
  );
}

export default Landingpage;

