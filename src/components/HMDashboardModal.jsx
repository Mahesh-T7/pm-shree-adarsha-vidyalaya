import React, { useState } from 'react';
import { X, PlusCircle, Trash2, Image, Video, Calendar, FileText, Bell, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import { addHMPost, deleteHMPost } from '../data/hmPosts';
import api from '../services/api.js';

export default function HMDashboardModal({ isOpen, onClose, posts, onPostsChange }) {
  const [activeTab, setActiveTab] = useState('create');
  const [type, setType] = useState('news');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mediaUrl, setMediaUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      setIsUploading(true);
      try {
        const res = await api.media.upload(file);
        if (res.success && res.data?.url) {
          setImagePreview(res.data.url);
          setMediaUrl(res.data.url);
        }
      } catch (err) {
        console.warn('Backend image upload fallback to local preview:', err);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setMediaUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    const typeTags = {
      order: 'ಅಧಿಕೃತ ಆದೇಶ',
      event: 'ಇಂದಿನ ಕಾರ್ಯಕ್ರಮ',
      news: 'ದೈನಂದಿನ ವಾರ್ತೆ',
      photo: 'ಕಾರ್ಯಕ್ರಮದ ಫೋಟೋ',
      video: 'ಶಾಲಾ ವೀಡಿಯೊ'
    };

    const newPost = {
      type,
      title: title.trim(),
      content: content.trim(),
      date: date || new Date().toISOString().split('T')[0],
      tag: typeTags[type] || 'ಪ್ರಕಟಣೆ',
      author: 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
      mediaUrl: mediaUrl || imagePreview || '',
      videoUrl: videoUrl.trim() || '',
      isPinned
    };

    const updated = addHMPost(newPost);
    if (onPostsChange) onPostsChange(updated);

    setSuccessMsg('ಪ್ರಕಟಣೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗಿದೆ!');
    setTimeout(() => {
      setSuccessMsg('');
      setTitle('');
      setContent('');
      setMediaUrl('');
      setVideoUrl('');
      setImagePreview('');
      setIsPinned(false);
      setActiveTab('manage');
    }, 1500);
  };

  const handleDelete = (id) => {
    if (window.confirm('ಖಂಡಿತವಾಗಿ ಈ ಪ್ರಕಟಣೆಯನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ? (Are you sure you want to delete this post?)')) {
      const updated = deleteHMPost(id);
      if (onPostsChange) onPostsChange(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark px-6 py-4 text-white flex items-center justify-between border-b-2 border-amber-300">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 text-primary-dark p-2 rounded-xl shadow-md font-black text-lg">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg md:text-xl text-amber-300 tracking-wide">
                  ಮುಖ್ಯಗುರುಗಳ ಆಡಳಿತ ಪೋರ್ಟಲ್ (HM Portal)
                </h3>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live Mode
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5">
                Post Daily News, Today's Events, Govt Orders, Event Photos & School Videos
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation - High Visibility */}
        <div className="bg-slate-900 border-b-4 border-amber-400 p-3 sm:px-6 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
              activeTab === 'create'
                ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-white scale-[1.02]'
                : 'bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <PlusCircle size={16} /> ಹೊಸ ಪ್ರಕಟಣೆ ರಚಿಸಿ (Create New Post)
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
              activeTab === 'manage'
                ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-white scale-[1.02]'
                : 'bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <Eye size={16} /> ಪ್ರಕಟಿತ ದಾಖಲೆಗಳು (Manage Posts) ({posts ? posts.length : 0})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {successMsg && (
            <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-800 p-4 rounded-2xl mb-6 flex items-center gap-3 animate-in fade-in duration-200 shadow-md">
              <CheckCircle2 size={24} className="text-emerald-600 flex-shrink-0" />
              <div className="font-extrabold text-sm">{successMsg}</div>
            </div>
          )}

          {activeTab === 'create' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Type Selector */}
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
                  1. ಪ್ರಕಟಣೆಯ ಪ್ರಕಾರ (Select Post Type)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { id: 'news', label: 'ದೈನಂದಿನ ವಾರ್ತೆ', sub: 'Daily News', icon: '📰', color: 'border-blue-300 hover:bg-blue-50' },
                    { id: 'event', label: "ಇಂದಿನ ಕಾರ್ಯಕ್ರಮ", sub: "Today's Event", icon: '📅', color: 'border-amber-300 hover:bg-amber-50' },
                    { id: 'order', label: 'ಅಧಿಕೃತ ಆದೇಶ', sub: 'Govt Order / Circular', icon: '📋', color: 'border-red-300 hover:bg-red-50' },
                    { id: 'photo', label: 'ಕಾರ್ಯಕ್ರಮದ ಫೋಟೋ', sub: 'Event Photo', icon: '📸', color: 'border-emerald-300 hover:bg-emerald-50' },
                    { id: 'video', label: 'ಶಾಲಾ ವೀಡಿಯೊ', sub: 'School Video', icon: '🎥', color: 'border-purple-300 hover:bg-purple-50' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col items-center sm:items-start ${type === t.id ? 'border-primary bg-primary text-white shadow-lg ring-2 ring-primary/30' : `bg-white ${t.color} text-gray-700`}`}
                    >
                      <span className="text-2xl mb-1">{t.icon}</span>
                      <span className="font-black text-xs leading-tight">{t.label}</span>
                      <span className={`text-[10px] mt-0.5 ${type === t.id ? 'text-amber-200 font-bold' : 'text-gray-500'}`}>{t.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">
                    2. ಶೀರ್ಷಿಕೆ (Post Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ಉದಾಹರಣೆಗೆ: ವಾರ್ಷಿಕ ಕ್ರೀಡಾಕೂಟ / ಸರ್ಕಾರಿ ಸುತ್ತೋಲೆ ಸಂಖ್ಯೆ 104..."
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">
                    ದಿನಾಂಕ (Event Date)
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm font-medium bg-white"
                  />
                </div>
              </div>

              {/* Content / Details */}
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">
                  3. ಸಂಪೂರ್ಣ ವಿವರಣೆ (Description / Details / Orders Notice)
                </label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="ಕಾರ್ಯಕ್ರಮದ ಸಂಪೂರ್ಣ ವಿವರ, ಸಮಯ, ಭಾಗವಹಿಸುವವರು, ಆದೇಶದ ನಿಯಮಾವಳಿಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary text-sm leading-relaxed"
                ></textarea>
              </div>

              {/* Media Attachments */}
              <div className="bg-slate-50 border-2 border-dashed border-gray-300 rounded-2xl p-4 space-y-4">
                <div className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" /> 4. ಮಾಧ್ಯಮ ಜೋಡಣೆ (Add Photos or Video)
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    📸 ಕಾರ್ಯಕ್ರಮದ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (Upload Image) ಅಥವಾ Image URL ಹಾಕಿ
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-400">ಅಥವಾ</span>
                    <input
                      type="text"
                      value={mediaUrl.startsWith('data:') ? '' : mediaUrl}
                      onChange={(e) => {
                        setMediaUrl(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      placeholder="Paste Image URL (https://...)"
                      className="w-full px-3 py-2 border rounded-xl text-xs font-medium focus:outline-none focus:border-primary"
                    />
                  </div>

                  {imagePreview && (
                    <div className="mt-3 relative w-32 h-24 rounded-xl overflow-hidden border-2 border-amber-300 shadow-md">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => { setImagePreview(''); setMediaUrl(''); }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Video Link */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    🎥 ಶಾಲಾ ವೀಡಿಯೊ ಲಿಂಕ್ (YouTube or Direct Video URL)
                  </label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    className="w-full px-3 py-2 border rounded-xl text-xs font-medium focus:outline-none focus:border-primary"
                  />
                  {videoUrl && (
                    <p className="text-[11px] text-purple-700 font-semibold mt-1">
                      ✓ YouTube / Video ಲಿಂಕ್ ಅನ್ನು ವೆಬ್‌ಸೈಟ್‌ನ ವೀಡಿಯೊ ಪ್ಲೇಯರ್‌ನಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪ್ರದರ್ಶಿಸಲಾಗುವುದು.
                    </p>
                  )}
                </div>
              </div>

              {/* Pin as Important */}
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 p-3 rounded-xl">
                <input
                  type="checkbox"
                  id="pin"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="pin" className="text-xs font-black text-amber-900 cursor-pointer flex items-center gap-1.5">
                  <Bell size={14} className="text-amber-600" />
                  ಪ್ರಮುಖ ಪ್ರಕಟಣೆಯಾಗಿ ಪಿನ್ ಮಾಡಿ (Pin at Top as Important Announcement / Flash News)
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100 transition-colors"
                >
                  ರದ್ದುಮಾಡಿ (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-primary hover:bg-primary-dark text-white font-black text-xs rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 border border-amber-300"
                >
                  <PlusCircle size={16} className="text-amber-300" /> ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪ್ರಕಟಿಸಿ (Publish Now)
                </button>
              </div>

            </form>
          ) : (
            /* Manage Posts Tab */
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-black text-gray-800 text-sm">
                  ಪ್ರಕಟಿತ ದಾಖಲೆಗಳ ಪಟ್ಟಿ ({posts ? posts.length : 0} ಪ್ರಕಟಣೆಗಳು)
                </h4>
                <button
                  onClick={() => setActiveTab('create')}
                  className="bg-primary text-white text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow"
                >
                  <PlusCircle size={14} /> ಹೊಸ ಪ್ರಕಟಣೆ
                </button>
              </div>

              {(!posts || posts.length === 0) ? (
                <div className="text-center py-12 text-gray-400 text-sm font-bold">
                  ಇನ್ನೂ ಯಾವುದೇ ಪ್ರಕಟಣೆಗಳನ್ನು ದಾಖಲಿಸಲಾಗಿಲ್ಲ.
                </div>
              ) : (
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                      <div className="flex gap-3 min-w-0">
                        {post.mediaUrl ? (
                          <img src={post.mediaUrl} alt="" className="w-14 h-14 rounded-xl object-cover border border-gray-200 flex-shrink-0 bg-slate-100" />
                        ) : post.videoUrl ? (
                          <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-700 font-black flex items-center justify-center flex-shrink-0 text-xl border border-purple-200">
                            🎥
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-blue-50 text-primary font-black flex items-center justify-center flex-shrink-0 text-xl border border-blue-100">
                            {post.type === 'order' ? '📋' : post.type === 'event' ? '📅' : '📰'}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${
                              post.type === 'order' ? 'bg-red-100 text-red-800 border border-red-200' :
                              post.type === 'event' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                              post.type === 'video' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                              post.type === 'photo' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {post.tag || post.type}
                            </span>
                            {post.isPinned && (
                              <span className="bg-amber-400 text-primary-dark text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                                📌 PINNED
                              </span>
                            )}
                            <span className="text-[11px] text-gray-400 font-bold">{post.date}</span>
                          </div>
                          <h5 className="font-black text-gray-900 text-sm leading-snug line-clamp-1">{post.title}</h5>
                          <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">{post.content}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors flex-shrink-0"
                        title="Delete this post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex justify-between items-center text-xs text-gray-500 font-bold">
          <span>ಪಿ.ಎಂ.ಶ್ರೀ ಆದರ್ಶ ವಿದ್ಯಾಲಯ ಸಿಂಧನೂರು • ಮುಖ್ಯಗುರುಗಳ ನಿಯಂತ್ರಣ ಕೊಠಡಿ</span>
          <button onClick={onClose} className="text-gray-700 hover:text-primary font-bold">
            ಮುಚ್ಚಿ (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
