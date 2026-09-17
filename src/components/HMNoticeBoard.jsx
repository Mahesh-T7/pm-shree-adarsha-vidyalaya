import React, { useState } from 'react';
import { Bell, Calendar, FileText, Image as ImageIcon, Video, PlusCircle, Trash2, ExternalLink, ShieldCheck, Sparkles, Eye, X } from 'lucide-react';
import { deleteHMPost } from '../data/hmPosts';

export default function HMNoticeBoard({ posts, onPostsChange, isHMLoggedIn, onOpenHMDashboard }) {
  const [filter, setFilter] = useState('all');
  const [lightboxMedia, setLightboxMedia] = useState(null);

  // Helper to get YouTube Embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('watch?v=')[1]?.split('&')[0];
        return `https://www.youtube-nocookie.com/embed/${videoId}`;
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube-nocookie.com/embed/${videoId}`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  const filteredPosts = (!posts ? [] : posts).filter(post => {
    if (filter === 'all') return true;
    return post.type === filter;
  });

  const handleDelete = (id) => {
    if (window.confirm('ಖಂಡಿತವಾಗಿ ಈ ಪ್ರಕಟಣೆಯನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ? (Delete this post?)')) {
      const updated = deleteHMPost(id);
      if (onPostsChange) onPostsChange(updated);
    }
  };

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <ShieldCheck size={14} className="text-amber-700" />
              ಅಧಿಕೃತ ಮುಖ್ಯಗುರುಗಳ ಪ್ರಕಟಣಾ ಫಲಕ • HM Official Bulletin
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
              Daily News, Today's Events & Official Orders
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              ದೈನಂದಿನ ಶಾಲಾ ವಾರ್ತೆಗಳು • ಇಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು • ಅಧಿಕೃತ ಆದೇಶಗಳು • ಶಾಲಾ ಚಿತ್ರಗಳು & ವೀಡಿಯೊಗಳು
            </p>
          </div>

          {/* HM Quick Post Button */}
          {isHMLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                HM Logged In
              </span>
              <button
                onClick={onOpenHMDashboard}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-amber-300"
              >
                <PlusCircle size={15} className="text-amber-300" />
                ಹೊಸ ಪ್ರಕಟಣೆ ರಚಿಸಿ (Post Notice)
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenHMDashboard}
              className="bg-amber-400 hover:bg-amber-500 text-primary-dark px-4 py-2 rounded-xl text-xs font-black shadow-sm transition-all flex items-center gap-1.5 self-start md:self-auto"
            >
              👑 HM Login to Post
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6 pb-2 border-b border-gray-200">
          {[
            { id: 'all', label: 'ಎಲ್ಲವೂ (All Posts)', count: posts?.length || 0 },
            { id: 'order', label: '📋 ಅಧಿಕೃತ ಆದೇಶಗಳು (Orders)', count: posts?.filter(p => p.type === 'order').length || 0 },
            { id: 'event', label: "📅 ಇಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು (Today's Events)", count: posts?.filter(p => p.type === 'event').length || 0 },
            { id: 'news', label: '📰 ಶಾಲಾ ವಾರ್ತೆ (Daily News)', count: posts?.filter(p => p.type === 'news').length || 0 },
            { id: 'photo', label: '📸 ಛಾಯಾಚಿತ್ರಗಳು (Photos)', count: posts?.filter(p => p.type === 'photo').length || 0 },
            { id: 'video', label: '🎥 ಶಾಲಾ ವೀಡಿಯೊಗಳು (Videos)', count: posts?.filter(p => p.type === 'video').length || 0 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filter === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-slate-100 border border-gray-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${filter === tab.id ? 'bg-amber-400 text-primary-dark' : 'bg-gray-100 text-gray-500'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-sm font-bold">ಈ ವಿಭಾಗದಲ್ಲಿ ಸದ್ಯಕ್ಕೆ ಯಾವುದೇ ಪ್ರಕಟಣೆಗಳಿಲ್ಲ.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const embedUrl = post.videoUrl ? getEmbedUrl(post.videoUrl) : null;

              return (
                <div 
                  key={post.id}
                  className={`bg-white rounded-2xl p-5 border-2 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                    post.type === 'order' ? 'border-red-200 hover:border-red-400' :
                    post.type === 'event' ? 'border-amber-200 hover:border-amber-400' :
                    post.type === 'video' ? 'border-purple-200 hover:border-purple-400' :
                    post.type === 'photo' ? 'border-emerald-200 hover:border-emerald-400' :
                    'border-blue-200 hover:border-blue-400'
                  }`}
                >
                  {/* Top Pinned Ribbon */}
                  {post.isPinned && (
                    <div className="absolute top-0 right-0 bg-amber-400 text-primary-dark font-black text-[9px] px-3 py-0.5 rounded-bl-xl uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles size={10} /> PINNED NOTICE
                    </div>
                  )}

                  <div>
                    {/* Header Tag and Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-lg uppercase tracking-wide border ${
                        post.type === 'order' ? 'bg-red-50 text-red-700 border-red-200' :
                        post.type === 'event' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        post.type === 'video' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        post.type === 'photo' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {post.tag || post.type}
                      </span>
                      <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                    </div>

                    {/* Media Preview (Photo / Video) */}
                    {post.mediaUrl && (
                      <div 
                        onClick={() => setLightboxMedia({ type: 'image', url: post.mediaUrl, title: post.title })}
                        className="mb-3 rounded-xl overflow-hidden aspect-video bg-slate-900 relative group cursor-pointer shadow-sm"
                      >
                        <img 
                          src={post.mediaUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                          <Eye size={16} /> Enlarge Photo
                        </div>
                      </div>
                    )}

                    {/* Video Player Embed */}
                    {embedUrl && (
                      <div className="mb-3 rounded-xl overflow-hidden aspect-video bg-black shadow-sm">
                        <iframe
                          src={embedUrl}
                          title={post.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-black text-gray-900 text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Content */}
                    <p className="text-xs text-gray-600 leading-relaxed font-normal whitespace-pre-line line-clamp-4">
                      {post.content}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                    <span className="text-primary font-bold">
                      ✍️ {post.author || 'ಮುಖ್ಯಗುರುಗಳು'}
                    </span>

                    {isHMLoggedIn && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors flex items-center gap-1 font-bold"
                        title="Delete this notice"
                      >
                        <Trash2 size={13} /> ಅಳಿಸಿ (Delete)
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox for Photos */}
      {lightboxMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setLightboxMedia(null)}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
            <div className="bg-black flex items-center justify-center p-2 max-h-[75vh]">
              <img src={lightboxMedia.url} alt="" className="max-h-[70vh] w-auto object-contain rounded" />
            </div>
            <div className="p-4 bg-white flex justify-between items-center">
              <h4 className="font-bold text-gray-900 text-sm">{lightboxMedia.title}</h4>
              <button 
                onClick={() => setLightboxMedia(null)}
                className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
