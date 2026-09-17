import { blogPosts as initialBlogPosts } from './blogPosts.js';
import { academicToppers as initialToppers } from './achievements.js';
import api from '../services/api.js';

const CONTENT_STORAGE_KEY = 'pmshree_site_content_v3';
const BLOG_STORAGE_KEY = 'pmshree_blog_posts_v3';
const TOPPERS_STORAGE_KEY = 'pmshree_toppers_v2';
const GALLERY_STORAGE_KEY = 'pmshree_gallery_v2';
const NAV_STORAGE_KEY = 'pmshree_nav_items_v2';
const CATEGORIES_STORAGE_KEY = 'pmshree_blog_categories_v3';

export const defaultNavItems = [
  { id: 'about', label: 'ABOUT US' },
  { id: 'attractions', label: 'MAIN ATTRACTIONS', icon: true },
  { id: 'high-school', label: 'HIGH SCHOOL' },
  { id: 'facilities', label: 'FACILITIES' },
  { id: 'uniforms', label: 'UNIFORMS' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'achievements', label: 'ACHIEVEMENTS' },
  { id: 'blog', label: 'BLOG & NEWS' },
];

export const defaultBlogCategories = [
  { id: 'Latest', label: 'Latest' },
  { id: 'PM SHRI Scheme', label: 'PM SHRI Scheme' },
  { id: 'Adarsha Vidyalayas', label: 'Adarsha Vidyalayas' },
  { id: 'Heritage & Attractions', label: 'Heritage & Attractions' },
  { id: 'Events Calendar', label: 'Events' },
  { id: 'Achievements', label: 'Achievements' },
  { id: 'Student & Parent Guide', label: 'Student & Parent Guide' },
  { id: 'Staff Corner', label: 'Staff Corner' },
  { id: 'Authors', label: 'Authors' },
];

