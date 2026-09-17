import React from 'react';
import { generalStats } from '../data/achievements';
import { Users, GraduationCap, Microscope, Monitor, ShieldCheck } from 'lucide-react';

export default function StatsSection() {
  const getIcon = (label) => {
    switch (label) {
      case "Total Enrollments":
        return <Users size={28} className="text-white" />;
      case "Faculty Members":
        return <GraduationCap size={28} className="text-white" />;
      case "Laboratories":
        return <Microscope size={28} className="text-white" />;
      case "Smart Classrooms":
        return <Monitor size={28} className="text-white" />;
      default:
        return <ShieldCheck size={28} className="text-white" />;
    }
  };

  return (
    <section className="bg-primary text-white py-12 px-4 shadow-inner relative overflow-hidden">
      {/* Decorative SVG backgrounds */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {generalStats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-lg hover:bg-white/10 transition-colors duration-200">
              <div className="bg-accent p-3 rounded-full mb-3 shadow-md">
                {getIcon(stat.label)}
              </div>
              <div className="text-2xl md:text-3xl font-black text-amber-300">{stat.value}</div>
              <div className="text-xs font-bold text-gray-200 mt-2 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
