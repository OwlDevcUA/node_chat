import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function sendMessage(text: string, username: string, roomId?: string) {
  if (roomId) {
    return api.post(`/rooms/${roomId}`, { username, text });
  }

  return api.post('/chat', { username, text });
}
