import axios from '../axios';

// Paper Setter API calls
export const paperSetterAPI = {
  getAll: () => axios.get('/paper-setters'),
  getById: (id) => axios.get(`/paper-setters/${id}`),
  getByRegistrationId: (registrationId) => axios.get(`/paper-setters/registration/${registrationId}`),
  create: (data) => axios.post('/paper-setters', data),
  update: (id, data) => axios.put(`/paper-setters/${id}`, data),
  delete: (id) => axios.delete(`/paper-setters/${id}`),
  search: (keyword) => axios.get(`/paper-setters/search?keyword=${encodeURIComponent(keyword)}`),
};

// Subject API calls
export const subjectAPI = {
  getAll: () => axios.get('/subjects'),
  getById: (id) => axios.get(`/subjects/${id}`),
  getByCode: (code) => axios.get(`/subjects/code/${code}`),
  getByCourseId: (courseId) => axios.get(`/subjects/course/${courseId}`),
  create: (data) => axios.post('/subjects', data),
  update: (id, data) => axios.put(`/subjects/${id}`, data),
  delete: (id) => axios.delete(`/subjects/${id}`),
  search: (keyword) => axios.get(`/subjects/search?keyword=${encodeURIComponent(keyword)}`),
  searchByCourse: (courseId, keyword) => axios.get(`/subjects/course/${courseId}/search?keyword=${encodeURIComponent(keyword)}`),
};

// Course API calls
export const courseAPI = {
  getAll: () => axios.get('/courses'),
  getById: (id) => axios.get(`/courses/${id}`),
  getByCode: (code) => axios.get(`/courses/code/${code}`),
  create: (data) => axios.post('/courses', data),
  update: (id, data) => axios.put(`/courses/${id}`, data),
  delete: (id) => axios.delete(`/courses/${id}`),
  search: (keyword) => axios.get(`/courses/search?keyword=${encodeURIComponent(keyword)}`),
};

// Exam API calls
export const examAPI = {
  getAll: () => axios.get('/exams'),
  getById: (id) => axios.get(`/exams/${id}`),
  create: (data) => axios.post('/exams', data),
  update: (id, data) => axios.put(`/exams/${id}`, data),
  delete: (id) => axios.delete(`/exams/${id}`),
  search: (keyword) => axios.get(`/exams/search?keyword=${encodeURIComponent(keyword)}`),
}; 