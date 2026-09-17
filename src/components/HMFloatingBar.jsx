import React, { useState } from 'react';
import { Edit3, PlusCircle, Settings, LogOut, ChevronUp, ChevronDown, Sparkles, Layers } from 'lucide-react';

export default function HMFloatingBar({ 
  isHMLoggedIn, 
  activeTab, 
  onOpenSectionEditor, 
  onOpenHMDashboard, 
  onLogout 
}) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isHMLoggedIn) return null;

  const tabLabels = {
    'blog': 'Blog & News (ಸುದ್ದಿ & ಬ್ಲಾಗ್)',
    'about': 'About Us (ನಮ್ಮ ಬಗ್ಗೆ)',
    'attractions': 'Main Attractions (ಐತಿಹಾಸಿಕ ತಾಣ)',
    'high-school': 'High School (ಪ್ರೌಢಶಾಲೆ)',
    'facilities': 'Facilities (ಸೌಲಭ್ಯಗಳು)',
    'uniforms': 'Uniforms (ಸಮವಸ್ತ್ರ)',
    'gallery': 'Gallery (ಚಿತ್ರಶಾಲೆ)',
    'achievements': 'Achievements (ಸಾಧಕರು)'
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-gradient-to-r from-slate-900 via-primary-dark to-slate-900 text-white rounded-3xl shadow-2xl border-2 border-amber-400 p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 backdrop-blur-md">
        
        {/* Crown Badge */}
        <div className="flex items-center gap-2 pl-2">
          <span className="text-xl animate-bounce">👑</span>
          {!isMinimized && (
            <div className="hidden md:block">
              <div className="text-[10px] uppercase font-black text-amber-300 tracking-wider">
                HM Control Active
              </div>
              <div className="text-xs font-bold text-gray-200 truncate max-w-[150px]">
                {tabLabels[activeTab] || activeTab}
              </div>
            </div>
          )}
        </div>

        {!isMinimized && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Edit Current Page Button */}
            <button
              onClick={() => onOpenSectionEditor(activeTab)}
              className="bg-amber-400 hover:bg-amber-500 text-primary-dark text-xs font-black px-3.5 py-1.5 rounded-2xl shadow-md transition-all flex items-center gap-1.5 border border-amber-300"
              title="Edit the current page writes, uploads and details"
            >
              <Edit3 size={14} />
              <span>ಈ ಪುಟ ತಿದ್ದಿ (Edit This Page)</span>
            </button>

            {/* Edit Buttons & Categories */}
            <button
              onClick={() => onOpenSectionEditor('navbar')}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3 py-1.5 rounded-2xl transition-colors hidden sm:flex items-center gap-1 border border-white/20"
              title="Edit Navbar and Category Buttons"
            >
              <Layers size={14} className="text-amber-300" />
              <span>ಬಟನ್‌ಗಳು (Buttons)</span>
            </button>

            {/* Post Notice Button */}
            <button
              onClick={onOpenHMDashboard}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black px-3 py-1.5 rounded-2xl shadow transition-colors flex items-center gap-1"
              title="Post Daily News, Today's Events or Govt Orders"
            >
              <PlusCircle size={14} />
              <span>ಪ್ರಕಟಿಸಿ (Post)</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="text-red-300 hover:text-white hover:bg-red-600/80 p-1.5 rounded-xl transition-colors"
              title="Logout HM"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}

        {/* Minimize / Expand Toggle */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-gray-300 hover:text-white transition-colors"
          title={isMinimized ? 'Expand' : 'Minimize'}
        >
          {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

      </div>
    </div>
  );
}
