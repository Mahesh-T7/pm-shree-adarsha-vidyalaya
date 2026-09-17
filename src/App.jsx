import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import HeroBanner from './components/HeroBanner';
import AuthorMessages from './components/AuthorMessages';
import SocialSidebar from './components/SocialSidebar';
import StatsSection from './components/StatsSection';
import Gallery from './components/Gallery';
import Uniforms from './components/Uniforms';
import BlogSection from './components/BlogSection';
import RegionalAttractions from './components/RegionalAttractions';
import Footer from './components/Footer';
import { EnquiryModal, AdmissionModal, LoginModal } from './components/Modals';
import HMDashboardModal from './components/HMDashboardModal';
import HMNoticeBoard from './components/HMNoticeBoard';
import HMFloatingBar from './components/HMFloatingBar';
import HMEditSectionModal from './components/HMEditSectionModal';
import { getHMPosts, getHMAuthStatus, setHMAuthStatus, fetchHMPostsFromAPI } from './data/hmPosts';
import { 
  getSiteContent, 
  saveSiteContent,
  getNavItems, 
  getBlogCategories, 
  getBlogPostsData, 
  getToppersData, 
  getGalleryData,
  getHeadlinesData,
  fetchSiteContentFromAPI,
  fetchBlogPostsFromAPI,
  fetchToppersFromAPI,
  fetchGalleryFromAPI,
  fetchHeadlinesFromAPI
} from './data/siteContent';
import api from './services/api';
import { Award, Compass, HeartHandshake, ShieldCheck, Microscope, Monitor, BookOpen, Landmark, School, Sparkles, MapPin, Edit3, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('blog');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isHMDashboardOpen, setIsHMDashboardOpen] = useState(false);
  const [isHMLoggedIn, setIsHMLoggedIn] = useState(getHMAuthStatus);
  const [currentUser, setCurrentUser] = useState(null);
  const [hmPosts, setHmPosts] = useState(getHMPosts);

  // Editable Site Content & Collections
  const [siteContent, setSiteContent] = useState(getSiteContent);
  const [navItems, setNavItems] = useState(getNavItems);
  const [blogCategories, setBlogCategories] = useState(getBlogCategories);
  const [blogPosts, setBlogPosts] = useState(getBlogPostsData);
  const [toppers, setToppers] = useState(getToppersData);
  const [galleryItems, setGalleryItems] = useState(getGalleryData);
  const [headlines, setHeadlines] = useState(getHeadlinesData);

  // Synchronize with backend API on mount
  React.useEffect(() => {
    // 1. Verify real server-side session
    api.auth.getMe()
      .then((res) => {
        if (res.success && res.user) {
          setIsHMLoggedIn(true);
          setCurrentUser(res.user);
          setHMAuthStatus(true);
        }
      })
      .catch(() => {
        // Session invalid or not logged in
        setIsHMLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem('pmshree_hm_session');
      });

    // 2. Fetch live data from database
    fetchSiteContentFromAPI().then(setSiteContent);
    fetchBlogPostsFromAPI().then(setBlogPosts);
    fetchHMPostsFromAPI().then(setHmPosts);
    fetchToppersFromAPI().then(setToppers);
    fetchGalleryFromAPI().then(setGalleryItems);
    fetchHeadlinesFromAPI().then(setHeadlines);
  }, []);

  // HM Editor Modal state
  const [isHMEditorOpen, setIsHMEditorOpen] = useState(false);
  const [targetEditSection, setTargetEditSection] = useState('about');

  const handleOpenSectionEditor = (section) => {
    setTargetEditSection(section || activeTab);
    setIsHMEditorOpen(true);
  };

  const handleHMLoginSuccess = (user) => {
    setIsHMLoggedIn(true);
    setCurrentUser(user);
    setHMAuthStatus(true);
    setIsHMDashboardOpen(true);
  };

  const handleHMLogout = async () => {
    try {
      await api.auth.logout();
    } catch (e) {}
    setIsHMLoggedIn(false);
    setCurrentUser(null);
    setHMAuthStatus(false);
    setIsHMDashboardOpen(false);
  };

  const handleSelectHeadline = (item) => {
    if (item.targetTab) {
      setActiveTab(item.targetTab);
    }
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render tab content dynamically
  const renderTabContent = () => {
    switch (activeTab) {
      case 'blog':
        return (
          <BlogSection 
            categories={blogCategories}
            blogPosts={blogPosts}
            isHMLoggedIn={isHMLoggedIn}
            onOpenEditCategories={() => handleOpenSectionEditor('categories')}
            onOpenEditBlog={(postId) => handleOpenSectionEditor('blog')}
            onSelectAttractionTab={() => setActiveTab('attractions')} 
          />
        );
      
      case 'attractions':
        return <RegionalAttractions onSelectArticle={() => setActiveTab('blog')} />;
      
      case 'gallery':
        return (
          <Gallery 
            items={galleryItems}
            isHMLoggedIn={isHMLoggedIn}
            onOpenEditGallery={() => handleOpenSectionEditor('gallery')}
          />
        );
      
      case 'uniforms':
        return (
          <Uniforms 
            content={siteContent.uniforms}
            isHMLoggedIn={isHMLoggedIn}
            onOpenEdit={() => handleOpenSectionEditor('uniforms')}
          />
        );
      
      case 'achievements':
        return (
          <div className="py-6 animate-in fade-in duration-200">
            <HeroBanner 
              toppers={toppers}
              isHMLoggedIn={isHMLoggedIn}
              onOpenEditToppers={() => handleOpenSectionEditor('achievements')}
              onNavigateAttractions={() => setActiveTab('attractions')} 
              onNavigateAbout={() => setActiveTab('about')} 
            />
            <HMNoticeBoard 
              posts={hmPosts}
              onPostsChange={setHmPosts}
              isHMLoggedIn={isHMLoggedIn}
              onOpenHMDashboard={() => setIsHMDashboardOpen(true)}
            />
          </div>
        );
      
      case 'facilities':
        const fac = siteContent.facilities;
        return (
          <section className="py-12 px-4 bg-white animate-in fade-in duration-200">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10 relative">
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase mb-3">
                  <School size={13} className="text-amber-700" />
                  Model Infrastructure
                </div>
                <h2 className="text-3xl font-black text-primary tracking-tight">{fac.title}</h2>
                <p className="text-sm text-gray-500 mt-2 font-medium">{fac.subtitle}</p>
                <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>

                {isHMLoggedIn && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => handleOpenSectionEditor('facilities')}
                      className="bg-amber-400 hover:bg-amber-500 text-primary-dark font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 border border-amber-300"
                    >
                      <Edit3 size={14} />
                      <span>ಸೌಲಭ್ಯಗಳ ಮಾಹಿತಿ ತಿದ್ದಿ (Edit Facilities)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Campus Building Showcase Banner */}
              <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border-2 border-amber-200 relative group">
                <img 
                  src={fac.bannerImage || "/school-banner.jpg"} 
                  alt="PMSHRI Adarsha Vidyalaya Sindhanur Campus" 
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                  <span className="bg-amber-400 text-primary-dark font-black text-xs px-3 py-1 rounded-full uppercase w-fit mb-2">
                    PM SHRI Model School Campus
                  </span>
                  <h3 className="text-xl md:text-3xl font-black text-white">
                    {fac.bannerTitle}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-200 mt-1 max-w-2xl">
                    {fac.bannerDesc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {fac.items.map((item, i) => (
                  <div key={item.id || i} className="bg-slate-50 border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 bg-primary text-white rounded-2xl inline-block mb-3 shadow-md">
                      {i % 3 === 0 ? <Microscope size={24} /> : i % 3 === 1 ? <Monitor size={24} /> : <BookOpen size={24} />}
                    </div>
                    <h3 className="font-extrabold text-primary text-lg mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'about':
        const abt = siteContent.about;
        return (
          <section className="py-12 px-4 bg-white animate-in fade-in duration-200">
            <div className="max-w-5xl mx-auto">
              
              {/* Header */}
              <div className="text-center mb-10 relative">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1 rounded-full text-xs font-black uppercase mb-3">
                  <Landmark size={14} className="text-amber-700" />
                  ಶಾಲೆ ಪರಿಚಯ • About Our Vidyalaya
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-primary tracking-tight">
                  About {abt.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  {abt.subtitle}
                </p>
                <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>

                {isHMLoggedIn && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => handleOpenSectionEditor('about')}
                      className="bg-amber-400 hover:bg-amber-500 text-primary-dark font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 border border-amber-300"
                    >
                      <Edit3 size={14} />
                      <span>ಶಾಲಾ ಪರಿಚಯ ಮಾಹಿತಿ ತಿದ್ದಿ (Edit About Us)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Identity Presentation with Logo & School Banner */}
              <div className="bg-gradient-to-br from-blue-50/50 via-white to-amber-50/40 border-2 border-amber-200 rounded-3xl p-6 md:p-8 shadow-lg mb-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img 
                    src="/school-logo.jpg" 
                    alt="PMSHRI Adarsha Vidyalaya Sindhanur Crest" 
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-amber-400 shadow-xl bg-white shrink-0 object-cover"
                  />
                  <div className="space-y-2 text-center md:text-left">
                    <p className="text-amber-700 font-bold text-sm">
                      {abt.kannadaTitle}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-black text-primary">
                      {abt.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {abt.history}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2 justify-center md:justify-start">
                      <span className="bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full">
                        {abt.dise}
                      </span>
                      <span className="bg-amber-400 text-primary-dark text-[11px] font-black px-3 py-1 rounded-full">
                        PM SHRI Model School
                      </span>
                      <span className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                        Karnataka State Samagra Shiksha
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* School Banner Card */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 mb-10 relative">
                <img 
                  src={abt.bannerImage || "/school-banner.jpg"} 
                  alt="Adarsha Vidyalaya Sindhanur Banner" 
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* PM SHRI Official Integration Banner */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-10 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="bg-white text-primary-dark p-3.5 rounded-2xl shadow-lg shrink-0 hidden sm:block">
                    <Sparkles size={30} className="text-amber-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                      <Award size={13} className="text-amber-200" />
                      ಅಧಿಕೃತ ಘೋಷಣೆ • Official Key Note (Academic Year 2025-26)
                    </div>
                    <p className="text-base sm:text-lg font-black leading-snug">
                      "{abt.pmShriKeyNoteEn || 'Our Adarsha Vidyalaya Model School has been integrated under the PM SHRI scheme since the academic year 2025-26. By utilizing this project effectively, our students are paving the way forward and excelling in the field of education.'}"
                    </p>
                    <p className="text-sm sm:text-base font-bold text-amber-100 font-sans border-t border-white/20 pt-2 leading-relaxed">
                      "{abt.pmShriKeyNoteKn || 'ನಮ್ಮ ಆದರ್ಶ ವಿದ್ಯಾಲಯ ಮಾದರಿ ಶಾಲೆಯು 2025-26ನೇ ಸಾಲಿನಿಂದ ಪಿ.ಎಂ.ಶ್ರೀ ಯೋಜನೆಯಡಿ ತನ್ನನ್ನು ತೊಡಗಿಸಿಕೊಂಡು ಯೋಜನೆಯನ್ನು ನಮ್ಮ ಶಾಲೆಯ ಮಕ್ಕಳು ಸದುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳುತ್ತಾ ಶಿಕ್ಷಣ ಕ್ಷೇತ್ರದಲ್ಲಿ ಮುನ್ನುಗ್ಗುತ್ತಿದ್ದೇವೆ.'}"
                    </p>
                    <div className="text-xs text-amber-100 font-medium pt-1">
                      Official Source: <a href="https://ssk.karnataka.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-white">Samagra Shikshana Karnataka (ssk.karnataka.gov.in)</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Adarsha Vidyalaya Inception & CABE 2005 Framework Card */}
              <div className="bg-slate-50 border border-gray-200 rounded-3xl p-6 md:p-8 mb-10 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-primary mb-2">
                  <Landmark size={16} className="text-accent" />
                  <span>CABE 2005 Recommendations & Planning Commission Model</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-primary mb-3">
                  Genesis of Adarsha Vidyalaya Model Schools
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                  In June 2005, the Central Advisory Board of Education (CABE) recommended adopting Kendriya Vidyalayas curriculum and standards for model schools. Under SSK Office Circular (RMSA/ಮಾದರಿ ಶಾಲೆ/02/2010-11 Dt: 24.05.2010), Karnataka Government launched 74 Adarsha Vidyalayas across 74 Educationally Backward Blocks (EBB) in 22 districts.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-2xl border border-gray-200/80">
                    <h4 className="font-extrabold text-primary text-xs uppercase mb-1">Foresight (Vision)</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{abt.foresight || 'Holistic education among students, adopting core ethical and intellectual values.'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-200/80">
                    <h4 className="font-extrabold text-primary text-xs uppercase mb-1">Target Beneficiaries</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{abt.target || 'Providing qualitative English-medium education to talented rural students across EBB blocks.'}</p>
                  </div>
                </div>
              </div>

              {/* 6 Pillars of PM SHRI */}
              {abt.pmShriPillars && (
                <div className="mb-10">
                  <div className="text-center mb-6">
                    <span className="text-xs font-black uppercase text-accent tracking-wider">PM SHRI Roadmap</span>
                    <h3 className="text-xl md:text-2xl font-black text-primary">The 6 Strategic Pillars of PM SHRI</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {abt.pmShriPillars.map((pillar) => (
                      <div key={pillar.num} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-7 h-7 rounded-lg bg-primary text-white font-black text-xs flex items-center justify-center mb-3 shadow-xs">
                          0{pillar.num}
                        </div>
                        <h4 className="font-black text-primary text-sm mb-1.5">{pillar.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-gray-700 space-y-6 text-sm md:text-base leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="border border-blue-100 p-5 rounded-2xl bg-slate-50 shadow-sm">
                    <div className="text-accent mb-2 bg-white p-2 rounded-xl shadow-sm w-fit"><Compass size={22} /></div>
                    <h4 className="font-extrabold text-primary text-sm">Our Vision</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{abt.vision}</p>
                  </div>
                  <div className="border border-blue-100 p-5 rounded-2xl bg-slate-50 shadow-sm">
                    <div className="text-accent mb-2 bg-white p-2 rounded-xl shadow-sm w-fit"><BookOpen size={22} /></div>
                    <h4 className="font-extrabold text-primary text-sm">Our Mission</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{abt.mission}</p>
                  </div>
                  <div className="border border-blue-100 p-5 rounded-2xl bg-slate-50 shadow-sm">
                    <div className="text-accent mb-2 bg-white p-2 rounded-xl shadow-sm w-fit"><HeartHandshake size={22} /></div>
                    <h4 className="font-extrabold text-primary text-sm">Our Core Values</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{abt.values}</p>
                  </div>
                </div>

                {/* Scanned Attractions Quick Access Banner */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-primary text-base flex items-center gap-2">
                      <Landmark size={18} className="text-amber-600" />
                      Explore Sindhanur's Main Attractions
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Discover the history of Ambamatha Ambadevi Temple, Mukhumla Murahari Temple, Roudkunda Fort, and Sindhanur Monuments.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('attractions')}
                    className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-md"
                  >
                    View Main Attractions
                  </button>
                </div>

              </div>

              {/* Leadership Messages - President, Principal, Vice-Principal */}
              <div className="mt-10">
                <AuthorMessages 
                  content={siteContent.authorMessages}
                  isHMLoggedIn={isHMLoggedIn}
                  onOpenEdit={() => handleOpenSectionEditor('authorMessages')}
                />
              </div>

            </div>
          </section>
        );

      case 'high-school':
      default:
        const hs = siteContent.highSchool;
        return (
          <section className="py-12 px-4 bg-white animate-in fade-in duration-200">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 relative">
                <div className="inline-flex items-center gap-1.5 bg-blue-100 text-primary border border-blue-200 px-3.5 py-1 rounded-full text-xs font-black uppercase mb-2">
                  <School size={13} />
                  {hs.badge}
                </div>
                <h2 className="text-3xl font-black text-primary tracking-tight">{hs.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{hs.subtitle}</p>
                <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full"></div>

                {isHMLoggedIn && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => handleOpenSectionEditor('high-school')}
                      className="bg-amber-400 hover:bg-amber-500 text-primary-dark font-black text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 border border-amber-300"
                    >
                      <Edit3 size={14} />
                      <span>ಪ್ರೌಢಶಾಲಾ ಪಠ್ಯಕ್ರಮ ತಿದ್ದಿ (Edit High School)</span>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-slate-50 border border-gray-200 rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
                <h3 className="text-lg font-bold text-primary">Academic Framework & Learning Modules</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{hs.intro}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-extrabold text-primary text-xs uppercase tracking-wider mb-1">{hs.middleStageTitle}</h4>
                    <p className="text-xs text-gray-600">{hs.middleStageDesc}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-extrabold text-primary text-xs uppercase tracking-wider mb-1">{hs.secondaryStageTitle}</h4>
                    <p className="text-xs text-gray-600">{hs.secondaryStageDesc}</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="font-bold text-xs uppercase text-gray-500 mb-2">Key Highlights & Government Orders</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                    {hs.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 6 Prescribed Subjects Matrix */}
                {hs.subjects && (
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <div>
                        <span className="text-xs font-black uppercase text-accent tracking-wider">Dual Curriculum Blueprint</span>
                        <h4 className="text-base font-black text-primary">6 Prescribed Subjects (NCERT + State Syllabus)</h4>
                      </div>
                      <span className="bg-blue-100 text-primary text-[11px] font-bold px-3 py-1 rounded-full border border-blue-200">
                        G.O No: ED 22 MCD 2017
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {hs.subjects.map((subj) => (
                        <div key={subj.num} className="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-sm hover:border-primary/40 transition-colors">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="w-6 h-6 rounded-md bg-primary text-white font-black text-xs flex items-center justify-center">
                              {subj.num}
                            </span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              subj.board === 'NCERT' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}>
                              {subj.board}
                            </span>
                          </div>
                          <h5 className="font-extrabold text-primary text-xs mb-1">{subj.name}</h5>
                          <p className="text-[11px] text-gray-600 leading-snug">{subj.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* Top Banner, Navigation and Floating handles */}
      <div>
        <Header 
          onOpenEnquiry={() => setIsEnquiryOpen(true)} 
          onOpenAdmission={() => setIsAdmissionOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          onScrollToContact={handleScrollToContact}
          onLogoClick={() => setActiveTab('blog')}
          isHMLoggedIn={isHMLoggedIn}
          onOpenHMDashboard={() => setIsHMDashboardOpen(true)}
          onLogoutHM={handleHMLogout}
        />
        
        <Navbar 
          onTabSelect={setActiveTab} 
          activeTab={activeTab} 
          navItems={navItems}
          isHMLoggedIn={isHMLoggedIn}
          onOpenEditNav={() => handleOpenSectionEditor('navbar')}
        />
        
        {/* Continuous Moving Headlines Ticker (Shown on ALL Pages) */}
        <NewsTicker
          headlines={headlines}
          onSelectHeadline={handleSelectHeadline}
          isHMLoggedIn={isHMLoggedIn}
          onEditHeadlines={() => handleOpenSectionEditor('headlines')}
        />
        
        {/* Results Banner & HM Notice Board shows on Blog / Landing page view */}
        {activeTab === 'blog' && (
          <>
            <HeroBanner 
              toppers={toppers}
              isHMLoggedIn={isHMLoggedIn}
              onOpenEditToppers={() => handleOpenSectionEditor('achievements')}
              onNavigateAttractions={() => setActiveTab('attractions')} 
              onNavigateAbout={() => setActiveTab('about')} 
            />
            <HMNoticeBoard 
              posts={hmPosts}
              onPostsChange={setHmPosts}
              isHMLoggedIn={isHMLoggedIn}
              onOpenHMDashboard={() => {
                if (isHMLoggedIn) {
                  setIsHMDashboardOpen(true);
                } else {
                  setIsLoginOpen(true);
                }
              }}
            />
          </>
        )}
      </div>

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        {renderTabContent()}
      </main>

      {/* Highlights / Counters section */}
      <StatsSection />

      {/* Footer & Contacts */}
      <Footer onNavigateTab={setActiveTab} />

      {/* Floating Side Handles */}
      <SocialSidebar />

      {/* HM Floating Toolbar when Logged In */}
      <HMFloatingBar
        isHMLoggedIn={isHMLoggedIn}
        activeTab={activeTab}
        onOpenSectionEditor={handleOpenSectionEditor}
        onOpenHMDashboard={() => setIsHMDashboardOpen(true)}
        onLogout={handleHMLogout}
      />

      {/* HM Universal Content Editor Modal */}
      <HMEditSectionModal
        isOpen={isHMEditorOpen}
        onClose={() => setIsHMEditorOpen(false)}
        targetSection={targetEditSection}
        siteContent={siteContent}
        onSiteContentChange={setSiteContent}
        navItems={navItems}
        onNavItemsChange={setNavItems}
        blogCategories={blogCategories}
        onBlogCategoriesChange={setBlogCategories}
        blogPosts={blogPosts}
        onBlogPostsChange={setBlogPosts}
        toppers={toppers}
        onToppersChange={setToppers}
        galleryItems={galleryItems}
        onGalleryItemsChange={setGalleryItems}
        headlines={headlines}
        onHeadlinesChange={setHeadlines}
      />

      {/* Portal overlays/Modals */}
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
      <AdmissionModal isOpen={isAdmissionOpen} onClose={() => setIsAdmissionOpen(false)} />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleHMLoginSuccess}
      />
      <HMDashboardModal 
        isOpen={isHMDashboardOpen} 
        onClose={() => setIsHMDashboardOpen(false)}
        posts={hmPosts}
        onPostsChange={setHmPosts}
      />

    </div>
  );
}
