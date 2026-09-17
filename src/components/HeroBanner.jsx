import React, { useState } from 'react';
import { academicToppers } from '../data/achievements';
import { Award, Star, School, Landmark, Sparkles, Eye, CheckCircle2, ChevronRight } from 'lucide-react';

export default function HeroBanner({ 
  onNavigateAttractions, 
  onNavigateAbout, 
  toppers, 
  isHMLoggedIn, 
  onOpenEditToppers 
}) {
  const [showBannerLightbox, setShowBannerLightbox] = useState(false);
  
  // Toppers filter - Top 2 rankers in center board, remaining 6 in side blocks
  const activeToppers = toppers && toppers.length > 0 ? toppers : academicToppers;
  const topRankers = activeToppers.slice(0, 2);
  const otherToppers = activeToppers.slice(2);

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-cyan-50/50 to-white py-8 px-4 overflow-hidden border-b border-gray-200">
      
      {/* Decorative floating shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* 1. Official School Campus & Identity Hero Frame */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-blue-100 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <School size={14} className="text-amber-700" />
                Govt. Model School • PM SHRI
              </div>
              
              <div>
                <h3 className="text-amber-700 font-bold text-sm md:text-base font-sans">
                  ಪಿ.ಎಂ.ಶ್ರೀ ಆದರ್ಶ ವಿದ್ಯಾಲಯ ಸಿಂಧನೂರು
                </h3>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary leading-tight mt-1">
                  PMSHRI ADARSHA VIDYALAYA
                </h2>
                <p className="text-xs sm:text-sm font-extrabold text-accent uppercase tracking-wider mt-1">
                  Sindhanur, Raichur (Dist), Karnataka
                </p>
              </div>

              <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
                Empowering the future generation with world-class smart infrastructure, holistic STEM curriculum, and profound connection to the historical marvels of Sindhanur taluk.
              </p>

              {/* Badges / Highlights */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] font-bold text-primary">Smart Digital Labs</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[11px] font-bold text-primary">100% CBSE Results</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start">
                <button 
                  onClick={() => setShowBannerLightbox(true)}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Eye size={14} /> View School Banner
                </button>
                {onNavigateAttractions && (
                  <button 
                    onClick={onNavigateAttractions}
                    className="bg-amber-400 hover:bg-amber-500 text-primary-dark px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <Landmark size={14} /> Main Attractions
                  </button>
                )}
              </div>
            </div>

            {/* Right School Banner / Campus Image Preview with interactive overlay */}
            <div className="lg:col-span-7">
              <div 
                onClick={() => setShowBannerLightbox(true)}
                className="relative rounded-2xl overflow-hidden border-4 border-amber-300 shadow-2xl group cursor-pointer bg-slate-900 aspect-[16/9] sm:aspect-[2/1] flex items-center justify-center"
              >
                <img 
                  src="/school-banner.jpg" 
                  alt="PMSHRI Adarsha Vidyalaya Sindhanur Campus and Attractions Banner" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating caption tag */}
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-300/40 shadow-lg flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-300" />
                  Official School Campus & Heritage Banner
                </div>

                {/* Hover Explore Indicator */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full mb-2">
                    <Eye size={24} className="text-amber-300" />
                  </div>
                  <span className="font-extrabold text-sm uppercase tracking-wide">Click to Enlarge Full Banner</span>
                  <span className="text-[11px] text-gray-200 mt-1">Includes Campus Building & 4 Scanned Historical Attractions</span>
                </div>
              </div>

              {/* Mini thumbnails of the 4 scanned landmarks on the banner */}
              <div className="grid grid-cols-4 gap-2 mt-3 text-center">
                <div 
                  onClick={onNavigateAttractions}
                  className="bg-slate-50 hover:bg-amber-50 p-1.5 rounded-xl border border-gray-200 cursor-pointer transition-colors"
                >
                  <img src="/ambadevi-temple.jpg" alt="Ambadevi" className="w-full h-10 object-contain rounded bg-slate-900" />
                  <span className="text-[9px] font-bold text-gray-700 truncate block mt-1">Ambadevi (17th C.)</span>
                </div>
                <div 
                  onClick={onNavigateAttractions}
                  className="bg-slate-50 hover:bg-amber-50 p-1.5 rounded-xl border border-gray-200 cursor-pointer transition-colors"
                >
                  <img src="/murahari-temple.jpg" alt="Murahari Temple" className="w-full h-10 object-contain rounded bg-slate-900" />
                  <span className="text-[9px] font-bold text-gray-700 truncate block mt-1">Murahari Temple</span>
                </div>
                <div 
                  onClick={onNavigateAttractions}
                  className="bg-slate-50 hover:bg-amber-50 p-1.5 rounded-xl border border-gray-200 cursor-pointer transition-colors"
                >
                  <img src="/roudkunda-fort.jpg" alt="Roudkunda Fort" className="w-full h-10 object-contain rounded bg-slate-900" />
                  <span className="text-[9px] font-bold text-gray-700 truncate block mt-1">Roudkunda Fort</span>
                </div>
                <div 
                  onClick={onNavigateAttractions}
                  className="bg-slate-50 hover:bg-amber-50 p-1.5 rounded-xl border border-gray-200 cursor-pointer transition-colors"
                >
                  <img src="/sindhanur-monument.jpg" alt="Historic Monument" className="w-full h-10 object-contain rounded bg-slate-900" />
                  <span className="text-[9px] font-bold text-gray-700 truncate block mt-1">Sindhanur Mon.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Ribbon Title for SSLC / Class X Results */}
        <div className="text-center">
          <div className="inline-block relative mb-6">
            <div className="bg-accent text-white font-extrabold px-6 md:px-12 py-3 text-xs sm:text-sm md:text-xl uppercase tracking-widest rounded-sm shadow-xl flex items-center gap-2 transform -skew-x-6 border-y-2 border-amber-300">
              <Award className="text-yellow-300 animate-spin duration-3000" size={20} />
              SSLC / Class X Board Exam Toppers (Out of 625)
              <Award className="text-yellow-300 animate-spin duration-3000" size={20} />
            </div>
            {/* Ribbon Ends */}
            <div className="absolute top-0 -left-4 w-4 h-full bg-accent-dark transform -skew-x-6 origin-right z-[-1] rounded-l-md"></div>
            <div className="absolute top-0 -right-4 w-4 h-full bg-accent-dark transform -skew-x-6 origin-left z-[-1] rounded-r-md"></div>
          </div>

          <h2 className="text-primary font-black text-xl md:text-3xl lg:text-4xl mb-4 leading-tight">
            Success Never Stops At PM Shree Adarsha Vidyalaya — Incredible Results!
          </h2>

          {isHMLoggedIn && (
            <div className="mb-6 flex justify-center">
              <button
                onClick={onOpenEditToppers}
                className="bg-amber-400 hover:bg-amber-500 text-primary-dark font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 border border-amber-300"
              >
                <Sparkles size={14} />
                <span>ಸಾಧಕರ ಅಂಕಗಳು & ಫೋಟೋ ತಿದ್ದಿ (Edit Toppers & Marks)</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. Toppers Layout Container */}
        <div className="flex flex-col xl:flex-row justify-center items-center gap-6 lg:gap-8 my-6">
          
          {/* Left Block Toppers (3 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4 w-full xl:w-[350px]">
            {otherToppers.slice(0, 3).map((topper, i) => (
              <div key={i} className="bg-white border-2 border-blue-200 rounded-2xl p-3.5 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 duration-200 relative flex items-center gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="bg-yellow-400 text-primary-dark font-black text-[9px] px-2 py-0.5 rounded-full shadow-sm border border-white mb-1.5 uppercase tracking-wide whitespace-nowrap">
                    {topper.rank}
                  </span>
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-md bg-slate-50 flex items-center justify-center">
                    <img 
                      src={topper.photo || topper.avatar} 
                      alt={topper.name} 
                      onError={(e) => { e.currentTarget.src = topper.avatar; }}
                      className={`w-full h-full object-cover ${topper.id === 5 ? 'scale-125 object-center' : 'object-top hover:scale-105'} transition-transform duration-200`} 
                    />
                  </div>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-primary font-black text-base leading-none">{topper.score}</span>
                    <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                      {topper.percentage}
                    </span>
                  </div>
                  <div className="text-gray-900 font-black text-sm mt-1 leading-snug">{topper.name}</div>
                  <div className="text-[11px] text-gray-600 font-semibold mt-0.5 leading-snug">{topper.htNo}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Main Champions Board */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-white/80 backdrop-blur-md border-4 border-amber-300 rounded-3xl p-6 md:p-8 shadow-2xl relative w-full max-w-3xl">
            {/* Top Badge */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-primary-dark font-black px-6 py-1 rounded-full text-xs uppercase tracking-wider shadow-md border-2 border-white flex items-center gap-1 whitespace-nowrap">
              <Star size={14} className="fill-current" /> SCHOOL TOPPERS (OUT OF 625) <Star size={14} className="fill-current" />
            </div>

            {/* Left Top Ranker (Rank 1) */}
            {topRankers[0] && (
              <div className="flex flex-col items-center text-center">
                <span className="bg-primary text-amber-300 font-black px-3.5 py-1 rounded-full text-xs shadow-md border-2 border-amber-300 mb-2.5 z-20 tracking-wide uppercase flex items-center gap-1">
                  ★ {topRankers[0].rank || "RANK 1"}
                </span>
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-30 animate-pulse"></div>
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-amber-400 relative z-10 shadow-lg bg-slate-50">
                    <img 
                      src={topRankers[0].photo || topRankers[0].avatar} 
                      alt={topRankers[0].name} 
                      onError={(e) => { e.currentTarget.src = topRankers[0].avatar; }}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-200" 
                    />
                  </div>
                </div>
                <div className="bg-primary text-white font-black px-5 py-2 rounded-xl mt-4 shadow-md text-center border-2 border-amber-300">
                  <div className="text-xl md:text-2xl text-amber-300 leading-tight">{topRankers[0].score}</div>
                  <div className="text-xs font-bold text-white tracking-wide">{topRankers[0].percentage}</div>
                </div>
                <h4 className="text-gray-900 font-black text-base md:text-lg mt-2">{topRankers[0].name}</h4>
                <p className="text-xs text-primary font-bold">{topRankers[0].htNo}</p>
              </div>
            )}

            {/* Center "1" Graphic Badge */}
            <div className="flex flex-col items-center my-4 md:my-0 px-4">
              <div className="relative flex items-center justify-center">
                <span className="text-[110px] md:text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-b from-red-600 to-amber-500 leading-none">
                  1
                </span>
                <div className="absolute bottom-2 bg-gradient-to-r from-red-600 to-accent text-white font-black text-xs px-4 py-1 rounded-full shadow-md whitespace-nowrap transform -rotate-3 border-2 border-amber-200">
                  ALWAYS NO. 1
                </div>
              </div>
            </div>

            {/* Right Top Ranker (Rank 2) */}
            {topRankers[1] && (
              <div className="flex flex-col items-center text-center">
                <span className="bg-accent text-white font-black px-3.5 py-1 rounded-full text-xs shadow-md border-2 border-white mb-2.5 z-20 tracking-wide uppercase flex items-center gap-1">
                  ★ {topRankers[1].rank || "RANK 2"}
                </span>
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-30 animate-pulse"></div>
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-amber-400 relative z-10 shadow-lg bg-slate-50">
                    <img 
                      src={topRankers[1].photo || topRankers[1].avatar} 
                      alt={topRankers[1].name} 
                      onError={(e) => { e.currentTarget.src = topRankers[1].avatar; }}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-200" 
                    />
                  </div>
                </div>
                <div className="bg-primary text-white font-black px-5 py-2 rounded-xl mt-4 shadow-md text-center border-2 border-amber-300">
                  <div className="text-xl md:text-2xl text-amber-300 leading-tight">{topRankers[1].score}</div>
                  <div className="text-xs font-bold text-white tracking-wide">{topRankers[1].percentage}</div>
                </div>
                <h4 className="text-gray-900 font-black text-base md:text-lg mt-2">{topRankers[1].name}</h4>
                <p className="text-xs text-primary font-bold">{topRankers[1].htNo}</p>
              </div>
            )}
          </div>

          {/* Right Block Toppers (3 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4 w-full xl:w-[350px]">
            {otherToppers.slice(3, 6).map((topper, i) => (
              <div key={i} className="bg-white border-2 border-blue-200 rounded-2xl p-3.5 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 duration-200 relative flex items-center gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="bg-yellow-400 text-primary-dark font-black text-[9px] px-2 py-0.5 rounded-full shadow-sm border border-white mb-1.5 uppercase tracking-wide whitespace-nowrap">
                    {topper.rank}
                  </span>
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-md bg-slate-50 flex items-center justify-center">
                    <img 
                      src={topper.photo || topper.avatar} 
                      alt={topper.name} 
                      onError={(e) => { e.currentTarget.src = topper.avatar; }}
                      className={`w-full h-full object-cover ${topper.id === 8 ? 'scale-115 object-top' : 'object-top hover:scale-105'} transition-transform duration-200`} 
                    />
                  </div>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-primary font-black text-base leading-none">{topper.score}</span>
                    <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                      {topper.percentage}
                    </span>
                  </div>
                  <div className="text-gray-900 font-black text-sm mt-1 leading-snug">{topper.name}</div>
                  <div className="text-[11px] text-gray-600 font-semibold mt-0.5 leading-snug">{topper.htNo}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Quick scrolling message of other successes */}
        <div className="bg-primary text-yellow-300 font-extrabold text-xs md:text-sm py-2.5 px-4 rounded-2xl overflow-hidden shadow-inner mt-6 flex border border-amber-300/30">
          <div className="animate-marquee whitespace-nowrap flex gap-12">
            <span>🎉 ADMISSIONS OPEN FOR ACADEMIC YEAR 2026-27 | ENROLL AT PMSHRI SINDHANUR 🎉</span>
            <span>🏆 OVER 82 STUDENTS SCORED ABOVE 95% IN CBSE CLASS X BOARD EXAMS 🏆</span>
            <span>🌟 CELEBRATING SINDHANUR'S CULTURAL HERITAGE: AMBADEVI, MUKHUMLA & ROUDKUNDA 🌟</span>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Full School Banner */}
      {showBannerLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setShowBannerLightbox(false)}
              className="absolute top-4 right-4 z-20 bg-slate-900/70 hover:bg-slate-900 text-white p-2.5 rounded-full transition-colors"
            >
              ✕
            </button>
            <div className="p-4 bg-slate-900">
              <img 
                src="/school-banner.jpg" 
                alt="PMSHRI Adarsha Vidyalaya Sindhanur Banner" 
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />
            </div>
            <div className="p-5 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="font-black text-primary text-lg">
                  ಪಿ.ಎಂ.ಶ್ರೀ ಆದರ್ಶ ವಿದ್ಯಾಲಯ ಸಿಂಧನೂರು • PMSHRI ADARSHA VIDYALAYA SINDHANUR
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Features School Building & 4 Main Attractions: Ambadevi (Ambamatha), Murahari Temple (Mukhumla), Roudkunda Fort, Sindhanur Monument.
                </p>
              </div>
              <button 
                onClick={() => setShowBannerLightbox(false)}
                className="bg-accent text-white font-bold text-xs px-5 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
