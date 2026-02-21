
// In production (e.g. Netlify), use backend URL; fallback for when VITE_API_URL is not set
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? 'https://abdulsalim.pythonanywhere.com' : '');

async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}


export const api = {
  getProfile: () => request('/api/profile/'),
  getResearch: (page = 1, perPage = 5) => request(`/api/research/?page=${page}&per_page=${perPage}`),
  getPublications: (page = 1, perPage = 5) => request(`/api/publications/?page=${page}&per_page=${perPage}`),
  getProjects: (page = 1, perPage = 5) => request(`/api/projects/?page=${page}&per_page=${perPage}`),
  getAwards: (page = 1, perPage = 5) => request(`/api/awards/?page=${page}&per_page=${perPage}`),
  getCV: () => request('/api/cv/'),
  getGallery: (page = 1, perPage = 12) => request(`/api/gallery/?page=${page}&per_page=${perPage}`),
  getStats: () => request('/api/stats/'),
  sendContact: (body) =>
    request('/api/contact/', { method: 'POST', body: JSON.stringify(body) }),
};
