import express from 'express';
import { profileController } from '../controllers/profileController.js';

export const profileRouter = new express.Router();

profileRouter.get('/name', profileController.getName);
profileRouter.post('/name', profileController.sendName);
