import React from 'react';

function Card({ rotation = 0 }) {
  return (
    <div className="relative"  >
      <div
       className={`
        w-[210px]
        rounded-xl
        border border-[#b0b0b0]/30
        bg-[#0b0d0c]
        px-3 py-1
        text-white
        shadow-[0_0_15px_rgba(180,180,180,0.15),_0_0_30px_rgba(180,180,180,0.08),_0_10px_40px_rgba(0,0,0,0.6)]
        
      `}
      style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className="
                flex h-4 w-4 items-center justify-center 
                rounded-full 
                border border-emerald-400/80
                bg-transparent
                text-emerald-400 
                text-[6px] font-bold
              "
            >
              ✓
            </span>
            <span className="text-[8px] text-white">Buy complete</span>
          </div>
          <span className="text-gray-500 text-sm">✕</span>
        </div>

        <div className='flex justify-between'>
          <div className="space-y-1">
            <p className="text-[8px] text-gray-500">Transaction</p>
            <p className="text-[8px] text-white font-medium">298.4M</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] text-gray-500">Bought</p>
            <p className="text-[8px] text-white font-medium">298.4M</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] text-gray-500">Spent</p>
            <p className="text-[8px] text-white font-medium">7 WSOL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
