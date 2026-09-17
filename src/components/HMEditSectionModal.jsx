import React, { useState } from 'react';
import { X, Save, Edit3, PlusCircle, Trash2, Image, Upload, CheckCircle2, RefreshCw, Layout, BookOpen, Award, Shirt, School, Layers } from 'lucide-react';
import { 
  saveSiteContent, 
  saveNavItems, 
  saveBlogCategories, 
  addBlogPostData, 
  updateBlogPostData, 
  deleteBlogPostData, 
  updateTopperData, 
  addTopperData, 
  deleteTopperData,
  addGalleryItemData,
  deleteGalleryItemData,
  defaultSiteContent,
  defaultNavItems,
  defaultBlogCategories,
  defaultHeadlines,
  saveHeadlinesData
} from '../data/siteContent';

export default function HMEditSectionModal({ 
  isOpen, 
  onClose, 
  targetSection, // 'about' | 'facilities' | 'high-school' | 'uniforms' | 'blog' | 'gallery' | 'achievements' | 'navbar' | 'categories'
  siteContent, 
  onSiteContentChange,
  navItems,
  onNavItemsChange,
  blogCategories,
  onBlogCategoriesChange,
  blogPosts,
  onBlogPostsChange,
  toppers,
  onToppersChange,
  galleryItems,
  onGalleryItemsChange,
  headlines,
  onHeadlinesChange
}) {
  const [activeTab, setActiveTab] = useState(targetSection || 'about');
  const [localContent, setLocalContent] = useState(siteContent || defaultSiteContent);
  const [localNav, setLocalNav] = useState(navItems || defaultNavItems);
  const [localCategories, setLocalCategories] = useState(blogCategories || defaultBlogCategories);
  const [selectedArticleId, setSelectedArticleId] = useState(blogPosts && blogPosts[0]?.id);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [newArticle, setNewArticle] = useState({ title: '', excerpt: '', content: '', category: 'Heritage & Attractions', author: 'ಮುಖ್ಯಗುರುಗಳು (Principal / HM)', image: '/school-banner.jpg' });
  const [selectedTopperId, setSelectedTopperId] = useState(toppers && toppers[0]?.id);
  const [editingTopper, setEditingTopper] = useState(null);
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '', category: 'Campus', tag: 'School Event', img: '/school-banner.jpg', description: '' });
  const [localHeadlines, setLocalHeadlines] = useState(headlines || defaultHeadlines);
  const [newHeadline, setNewHeadline] = useState({ tag: 'FLASH NEWS', text: '', targetTab: 'blog' });
  const [successMsg, setSuccessMsg] = useState('');

  // Sync when targetSection changes
  React.useEffect(() => {
    if (targetSection) setActiveTab(targetSection);
  }, [targetSection]);

  React.useEffect(() => {
    setLocalContent(siteContent);
  }, [siteContent]);
  React.useEffect(() => {
    if (headlines) setLocalHeadlines(headlines);
  }, [headlines]);

  React.useEffect(() => {
    if (selectedArticleId && blogPosts) {
      const art = blogPosts.find(p => p.id === selectedArticleId);
      if (art) setEditingArticle({ ...art });
    }
  }, [selectedArticleId, blogPosts]);

  React.useEffect(() => {
    if (selectedTopperId && toppers) {
      const top = toppers.find(t => t.id === selectedTopperId);
      if (top) setEditingTopper({ ...top });
    }
  }, [selectedTopperId, toppers]);

  if (!isOpen) return null;

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // 1. Save Section Content (About, Facilities, High School, Uniforms)
  const handleSaveContent = () => {
    const updated = saveSiteContent(localContent);
    if (onSiteContentChange) onSiteContentChange(updated);
    showNotification('ಪುಟದ ಮಾಹಿತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ! (Page content saved)');
  };

  // 2. Save Navbar Buttons
  const handleSaveNav = () => {
    const updated = saveNavItems(localNav);
    if (onNavItemsChange) onNavItemsChange(updated);
    showNotification('ನ್ಯಾವಿಗೇಷನ್ ಬಟನ್‌ಗಳ ಹೆಸರುಗಳನ್ನು ಉಳಿಸಲಾಗಿದೆ! (Navbar buttons saved)');
  };

  const handleNavLabelChange = (id, newLabel) => {
    setLocalNav(localNav.map(item => item.id === id ? { ...item, label: newLabel } : item));
  };

  // 3. Save Categories
  const handleSaveCategories = () => {
    const updated = saveBlogCategories(localCategories);
    if (onBlogCategoriesChange) onBlogCategoriesChange(updated);
    showNotification('ಬ್ಲಾಗ್ ವಿಭಾಗದ ಬಟನ್‌ಗಳನ್ನು ಉಳಿಸಲಾಗಿದೆ! (Categories saved)');
  };

  const handleAddCategory = () => {
    const name = prompt('ಹೊಸ ವಿಭಾಗದ ಹೆಸರು ನಮೂದಿಸಿ (New Category Name):');
    if (name && name.trim()) {
      const newCat = { id: name.trim(), label: name.trim() };
      const updated = [...localCategories, newCat];
      setLocalCategories(updated);
      saveBlogCategories(updated);
      if (onBlogCategoriesChange) onBlogCategoriesChange(updated);
      showNotification('ಹೊಸ ವಿಭಾಗವನ್ನು ಸೇರಿಸಲಾಗಿದೆ!');
    }
  };

  const handleDeleteCategory = (catId) => {
    if (confirm(`ಈ ವಿಭಾಗದ ಬಟನ್ ಅಳಿಸಲು ಬಯಸುವಿರಾ? (${catId})`)) {
      const updated = localCategories.filter(c => c.id !== catId);
      setLocalCategories(updated);
      saveBlogCategories(updated);
      if (onBlogCategoriesChange) onBlogCategoriesChange(updated);
      showNotification('ವಿಭಾಗವನ್ನು ಅಳಿಸಲಾಗಿದೆ!');
    }
  };

  // 4. Save/Update Blog Article
  const handleUpdateArticle = (e) => {
    e.preventDefault();
    if (!editingArticle) return;
    const updated = updateBlogPostData(editingArticle);
    if (onBlogPostsChange) onBlogPostsChange(updated);
    showNotification('ಲೇಖನವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ! (Article updated)');
  };

  const handleCreateArticle = (e) => {
    e.preventDefault();
    if (!newArticle.title.trim()) return;
    const updated = addBlogPostData(newArticle);
    if (onBlogPostsChange) onBlogPostsChange(updated);
    setIsCreatingArticle(false);
    setNewArticle({ title: '', excerpt: '', content: '', category: 'Heritage & Attractions', author: 'ಮುಖ್ಯಗುರುಗಳು (Principal / HM)', image: '/school-banner.jpg' });
    showNotification('ಹೊಸ ಲೇಖನವನ್ನು ಪ್ರಕಟಿಸಲಾಗಿದೆ! (New article published)');
  };

  const handleDeleteArticle = (id) => {
    if (confirm('ಈ ಲೇಖನವನ್ನು ಅಳಿಸಲು ಖಚಿತವೇ? (Delete article?)')) {
      const updated = deleteBlogPostData(id);
      if (onBlogPostsChange) onBlogPostsChange(updated);
      showNotification('ಲೇಖನವನ್ನು ಅಳಿಸಲಾಗಿದೆ!');
    }
  };

  // 5. Save/Update Topper
  const handleUpdateTopper = (e) => {
    e.preventDefault();
    if (!editingTopper) return;
    const updated = updateTopperData(editingTopper);
    if (onToppersChange) onToppersChange(updated);
    showNotification('ವಿದ್ಯಾರ್ಥಿಯ ಮಾಹಿತಿಯನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ! (Student info updated)');
  };

  // 6. Add Gallery Item
  const handleAddGalleryItem = (e) => {
    e.preventDefault();
    if (!newGalleryItem.title.trim()) return;
    const updated = addGalleryItemData(newGalleryItem);
    if (onGalleryItemsChange) onGalleryItemsChange(updated);
    setNewGalleryItem({ title: '', category: 'Campus', tag: 'School Event', img: '/school-banner.jpg', description: '' });
    showNotification('ಹೊಸ ಫೋಟೋ ಗ್ಯಾಲರಿಗೆ ಸೇರಿಸಲಾಗಿದೆ! (Photo added to gallery)');
  };

  const handleDeleteGallery = (id) => {
    if (confirm('ಈ ಫೋಟೋವನ್ನು ಗ್ಯಾಲರಿಯಿಂದ ಅಳಿಸಲು ಖಚಿತವೇ? (Delete photo?)')) {
      const updated = deleteGalleryItemData(id);
      if (onGalleryItemsChange) onGalleryItemsChange(updated);
      showNotification('ಫೋಟೋ ಅಳಿಸಲಾಗಿದೆ!');
    }
  };

  // Generic Image file reader
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large (max 5MB)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border-4 border-amber-400 overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark px-6 py-4 text-white flex items-center justify-between border-b-2 border-amber-300">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 text-primary-dark p-2 rounded-xl shadow-md font-black text-xl">
              ✏️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg md:text-xl text-amber-300">
                  ಮುಖ್ಯಗುರುಗಳ ಸಂಪಾದಕ ಮಂಡಳಿ (HM Content & Page Editor)
                </h3>
                <span className="bg-amber-400 text-primary-dark text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Full Control
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Edit any section writes, buttons, categories, student marks, articles & uploads
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

        {/* Section Navigation Tabs - High Visibility Ribbon */}
        <div className="bg-slate-900 border-b-4 border-amber-400 p-3 sm:p-4 shadow-inner">
          <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
            <span className="text-xs sm:text-sm font-black uppercase text-amber-300 tracking-wider flex items-center gap-1.5">
              <span>👉</span> ತಿದ್ದಬೇಕಾದ ವಿಭಾಗವನ್ನು ಆರಿಸಿ (Select Section to Edit):
            </span>
            <span className="text-[11px] sm:text-xs bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full shadow-sm">
              10 ವಿಭಾಗಗಳು (10 Sections)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            {[
              { id: 'navbar', label: '1. Navbar Buttons', sub: 'ಮೆನು ಬಟನ್‌ಗಳು', icon: '🔘' },
              { id: 'categories', label: '2. Blog Categories', sub: 'ವಿಭಾಗದ ಬಟನ್‌ಗಳು', icon: '🏷️' },
              { id: 'blog', label: '3. Articles & Writes', sub: 'ಲೇಖನಗಳು / ವರದಿ', icon: '📰' },
              { id: 'about', label: '4. About Us Page', sub: 'ಶಾಲಾ ವಿವರ', icon: '🏛️' },
              { id: 'facilities', label: '5. Facilities & Labs', sub: 'ಸೌಲಭ್ಯ / ಲ್ಯಾಬ್', icon: '🔬' },
              { id: 'high-school', label: '6. High School Info', sub: 'ಪ್ರೌಢಶಾಲೆ ಪಠ್ಯಕ್ರಮ', icon: '📚' },
              { id: 'uniforms', label: '7. Uniforms Guide', sub: 'ಸಮವಸ್ತ್ರ ನಿಯಮ', icon: '👔' },
              { id: 'achievements', label: '8. Toppers & Results', sub: 'ಸಾಧಕರ ಅಂಕಗಳು', icon: '🏆' },
              { id: 'gallery', label: '9. Gallery Photos', sub: 'ಫೋಟೋ ಗ್ಯಾಲರಿ', icon: '🖼️' },
              { id: 'headlines', label: '10. Flash Headlines', sub: 'ಮುಖ್ಯಾಂಶಗಳು', icon: '📢' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-150 flex items-center gap-2.5 border-2 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 border-white shadow-xl ring-2 ring-amber-300 font-black scale-[1.03]'
                      : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:border-amber-400/80 font-bold'
                  }`}
                >
                  <span className="text-xl sm:text-2xl shrink-0">{tab.icon}</span>
                  <div className="min-w-0">
                    <div className={`text-xs sm:text-[13px] leading-tight font-black truncate ${isActive ? 'text-slate-950' : 'text-white'}`}>
                      {tab.label}
                    </div>
                    <div className={`text-[10px] leading-tight truncate mt-0.5 ${isActive ? 'text-slate-800 font-extrabold' : 'text-amber-300 font-semibold'}`}>
                      {tab.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mx-6 mt-4 bg-emerald-50 border-2 border-emerald-400 text-emerald-800 px-4 py-2.5 rounded-xl flex items-center gap-2 shadow animate-in fade-in">
            <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
            <span className="font-extrabold text-xs sm:text-sm">{successMsg}</span>
          </div>
        )}

        {/* Modal Scrollable Workspace */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* ========================================================
              TAB 1: NAVBAR BUTTONS EDIT
             ======================================================== */}
          {activeTab === 'navbar' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                <h4 className="font-black text-amber-900 text-sm flex items-center gap-2">
                  <span>🔘</span> ನ್ಯಾವಿಗೇಷನ್ ಮೆನು ಬಟನ್‌ಗಳ ಹೆಸರು ತಿದ್ದಿ (Edit Navbar Button Labels)
                </h4>
                <p className="text-xs text-amber-700 mt-1">
                  ನಿಮ್ಮ ಇಚ್ಛೆಗೆ ತಕ್ಕಂತೆ ವೆಬ್‌ಸೈಟ್‌ನ ಮೇಲಿನ ಮೆನು ಬಟನ್‌ಗಳ ಹೆಸರುಗಳನ್ನು ಬದಲಾಯಿಸಬಹುದು.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {localNav.map((item, index) => (
                  <div key={item.id} className="bg-slate-50 border-2 border-gray-200 p-3 rounded-2xl flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold text-gray-400 w-6">#{index + 1}</span>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleNavLabelChange(item.id, e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded-xl text-xs font-black text-primary uppercase focus:outline-none focus:border-primary bg-white"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={handleSaveNav}
                  className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2"
                >
                  <Save size={16} /> ಬಟನ್‌ಗಳ ಹೆಸರು ಉಳಿಸಿ (Save Navbar Buttons)
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: BLOG CATEGORY BUTTONS EDIT
             ======================================================== */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h4 className="font-black text-primary text-sm flex items-center gap-2">
                    <span>🏷️</span> ಬ್ಲಾಗ್ ವಿಭಾಗದ ಬಟನ್‌ಗಳು (Edit Category Filter Pills)
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    ಸುದ್ದಿ ಮತ್ತು ಬ್ಲಾಗ್ ಪುಟದಲ್ಲಿ ಕಾಣಿಸುವ ವಿಭಾಗದ ಗುಂಡಿಗಳನ್ನು ಸೇರಿಸಿ ಅಥವಾ ಹೆಸರು ಬದಲಾಯಿಸಿ.
                  </p>
                </div>
                <button
                  onClick={handleAddCategory}
                  className="bg-accent hover:bg-accent-dark text-white font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                >
                  <PlusCircle size={14} /> ಹೊಸ ವಿಭಾಗ ಸೇರಿಸಿ (Add Category)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {localCategories.map((cat) => (
                  <div key={cat.id} className="bg-white border-2 border-blue-100 p-3 rounded-2xl shadow-sm flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={cat.label}
                      onChange={(e) => {
                        const newLabel = e.target.value;
                        setLocalCategories(localCategories.map(c => c.id === cat.id ? { ...c, label: newLabel } : c));
                      }}
                      className="flex-1 px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-primary"
                    />
                    {cat.id !== 'Latest' && (
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-red-400 hover:text-red-600 p-1 rounded-lg"
                        title="Delete category"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={handleSaveCategories}
                  className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2"
                >
                  <Save size={16} /> ವಿಭಾಗಗಳನ್ನು ಉಳಿಸಿ (Save Categories)
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: BLOG ARTICLES & WRITES EDIT
             ======================================================== */}
          {activeTab === 'blog' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCreatingArticle(false)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all ${!isCreatingArticle ? 'bg-primary text-white' : 'bg-slate-100 text-gray-600'}`}
                  >
                    ✏️ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಲೇಖನ ತಿದ್ದಿ (Edit Article)
                  </button>
                  <button
                    onClick={() => setIsCreatingArticle(true)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all ${isCreatingArticle ? 'bg-primary text-white' : 'bg-slate-100 text-gray-600'}`}
                  >
                    ➕ ಹೊಸ ಲೇಖನ ಬರೆಯಿರಿ (Write New Article)
                  </button>
                </div>
              </div>

              {isCreatingArticle ? (
                /* Write New Article Form */
                <form onSubmit={handleCreateArticle} className="space-y-4 bg-slate-50 border-2 border-primary/20 p-5 rounded-3xl shadow-sm">
                  <h4 className="font-black text-primary text-base">ಹೊಸ ಶಾಲಾ ಲೇಖನ / ವರದಿ ರಚಿಸಿ (New Blog Post)</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಶೀರ್ಷಿಕೆ (Article Title) *</label>
                    <input
                      type="text"
                      required
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                      placeholder="ಉದಾಹರಣೆಗೆ: ವಾರ್ಷಿಕ ವಿಜ್ಞಾನ ದಿನಾಚರಣೆ ಸಂಭ್ರಮ..."
                      className="w-full px-3 py-2 border rounded-xl text-sm font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ವಿಭಾಗ (Category)</label>
                      <select
                        value={newArticle.category}
                        onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-sm bg-white"
                      >
                        {localCategories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಲೇಖಕರು (Author)</label>
                      <input
                        type="text"
                        value={newArticle.author}
                        onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಕಿರು ಸಾರಾಂಶ (Short Excerpt)</label>
                    <textarea
                      rows={2}
                      value={newArticle.excerpt}
                      onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                      placeholder="ಲೇಖನದ ಮುಖ್ಯಾಂಶ 1-2 ಸಾಲುಗಳಲ್ಲಿ..."
                      className="w-full px-3 py-2 border rounded-xl text-sm"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಸಂಪೂರ್ಣ ಲೇಖನ (Full Content) *</label>
                    <textarea
                      rows={6}
                      required
                      value={newArticle.content}
                      onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                      placeholder="ಸಂಪೂರ್ಣ ವಿವರಣೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..."
                      className="w-full px-3 py-2 border rounded-xl text-sm leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಮುಖಪುಟದ ಫೋಟೋ (Cover Image)</label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (data) => setNewArticle({ ...newArticle, image: data }))}
                        className="text-xs"
                      />
                      <input
                        type="text"
                        value={newArticle.image}
                        onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                        placeholder="Image URL"
                        className="flex-1 px-3 py-1.5 border rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md"
                    >
                      🚀 ಲೇಖನ ಪ್ರಕಟಿಸಿ (Publish Article)
                    </button>
                  </div>
                </form>
              ) : (
                /* Edit Existing Article */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ತಿದ್ದಬೇಕಾದ ಲೇಖನವನ್ನು ಆರಿಸಿ (Select Article to Edit):</label>
                    <select
                      value={selectedArticleId}
                      onChange={(e) => setSelectedArticleId(Number(e.target.value))}
                      className="w-full px-4 py-2.5 border-2 border-primary/40 rounded-2xl text-sm font-bold bg-white"
                    >
                      {blogPosts && blogPosts.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  {editingArticle && (
                    <form onSubmit={handleUpdateArticle} className="space-y-4 bg-slate-50 border-2 border-gray-200 p-5 rounded-3xl">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಶೀರ್ಷಿಕೆ (Title)</label>
                        <input
                          type="text"
                          required
                          value={editingArticle.title}
                          onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-sm font-bold text-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ವಿಭಾಗ (Category)</label>
                          <select
                            value={editingArticle.category}
                            onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                            className="w-full px-3 py-2 border rounded-xl text-sm bg-white"
                          >
                            {localCategories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಲೇಖಕರು (Author)</label>
                          <input
                            type="text"
                            value={editingArticle.author}
                            onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                            className="w-full px-3 py-2 border rounded-xl text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಸಾರಾಂಶ (Excerpt)</label>
                        <textarea
                          rows={2}
                          value={editingArticle.excerpt}
                          onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-sm"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಸಂಪೂರ್ಣ ಲೇಖನ (Full Content)</label>
                        <textarea
                          rows={6}
                          required
                          value={editingArticle.content}
                          onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-sm leading-relaxed"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ಮುಖಪುಟದ ಫೋಟೋ (Cover Image)</label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (data) => setEditingArticle({ ...editingArticle, image: data }))}
                            className="text-xs"
                          />
                          <input
                            type="text"
                            value={editingArticle.image}
                            onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
                            className="flex-1 px-3 py-1.5 border rounded-xl text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <button
                          type="button"
                          onClick={() => handleDeleteArticle(editingArticle.id)}
                          className="text-red-500 hover:text-red-700 font-bold text-xs flex items-center gap-1"
                        >
                          <Trash2 size={15} /> ಲೇಖನ ಅಳಿಸಿ (Delete)
                        </button>
                        <button
                          type="submit"
                          className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2"
                        >
                          <Save size={16} /> ಬದಲಾವಣೆ ಉಳಿಸಿ (Save Changes)
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 4: ABOUT US PAGE EDIT
             ======================================================== */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                <h4 className="font-black text-primary text-sm">🏛️ ನಮ್ಮ ಬಗ್ಗೆ (About Us) ಪುಟದ ಮಾಹಿತಿ ಸಂಪಾದನೆ</h4>
                <p className="text-xs text-gray-600 mt-1">ಶಾಲೆಯ ಇತಿಹಾಸ, ಧ್ಯೇಯ, ಉದ್ದೇಶ ಮತ್ತು ಅಧಿಕೃತ ವಿವರಗಳನ್ನು ಬದಲಾಯಿಸಿ.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ಕನ್ನಡ ಹೆಸರು</label>
                  <input
                    type="text"
                    value={localContent.about.kannadaTitle}
                    onChange={(e) => setLocalContent({ ...localContent, about: { ...localContent.about, kannadaTitle: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">English School Title</label>
                  <input
                    type="text"
                    value={localContent.about.title}
                    onChange={(e) => setLocalContent({ ...localContent, about: { ...localContent.about, title: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ಶಾಲೆಯ ಇತಿಹಾಸ / ಹಿನ್ನೆಲೆ (History)</label>
                <textarea
                  rows={3}
                  value={localContent.about.history}
                  onChange={(e) => setLocalContent({ ...localContent, about: { ...localContent.about, history: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ಧ್ಯೇಯ (Mission)</label>
                  <textarea
                    rows={3}
                    value={localContent.about.mission}
                    onChange={(e) => setLocalContent({ ...localContent, about: { ...localContent.about, mission: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ದೂರದೃಷ್ಟಿ (Vision)</label>
                  <textarea
                    rows={3}
                    value={localContent.about.vision}
                    onChange={(e) => setLocalContent({ ...localContent, about: { ...localContent.about, vision: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ಮೌಲ್ಯಗಳು (Core Values)</label>
                  <textarea
                    rows={3}
                    value={localContent.about.values}
                    onChange={(e) => setLocalContent({ ...localContent, about: { ...localContent.about, values: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={handleSaveContent}
                  className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2"
                >
                  <Save size={16} /> ಮಾಹಿತಿ ಉಳಿಸಿ (Save About Us)
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: FACILITIES & LABS EDIT
             ======================================================== */}
          {activeTab === 'facilities' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                <h4 className="font-black text-primary text-sm">🔬 ಪ್ರಯೋಗಾಲಯಗಳು ಮತ್ತು ಶಾಲಾ ಸೌಲಭ್ಯಗಳ ಮಾಹಿತಿ (Facilities)</h4>
                <p className="text-xs text-gray-600 mt-1">ಲ್ಯಾಬ್‌ಗಳು, ಸ್ಮಾರ್ಟ್ ತರಗತಿಗಳು ಮತ್ತು ಕ್ಯಾಂಪಸ್ ವಿವರಗಳನ್ನು ತಿದ್ದಿ.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ವಿಭಾಗದ ಶೀರ್ಷಿಕೆ (Title)</label>
                <input
                  type="text"
                  value={localContent.facilities.title}
                  onChange={(e) => setLocalContent({ ...localContent, facilities: { ...localContent.facilities, title: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ಉಪಶೀರ್ಷಿಕೆ (Subtitle)</label>
                <input
                  type="text"
                  value={localContent.facilities.subtitle}
                  onChange={(e) => setLocalContent({ ...localContent, facilities: { ...localContent.facilities, subtitle: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-black text-gray-700 uppercase">ಪ್ರಮುಖ ಸೌಲಭ್ಯಗಳ ಪಟ್ಟಿ (Facility Cards):</label>
                {localContent.facilities.items.map((item, idx) => (
                  <div key={item.id} className="bg-slate-50 border p-3.5 rounded-2xl space-y-2">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...localContent.facilities.items];
                        newItems[idx].title = e.target.value;
                        setLocalContent({ ...localContent, facilities: { ...localContent.facilities, items: newItems } });
                      }}
                      className="w-full px-3 py-1.5 border rounded-xl text-xs font-bold text-primary"
                    />
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => {
                        const newItems = [...localContent.facilities.items];
                        newItems[idx].desc = e.target.value;
                        setLocalContent({ ...localContent, facilities: { ...localContent.facilities, items: newItems } });
                      }}
                      className="w-full px-3 py-1.5 border rounded-xl text-xs text-gray-600"
                    ></textarea>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={handleSaveContent}
                  className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2"
                >
                  <Save size={16} /> ಸೌಲಭ್ಯಗಳ ಮಾಹಿತಿ ಉಳಿಸಿ (Save Facilities)
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: HIGH SCHOOL EDIT
             ======================================================== */}
          {activeTab === 'high-school' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                <h4 className="font-black text-primary text-sm">📚 ಪ್ರೌಢಶಾಲಾ ವಿಭಾಗದ ಪಠ್ಯಕ್ರಮ ವಿವರ (High School Department)</h4>
                <p className="text-xs text-gray-600 mt-1">6 ರಿಂದ 10 ನೇ ತರಗತಿಯ ಕಲಿಕಾ ಮಾರ್ಗಸೂಚಿ ಮತ್ತು ಪಠ್ಯಕ್ರಮ ವಿವರ ತಿದ್ದಿ.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ವಿಭಾಗದ ಶೀರ್ಷಿಕೆ</label>
                  <input
                    type="text"
                    value={localContent.highSchool.title}
                    onChange={(e) => setLocalContent({ ...localContent, highSchool: { ...localContent.highSchool, title: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-xl text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ಬ್ಯಾಡ್ಜ್ (Badge)</label>
                  <input
                    type="text"
                    value={localContent.highSchool.badge}
                    onChange={(e) => setLocalContent({ ...localContent, highSchool: { ...localContent.highSchool, badge: e.target.value } })}
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ಪರಿಚಯ (Introduction)</label>
                <textarea
                  rows={3}
                  value={localContent.highSchool.intro}
                  onChange={(e) => setLocalContent({ ...localContent, highSchool: { ...localContent.highSchool, intro: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 border p-3.5 rounded-2xl">
                  <label className="block text-xs font-black text-primary mb-1">Middle Stage (Class 6 - 8)</label>
                  <textarea
                    rows={3}
                    value={localContent.highSchool.middleStageDesc}
                    onChange={(e) => setLocalContent({ ...localContent, highSchool: { ...localContent.highSchool, middleStageDesc: e.target.value } })}
                    className="w-full px-3 py-1.5 border rounded-xl text-xs"
                  ></textarea>
                </div>
                <div className="bg-slate-50 border p-3.5 rounded-2xl">
                  <label className="block text-xs font-black text-primary mb-1">Secondary Stage (Class 9 - 10)</label>
                  <textarea
                    rows={3}
                    value={localContent.highSchool.secondaryStageDesc}
                    onChange={(e) => setLocalContent({ ...localContent, highSchool: { ...localContent.highSchool, secondaryStageDesc: e.target.value } })}
                    className="w-full px-3 py-1.5 border rounded-xl text-xs"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={handleSaveContent}
                  className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2"
                >
                  <Save size={16} /> ಪ್ರೌಢಶಾಲಾ ಮಾಹಿತಿ ಉಳಿಸಿ (Save High School)
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: UNIFORMS EDIT
             ======================================================== */}
          {activeTab === 'uniforms' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                <h4 className="font-black text-primary text-sm">👔 ಶಾಲಾ ಸಮವಸ್ತ್ರ ನಿಯಮಾವಳಿ (Uniforms Guide)</h4>
                <p className="text-xs text-gray-600 mt-1">ತರಗತಿವಾರು ಬಾಲಕ/ಬಾಲಕಿಯರ ಸಮವಸ್ತ್ರ ವಿವರ ಮತ್ತು ದಿನದ ಸೂಚನೆಗಳನ್ನು ತಿದ್ದಿ.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pre-Primary */}
                <div className="bg-slate-50 border p-4 rounded-2xl space-y-2">
                  <h5 className="font-bold text-xs text-primary uppercase">Pre-Primary (LKG & UKG)</h5>
                  <input
                    type="text"
                    value={localContent.uniforms.prePrimaryBoys}
                    onChange={(e) => setLocalContent({ ...localContent, uniforms: { ...localContent.uniforms, prePrimaryBoys: e.target.value } })}
                    placeholder="Boys uniform"
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={localContent.uniforms.prePrimaryGirls}
                    onChange={(e) => setLocalContent({ ...localContent, uniforms: { ...localContent.uniforms, prePrimaryGirls: e.target.value } })}
                    placeholder="Girls uniform"
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={localContent.uniforms.prePrimaryNote}
                    onChange={(e) => setLocalContent({ ...localContent, uniforms: { ...localContent.uniforms, prePrimaryNote: e.target.value } })}
                    placeholder="Day note"
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs text-red-600 font-bold"
                  />
                </div>

                {/* Primary */}
                <div className="bg-slate-50 border p-4 rounded-2xl space-y-2">
                  <h5 className="font-bold text-xs text-primary uppercase">Primary (Class 1 to 7)</h5>
                  <input
                    type="text"
                    value={localContent.uniforms.primaryBoys}
                    onChange={(e) => setLocalContent({ ...localContent, uniforms: { ...localContent.uniforms, primaryBoys: e.target.value } })}
                    placeholder="Boys uniform"
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={localContent.uniforms.primaryGirls}
                    onChange={(e) => setLocalContent({ ...localContent, uniforms: { ...localContent.uniforms, primaryGirls: e.target.value } })}
                    placeholder="Girls uniform"
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={localContent.uniforms.primaryNote}
                    onChange={(e) => setLocalContent({ ...localContent, uniforms: { ...localContent.uniforms, primaryNote: e.target.value } })}
                    placeholder="Day note"
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs text-blue-600 font-bold"
                  />
                </div>

                {/* High School */}
                <div className="bg-slate-50 border p-4 rounded-2xl space-y-2">
                  <h5 className="font-bold text-xs text-primary uppercase">High School (Class 8 to 10)</h5>
                  <input
                    type="text"
                    value={localContent.uniforms.highSchoolBoys}
                    onChange={(e) => setLocalContent({ ...localContent, uniforms: { ...localContent.uniforms, highSchoolBoys: e.target.value } })}
                    placeholder="Boys uniform"
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={localContent.uniforms.highSchoolGirls}
                    onChange={(e) => setLocalContent({ ...localContent, uniforms: { ...localContent.uniforms, highSchoolGirls: e.target.value } })}
                    placeholder="Girls uniform"
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={localContent.uniforms.highSchoolNote}
                    onChange={(e) => setLocalContent({ ...localContent, uniforms: { ...localContent.uniforms, highSchoolNote: e.target.value } })}
                    placeholder="Day note"
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs text-emerald-600 font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={handleSaveContent}
                  className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2"
                >
                  <Save size={16} /> ಸಮವಸ್ತ್ರ ಮಾಹಿತಿ ಉಳಿಸಿ (Save Uniforms)
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 8: TOPPERS & RESULTS EDIT
             ======================================================== */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                <h4 className="font-black text-amber-900 text-sm">🏆 ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ ಸಾಧಕರ ಅಂಕಗಳು, ಹೆಸರು ಮತ್ತು ಫೋಟೋ ತಿದ್ದಿ (Toppers Editor)</h4>
                <p className="text-xs text-amber-800 mt-1">ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು, ತಂದೆಯ ಹೆಸರು, ಅಂಕಗಳು (625ಕ್ಕೆ), ಶೇಕಡಾವಾರು ಮತ್ತು ಫೋಟೋವನ್ನು ಇಲ್ಲಿ ತಿದ್ದಬಹುದು.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">ತಿದ್ದಬೇಕಾದ ವಿದ್ಯಾರ್ಥಿಯನ್ನು ಆರಿಸಿ (Select Student):</label>
                <select
                  value={selectedTopperId}
                  onChange={(e) => setSelectedTopperId(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border-2 border-amber-300 rounded-2xl text-sm font-bold bg-white"
                >
                  {toppers && toppers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.rank} - {t.name} ({t.score} • {t.percentage})
                    </option>
                  ))}
                </select>
              </div>

              {editingTopper && (
                <form onSubmit={handleUpdateTopper} className="space-y-4 bg-slate-50 border-2 border-gray-200 p-5 rounded-3xl">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು</label>
                      <input
                        type="text"
                        required
                        value={editingTopper.name}
                        onChange={(e) => setEditingTopper({ ...editingTopper, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">ತಂದೆಯ ಹೆಸರು</label>
                      <input
                        type="text"
                        required
                        value={editingTopper.fatherName || ''}
                        onChange={(e) => {
                          const fName = e.target.value;
                          setEditingTopper({ ...editingTopper, fatherName: fName, htNo: `ತಂದೆ: ${fName}` });
                        }}
                        className="w-full px-3 py-2 border rounded-xl text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">ಶ್ರೇಣಿ (Rank Tag)</label>
                      <input
                        type="text"
                        value={editingTopper.rank}
                        onChange={(e) => setEditingTopper({ ...editingTopper, rank: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-sm font-black text-amber-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">ಅಂಕಗಳು (Score e.g. 615/625)</label>
                      <input
                        type="text"
                        required
                        value={editingTopper.score}
                        onChange={(e) => setEditingTopper({ ...editingTopper, score: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-sm font-black text-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">ಶೇಕಡಾವಾರು (Percentage e.g. 98.40%)</label>
                      <input
                        type="text"
                        required
                        value={editingTopper.percentage}
                        onChange={(e) => setEditingTopper({ ...editingTopper, percentage: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-sm font-black text-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">ವಿದ್ಯಾರ್ಥಿಯ ಫೋಟೋ ಬದಲಾಯಿಸಿ (Upload or Photo Path)</label>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary shadow flex-shrink-0">
                        <img src={editingTopper.photo || editingTopper.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (data) => setEditingTopper({ ...editingTopper, photo: data, avatar: data }))}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2"
                    >
                      <Save size={16} /> ವಿದ್ಯಾರ್ಥಿ ಮಾಹಿತಿ ಉಳಿಸಿ (Save Student)
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 9: GALLERY PHOTOS EDIT
             ======================================================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h4 className="font-black text-emerald-900 text-sm">🖼️ ಶಾಲಾ ಗ್ಯಾಲರಿ ಫೋಟೋಗಳ ನಿರ್ವಹಣೆ (Gallery Manager)</h4>
                  <p className="text-xs text-emerald-700 mt-1">ಹೊಸ ಫೋಟೋಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಹಳೆಯ ಫೋಟೋಗಳನ್ನು ಅಳಿಸಿ.</p>
                </div>
              </div>

              {/* Add Photo Form */}
              <form onSubmit={handleAddGalleryItem} className="bg-slate-50 border-2 border-gray-200 p-4 rounded-2xl space-y-3">
                <h5 className="font-bold text-xs text-primary uppercase">ಹೊಸ ಫೋಟೋ ಸೇರಿಸಿ (Add New Gallery Photo)</h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="ಫೋಟೋ ಶೀರ್ಷಿಕೆ (Photo Title)"
                    value={newGalleryItem.title}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                    className="px-3 py-1.5 border rounded-xl text-xs"
                  />
                  <select
                    value={newGalleryItem.category}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                    className="px-3 py-1.5 border rounded-xl text-xs bg-white"
                  >
                    <option value="Campus">Campus</option>
                    <option value="Attractions & Heritage">Attractions & Heritage</option>
                    <option value="Labs">Labs</option>
                    <option value="Academics">Academics</option>
                    <option value="Sports">Sports</option>
                    <option value="Events">Events</option>
                  </select>
                  <input
                    type="text"
                    placeholder="ವಿವರಣೆ / ಟ್ಯಾಗ್ (Tag)"
                    value={newGalleryItem.tag}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, tag: e.target.value })}
                    className="px-3 py-1.5 border rounded-xl text-xs"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, (data) => setNewGalleryItem({ ...newGalleryItem, img: data }))}
                    className="text-xs"
                  />
                  <input
                    type="text"
                    placeholder="ಅಥವಾ Image URL ಹಾಕಿ"
                    value={newGalleryItem.img}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, img: e.target.value })}
                    className="flex-1 px-3 py-1.5 border rounded-xl text-xs"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-2 rounded-xl shadow flex items-center gap-1.5"
                  >
                    <PlusCircle size={14} /> ಗ್ಯಾಲರಿಗೆ ಸೇರಿಸಿ (Add to Gallery)
                  </button>
                </div>
              </form>

              {/* Gallery Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {galleryItems && galleryItems.map((item) => (
                  <div key={item.id} className="border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between group">
                    <div className="aspect-video bg-slate-100 overflow-hidden relative">
                      <img src={item.img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete photo"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div className="p-2">
                      <div className="text-[11px] font-bold truncate text-gray-800">{item.title}</div>
                      <div className="text-[9px] text-gray-400 uppercase">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* ========================================================
              TAB 10: FLASH HEADLINES (MOVING TICKER)
             ======================================================== */}
          {activeTab === 'headlines' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <div>
                  <h4 className="font-black text-primary text-base flex items-center gap-2">
                    <span className="text-xl">📢</span> ಚಲಿಸುವ ಮುಖ್ಯಾಂಶಗಳು (Continuous Moving Headlines Ticker)
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    ಈ ಮುಖ್ಯಾಂಶಗಳು ಶಾಲಾ ಬ್ಲಾಗ್‌ನ ಎಲ್ಲಾ ಪುಟಗಳಲ್ಲೂ ನಿರಂತರವಾಗಿ ಚಲಿಸುತ್ತವೆ. (Shown on all pages).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = saveHeadlinesData(localHeadlines);
                    if (onHeadlinesChange) onHeadlinesChange(updated);
                    showNotification('ಮುಖ್ಯಾಂಶಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ! (Headlines saved)');
                  }}
                  className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-5 py-2.5 rounded-xl shadow flex items-center gap-2"
                >
                  <Save size={14} /> ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ (Save All)
                </button>
              </div>

              {/* Add New Headline Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newHeadline.text.trim()) return;
                  const item = { ...newHeadline, id: Date.now() };
                  const updated = [item, ...localHeadlines];
                  setLocalHeadlines(updated);
                  saveHeadlinesData(updated);
                  if (onHeadlinesChange) onHeadlinesChange(updated);
                  setNewHeadline({ tag: 'FLASH NEWS', text: '', targetTab: 'blog' });
                  showNotification('ಹೊಸ ಮುಖ್ಯಾಂಶವನ್ನು ಸೇರಿಸಲಾಗಿದೆ! (Headline added)');
                }}
                className="bg-slate-50 border border-gray-200 rounded-2xl p-4 space-y-3"
              >
                <h5 className="font-bold text-xs uppercase text-gray-700 tracking-wider">
                  + ಹೊಸ ಮುಖ್ಯಾಂಶ ಸೇರಿಸಿ (Add New Headline)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">ಟ್ಯಾಗ್ (Tag e.g. PM SHRI)</label>
                    <input
                      type="text"
                      value={newHeadline.tag}
                      onChange={(e) => setNewHeadline({ ...newHeadline, tag: e.target.value })}
                      placeholder="Tag"
                      className="w-full px-3 py-2 border rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">ಮುಖ್ಯಾಂಶ ಸುದ್ದಿ (Headline Text)</label>
                    <input
                      type="text"
                      required
                      value={newHeadline.text}
                      onChange={(e) => setNewHeadline({ ...newHeadline, text: e.target.value })}
                      placeholder="ಉದಾ: PM SHRI Adarsha Vidyalaya admissions open..."
                      className="w-full px-3 py-2 border rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">ಕ್ಲಿಕ್ ಮಾಡಿದಾಗ ತೆರೆಯುವ ಪುಟ</label>
                    <select
                      value={newHeadline.targetTab}
                      onChange={(e) => setNewHeadline({ ...newHeadline, targetTab: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs font-semibold bg-white"
                    >
                      <option value="blog">Blog & News</option>
                      <option value="about">About Us</option>
                      <option value="high-school">High School</option>
                      <option value="facilities">Facilities</option>
                      <option value="achievements">Achievements</option>
                      <option value="attractions">Attractions</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-dark text-white font-bold text-xs px-4 py-2 rounded-xl shadow flex items-center gap-1.5"
                  >
                    <PlusCircle size={14} /> ಸೇರಿಸಿ (Add Headline)
                  </button>
                </div>
              </form>

              {/* Current Headlines List */}
              <div className="space-y-2.5">
                <h5 className="font-bold text-xs uppercase text-gray-500 tracking-wider">
                  ಪ್ರಸ್ತುತ ಚಲಿಸುತ್ತಿರುವ ಮುಖ್ಯಾಂಶಗಳು ({localHeadlines.length})
                </h5>
                {localHeadlines.map((item, idx) => (
                  <div 
                    key={item.id || idx}
                    className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs hover:border-amber-400 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 flex-1 overflow-hidden">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      {item.tag && (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md shrink-0">
                          {item.tag}
                        </span>
                      )}
                      <span className="text-xs text-gray-800 font-medium truncate flex-1">
                        {item.text}
                      </span>
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded shrink-0 hidden sm:inline">
                        → {item.targetTab}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = localHeadlines.filter((_, i) => i !== idx);
                        setLocalHeadlines(updated);
                        saveHeadlinesData(updated);
                        if (onHeadlinesChange) onHeadlinesChange(updated);
                        showNotification('ಮುಖ್ಯಾಂಶವನ್ನು ತೆಗೆದುಹಾಕಲಾಗಿದೆ! (Headline deleted)');
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors shrink-0"
                      title="Delete headline"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-100 border-t border-gray-200 px-6 py-3 flex justify-between items-center text-xs font-bold text-gray-600">
          <span>ಪಿ.ಎಂ.ಶ್ರೀ ಆದರ್ಶ ವಿದ್ಯಾಲಯ • ಮುಖ್ಯಗುರುಗಳ ಸಂಪಾದಕ ಮಂಡಳಿ</span>
          <button 
            onClick={onClose}
            className="bg-primary text-white px-5 py-1.5 rounded-xl font-bold hover:bg-primary-dark transition-colors"
          >
            ಮುಚ್ಚಿ (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
