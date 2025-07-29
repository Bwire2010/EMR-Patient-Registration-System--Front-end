import axios from 'axios';
import { BASE_URL } from '../constants';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFacilities = () => api.get('/facilities/');
export const getServices = () => api.get('/services/');
export const getPatients = () => api.get('/patients/');
export const searchPatients = (query) => api.get(`/patients/search/?q=${query}`);
export const createPatient = (data) => api.post('/patients/', data);
export const updatePatient = (id, data) => api.put(`/patients/${id}/`, data);