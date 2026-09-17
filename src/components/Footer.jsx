import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Award, Landmark, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigateTab }) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setEmail('');
    }, 2500);
  };

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* About & Official Emblem Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="/school-logo.jpg" 
              alt="Adarsha Vidyalaya Logo" 
              className="w-12 h-12 rounded-full border-2 border-amber-400 bg-white shadow-md"
            />
            <div>
              <p className="text-[10px] text-amber-400 font-bold font-sans">ಪಿ.ಎಂ.ಶ್ರೀ ಆದರ್ಶ ವಿದ್ಯಾಲಯ ಸಿಂಧನೂರು</p>
              <h3 className="font-extrabold text-white text-sm tracking-wide uppercase">
                PMSHRI ADARSHA VIDYALAYA
              </h3>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Sindhanur, Dist: Raichur</p>
            </div>
          </div>
          
          <p className="text-xs leading-relaxed text-slate-400">
            Premier Government of India PM SHRI initiative school offering benchmark CBSE model education, smart labs, and holistic cultural foundation in Sindhanur.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-slate-800 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-700 flex items-center gap-1">
              <Award size={12} /> DISE: 29060902804
            </span>
            <span className="bg-slate-800 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-700 flex items-center gap-1">
              <ShieldCheck size={12} /> PM SHRI SCHOOL
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Reach Us</h3>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
              <span>Adarsha Vidyalaya Campus, Sindhanur - 584128, Raichur District, Karnataka</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-accent shrink-0" />
              <span>+91 85352 20101, +91 94806 85202</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-accent shrink-0" />
              <span>contact@pmshreeadarshasindhanur.org</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={16} className="text-accent shrink-0" />
              <span>Office Hours: 9:00 AM - 4:30 PM (Mon - Sat)</span>
            </li>
          </ul>
        </div>

        {/* Regional Attractions & Quick Navigation */}
        <div>
          <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2 flex items-center gap-1.5">
            <Landmark size={14} className="text-amber-400" /> Sindhanur Heritage
          </h3>
          <ul className="space-y-2 text-xs">
            <li className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <span className="text-amber-400">✦</span> Shri Ambadevi Temple, Ambamatha (17th C.)
            </li>
            <li className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <span className="text-amber-400">✦</span> Shri Murahari Temple, Mukhumla (10th-12th C.)
            </li>
            <li className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <span className="text-amber-400">✦</span> Roudkunda Fort & Megaliths (10th-12th C.)
            </li>
            <li className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <span className="text-amber-400">✦</span> Sindhanur Historic Monument & Dargah
            </li>
          </ul>
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-400">
            <a href="#about" className="hover:text-white">About</a> • 
            <a href="#gallery" className="hover:text-white">Gallery</a> • 
            <a href="#blog" className="hover:text-white">Blog & News</a> • 
            <a href="#uniforms" className="hover:text-white">Uniforms</a>
          </div>
        </div>

        {/* Newsletter Subscription & School Image */}
        <div>
          <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">School Circulars</h3>
          <p className="text-xs text-slate-400 mb-3">Subscribe to receive admission circulars, monthly blogs, and event invites.</p>
          
          {success ? (
            <div className="text-xs bg-emerald-950/80 border border-emerald-700 text-emerald-300 p-2.5 rounded-xl font-bold text-center">
              ✓ Subscribed to Vidyalaya Circulars!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                required 
                type="email" 
                placeholder="Enter email ID" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button type="submit" className="bg-accent hover:bg-accent-dark text-white px-3.5 rounded-xl text-xs font-bold transition-colors shadow">
                <Send size={14} />
              </button>
            </form>
          )}

          {/* School Campus Photo Card */}
          <div className="mt-4 rounded-xl overflow-hidden border border-slate-700 relative group">
            <img src="/school-banner.jpg" alt="Sindhanur School Campus" className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center p-2 text-center">
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-300">
                Sindhanur Campus & Heritage
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500 font-semibold max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2026 PM SHREE ADARSHA VIDYALAYA SINDHANUR, RAICHUR (DIST). All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms & Conditions</a>
          <a href="#heritage" className="hover:underline">Sindhanur Attractions</a>
        </div>
      </div>
    </footer>
  );
}
