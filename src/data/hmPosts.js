import api from '../services/api.js';

// LocalStorage key for HM posts
const STORAGE_KEY = 'pmshree_hm_posts_v1';

// Initial default seed posts from Head Master (HM)
export const initialHMPosts = [
  {
    id: 101,
    type: 'order',
    title: 'ಅಧಿಕೃತ ಆದೇಶ: ಮುಂಬರುವ ವಿಜ್ಞಾನ ಮತ್ತು ಗಣಿತ ಕಾರ್ಯಾಗಾರದ ಪೂರ್ವಸಿದ್ಧತಾ ಸಭೆ',
    date: '2026-09-03',
    tag: 'ಅಧಿಕೃತ ಆದೇಶ',
    content: 'ಶಾಲೆಯ ಎಲ್ಲಾ ಬೋಧಕ ಸಿಬ್ಬಂದಿಯವರಿಗೆ ಸೂಚಿಸುವುದೇನೆಂದರೆ, ನಾಳೆ ಮಧ್ಯಾಹ್ನ 3:30 ಕ್ಕೆ ಮುಖ್ಯಗುರುಗಳ ಕೊಠಡಿಯಲ್ಲಿ ವಿಜ್ಞಾನ ಮತ್ತು ಗಣಿತ ಕಾರ್ಯಾಗಾರದ ಪೂರ್ವಸಿದ್ಧತಾ ಸಭೆಯನ್ನು ಕರೆಯಲಾಗಿದೆ. ಎಲ್ಲರೂ ಕಡ್ಡಾಯವಾಗಿ ಹಾಜರಿರತಕ್ಕದ್ದು.',
    author: 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
    mediaUrl: '',
    videoUrl: '',
    isPinned: true
  },
  {
    id: 102,
    type: 'event',
    title: 'ಇಂದಿನ ಕಾರ್ಯಕ್ರಮ: ವಿಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಂದ ಪ್ರಾಯೋಗಿಕ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ',
    date: '2026-09-03',
    tag: 'ಇಂದಿನ ಕಾರ್ಯಕ್ರಮ',
    content: 'ಇಂದು 9 ಮತ್ತು 10 ನೇ ತರಗತಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಕಾಂಪೋಸಿಟ್ ಸೈನ್ಸ್ ಲ್ಯಾಬ್‌ನಲ್ಲಿ ವಿಶೇಷ ರಸಾಯನಶಾಸ್ತ್ರ ಮತ್ತು ಭೌತಶಾಸ್ತ್ರ ಪ್ರಾಯೋಗಿಕ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ಆಯೋಜಿಸಲಾಗಿದೆ.',
    author: 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
    mediaUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    videoUrl: '',
    isPinned: false
  },
  {
    id: 103,
    type: 'news',
    title: 'ದೈನಂದಿನ ಶಾಲಾ ವಾರ್ತೆ: ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ / 10ನೇ ತರಗತಿ ಪೂರ್ವಸಿದ್ಧತಾ ಪರೀಕ್ಷಾ ವೇಳಾಪಟ್ಟಿ ಪ್ರಕಟ',
    date: '2026-09-02',
    tag: 'ಶಾಲಾ ವಾರ್ತೆ',
    content: '2026-27 ನೇ ಸಾಲಿನ 10 ನೇ ತರಗತಿಯ ಪ್ರಥಮ ಕಿರು ಪರೀಕ್ಷೆಗಳ ವೇಳಾಪಟ್ಟಿಯನ್ನು ನೋಟಿಸ್ ಬೋರ್ಡ್‌ನಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗಿದೆ. ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಪಾಲಕರು ಗಮನಿಸಬೇಕಾಗಿ ಕೋರಿದೆ.',
    author: 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
    mediaUrl: '',
    videoUrl: '',
    isPinned: false
  },
  {
    id: 104,
    type: 'photo',
    title: 'ಶಾಲಾ ಪರಿಸರ ಸಂರಕ್ಷಣೆ ದಿನಾಚರಣೆ ಮತ್ತು ಗಿಡ ನೆಡುವ ಅಭಿಯಾನದ ಛಾಯಾಚಿತ್ರಗಳು',
    date: '2026-09-01',
    tag: 'ಕಾರ್ಯಕ್ರಮದ ಫೋಟೋ',
    content: 'ಪಿ.ಎಂ.ಶ್ರೀ ಆದರ್ಶ ವಿದ್ಯಾಲಯದ ಆವರಣದಲ್ಲಿ ಪರಿಸರ ದಿನಾಚರಣೆಯ ಅಂಗವಾಗಿ ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಶಿಕ್ಷಕರು 50ಕ್ಕೂ ಹೆಚ್ಚು ಹಣ್ಣಿನ ಗಿಡಗಳನ್ನು ನೆಟ್ಟು ಪೋಷಿಸುವ ಸಂಕಲ್ಪ ಮಾಡಿದರು.',
    author: 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
    mediaUrl: '/school-banner.jpg',
    videoUrl: '',
    isPinned: false
  },
  {
    id: 105,
    type: 'video',
    title: 'ವಿಡಿಯೋ: ಶಾಲಾ ವಿದ್ಯಾರ್ಥಿಗಳಿಂದ ಸಿಂಧನೂರಿನ ಐತಿಹಾಸಿಕ ತಾಣಗಳ ಪರಿಚಯ',
    date: '2026-08-28',
    tag: 'ಶಾಲಾ ವೀಡಿಯೊ',
    content: 'ನಮ್ಮ ಶಾಲೆಯ ಹೆರಿಟೇಜ್ ಕ್ಲಬ್ ವಿದ್ಯಾರ್ಥಿಗಳು ಸಿದ್ಧಪಡಿಸಿದ ಸಿಂಧನೂರಿನ ಅಂಬಾದೇವಿ ದೇವಸ್ಥಾನ, ಮುಖುಮ್ಲಾ ಮುರಹರಿ ದೇವಸ್ಥಾನ ಮತ್ತು ರೌಡಕುಂದ ಕೋಟೆಯ ಕಿರು ಸಾಕ್ಷ್ಯಚಿತ್ರ.',
    author: 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
    mediaUrl: '',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isPinned: false
  }
];


