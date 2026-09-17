const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || (typeof process !== 'undefined' && process.env && process.env.VITE_API_URL) || (isLocalhost ? 'http://localhost:5000/api' : 'https://pm-shree-adarsha-vidyalaya.onrender.com/api');

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
    credentials: 'include', // Send and receive HttpOnly cookies
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const error = new Error(data.message || `Request failed with status ${res.status}`);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    console.warn(`[API] ${options.method || 'GET'} ${endpoint} failed:`, err.message);
    throw err;
  }
}

export const api = {
  // Authentication
  auth: {
    login: (username, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
    logout: () => request('/auth/logout', { method: 'POST' }),
    getMe: () => request('/auth/me'),
  },

  // Blog Posts
  posts: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/posts${query ? `?${query}` : ''}`);
    },
    getOne: (slugOrId) => request(`/posts/${slugOrId}`),
    create: (postData) => request('/posts', { method: 'POST', body: JSON.stringify(postData) }),
    update: (id, postData) => request(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(postData) }),
    delete: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
  },

  // Notices (HM Posts)
  notices: {
    getAll: (type = 'all') => request(`/notices${type && type !== 'all' ? `?type=${type}` : ''}`),
    create: (noticeData) => request('/notices', { method: 'POST', body: JSON.stringify(noticeData) }),
    delete: (id) => request(`/notices/${id}`, { method: 'DELETE' }),
  },

  // Achievements (SSLC Toppers)
  achievements: {
    getAll: () => request('/achievements'),
    create: (data) => request('/achievements', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/achievements/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/achievements/${id}`, { method: 'DELETE' }),
  },

  // Gallery
  gallery: {
    getAll: (category) => request(`/gallery${category && category !== 'All' ? `?category=${category}` : ''}`),
    create: (itemData) => request('/gallery', { method: 'POST', body: JSON.stringify(itemData) }),
    delete: (id) => request(`/gallery/${id}`, { method: 'DELETE' }),
  },

  // Settings
  settings: {
    getAll: () => request('/settings'),
    get: (key) => request(`/settings/${key}`),
    update: (key, value) => request(`/settings/${key}`, { method: 'PUT', body: JSON.stringify(value) }),
  },

  // Admissions & Enquiries
  forms: {
    submitAdmission: (data) => request('/admissions', { method: 'POST', body: JSON.stringify(data) }),
    submitEnquiry: (data) => request('/enquiries', { method: 'POST', body: JSON.stringify(data) }),
  },

  // Media File Upload
  media: {
    upload: async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_BASE}/media/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'File upload failed');
      }
      return data;
    },
  },
};

export default api;
