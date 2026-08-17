import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function getRooms() {
  return api.get('/rooms');
}

export function createRoom( name: string, username: string ) {
  return api.post('/rooms', { name, username })
}

export function renameRoom(roomId: string, name: string) {
  return api.patch(`/rooms/${roomId}`, { name });
}


export function deleteRoom(roomId: string) {
  return api.delete(`/rooms/${roomId}`);
}


export function joinRoom(roomId: string, username: string) {
  return api.post(`/rooms/${roomId}/join`, { username });
}