export const defaultSiteContent = {
  about: {
    kannadaTitle: "ಪಿ.ಎಂ.ಶ್ರೀ ಆದರ್ಶ ವಿದ್ಯಾಲಯ ಸಿಂಧನೂರು",
    title: "PMSHRI ADARSHA VIDYALAYA SINDHANUR",
    subtitle: "A Flagship Model School for Comprehensive Excellence & Cultural Heritage",
    dise: "DISE: 29060902804",
    phone: "+91 85352 20101",
    email: "contact@pmshreeadarshasindhanur.org",
    location: "Sindhanur, Dist: Raichur, Karnataka",
    bannerImage: "/school-banner.jpg",
    history: "PM SHREE ADARSHA VIDYALAYA was established following the landmark June 2005 Central Advisory Board of Education (CABE) report on Universalization of Secondary Education and Planning Commission guidelines, adopting the proven curriculum and teacher-student norms of Kendriya Vidyalayas. Under SSK Circular (RMSA/ಮಾದರಿ ಶಾಲೆ/02/2010-11 Dt: 24.05.2010), Karnataka launched 74 Adarsha Vidyalayas across 74 EBB (Educationally Backward Block) blocks in 22 districts with dedicated buildings. In 2025-26, our school was selected under the centrally sponsored PM SHRI scheme (Challenge Method) among 585 Karnataka schools to serve as a 21st-century mentor and model school.",
    pmShriKeyNoteEn: "Our Adarsha Vidyalaya Model School has been integrated under the PM SHRI scheme since the academic year 2025-26. By utilizing this project effectively, our students are paving the way forward and excelling in the field of education.",
    pmShriKeyNoteKn: "ನಮ್ಮ ಆದರ್ಶ ವಿದ್ಯಾಲಯ ಮಾದರಿ ಶಾಲೆಯು 2025-26ನೇ ಸಾಲಿನಿಂದ ಪಿ.ಎಂ.ಶ್ರೀ ಯೋಜನೆಯಡಿ ತನ್ನನ್ನು ತೊಡಗಿಸಿಕೊಂಡು ಯೋಜನೆಯನ್ನು ನಮ್ಮ ಶಾಲೆಯ ಮಕ್ಕಳು ಸದುಪಯೋಗಪಡಿಸಿಕೊಳ್ಳುತ್ತಾ ಶಿಕ್ಷಣ ಕ್ಷೇತ್ರದಲ್ಲಿ ಮುನ್ನುಗ್ಗುತ್ತಿದ್ದೇವೆ.",
    foresight: "HOLISTIC EDUCATION among the students, imparting education so that the school as a learning centre adequately adopts basic values and aims by achieving educational aspects.",
    target: "To provide qualitative education in schools by identifying talented rural students and imparting quality English-medium education to them. Each EBB block has one Adarsha Vidyalaya.",
    objectives: [
      "Opening of one good quality Adarsha Vidyalaya Secondary Education School in each EBB block.",
      "Providing a positive, disciplined, and nurturing educational environment.",
      "Pursuing new innovative curriculum and innovation through creative pedagogy.",
      "Ensuring quality infrastructure, curriculum, assessment, school environment, and robust governance."
    ],
    salientFeatures: [
      "Holistic development: academically, physically, emotionally, and aesthetically.",
      "Comprehensive infrastructure for teaching, sports, recreation, and outdoor activities (playgrounds, gardens, auditorium).",
      "Technology implementation with special emphasis on Science, Mathematics, and English.",
      "Quality library management with rich resources for students and teachers.",
      "Medium of instruction is English.",
      "Integrated Education quality activities updated regularly.",
      "Approved by KSEEB / KSEAB as per CBSE syllabus standards.",
      "Selection through competitive entrance exam for block students.",
      "Teachers recruited by Education Department of Karnataka Government.",
      "Curriculum reflects local environment, culture, and NCF 2005 principles.",
      "Activity-based learning with professional and music education."
    ],
    pmShriPillars: [
      {
        num: 1,
        title: "Curriculum, Pedagogy, and Assessment",
        desc: "Dynamic curriculum enrichment, experiential pedagogy, Bal-Vatika (ECCE), LEP/Remedial teaching, Competency-Based Assessment, Holistic Progress Cards, and Rashtriya Avishkar Abhiyan."
      },
      {
        num: 2,
        title: "Infrastructure Adequacy, Aesthetics & Safety",
        desc: "Strengthening existing buildings, Green School initiatives, Digital Libraries, ICT smart classrooms, fire safety equipment, and barrier-free access for CWSN."
      },
      {
        num: 3,
        title: "Inclusive Practices & Gender Equity",
        desc: "Equitable learning opportunities for all backgrounds, special education for CWSN, self-defence training for girls, and dedicated career guidance and counseling."
      },
      {
        num: 4,
        title: "Management Monitoring & Governance",
        desc: "Effective governance, transparency, child tracking systems, and school audits under the School Quality Assessment Framework (SQAF)."
      },
      {
        num: 5,
        title: "Beneficiary Satisfaction",
        desc: "Active feedback surveys, focus groups, and meaningful community and parental engagement through the SDMC."
      },
      {
        num: 6,
        title: "Human Resource & School Leadership",
        desc: "Continuous teacher professional development and head teacher leadership training through District Institutes of Education and Training (DIETs)."
      }
    ],
    mission: "To groom students into compassionate, intellectually competent, and responsible citizens equipped with mathematical aptitude, scientific temperament, and deep cultural roots.",
    vision: "To become a benchmark of educational innovation where modern STEM curriculum harmoniously integrates with regional heritage and community values.",
    values: "Integrity, academic excellence, mutual respect, environmental stewardship, and continuous celebration of our regional heritage.",
    courtesy: "Samagra Shikshana Karnataka (https://ssk.karnataka.gov.in)"
  },
  facilities: {
    title: "Vidyalaya Facilities & PM SHRI Smart Campus",
    subtitle: "State-of-the-art infrastructure designed to foster academic excellence, 21st-century skills, and scientific temper",
    bannerTitle: "Modern Multi-Storey Vidyalaya Building & Playgrounds",
    bannerDesc: "Equipped with advanced digital classrooms, composite labs, sports grounds, and surrounded by scenic greenery in Sindhanur.",
    bannerImage: "/school-banner.jpg",
    items: [
      {
        id: 1,
        title: "Composite Science & Robotics Lab",
        desc: "Equipped with modern physics, chemistry, biology apparatus, and Science & Math kits for hands-on inquiry under Rashtriya Avishkar Abhiyan."
      },
      {
        id: 2,
        title: "Smart Digital Classrooms & ICT",
        desc: "Interactive flat touch panels and visual multimedia teaching aids with high-speed internet-enabled computing nodes for advanced digital pedagogy."
      },
      {
        id: 3,
        title: "Central & Digital Library",
        desc: "Over 3,000 curriculum and reference titles in Kannada, English, Hindi, plus digital e-learning portals and quiet study zones supported by annual library grants."
      },
      {
        id: 4,
        title: "Vocational & Skill-Based Labs",
        desc: "Skill training, bag-less days, hands-on learning with local artisans, and linkages with Sector Skill Councils for entrepreneurship."
      },
      {
        id: 5,
        title: "Sports Grounds & Multi-Purpose Auditorium",
        desc: "Spacious sports grounds for volleyball, kabaddi, athletics, indoor chess, and table tennis, supported by annual sports grants and school auditorium."
      },
      {
        id: 6,
        title: "Inclusive Campus & Green School",
        desc: "Eco-friendly green campus with barrier-free ramps for Children with Special Needs (CWSN), safe environment for girls, and RO purified drinking water."
      }
    ]
  },
  highSchool: {
    badge: "Dual Curriculum: NCERT + Karnataka State (KSEAB Approved)",
    title: "High School Department (Classes 6 - 10)",
    subtitle: "NCERT syllabus under G.O ED 22 MCD 2017 with KSEAB Board Examinations",
    intro: "Adarsha Vidyalayas follow the NCERT syllabus from 6th to 10th standard pursuant to G.O No: ED 22 MCD 2017 Bangalore (05.04.2017). Annual board examinations are conducted by the Karnataka School Examination and Assessment Board (KSEAB / formerly KSEEB) from the academic year 2018-19. Selection of students is strictly merit-based through a block-level competitive entrance examination, with faculty recruited by the Education Department of Karnataka Government.",
    middleStageTitle: "Middle Stage (Class 6 - 8)",
    middleStageDesc: "NCERT foundation in English, Mathematics, General Science, with State Kannada, Hindi, and Activity-Based Learning.",
    secondaryStageTitle: "Secondary Stage (Class 9 - 10)",
    secondaryStageDesc: "Rigorous KSEAB/CBSE preparation, Science laboratory practicals, Rashtriya Avishkar Abhiyan projects, and competency-based assessments.",
    subjects: [
      { num: 1, name: "First Language – English", board: "NCERT", desc: "Advanced English language, literature, comprehension, and communicative fluency." },
      { num: 2, name: "Second Language – Kannada", board: "State", desc: "Preserving Kannada linguistic heritage, regional culture, and classical literature." },
      { num: 3, name: "Third Language – Hindi", board: "NCERT", desc: "National language proficiency and trilingual national integration." },
      { num: 4, name: "Mathematics", board: "NCERT", desc: "Conceptual problem-solving, arithmetic, algebra, geometry, and data analytics." },
      { num: 5, name: "General Science", board: "NCERT", desc: "Integrated Physics, Chemistry, and Biology supported by hands-on composite laboratory experiments." },
      { num: 6, name: "Social Science", board: "State", desc: "History, Geography, Civics, and Economics with a rich focus on Karnataka and national history." }
    ],
    points: [
      "NCERT Syllabus from 6th to 10th under G.O No: ED 22 MCD 2017 BANGALORE (Dtd: 05.04.2017)",
      "Board Examinations conducted by KSEEB / KSEAB Board from 2018-19",
      "English medium of instruction across all secondary grades",
      "Selection through block-level competitive entrance examination for talented rural students",
      "Faculty recruited directly by Education Department of Karnataka Government",
      "Activity-based learning aligned with National Curriculum Framework (NCF 2005)",
      "Continuous Competency-Based Assessment and Holistic Progress Cards (HPC)",
      "Official Courtesy: Samagra Shikshana Karnataka (https://ssk.karnataka.gov.in)"
    ]
  },
  uniforms: {
    title: "Prescribed School Uniform",
    subtitle: "Uniform specifications and guidelines for all sections at PM Shree Adarsha Vidyalaya",
    prePrimaryTitle: "Pre-Primary (LKG & UKG)",
    prePrimaryDesc: "Comfort and ease of movement-oriented wear.",
    prePrimaryBoys: "Red checked shirts with navy blue shorts & suspenders.",
    prePrimaryGirls: "Red checked shirts with navy blue pinafore dress.",
    prePrimaryFootwear: "Black Velcro strap shoes and blue socks.",
    prePrimaryNote: "Wednesday: White Tracksuit",
    primaryTitle: "Primary (Class 1 to 7)",
    primaryDesc: "Smart and formal aesthetic.",
    primaryBoys: "Sky blue shirts (half sleeves) with navy blue shorts/trousers, school tie and belt.",
    primaryGirls: "Sky blue shirts with navy blue pleated skirts (knee length), school tie and belt.",
    primaryFootwear: "Black leather shoes with navy blue socks.",
    primaryNote: "Wednesday: White house T-shirt with white trousers/skirt",
    highSchoolTitle: "High School (Class 8 to 10)",
    highSchoolDesc: "Senior formal uniforms cultivating pride and discipline.",
    highSchoolBoys: "Pink striped formal shirts with navy blue trousers, formal tie, and school blazer for functions.",
    highSchoolGirls: "Pink striped shirts with navy blue waistcoats, pleated skirts/salwar kameez, and school necktie.",
    highSchoolFootwear: "Standard black formal polished shoes with navy socks.",
    highSchoolNote: "Wednesday & Saturday: Full White Uniform / Sports Tracksuit"
  },
  authorMessages: {
    sectionTitle: "Author's Message & Leadership",
    sectionSubtitle: "Inspiring words and educational vision from our leaders and mentors",
    cards: [
      {
        id: 'president',
        title: "President's Message",
        name: "Dr. K. C. Sabitha Ramamurthy",
        role: "President",
        image: "/authors/president.jpg",
        excerpt: "Today, CMR Group of Institutions consists of 19 institutions in India and abroad, 69 different academic programmes, and over 900 faculty members...",
        fullMessage: "Today, CMR Group of Institutions consists of 19 institutions in India and abroad, 69 different academic programmes, and over 900 faculty members.\n\nEducation is the manifestation of the perfection already in man. Our vision has always been to nurture young minds with holistic values, intellectual depth, and compassionate leadership. We believe in providing an environment where every learner can discover their unique potential, excel academically, and contribute meaningfully to society.\n\nThrough modern infrastructure, dedicated faculty, and innovative learning paradigms, we empower our students to lead the future with confidence and integrity."
      },
      {
        id: 'principal',
        title: "Principal's Message",
        name: "Dr. Sanjay Jain",
        role: "Principal",
        image: "/authors/principal.jpg",
        excerpt: "Learning is 'fun' at CMRIT, as students and faculty members get together to make a difference through persevering and achieving intellectual satisfaction...",
        fullMessage: "Learning is 'fun' at CMRIT, as students and faculty members get together to make a difference through persevering and achieving intellectual satisfaction.\n\nOur educational framework emphasizes experiential learning, critical thinking, and technological innovation. We encourage students to question, explore, and innovate beyond textbooks.\n\nWith rigorous academic programs, cutting-edge laboratory facilities, and active student mentorship, we guide every student towards achieving both academic distinction and personal excellence."
      },
      {
        id: 'vice-principal',
        title: "Vice-Principal's Message",
        name: "Dr. B Narasimha Murthy",
        role: "Vice-Principal",
        image: "/authors/vice-principal.jpg",
        excerpt: "CMR Institute of Technology (CMRIT), established in the year 2000 with a vision to be a globally recognized institution to provide high-quality technical...",
        fullMessage: "CMR Institute of Technology (CMRIT), established in the year 2000 with a vision to be a globally recognized institution to provide high-quality technical education.\n\nWe are committed to academic discipline, student-centric pedagogy, and continuous curriculum enrichment. Our co-curricular initiatives, skill development workshops, and ethical training ensure that our graduates emerge as well-rounded leaders ready to take on global challenges.\n\nWe warmly welcome parents and students to join hands with us in this inspiring journey of knowledge and character building."
      }
    ]
  }
};

