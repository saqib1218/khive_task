    import React, { useMemo, useEffect, useState } from 'react';
    import { FaVolumeUp, FaTrophy, FaRocket } from 'react-icons/fa';
    import twitter from '../../asset/filter/twitter.png';
    import discord from '../../asset/filter/discord.png';
    import telegram from '../../asset/filter/telegram.png';
    import wallet from '../../asset/filter/wallet.png';
    import caller from '../../asset/filter/caller.png';

    export default function Filter() {
    const [activeTopIndex, setActiveTopIndex] = useState(0);
    const [activeBottomIndex, setActiveBottomIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
      }, []);
    const topRow = useMemo(
        () => [
        { 
            img: twitter, 
            label: 'Twitter',
            value: '218',
            winRatio: '76%',
            highestROI: '240x'
        },
        { 
            img: discord, 
            label: 'Discord',
            value: '218',
            winRatio: '76%',
            highestROI: '240x'
        },
        { 
            img: telegram, 
            label: 'Telegram',
            value: '218',
            winRatio: '76%',
            highestROI: '240x'
        },
        { 
            img: wallet, 
            label: 'Wallet',
            value: '218',
            winRatio: '76%',
            highestROI: '240x'
        },
        { 
            img: caller, 
            label: 'Caller',
            value: '218',
            winRatio: '76%',
            highestROI: '240x'
        }
        ],
        []
    );
    const bottomRow = topRow;

   
    useEffect(() => {
       
        const timer = setTimeout(() => {
          setIsAnimating(true);
          
          
          setTimeout(() => {
            setActiveTopIndex((prev) => (prev + 1) % topRow.length);
            setActiveBottomIndex((prev) => (prev + 1) % bottomRow.length);
            
            
            setTimeout(() => {
              setIsAnimating(false);
            }, 300);
          }, 1000); 
        }, 1000); 
      
        return () => clearTimeout(timer);
      }, [topRow.length, bottomRow.length]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <style>{`
            @keyframes slideInLeft { from { transform: translateX(-40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideInRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes borderShine {
            0% { border-color: rgba(156, 163, 175, 0.4); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
            50% { border-color: rgb(59, 130, 246); box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.7); }
            100% { border-color: rgba(156, 163, 175, 0.4); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
            }
            @keyframes slideUpAndHide {
            0% { transform: translateY(0); opacity: 1; }
            70% { transform: translateY(-40px); opacity: 0.7; }
            100% { transform: translateY(-60px); opacity: 0; }
            }
            @keyframes slideDownAndHide {
            0% { transform: translateY(0); opacity: 1; }
            70% { transform: translateY(40px); opacity: 0.7; }
            100% { transform: translateY(60px); opacity: 0; }
            }
            .border-shine {
            animation: borderShine 1s ease-in-out;
            }
            .slide-up-hide {
            animation: slideUpAndHide 0.5s ease-out forwards;
            }
            .slide-down-hide {
            animation: slideDownAndHide 0.5s ease-out forwards;
            }
        `}</style>

        <div className="flex gap-3 relative">
            {topRow.map((c, i) => (
            <div
                key={`top-${i}`}
                className={`w-[160px] h-[88px] rounded-md border border-gray-400/40 bg-black/60 flex flex-col select-none p-2 relative
                ${i === activeTopIndex && isAnimating ? 'border-shine' : ''}
                ${i === activeTopIndex && isAnimating ? 'slide-up-hide' : ''}
                ${i !== activeTopIndex ? 'opacity-0' : ''}
                `}
                style={{ 
                animation: i === activeTopIndex ? 'none' : `slideInLeft 600ms ease-out ${i * 120}ms both`,
                zIndex: i === activeTopIndex ? 10 : 1
                }}
            >
                <div className="flex items-center gap-1 mb-2">
                <img src={c.img} alt={c.label} className="h-4 w-4 object-contain" />
                <span className="text-white text-[10px] leading-none">{c.label}</span>
                </div>
                
                
                <div className='flex justify-between w-full'>
                
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                    <FaVolumeUp className="h-3 w-3 text-gray-400" />
                    <span className="text-white text-[11px] font-medium">{c.value}</span>
                    </div>
                    <span className="text-gray-400 text-[8px] mt-0.5">calls</span>
                </div>
                
                
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                    <FaTrophy className="h-3 w-3 text-gray-400" />
                    <span className="text-white text-[9px]">{c.winRatio}</span>
                    </div>
                    <span className="text-gray-400 text-[8px] mt-0.5">win ratio</span>
                </div>
                
                
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                    <FaRocket className="h-3 w-3 text-gray-400" />
                    <span className="text-blue-500 text-[9px] font-medium">{c.highestROI}</span>
                    </div>
                    <span className="text-gray-400 text-[8px] mt-0.5">Highest ROI</span>
                </div>
                </div>
            </div>
            ))}
        </div>

        <div className="flex gap-3 relative">
            {bottomRow.map((c, i) => (
            <div
                key={`bottom-${i}`}
                className={`w-[160px] h-[88px] rounded-md border border-gray-400/40 bg-black/60 flex flex-col select-none p-2 relative
                ${i === activeBottomIndex && isAnimating ? 'border-shine' : ''}
                ${i === activeBottomIndex && isAnimating ? 'slide-down-hide' : ''}
                ${i !== activeBottomIndex ? 'opacity-0' : ''}
                `}
                style={{ 
                animation: i === activeBottomIndex ? 'none' : `slideInRight 600ms ease-out ${i * 120}ms both`,
                zIndex: i === activeBottomIndex ? 10 : 1
                }}
            >
                
                <div className="flex items-center gap-1 mb-2">
                <img src={c.img} alt={c.label} className="h-4 w-4 object-contain" />
                <span className="text-white text-[10px] leading-none">{c.label}</span>
                </div>
                
                
                <div className='flex justify-between w-full'>
                
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                    <FaVolumeUp className="h-3 w-3 text-gray-400" />
                    <span className="text-white text-[11px] font-medium">{c.value}</span>
                    </div>
                    <span className="text-gray-400 text-[8px] mt-0.5">calls</span>
                </div>
                
                
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                    <FaTrophy className="h-3 w-3 text-gray-400" />
                    <span className="text-white text-[9px]">{c.winRatio}</span>
                    </div>
                    <span className="text-gray-400 text-[8px] mt-0.5">win ratio</span>
                </div>
                
                
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                    <FaRocket className="h-3 w-3 text-gray-400" />
                    <span className="text-blue-500 text-[9px] font-medium">{c.highestROI}</span>
                    </div>
                    <span className="text-gray-400 text-[8px] mt-0.5">Highest ROI</span>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    }