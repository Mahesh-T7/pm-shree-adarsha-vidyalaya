import React from 'react';
import { Youtube, Instagram, Play, Apple, Facebook } from 'lucide-react';

export default function SocialSidebar() {
  const socialLinks = [
    {
      name: 'YouTube',
      icon: <Youtube size={18} />,
      color: 'bg-[#ff0000]',
      url: 'https://youtube.com',
    },
    {
      name: 'Instagram',
      icon: <Instagram size={18} />,
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
      url: 'https://instagram.com',
    },
    {
      name: 'X (Twitter)',
      icon: (
        <span className="font-extrabold text-sm font-sans flex items-center justify-center">
          X
        </span>
      ),
      color: 'bg-[#000000]',
      url: 'https://x.com',
    },
    {
      name: 'Play Store',
      icon: <Play size={16} className="fill-current text-white rotate-90" />,
      color: 'bg-[#3bccff]',
      url: 'https://play.google.com',
    },
    {
      name: 'App Store',
      icon: <Apple size={18} />,
      color: 'bg-[#0070c9]',
      url: 'https://apple.com/app-store/',
    },
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      color: 'bg-[#1877f2]',
      url: 'https://facebook.com',
    },
  ];

  return (
    <div className="fixed right-0 top-1/3 z-50 flex flex-col items-end">
      {socialLinks.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item.color} text-white w-10 h-10 flex items-center justify-center shadow-lg transition-transform duration-200 hover:-translate-x-1.5 focus:-translate-x-1.5 cursor-pointer border-b border-white/10`}
          title={item.name}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
