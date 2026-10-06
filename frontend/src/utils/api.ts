import axios from 'axios';

const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const API_BASE_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchDashboard = async () => {
  const res = await api.get('/dashboard');
  return res.data;
};

export const fetchActivities = async () => {
  const res = await api.get('/activities');
  return res.data;
};

export const createActivity = async (data: any) => {
  const res = await api.post('/activities', data);
  return res.data;
};

export const calculateImpact = async (data: any) => {
  const res = await api.post('/calculate', data);
  return res.data;
};

export const deleteActivity = async (id: number) => {
  const res = await api.delete(`/activities/${id}`);
  return res.data;
};
