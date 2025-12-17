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
import Auto from '../../component/Auto/Auto';
import Filter from '../../component/Filter/Filter';
import Strategy from '../../component/strategy/Strategy';
import Card from '../../component/Card/Card';
function Landingpage() {
  const scrollAreaRef = useRef(null);
  const contentRef = useRef(null);
  const [virtOffset, setVirtOffset] = useState(0);
  const [selectedTab, setSelectedTab] = useState('Auto');

  // Manually handle wheel inside the scroll area and block page scroll
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;

    const logState = () => {};

    logState();

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
        logState();
        el.scrollTop = next;
      } else {
        const viewport = el.clientHeight;
        const maxVirt = Math.max(0, viewport);
        setVirtOffset((prevVirt) => {
          let nextVirt = prevVirt + (deltaY > 0 ? Math.abs(deltaY) : -Math.abs(deltaY));
          if (nextVirt < 0) nextVirt = 0;
          if (nextVirt > maxVirt) nextVirt = maxVirt;
          logState();
          return nextVirt;
        });
      }

      // Prevent page scroll regardless of edge state
      e.stopPropagation();
      e.preventDefault();
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!(e.touches && e.touches.length > 0)) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;

      const prev = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const canScrollUp = prev > 0;
      const canScrollDown = prev < maxScroll;
      if (maxScroll > 0) {
        let next = prev + deltaY;
        if (next < 0) next = 0;
        if (next > maxScroll) next = maxScroll;
        logState();
        el.scrollTop = next;
      } else {
        const viewport = el.clientHeight;
        const maxVirt = Math.max(0, viewport);
        setVirtOffset((prevVirt) => {
          let nextVirt = prevVirt + (deltaY > 0 ? Math.abs(deltaY) : -Math.abs(deltaY));
          if (nextVirt < 0) nextVirt = 0;
          if (nextVirt > maxVirt) nextVirt = maxVirt;
          logState();
          return nextVirt;
        });
      }

      e.stopPropagation();
      e.preventDefault();
      touchStartY = currentY;
    };

    const onScroll = () => {};

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
        <div className="absolute inset-x-0 top-0 z-40 bg-transparent">
          <Header />
        </div>
        <div
          ref={scrollAreaRef}
          className="absolute h-fit inset-x-0 top-10 bottom-0 z-20 overflow-hidden"
        >
          <div
            ref={contentRef}
            style={{
              transform: `translateY(-${virtOffset}px)`,
              willChange: 'transform',
              WebkitClipPath: 'inset(26px 0 0 0)',
              clipPath: 'inset(26px 0 0 0)'
            }}
          >
            <About />
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 'calc(40% + 24px)' }}>
          <div className="w-[306px] rounded-full h-[304.776px]  relative ">
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
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[306px] h-[304.776px] rounded-full bg-[#1E1E24] z-[5] pointer-events-none" />
            <div className="w-full h-full rounded-full bg-transparent border-[2px] z-10 shadow-[inset_0px_4px_60px_0px_rgba(255,255,255,0.28),_0px_4px_120px_70px_#010101]" />
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none rounded-full overflow-hidden">
              {selectedTab === 'Auto' && <Auto />}
              {selectedTab === 'Filter' && <Filter />}
              {selectedTab === 'Strategy' && <Strategy />}
            </div>
            <div className="absolute left-[-260px] top-[30%] -translate-y-1/2 pointer-events-none select-none" style={{ position: 'absolute' }}>
              <img src={leftline} alt="left line" className="block" />
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
            <div className="absolute right-[-260px] top-[30%] -translate-y-1/2 pointer-events-none select-none" style={{ position: 'absolute' }}>
              <img src={rightline} alt="right line" className="block" />
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
          <div className="mt-4 flex items-center justify-center gap-4 select-none">
            <button
              type="button"
              onClick={() => setSelectedTab('Filter')}
              className={`${selectedTab === 'Filter' ? 'text-white' : 'text-gray-400'} text-2xl tracking-wide`}
            >
              Filter
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('Strategy')}
              className={`${selectedTab === 'Strategy' ? 'text-white' : 'text-gray-400'} text-2xl tracking-wide`}
            >
              Strategy
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('Auto')}
              className={`${selectedTab === 'Auto' ? 'text-white' : 'text-gray-400'} text-2xl tracking-wide`}
            >
              Auto
            </button>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="relative w-[240px] h-[2px] bg-gray-600/60 rounded-full">
              <div
                className="absolute left-0 top-0 h-full bg-emerald-400 rounded-full transition-[width] duration-500 ease-out"
                style={{ width: selectedTab === 'Filter' ? '33%' : selectedTab === 'Strategy' ? '66%' : '100%' }}
              />
            </div>
          </div>
        </div>

        <Ellipse className="w-full h-auto [&_*]:animate-dash [&_*]:[stroke-dasharray:2_14]" />
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

