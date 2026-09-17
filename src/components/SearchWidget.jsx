import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchWidget({ onSearch }) {
  const [board, setBoard] = useState('');
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ board, grade, topic });
  };

  return (
    <div className="bg-slate-100 py-6 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-6 flex flex-col xl:flex-row gap-4 items-center">
          
          <div className="text-gray-800 font-extrabold text-sm md:text-base uppercase tracking-wider xl:w-44 text-center xl:text-left flex items-center justify-center gap-2">
            <span className="w-2.5 h-6 bg-accent rounded-full inline-block"></span>
            Explore Portal
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full flex-1">
            {/* Board Selector */}
            <div className="relative">
              <select 
                value={board} 
                onChange={(e) => setBoard(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="">Select Board</option>
                <option value="CBSE">CBSE Board</option>
                <option value="STATE">State Board (SSLC)</option>
              </select>
              <div className="absolute right-3 top-4 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>

            {/* Grade Selector */}
            <div className="relative">
              <select 
                value={grade} 
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="">Select Classes</option>
                <option value="high-school">High School (Class 6 - 10)</option>
                <option value="high-school">Middle Wing (Class 6 - 8)</option>
                <option value="high-school">Secondary Wing (Class 9 - 10)</option>
              </select>
              <div className="absolute right-3 top-4 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>

            {/* Topic Selector */}
            <div className="relative">
              <select 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="">Select Category</option>
                <option value="attractions">Main Attractions & Heritage</option>
                <option value="facilities">School Facilities</option>
                <option value="uniforms">Uniform Specifications</option>
                <option value="gallery">Photo Gallery</option>
                <option value="achievements">Board Results & Achievements</option>
                <option value="blog">Blogs & News</option>
              </select>
              <div className="absolute right-3 top-4 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full xl:w-auto bg-accent hover:bg-accent-dark text-white font-extrabold px-8 py-3 rounded-lg text-sm transition-colors shadow flex items-center justify-center gap-2 tracking-wider whitespace-nowrap"
          >
            <Search size={18} /> FIND INFO
          </button>
        </form>
      </div>
    </div>
  );
}
