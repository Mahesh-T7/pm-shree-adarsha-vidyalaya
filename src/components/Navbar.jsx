import React, { useState } from 'react';
import { Menu, X, Landmark, Edit3 } from 'lucide-react';
import { defaultNavItems } from '../data/siteContent';

export default function Navbar({ onTabSelect, activeTab, navItems = defaultNavItems, isHMLoggedIn, onOpenEditNav }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id) => {
    onTabSelect(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-accent text-white sticky top-0 z-40 shadow-lg border-b border-amber-400/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-12 md:h-14">
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-between w-full text-xs font-bold tracking-wider">
            <div className="flex space-x-1 xl:space-x-2 items-center flex-wrap">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-md hover:bg-white/15 transition-all uppercase flex items-center gap-1.5 ${
                    activeTab === item.id 
                      ? 'bg-white text-accent font-black shadow-md border-b-2 border-amber-400' 
                      : 'text-white'
                  }`}
                >
                  {item.icon && <Landmark size={13} className={activeTab === item.id ? 'text-accent' : 'text-amber-300'} />}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Quick Edit Navbar Buttons trigger for HM */}
            {isHMLoggedIn && (
              <button
                onClick={onOpenEditNav}
                className="bg-amber-400 hover:bg-amber-300 text-primary-dark text-[11px] font-black px-3 py-1 rounded-full shadow transition-all flex items-center gap-1 border border-white/50"
                title="Edit Navbar Button Labels"
              >
                <Edit3 size={12} />
                <span>Edit Buttons</span>
              </button>
            )}
          </div>

          {/* Mobile menu title and button */}
          <div className="flex lg:hidden justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <img src="/school-logo.jpg" alt="Logo" className="w-7 h-7 rounded-full border border-white" />
              <span className="text-xs font-black tracking-widest text-amber-200">PMSHRI SINDHANUR</span>
            </div>
            <div className="flex items-center gap-2">
              {isHMLoggedIn && (
                <button
                  onClick={onOpenEditNav}
                  className="bg-amber-400 text-primary-dark text-[10px] font-black px-2.5 py-0.5 rounded-full"
                >
                  Edit Buttons
                </button>
              )}
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-white/10 transition-colors">
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-accent-dark border-t border-white/10 animate-in slide-in-from-top-3 duration-200 max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-xs font-bold uppercase flex items-center gap-2 ${
                  activeTab === item.id ? 'bg-white text-accent font-black' : 'text-red-50 hover:bg-white/10'
                }`}
              >
                {item.icon && <Landmark size={14} />}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
