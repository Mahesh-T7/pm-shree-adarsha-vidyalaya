import React, { useState } from 'react';
import { Maximize2, X, School, PlusCircle, Edit3 } from 'lucide-react';
import { defaultGalleryItems } from '../data/siteContent';

export default function Gallery({ items = defaultGalleryItems, isHMLoggedIn, onOpenEditGallery }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ['All', 'Campus', 'Attractions & Heritage', 'Labs', 'Academics', 'Sports', 'Events'];

  const filteredItems = activeFilter === 'All' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-10 relative">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase mb-3">
            <School size={13} className="text-amber-700" />
            Vidyalaya Visual Showcase
          </div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Vidyalaya Gallery & Campus Life</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Campus infrastructure, official crest, regional attractions of Sindhanur, and student moments
          </p>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>

          {/* HM Add / Edit Button */}
          {isHMLoggedIn && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={onOpenEditGallery}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 border border-emerald-300"
              >
                <PlusCircle size={15} />
                <span>ಹೊಸ ಫೋಟೋ ಸೇರಿಸಿ / ಗ್ಯಾಲರಿ ನಿರ್ವಹಿಸಿ (Manage Gallery)</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeFilter === cat
                  ? 'bg-accent text-white border-accent shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id || index}
              onClick={() => setLightboxImage(item)}
              className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden cursor-pointer relative hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <div className="h-56 overflow-hidden relative bg-slate-900 flex items-center justify-center">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-primary/90 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow border border-white/20 uppercase tracking-wide">
                  {item.tag || item.category}
                </span>
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 size={24} className="text-white" />
                </div>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">{item.category}</span>
                <h4 className="font-extrabold text-primary text-sm mt-1">{item.title}</h4>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-full transition-colors z-20"
            >
              <X size={24} />
            </button>
            <div className="max-w-4xl w-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="bg-slate-950 p-2 flex items-center justify-center">
                <img 
                  src={lightboxImage.img} 
                  alt={lightboxImage.title} 
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
              <div className="p-6 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-xs font-black text-accent uppercase">{lightboxImage.category}</span>
                  <h3 className="font-extrabold text-primary text-lg">{lightboxImage.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{lightboxImage.description}</p>
                </div>
                <button 
                  onClick={() => setLightboxImage(null)}
                  className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-colors self-end sm:self-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
