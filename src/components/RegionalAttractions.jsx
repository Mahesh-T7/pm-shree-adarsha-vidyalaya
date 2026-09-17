import React, { useState } from 'react';
import { attractionsData } from '../data/attractions';
import { MapPin, Calendar, Compass, Sparkles, ChevronRight, X, BookOpen, Landmark, Camera } from 'lucide-react';

export default function RegionalAttractions({ onSelectArticle }) {
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-slate-50 via-white to-amber-50/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title with Kannada & English branding */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
            <Landmark size={14} className="text-amber-700" />
            ಸಿಂಧನೂರು ತಾಲೂಕಿನ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು • Regional Heritage
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Main Attractions & Historical Heritage of Sindhanur
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-3 max-w-3xl mx-auto leading-relaxed">
            Featured on our school's official campus emblem, these historic temples, ancient forts, and monuments form the living history curriculum of PM Shree Adarsha Vidyalaya.
          </p>
          <div className="w-20 h-1.5 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Banner highlight linking School & Attractions */}
        <div className="bg-primary text-white rounded-2xl p-6 md:p-8 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Landmark size={240} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1">
                <Sparkles size={14} /> Living Classroom Initiative
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white">
                Connecting Classroom Learning with Local History
              </h3>
              <p className="text-xs md:text-sm text-blue-100 max-w-2xl leading-relaxed">
                As a PM SHREE model school, Adarsha Vidyalaya Sindhanur organizes experiential heritage walks, archaeological documentation, and photography field trips to these historic marvels across Sindhanur and Raichur district.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-center">
                <div className="text-amber-300 font-extrabold text-lg">10th-12th C.E.</div>
                <div className="text-[10px] text-gray-300 uppercase">Ancient Origins</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-center">
                <div className="text-amber-300 font-extrabold text-lg">4+ Sites</div>
                <div className="text-[10px] text-gray-300 uppercase">Heritage Treks</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Scanned Main Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {attractionsData.map((attraction) => (
            <div 
              key={attraction.id}
              onClick={() => setSelectedAttraction(attraction)}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              <div>
                {/* Image Box */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name}
                    className="w-full h-full object-contain p-2 bg-gradient-to-t from-slate-950/80 to-slate-900 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-amber-400 text-primary-dark font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wide">
                    {attraction.badge}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-primary/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <Camera size={10} /> Scanned Landmark
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                    {attraction.category}
                  </p>
                  <h4 className="font-extrabold text-primary text-base leading-snug group-hover:text-accent transition-colors">
                    {attraction.name}
                  </h4>
                  <p className="text-xs font-semibold text-gray-500 font-sans mt-0.5">
                    {attraction.kannadaName}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-3">
                    <MapPin size={13} className="text-accent shrink-0" />
                    <span className="truncate">{attraction.location}</span>
                  </div>

                  <p className="text-xs text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                    {attraction.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="p-4 border-t border-gray-100 bg-slate-50/70 flex items-center justify-between text-xs font-bold text-accent">
                <span>Explore History & Photos</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal View when an attraction is clicked */}
        {selectedAttraction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 relative">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedAttraction(null)}
                className="absolute top-4 right-4 z-20 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Modal Banner Header */}
              <div className="relative bg-slate-900 text-white p-6 md:p-8 rounded-t-3xl overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-slate-800 border-2 border-amber-400 shrink-0 shadow-lg flex items-center justify-center p-2">
                    <img 
                      src={selectedAttraction.image} 
                      alt={selectedAttraction.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-amber-400 text-primary-dark font-black text-xs px-3 py-0.5 rounded-full uppercase">
                        {selectedAttraction.period}
                      </span>
                      <span className="bg-white/20 text-white font-bold text-xs px-3 py-0.5 rounded-full">
                        {selectedAttraction.category}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white">
                      {selectedAttraction.name}
                    </h3>
                    <p className="text-sm font-semibold text-amber-200 mt-1">
                      {selectedAttraction.kannadaName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-300 mt-2">
                      <MapPin size={14} className="text-accent" />
                      <span>{selectedAttraction.location} ({selectedAttraction.distanceFromSchool})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="text-sm font-black text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen size={16} className="text-accent" /> Historical Overview & Significance
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-normal">
                    {selectedAttraction.description}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-3">
                    Key Features & Archaeological Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedAttraction.highlights.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                        <span className="text-amber-500 font-black">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cultural Significance Quote */}
                <div className="border-l-4 border-accent pl-4 py-2 bg-amber-50/50 rounded-r-xl">
                  <p className="text-xs font-semibold text-gray-800 italic">
                    "{selectedAttraction.significance}"
                  </p>
                </div>

                {/* Footer Action inside Modal */}
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedAttraction(null)}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl text-xs font-bold transition-colors shadow-md"
                  >
                    Close Landmark Details
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
