const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  forgotPassword: async (email: string) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, password: string) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    return apiRequest('/users/profile');
  },

  getAllUsers: async () => {
    return apiRequest('/users');
  },

  getUserById: async (id: string) => {
    return apiRequest(`/users/${id}`);
  },
};

// Project API
export const projectAPI = {
  // Create or update project data
  saveProject: async (data: any) => {
    console.log('Saving project data:', data);
    console.log('project id:', data.id); 
    // Backend supports POST /project/save for both create and update
    const url = '/project/save'; 
    const method = 'POST';
    
    return apiRequest(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  },

  // Get project by ID
  getProject: async (projectId: string) => {
    return apiRequest(`/project/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  },

  // Complete project setup
  completeProject: async (projectId: string, data: any) => {
    return apiRequest(`/project/${projectId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  },

  // List user's projects
  listProjects: async () => {
    // NOTE: Backend does not expose GET /project (list) yet
    // This will 404 until the API is implemented
    return apiRequest('/project', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  },
};

// Content API
export const contentAPI = {
  getAllContent: async () => {
    return apiRequest('/content');
  },

  getContentById: async (id: string) => {
    return apiRequest(`/content/${id}`);
  },

  createContent: async (contentData: { projectId: string; type: string; content: string; metadata?: any }) => {
    return apiRequest('/content', {
      method: 'POST',
      body: JSON.stringify(contentData),
    });
  },
};

// AI API
export const aiAPI = {
  getProcessingStatus: async () => {
    return apiRequest('/ai');
  },

  submitProcessingJob: async (jobData: { projectId: string; jobType: string; data: any }) => {
    return apiRequest('/ai/process', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  getJobStatus: async (id: string) => {
    return apiRequest(`/ai/${id}`);
  },
};

// RSS API
export const rssAPI = {
  fetchEpisodes: async (url: string) => {
    const encoded = encodeURIComponent(url);
    return apiRequest(`/rss/episodes?url=${encoded}`);
  },
};

// Uploads API
export const uploadsAPI = {
  saveRssEpisodes: async (payload: { projectId: string; episodes: Array<{ id: string; title: string; link?: string | null; duration?: string | null; pubDate?: string | null }> }) => {
    return apiRequest('/uploads/rss', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  },
  presign: async (payload: { filename: string; contentType: string; projectId: string }) => {
    return apiRequest('/uploads/presign', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  },
  saveUploadedFiles: async (payload: { projectId: string; files: Array<{ filename: string; url: string; size: number; contentType: string }> }) => {
    return apiRequest('/uploads/files', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  },
};

export default {
  auth: authAPI,
  users: usersAPI,
  project: projectAPI,
  content: contentAPI,
  ai: aiAPI,
  rss: rssAPI,
  uploads: uploadsAPI,
};
