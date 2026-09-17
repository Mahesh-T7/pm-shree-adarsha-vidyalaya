import React, { useState } from 'react';
import { Megaphone, Pause, Play, Sparkles, ChevronRight, Edit3 } from 'lucide-react';

export default function NewsTicker({ 
  headlines = [], 
  onSelectHeadline, 
  isHMLoggedIn, 
  onEditHeadlines 
}) {
  const [isPaused, setIsPaused] = useState(false);

  if (!headlines || headlines.length === 0) return null;

  // Duplicate items for continuous seamless loop without gaps
  const displayItems = [...headlines, ...headlines];

  return (
    <div className="bg-[#0b1b36] border-y-2 border-amber-400 text-white relative shadow-md overflow-hidden z-30 select-none">
      <div className="max-w-7xl mx-auto flex items-center h-10 md:h-11">
        
        {/* Left Fixed Badge: Flash Headlines */}
        <div className="relative z-20 flex items-center shrink-0 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 sm:px-4 h-full shadow-lg border-r border-amber-400/50">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <Megaphone size={14} className="text-amber-300 mr-1.5 hidden xs:block" />
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white whitespace-nowrap">
            ಮುಖ್ಯಾಂಶಗಳು <span className="text-amber-300 hidden sm:inline">• HEADLINES</span>
          </span>
          {/* Subtle angled divider */}
          <div className="absolute top-0 -right-2.5 h-full w-2.5 bg-red-700 transform skew-x-12 pointer-events-none hidden sm:block"></div>
        </div>

        {/* Continuous Moving Track */}
        <div 
          className="flex-1 overflow-hidden relative flex items-center h-full group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`animate-marquee-smooth flex items-center whitespace-nowrap ${
              isPaused ? 'animate-marquee-paused' : ''
            }`}
          >
            {displayItems.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`}
                onClick={() => onSelectHeadline && onSelectHeadline(item)}
                className="inline-flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-100 hover:text-amber-300 transition-colors mx-4 group/item py-1"
                title="ಕ್ಲಿಕ್ ಮಾಡಿ ಓದಿ (Click to read details)"
              >
                {/* Category Pill */}
                {item.tag && (
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                    {item.tag}
                  </span>
                )}
                
                {/* Headline Text */}
                <span className="font-semibold tracking-wide flex items-center gap-1 group-hover/item:underline">
                  {item.text}
                </span>

                {/* Separator icon */}
                <span className="text-amber-400/60 text-xs ml-3 font-bold select-none">✦</span>
              </div>
            ))}
          </div>

          {/* Gradient edge fades for polished look */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#0b1b36] to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0b1b36] to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Right Controls: Play/Pause Toggle & HM Edit */}
        <div className="relative z-20 flex items-center shrink-0 bg-[#0b1b36] pl-2 pr-3 h-full border-l border-white/10 gap-1.5">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-primary-dark text-slate-200 transition-colors text-xs flex items-center gap-1"
            title={isPaused ? "ಮುಂದುವರಿಸಿ (Play Ticker)" : "ನಿಲ್ಲಿಸಿ (Pause Ticker)"}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>

          {isHMLoggedIn && onEditHeadlines && (
            <button
              onClick={onEditHeadlines}
              className="bg-amber-400 hover:bg-amber-300 text-primary-dark font-black text-[10px] px-2.5 py-1 rounded-lg shadow transition-all flex items-center gap-1 border border-white/40"
              title="ಮುಖ್ಯಾಂಶಗಳನ್ನು ತಿದ್ದಿ (Edit Headlines)"
            >
              <Edit3 size={11} />
              <span className="hidden md:inline">Edit Headlines</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
