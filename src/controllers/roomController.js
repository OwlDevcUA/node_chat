import { roomService } from '../services/roomService.js';

let rooms = [];

function getRooms(req, res, next) {
  res.json(rooms);
}

function createRoom(req, res, next) {
  const { name, username } = req.body;

  if (!name) {
    return res.status(404).json({ message: 'Name not found' });
  }

  const room = roomService.createRoom(name, username);

  rooms.push(room);

  res.status(201).json(room);
}

function renameRoom(req, res, next) {
  const { name } = req.body;
  const { id } = req.params;

  const room = roomService.findById(id);

  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  const updatedRoom = roomService.renameRoom(room, name);

  res.json(updatedRoom);
}

function deleteRoom(req, res, next) {
  const { id } = req.params;

  rooms = roomService.deleteRoom(id, rooms);

  res.json(rooms);
}

function joinRoom(req, res, next) {
  const { username } = req.body;
  const { id } = req.params;

  const room = roomService.joinRoom(id, username, rooms);

  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  res.json(room);
}

export const roomController = {
  getRooms,
  createRoom,
  deleteRoom,
  joinRoom,
  renameRoom,
};
