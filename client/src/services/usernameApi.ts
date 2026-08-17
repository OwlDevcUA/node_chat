import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function sendName( name: string) {
  return api.post('/name', { name });
}

export function getName(name: string) {
  return api.get('/name', { params: name });
}
