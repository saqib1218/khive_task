import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Ellipse } from '../../asset/App/elipse2.svg';
import Header from '../../component/Header/Header';
import centerImg from '../../asset/App/center.png';
import linesImg from '../../asset/App/lines.png';
import About from '../About/About';
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
          className="absolute h-fit inset-x-0 top-10 bottom-0 z-20"
        >
          <div ref={contentRef} style={{ transform: `translateY(-${virtOffset}px)`, willChange: 'transform' }}>
            <About />
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

