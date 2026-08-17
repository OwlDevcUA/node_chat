import express from 'express';
import { roomController } from '../controllers/roomController.js';

export const roomsRouter = new express.Router();

roomsRouter.get('/rooms', roomController.getRooms);
roomsRouter.post('/rooms', roomController.createRoom);
roomsRouter.patch('/rooms/:roomId', roomController.renameRoom);
roomsRouter.delete('/rooms/:roomId', roomController.deleteRoom);
roomsRouter.post('/rooms/:roomId/join', roomController.joinRoom);
