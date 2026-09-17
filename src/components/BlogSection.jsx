import React, { useState, useRef } from 'react';
import { Search, Calendar, User, Clock, ChevronRight, ArrowLeft, Landmark, Sparkles, BookOpen, Edit3, PlusCircle } from 'lucide-react';
import { defaultBlogCategories, defaultSiteContent } from '../data/siteContent';
import { blogPosts as fallbackBlogPosts } from '../data/blogPosts';

export default function BlogSection({ 
  onSelectAttractionTab, 
  categories = defaultBlogCategories, 
  blogPosts = fallbackBlogPosts,
  isHMLoggedIn,
  onOpenEditCategories,
  onOpenEditBlog
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Latest');
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [activePost, setActivePost] = useState(null);
  
  const listTopRef = useRef(null);

  const bottomCategories = [
    { id: 'PM SHRI Scheme', label: 'PM SHRI Scheme', icon: '🌟', desc: 'National model school upgrade, 6 strategic pillars & 2025-26 integration' },
    { id: 'Adarsha Vidyalayas', label: 'Adarsha Vidyalayas', icon: '🏫', desc: 'CABE 2005 norms, EBB block model schools, 74 Karnataka schools' },
    { id: 'Heritage & Attractions', label: 'Sindhanur Heritage', icon: '🏛️', desc: 'Ancient temples, forts, and cultural landmarks of Sindhanur' },
    { id: 'Events Calendar', label: 'Events Calendar', icon: '📅', desc: 'School exhibitions, sports meets, and key dates' },
    { id: 'Achievements', label: 'Achievements', icon: '🏆', desc: 'Academic, sports, and co-curricular awards' },
    { id: 'Student & Parent Guide', label: 'Student & Parent Guide', icon: '🎓', desc: 'CBSE/NCERT resources, 6-subject blueprint & exam tips' },
    { id: 'Staff Corner', label: 'Staff Corner', icon: '👨‍🏫', desc: 'Updates, insights, and corners from our teachers' },
  ];

  // Get all unique authors
  const allAuthors = Array.from(new Set(blogPosts.map(post => post.author)));

  // Filter posts based on search query, category selection, and author selection
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory === 'Authors') {
      matchesCategory = selectedAuthor ? post.author === selectedAuthor : true;
    } else if (selectedCategory !== 'Latest') {
      matchesCategory = post.category === selectedCategory;
    }

    return matchesSearch && matchesCategory;
  });

  // Identify featured post: first post in database
  const featuredPost = blogPosts[0];

  // Determine which posts go to the grid
  let gridPosts = filteredPosts;
  let showFeatured = false;

  if (selectedCategory === 'Latest' && !searchTerm) {
    showFeatured = true;
    // Exclude the featured post from the grid
    gridPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedAuthor(null);
    setActivePost(null);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthorSelect = (authorName) => {
    setSelectedAuthor(authorName);
    setActivePost(null);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReadPost = (post) => {
    setActivePost(post);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 px-4 bg-white" ref={listTopRef}>
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-10 relative">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase mb-3">
            <BookOpen size={13} className="text-amber-700" />
            ವಿದ್ಯಾಲಯ ಬ್ಲಾಗ್ ಮತ್ತು ಸಮಾಚಾರ • Official School Blog
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">Adarsha Vidyalaya Blog & News</h2>
          <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl mx-auto leading-relaxed">
            Stay updated with educational insights, regional heritage exploration, CBSE academic guides, and student milestones.
          </p>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>

          {/* HM Quick Action Bar */}
          {isHMLoggedIn && (
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => onOpenEditBlog && onOpenEditBlog()}
                className="bg-primary hover:bg-primary-dark text-white font-black text-xs px-4 py-2 rounded-xl shadow transition-all flex items-center gap-1.5 border border-amber-300"
              >
                <PlusCircle size={14} className="text-amber-300" />
                <span>ಹೊಸ ಲೇಖನ ಬರೆಯಿರಿ (Write New Article)</span>
              </button>
              <button
                onClick={() => onOpenEditCategories && onOpenEditCategories()}
                className="bg-accent hover:bg-accent-dark text-white font-black text-xs px-4 py-2 rounded-xl shadow transition-all flex items-center gap-1.5"
              >
                <Edit3 size={14} />
                <span>ವಿಭಾಗದ ಬಟನ್‌ಗಳು ತಿದ್ದಿ (Edit Category Buttons)</span>
              </button>
            </div>
          )}
        </div>

        {activePost ? (
          /* Detailed Single Blog View */
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100 animate-in fade-in duration-200 relative">
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={() => setActivePost(null)}
                className="flex items-center gap-1.5 text-accent font-bold text-sm hover:underline group"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Back to Blog Articles
              </button>

              {isHMLoggedIn && (
                <button
                  onClick={() => onOpenEditBlog && onOpenEditBlog(activePost.id)}
                  className="bg-amber-400 hover:bg-amber-500 text-primary-dark font-black text-xs px-3.5 py-1.5 rounded-xl shadow flex items-center gap-1.5"
                >
                  <Edit3 size={14} /> ಈ ಲೇಖನ ತಿದ್ದಿ (Edit This Article)
                </button>
              )}
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-md mb-6 bg-slate-900 flex items-center justify-center max-h-[420px]">
              <img 
                src={activePost.image} 
                alt={activePost.title} 
                className="w-full h-full object-cover max-h-[420px]"
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-primary text-white text-xs font-black uppercase px-3 py-1 rounded-md tracking-wider">
                {activePost.category}
              </span>
              {activePost.category === 'Heritage & Attractions' && (
                <span className="bg-amber-400 text-primary-dark text-xs font-black uppercase px-3 py-1 rounded-md tracking-wider flex items-center gap-1">
                  <Landmark size={12} /> Sindhanur Landmark Feature
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary leading-tight mt-4">
              {activePost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 border-y border-gray-200 py-3.5 my-6">
              <span className="flex items-center gap-1"><Calendar size={14} className="text-accent" /> {activePost.date}</span>
              <span className="flex items-center gap-1"><User size={14} className="text-accent" /> {activePost.author}</span>
              <span className="flex items-center gap-1"><Clock size={14} className="text-accent" /> {activePost.readTime}</span>
            </div>

            {/* Formatted Rich Content */}
            <div className="text-gray-800 leading-relaxed space-y-4 text-sm md:text-base font-normal font-sans">
              <FormattedContent content={activePost.content} />
            </div>

            <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Share this article with students & parents:
              </div>
              <div className="flex gap-2">
                <button className="px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">Facebook</button>
                <button className="px-3.5 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-xs font-bold hover:bg-sky-100 transition-colors">Twitter</button>
                <button className="px-3.5 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors">WhatsApp</button>
              </div>
            </div>
          </div>
        ) : (
          /* Grid list view */
          <>
            {/* Search and Category Navigation Header */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10 pb-6 border-b border-gray-100">
              {/* Category Filter Navigation */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-center lg:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-slate-50 text-gray-600 hover:bg-gray-100 border border-gray-200/80'
                    }`}
                  >
                    {cat.id === 'Heritage & Attractions' && <Landmark size={12} className={selectedCategory === cat.id ? 'text-amber-300' : 'text-amber-600'} />}
                    {cat.label}
                  </button>
                ))}

                {isHMLoggedIn && (
                  <button
                    onClick={onOpenEditCategories}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-black px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm"
                    title="Edit or Add Category Buttons"
                  >
                    <Edit3 size={12} />
                    <span>Edit Buttons</span>
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-72">
                <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search articles & heritage..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Author filter pill row (Visible if Authors tab selected) */}
            {selectedCategory === 'Authors' && (
              <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-gray-200">
                <div className="text-xs font-black uppercase text-gray-500 mb-3 tracking-wider">
                  Filter by Faculty & Author:
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedAuthor(null)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      !selectedAuthor
                        ? 'bg-accent text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    All Authors
                  </button>
                  {allAuthors.map((author) => (
                    <button
                      key={author}
                      onClick={() => handleAuthorSelect(author)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                        selectedAuthor === author
                          ? 'bg-accent text-white'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 1. Featured Story */}
            {showFeatured && featuredPost && (
              <div className="mb-14">
                <div className="bg-white border-2 border-amber-200/80 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 relative group">
                  
                  {isHMLoggedIn && (
                    <button
                      onClick={() => onOpenEditBlog && onOpenEditBlog(featuredPost.id)}
                      className="absolute top-3 right-3 z-10 bg-amber-400 hover:bg-amber-500 text-primary-dark font-black text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1"
                    >
                      <Edit3 size={13} /> Edit Headline
                    </button>
                  )}

                  <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full overflow-hidden bg-slate-900 relative">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-amber-400 text-primary-dark font-black text-xs px-3 py-1 rounded-full shadow flex items-center gap-1 uppercase">
                      <Sparkles size={12} /> Featured Headline
                    </div>
                  </div>
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white to-amber-50/20">
                    <div>
                      <span className="bg-accent text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-md">
                        {featuredPost.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-primary leading-snug mt-4 hover:text-accent transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mt-3 line-clamp-4 leading-relaxed font-normal">
                        {featuredPost.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {featuredPost.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readTime}</span>
                      </div>
                      <button 
                        onClick={() => handleReadPost(featuredPost)}
                        className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto shadow-md"
                      >
                        Read Full Story <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Latest Blogs Grid */}
            <div className="mb-16">
              {showFeatured && (
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Latest Articles & Heritage Insights</h4>
                  <span className="text-xs text-gray-400">{gridPosts.length} Articles</span>
                </div>
              )}
              {gridPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridPosts.map((post) => (
                    <article 
                      key={post.id} 
                      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative"
                    >
                      {/* HM Edit button on card */}
                      {isHMLoggedIn && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenEditBlog) onOpenEditBlog(post.id);
                          }}
                          className="absolute top-3 right-3 z-10 bg-amber-400 hover:bg-amber-500 text-primary-dark font-black text-[10px] px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1"
                        >
                          <Edit3 size={11} /> Edit
                        </button>
                      )}

                      <div onClick={() => handleReadPost(post)} className="cursor-pointer">
                        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900 flex items-center justify-center">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 bg-accent text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md shadow-sm">
                            {post.category}
                          </span>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-3 text-xs text-gray-400 font-bold mb-2">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                          </div>
                          <h3 className="font-extrabold text-primary text-base leading-snug group-hover:text-accent transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-xs mt-2.5 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <div 
                          onClick={() => handleReadPost(post)}
                          className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs font-bold text-accent cursor-pointer"
                        >
                          <span>Read Full Article</span>
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 border border-gray-100 rounded-2xl">
                  <p className="text-gray-500 font-medium">No articles found matching the selected criteria.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedCategory('Latest'); setSelectedAuthor(null); }}
                    className="text-primary font-bold text-sm underline mt-2"
                  >
                    Reset Filters & View All
                  </button>
                </div>
              )}
            </div>

            {/* 3. Bottom Category Discovery Tiles */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-xs font-black uppercase text-accent tracking-widest mb-1">Explore by Subject</h4>
                <h3 className="text-xl font-black text-primary">Discover Topics Across Our Vidyalaya</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bottomCategories.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => {
                      if (cat.id === 'Heritage & Attractions' && onSelectAttractionTab) {
                        onSelectAttractionTab();
                      } else {
                        handleCategorySelect(cat.id);
                      }
                    }}
                    className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-2xl mb-2 block">{cat.icon}</span>
                      <h4 className="font-black text-xs text-gray-800 group-hover:text-primary transition-colors leading-tight">{cat.label}</h4>
                      <p className="text-[11px] text-gray-500 mt-1.5 leading-snug">{cat.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold text-accent mt-3 flex items-center gap-1 group-hover:underline">
                      Explore <ChevronRight size={10} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </>
        )}

      </div>
    </section>
  );
}

function renderInlineFormatted(text) {
  if (!text) return '';
  const parts = text.split(/(\*\*.*?\*\*|https?:\/\/[^\s)]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-primary">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-accent underline font-semibold hover:text-accent-dark ml-1 break-all">
          {part}
        </a>
      );
    }
    return part;
  });
}

function FormattedContent({ content }) {
  if (!content) return null;
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-4">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // 1. Heading 3: ### Heading
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace(/^###\s+/, '');
          return (
            <h3 key={idx} className="text-lg md:text-xl font-black text-primary pt-4 pb-1 border-b border-gray-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block shrink-0"></span>
              <span>{renderInlineFormatted(headingText)}</span>
            </h3>
          );
        }

        // 2. Blockquote / Key Note: > ...
        if (trimmed.startsWith('>')) {
          const quoteLines = trimmed
            .split('\n')
            .map(l => l.replace(/^>\s*/, '').trim())
            .filter(Boolean);
          return (
            <div key={idx} className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50/30 border-l-4 border-amber-500 rounded-r-2xl p-4 md:p-6 my-5 shadow-sm border border-amber-200/60">
              <div className="text-xs font-black uppercase text-amber-900 tracking-wider mb-2 flex items-center gap-2">
                <Sparkles size={15} className="text-amber-600" />
                ಅಧಿಕೃತ ಮುಖ್ಯ ಸಂದೇಶ • Official Announcement Key Note
              </div>
              <div className="space-y-2 text-amber-950 font-medium text-sm md:text-base leading-relaxed">
                {quoteLines.map((ql, qidx) => (
                  <p key={qidx} className={ql.includes('ನಮ್ಮ ಆದರ್ಶ') ? 'text-amber-900 font-bold text-base md:text-lg border-t border-amber-200/60 pt-2 mt-2 font-sans' : 'italic'}>
                    {renderInlineFormatted(ql)}
                  </p>
                ))}
              </div>
            </div>
          );
        }

        // 3. Unordered list: lines starting with - or *
        const lines = trimmed.split('\n');
        if (lines.length > 0 && lines.every(l => l.trim().startsWith('- ') || l.trim().startsWith('* '))) {
          const items = lines.map(l => l.trim().replace(/^[-*]\s+/, ''));
          return (
            <ul key={idx} className="space-y-2.5 my-3 pl-1">
              {items.map((item, iidx) => (
                <li key={iidx} className="flex items-start gap-3 text-xs md:text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 shadow-xs"></span>
                  <span className="flex-1 leading-relaxed">{renderInlineFormatted(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        // 4. Ordered list: lines starting with 1. 2. etc
        if (lines.length > 0 && lines.every(l => /^\d+\.\s+/.test(l.trim()))) {
          const items = lines.map(l => {
            const m = l.trim().match(/^(\d+)\.\s+(.*)$/);
            return m ? { num: m[1], text: m[2] } : { num: '', text: l.trim() };
          });
          return (
            <div key={idx} className="grid grid-cols-1 gap-2.5 my-3">
              {items.map((item, iidx) => (
                <div key={iidx} className="bg-slate-50 border border-gray-200/80 rounded-2xl p-3.5 flex items-start gap-3 shadow-xs hover:border-primary/40 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-primary text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {item.num || iidx + 1}
                  </span>
                  <div className="text-xs md:text-sm text-gray-700 leading-relaxed flex-1">
                    {renderInlineFormatted(item.text)}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        // 5. Normal paragraph
        return (
          <p key={idx} className="text-gray-700 leading-relaxed text-sm md:text-base font-normal">
            {renderInlineFormatted(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
