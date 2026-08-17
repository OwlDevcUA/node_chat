import { messageService } from '../services/messageService.js';
import EventEmitter from 'node:events';

export const messages = [];

export const messageEmitter = new EventEmitter();

function addMessage(req, res, next) {
  const { username, text } = req.body;

  const message = messageService.addMessage(username, text);

  messageEmitter.emit('message', message);
  res.status(201).json(message);
}

function sendMessageToRoom(req, res, next) {
  const { roomId } = req.params;
  const { username, text } = req.body;

  const message = messageService.addMessage(username, text, roomId);

  messageEmitter.emit('message', message);
  res.status(201).json(message);
}

export const messageController = {
  addMessage,
  sendMessageToRoom,
};