export const defaultGalleryItems = [
  {
    id: 1,
    title: "Adarsha Vidyalaya Campus & Entrance Banner",
    category: "Campus",
    tag: "Main Campus",
    img: "/school-banner.jpg",
    description: "Our modern school building with state emblem, PM SHRI designation, and regional heritage landmarks."
  },
  {
    id: 2,
    title: "PMSHRI Adarsha Vidyalaya Official Crest & Emblem",
    category: "Campus",
    tag: "Official Logo",
    img: "/school-logo.jpg",
    description: "Official round emblem signifying knowledge, aspiration, and educational excellence in Sindhanur, Raichur."
  },
  {
    id: 3,
    title: "Shri Ambadevi Temple, Ambamatha (17th C.E)",
    category: "Attractions & Heritage",
    tag: "17th C.E Landmark",
    img: "/ambadevi-temple.jpg",
    description: "Revered 17th-century spiritual site and annual Rathotsava center near Sindhanur."
  },
  {
    id: 4,
    title: "Shri Murahari Temple, Mukhumla (10th-12th C.E)",
    category: "Attractions & Heritage",
    tag: "Ancient Chalukya",
    img: "/murahari-temple.jpg",
    description: "10th-12th Century Kalyana Chalukya monolithic stone temple and epigraph site visited by student heritage clubs."
  },
  {
    id: 5,
    title: "Roudkunda Fort & Megalithic Site (10th-12th C.E)",
    category: "Attractions & Heritage",
    tag: "Historic Fort",
    img: "/roudkunda-fort.jpg",
    description: "Medieval hilltop fortress and megalithic archaeological site in Sindhanur taluk."
  },
  {
    id: 6,
    title: "Sindhanur Historic Monument & Dargah",
    category: "Attractions & Heritage",
    tag: "Local Heritage",
    img: "/sindhanur-monument.jpg",
    description: "Timeless symbol of composite culture and communal harmony in the heart of Sindhanur."
  },
  {
    id: 7,
    title: "Composite Science & Chemistry Lab",
    category: "Labs",
    tag: "Practical Learning",
    img: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=600",
    description: "Equipped with physics, chemistry, and biology apparatus for hands-on experimentation."
  },
  {
    id: 8,
    title: "Smart Digital Classroom Interaction",
    category: "Academics",
    tag: "Smart Learning",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
    description: "Interactive visual learning and multimedia curriculum delivery."
  },
  {
    id: 9,
    title: "Volleyball & Sports Champions",
    category: "Sports",
    tag: "State Level",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600",
    description: "Students representing the school at state-level sports and athletic meets."
  }
];