// Helper to get all posts from API (falling back to cache/seed defaults)
export function getHMPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}
  return initialHMPosts;
}

// Asynchronous fetcher from backend
export async function fetchHMPostsFromAPI() {
  try {
    const res = await api.notices.getAll();
    if (res.success && Array.isArray(res.data)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
      return res.data;
    }
  } catch (e) {
    console.warn('Using cached HM posts (backend offline or loading):', e.message);
  }
  return getHMPosts();
}

// Helper to save a new post (synced with backend)
export async function addHMPost(newPost) {
  try {
    const res = await api.notices.create(newPost);
    if (res.success && res.data) {
      const current = getHMPosts();
      const updated = [res.data, ...current.filter(p => p.id !== res.data.id)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    }
  } catch (e) {
    console.warn('Failed to sync notice with backend API, updating local cache:', e.message);
  }

  // Local fallback
  const posts = getHMPosts();
  const postWithId = {
    ...newPost,
    id: Date.now(),
    date: newPost.date || new Date().toISOString().split('T')[0],
    author: newPost.author || 'ಮುಖ್ಯಗುರುಗಳು (Head Master)',
  };
  const updated = [postWithId, ...posts];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

// Helper to delete a post (synced with backend)
export async function deleteHMPost(id) {
  try {
    await api.notices.delete(id);
  } catch (e) {
    console.warn('Failed to delete notice from backend API:', e.message);
  }

  const posts = getHMPosts();
  const updated = posts.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

// Helper to check HM auth status (initial flag from session; verified via /api/auth/me)
export function getHMAuthStatus() {
  return localStorage.getItem('pmshree_hm_session') === 'active';
}

export function setHMAuthStatus(status) {
  if (status) {
    localStorage.setItem('pmshree_hm_session', 'active');
  } else {
    localStorage.removeItem('pmshree_hm_session');
    api.auth.logout().catch(() => {});
  }
}

