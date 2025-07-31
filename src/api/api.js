import axios from 'axios';
import { BASE_URL } from '../constants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token has expired or is invalid
      localStorage.removeItem('access_token');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export const getFacilities = () => api.get('/facilities/');
export const getServices = () => api.get('/services/');
export const searchPatients = (query) => api.get(`/patients/search/?q=${query}`);
export const createPatient = (data) => api.post('/patients/', data);
export const updatePatient = (id, data) => api.put(`/patients/${id}/`, data);
export const getPatients = (page = 1) => api.get(`/patients/?page=${page}`);
export const deletePatient = (id) => api.delete(`/patients/${id}/`);