// Asynchronous API Fetchers
export async function fetchSiteContentFromAPI() {
  try {
    const res = await api.settings.getAll();
    if (res.success && res.data) {
      const merged = {
        ...defaultSiteContent,
        about: res.data.about || defaultSiteContent.about,
        facilities: res.data.facilities || defaultSiteContent.facilities,
        highSchool: res.data.highSchool || defaultSiteContent.highSchool,
        uniforms: res.data.uniforms || defaultSiteContent.uniforms,
        authorMessages: res.data.authorMessages || defaultSiteContent.authorMessages,
      };
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (e) {
    console.warn('Backend API offline or loading; using local cache for site content');
  }
  return getSiteContent();
}

export async function fetchBlogPostsFromAPI() {
  try {
    const res = await api.posts.getAll();
    if (res.success && Array.isArray(res.data)) {
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.warn('Backend API offline or loading; using local cache for blog posts');
  }
  return getBlogPostsData();
}

export async function fetchToppersFromAPI() {
  try {
    const res = await api.achievements.getAll();
    if (res.success && Array.isArray(res.data)) {
      localStorage.setItem(TOPPERS_STORAGE_KEY, JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.warn('Backend API offline or loading; using local cache for toppers');
  }
  return getToppersData();
}

export async function fetchGalleryFromAPI() {
  try {
    const res = await api.gallery.getAll();
    if (res.success && Array.isArray(res.data)) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.warn('Backend API offline or loading; using local cache for gallery');
  }
  return getGalleryData();
}

export async function fetchHeadlinesFromAPI() {
  try {
    const res = await api.settings.get('headlines');
    if (res.success && Array.isArray(res.data)) {
      localStorage.setItem(HEADLINES_STORAGE_KEY, JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.warn('Backend API offline or loading; using local cache for headlines');
  }
  return getHeadlinesData();
}

// Helper to get Site Content
export function getSiteContent() {
  try {
    const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { 
        ...defaultSiteContent, 
        ...parsed,
        authorMessages: parsed.authorMessages || defaultSiteContent.authorMessages
      };
    }
  } catch (e) {}
  return defaultSiteContent;
}

export function saveSiteContent(newContent) {
  try {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newContent));
    // Asynchronously sync sections to backend API settings
    if (newContent.about) api.settings.update('about', newContent.about).catch(() => {});
    if (newContent.facilities) api.settings.update('facilities', newContent.facilities).catch(() => {});
    if (newContent.highSchool) api.settings.update('highSchool', newContent.highSchool).catch(() => {});
    if (newContent.uniforms) api.settings.update('uniforms', newContent.uniforms).catch(() => {});
    if (newContent.authorMessages) api.settings.update('authorMessages', newContent.authorMessages).catch(() => {});
  } catch (e) {}
  return newContent;
}

// Nav items
export function getNavItems() {
  try {
    const saved = localStorage.getItem(NAV_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return defaultNavItems;
}

export function saveNavItems(items) {
  try {
    localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {}
  return items;
}

// Blog categories
export function getBlogCategories() {
  try {
    const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure newly introduced categories are present
      const existingIds = new Set(parsed.map(c => c.id));
      const missing = defaultBlogCategories.filter(c => !existingIds.has(c.id));
      if (missing.length > 0) {
        const merged = [...parsed, ...missing];
        localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
  } catch (e) {}
  return defaultBlogCategories;
}

export function saveBlogCategories(categories) {
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  } catch (e) {}
  return categories;
}

// Blog Posts CRUD with automatic merge of newly scanned posts
export function getBlogPostsData() {
  try {
    const saved = localStorage.getItem(BLOG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const existingIds = new Set(parsed.map(p => p.id));
        const missing = initialBlogPosts.filter(p => !existingIds.has(p.id));
        if (missing.length > 0) {
          const merged = [...missing, ...parsed];
          localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
    }
  } catch (e) {}
  return initialBlogPosts;
}

export function saveBlogPostsData(posts) {
  try {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {}
  return posts;
}

export function addBlogPostData(post) {
  const posts = getBlogPostsData();
  const newPost = {
    ...post,
    id: Date.now(),
    date: post.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: post.author || 'ಮುಖ್ಯಗುರುಗಳು (Principal / HM)',
    readTime: post.readTime || '4 min read',
    image: post.image || '/school-banner.jpg'
  };
  const updated = [newPost, ...posts];
  saveBlogPostsData(updated);
  return updated;
}

export function updateBlogPostData(updatedPost) {
  const posts = getBlogPostsData();
  const updated = posts.map(p => p.id === updatedPost.id ? { ...p, ...updatedPost } : p);
  saveBlogPostsData(updated);
  return updated;
}

export function deleteBlogPostData(id) {
  const posts = getBlogPostsData();
  const updated = posts.filter(p => p.id !== id);
  saveBlogPostsData(updated);
  return updated;
}

// Toppers CRUD
export function getToppersData() {
  try {
    const saved = localStorage.getItem(TOPPERS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return initialToppers;
}

export function saveToppersData(toppers) {
  try {
    localStorage.setItem(TOPPERS_STORAGE_KEY, JSON.stringify(toppers));
  } catch (e) {}
  return toppers;
}

export function updateTopperData(updatedTopper) {
  const toppers = getToppersData();
  const updated = toppers.map(t => t.id === updatedTopper.id ? { ...t, ...updatedTopper } : t);
  saveToppersData(updated);
  return updated;
}

export function addTopperData(newTopper) {
  const toppers = getToppersData();
  const topperWithId = {
    ...newTopper,
    id: Date.now(),
    score: newTopper.score || '600/625',
    percentage: newTopper.percentage || '96.00%',
    rank: newTopper.rank || `RANK ${toppers.length + 1}`,
    photo: newTopper.photo || '/students/student-1.jpg',
    avatar: newTopper.photo || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'
  };
  const updated = [...toppers, topperWithId];
  saveToppersData(updated);
  return updated;
}

export function deleteTopperData(id) {
  const toppers = getToppersData();
  const updated = toppers.filter(t => t.id !== id);
  saveToppersData(updated);
  return updated;
}

// Gallery CRUD
export function getGalleryData() {
  try {
    const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return defaultGalleryItems;
}

export function saveGalleryData(items) {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {}
  return items;
}

export function addGalleryItemData(item) {
  const items = getGalleryData();
  const newItem = {
    ...item,
    id: Date.now(),
    category: item.category || 'Events',
    tag: item.tag || 'School Event'
  };
  const updated = [newItem, ...items];
  saveGalleryData(updated);
  return updated;
}

export function deleteGalleryItemData(id) {
  const items = getGalleryData();
  const updated = items.filter(item => item.id !== id);
  saveGalleryData(updated);
  return updated;
}

const HEADLINES_STORAGE_KEY = 'pmshree_headlines_v2';

export const defaultHeadlines = [
  {
    id: 1,
    tag: "PM SHRI",
    text: "PM SHRI Integration (2025-26): Adarsha Vidyalaya selected as National Model School among 585 Karnataka institutions!",
    targetTab: "blog",
    articleId: 101,
    isNew: true
  },
  {
    id: 2,
    tag: "ಅಧಿಕೃತ ಸಂದೇಶ",
    text: "ನಮ್ಮ ಆದರ್ಶ ವಿದ್ಯಾಲಯ ಮಾದರಿ ಶಾಲೆಯು 2025-26ನೇ ಸಾಲಿನಿಂದ ಪಿ.ಎಂ.ಶ್ರೀ ಯೋಜನೆಯಡಿ ತೊಡಗಿಸಿಕೊಂಡು ಮುನ್ನುಗ್ಗುತ್ತಿದ್ದೇವೆ!",
    targetTab: "about",
    isNew: true
  },
  {
    id: 3,
    tag: "Adarsha Vidyalayas",
    text: "CABE 2005 & Planning Commission: Bringing Kendriya Vidyalaya norms to 74 EBB blocks across Karnataka.",
    targetTab: "blog",
    articleId: 102
  },
  {
    id: 4,
    tag: "Curriculum",
    text: "Dual Curriculum Blueprint: 6 Prescribed Subjects (NCERT + State) under G.O ED 22 MCD 2017 with KSEAB Board Exams.",
    targetTab: "high-school",
    articleId: 103
  },
  {
    id: 5,
    tag: "6 Pillars",
    text: "PM SHRI 6 Strategic Pillars: Bal-Vatika, Green Schools, CWSN Inclusive Infrastructure, and DIET Teacher Training.",
    targetTab: "blog",
    articleId: 104
  },
  {
    id: 6,
    tag: "Toppers",
    text: "SSLC Board Results 2026: 100% First-Class Pass record achieved with State & District Academic Ranks!",
    targetTab: "achievements"
  },
  {
    id: 7,
    tag: "Admissions",
    text: "Admissions Notice: Selection of students through Block-Level Competitive Entrance Examination.",
    targetTab: "about"
  },
  {
    id: 8,
    tag: "Heritage",
    text: "Living Heritage: Educational expeditions to Ambamatha Ambadevi Temple (17th C.E) & Roudkunda Fort.",
    targetTab: "attractions"
  }
];

export function getHeadlinesData() {
  try {
    const saved = localStorage.getItem(HEADLINES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return defaultHeadlines;
}

export function saveHeadlinesData(headlines) {
  try {
    localStorage.setItem(HEADLINES_STORAGE_KEY, JSON.stringify(headlines));
  } catch (e) {}
  return headlines;
}
