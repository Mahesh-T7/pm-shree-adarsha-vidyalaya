import React from 'react';
import { Phone, Mail, Award, MapPin } from 'lucide-react';

export default function Header({ 
  onOpenEnquiry, 
  onOpenAdmission, 
  onOpenLogin, 
  onScrollToContact, 
  onLogoClick,
  isHMLoggedIn,
  onOpenHMDashboard,
  onLogoutHM
}) {
  return (
    <header className="bg-primary text-white shadow-lg">
      {/* Top micro info strip */}
      <div className="bg-primary-dark/80 border-b border-white/10 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-4 text-[11px] md:text-xs">
            <span className="flex items-center gap-1"><Phone size={12} className="text-amber-400" /> +91 85352 20101</span>
            <span className="hidden sm:flex items-center gap-1"><Mail size={12} className="text-amber-400" /> contact@pmshreeadarshasindhanur.org</span>
            <span className="hidden md:flex items-center gap-1 text-gray-300"><MapPin size={12} className="text-amber-400" /> Sindhanur, Dist: Raichur, Karnataka</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-primary-dark font-black px-2.5 py-0.5 rounded text-[10px] flex items-center gap-1 shadow-sm">
              <Award size={12} /> PM SHRI MODEL SCHOOL
            </span>
            <span className="text-amber-200 font-mono text-[11px] font-bold">DISE: 29060902804</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
        
        {/* Official Logo and School Bilingual Name */}
        <div 
          onClick={onLogoClick}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="/school-logo.jpg" 
              alt="PMSHRI Adarsha Vidyalaya Sindhanur Logo" 
              className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-amber-400 shadow-lg relative z-10 bg-white group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div>
            <div className="text-amber-300 font-bold text-xs md:text-sm tracking-wide flex items-center gap-1.5 font-sans">
              <span>ಪಿ.ಎಂ.ಶ್ರೀ ಆದರ್ಶ ವಿದ್ಯಾಲಯ ಸಿಂಧನೂರು</span>
            </div>
            <h1 className="font-black text-lg sm:text-xl md:text-2xl tracking-wide leading-tight text-white uppercase group-hover:text-amber-100 transition-colors">
              PMSHRI ADARSHA VIDYALAYA
            </h1>
            <p className="text-[11px] md:text-xs font-extrabold tracking-wider text-amber-300 uppercase">
              SINDHANUR, DIST: RAICHUR • MODEL SCHOOL
            </p>
          </div>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button 
            onClick={onScrollToContact}
            className="border-2 border-white/40 text-gray-100 hover:border-amber-300 hover:text-white transition-all text-xs font-bold px-4 py-1.5 rounded-full hover:bg-white/10 shadow-sm"
          >
            Contact School
          </button>

          {isHMLoggedIn ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={onOpenHMDashboard}
                className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-200 px-4 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 border border-emerald-300"
              >
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
                <span>👑 HM Dashboard (Post)</span>
              </button>
              <button 
                onClick={onLogoutHM}
                className="bg-red-500/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                title="Logout HM"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="bg-amber-400 text-primary-dark hover:bg-white hover:text-primary transition-all duration-200 px-4 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 border border-amber-300"
              title="Head Master Login"
            >
              <span>👑</span>
              <span>HM Portal Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
