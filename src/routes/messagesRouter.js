import express from 'express';
import { messageController } from '../controllers/messageController.js';

export const messagesRouter = new express.Router();

messagesRouter.post('/chat', messageController.addMessage);
messagesRouter.post('/rooms/:roomId', messageController.sendMessageToRoom);
