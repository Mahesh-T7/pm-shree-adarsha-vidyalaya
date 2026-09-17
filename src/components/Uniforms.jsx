import React from 'react';
import { Shirt, Scissors, Edit3 } from 'lucide-react';
import { defaultSiteContent } from '../data/siteContent';

export default function Uniforms({ content = defaultSiteContent.uniforms, isHMLoggedIn, onOpenEdit }) {
  return (
    <section className="py-12 px-4 bg-white animate-in fade-in duration-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10 relative">
          <h2 className="text-3xl font-black text-primary tracking-tight">
            {content?.title || "Prescribed School Uniform"}
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            {content?.subtitle || "Uniform specifications and guidelines for all sections at PM Shree Adarsha Vidyalaya"}
          </p>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>

          {isHMLoggedIn && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={onOpenEdit}
                className="bg-amber-400 hover:bg-amber-500 text-primary-dark font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 border border-amber-300"
              >
                <Edit3 size={14} />
                <span>ಸಮವಸ್ತ್ರ ಮಾಹಿತಿ ತಿದ್ದಿ (Edit Uniforms Guide)</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pre-Primary */}
          <div className="bg-slate-50 border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="inline-flex p-3 bg-red-100 text-red-600 rounded-full mb-4">
                <Shirt size={24} />
              </div>
              <h3 className="font-extrabold text-primary text-lg mb-2">
                {content?.prePrimaryTitle || "Pre-Primary (LKG & UKG)"}
              </h3>
              <p className="text-xs text-gray-500 mb-4 font-semibold">
                {content?.prePrimaryDesc || "Comfort and ease of movement-oriented wear."}
              </p>
              
              <ul className="space-y-3 text-xs text-gray-600 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Boys:</strong> {content?.prePrimaryBoys || "Red checked shirts with navy blue shorts & suspenders."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Girls:</strong> {content?.prePrimaryGirls || "Red checked shirts with navy blue pinafore dress."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Footwear:</strong> {content?.prePrimaryFootwear || "Black Velcro strap shoes and blue socks."}</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 border-t pt-4 text-center">
              <span className="text-[10px] bg-red-50 text-red-700 font-bold px-3 py-1 rounded-full">
                {content?.prePrimaryNote || "Wednesday: White Tracksuit"}
              </span>
            </div>
          </div>

          {/* Primary */}
          <div className="bg-slate-50 border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="inline-flex p-3 bg-blue-100 text-primary rounded-full mb-4">
                <Shirt size={24} />
              </div>
              <h3 className="font-extrabold text-primary text-lg mb-2">
                {content?.primaryTitle || "Primary (Class 1 to 7)"}
              </h3>
              <p className="text-xs text-gray-500 mb-4 font-semibold">
                {content?.primaryDesc || "Smart and formal aesthetic."}
              </p>

              <ul className="space-y-3 text-xs text-gray-600 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong>Boys:</strong> {content?.primaryBoys || "Sky blue shirts (half sleeves) with navy blue shorts/trousers, school tie and belt."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong>Girls:</strong> {content?.primaryGirls || "Sky blue shirts with navy blue pleated skirts (knee length), school tie and belt."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong>Footwear:</strong> {content?.primaryFootwear || "Black leather shoes with navy blue socks."}</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 border-t pt-4 text-center">
              <span className="text-[10px] bg-blue-50 text-primary font-bold px-3 py-1 rounded-full">
                {content?.primaryNote || "Wednesday: House Colour T-shirts"}
              </span>
            </div>
          </div>

          {/* High School */}
          <div className="bg-slate-50 border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="inline-flex p-3 bg-amber-100 text-amber-700 rounded-full mb-4">
                <Shirt size={24} />
              </div>
              <h3 className="font-extrabold text-primary text-lg mb-2">
                {content?.highSchoolTitle || "High School (Class 8 to 10)"}
              </h3>
              <p className="text-xs text-gray-500 mb-4 font-semibold">
                {content?.highSchoolDesc || "Professional and disciplined dress code."}
              </p>

              <ul className="space-y-3 text-xs text-gray-600 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span><strong>Boys:</strong> {content?.highSchoolBoys || "Navy blue trousers, light blue shirts (full sleeves), school tie, belt & blazer."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span><strong>Girls:</strong> {content?.highSchoolGirls || "Navy blue salwar-kameez suit with sky blue waistcoat/dupatta."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  <span><strong>Footwear:</strong> {content?.highSchoolFootwear || "Black formal shoes, black hair bands/ribbons."}</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 border-t pt-4 text-center">
              <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-3 py-1 rounded-full">
                {content?.highSchoolNote || "Wednesday: House Uniform & White Canvas Shoes"}
              </span>
            </div>
          </div>
        </div>

        {/* Note Area */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-amber-800 font-medium">
          <div className="shrink-0 text-amber-600">
            <Scissors size={20} />
          </div>
          <div>
            <h4 className="font-bold mb-1">Tailoring and procurement guidelines:</h4>
            <p>Approved school uniforms can be purchased from authorized local vendors. Standard fitting and regular maintenance of clean uniforms are mandatory during all working school hours.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
