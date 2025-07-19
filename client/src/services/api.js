import axios from 'axios';

// API configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getUsers = async () => {
    const response = await api.get('/users'); 
    return response.data;
};


// Paper Setter API calls
export const paperSetterAPI = {
    getAll: () => api.get('/paper-setters'),
    getById: (id) => api.get(`/paper-setters/${id}`),
    getByRegistrationId: (registrationId) => api.get(`/paper-setters/registration/${registrationId}`),
    create: (data) => api.post('/paper-setters', data),
    update: (id, data) => api.put(`/paper-setters/${id}`, data),
    delete: (id) => api.delete(`/paper-setters/${id}`),
    search: (keyword) => api.get(`/paper-setters/search?keyword=${encodeURIComponent(keyword)}`),
};

// Subject API calls
export const subjectAPI = {
    getAll: () => api.get('/subjects'),
    getById: (id) => api.get(`/subjects/${id}`),
    getByCode: (code) => api.get(`/subjects/code/${code}`),
    getByCourseId: (courseId) => api.get(`/subjects/course/${courseId}`),
    create: (data) => api.post('/subjects', data),
    update: (id, data) => api.put(`/subjects/${id}`, data),
    delete: (id) => api.delete(`/subjects/${id}`),
    search: (keyword) => api.get(`/subjects/search?keyword=${encodeURIComponent(keyword)}`),
    searchByCourse: (courseId, keyword) => api.get(`/subjects/course/${courseId}/search?keyword=${encodeURIComponent(keyword)}`),
};

// Course API calls
export const courseAPI = {
    getAll: () => api.get('/courses'),
    getById: (id) => api.get(`/courses/${id}`),
    getByCode: (code) => api.get(`/courses/code/${code}`),
    create: (data) => api.post('/courses', data),
    update: (id, data) => api.put(`/courses/${id}`, data),
    delete: (id) => api.delete(`/courses/${id}`),
    search: (keyword) => api.get(`/courses/search?keyword=${encodeURIComponent(keyword)}`),
};

export default api;
