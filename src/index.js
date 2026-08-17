'use strict';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { messagesRouter } from './routes/messagesRouter.js';
import { profileRouter } from './routes/profileRouter.js';
import { WebSocketServer, WebSocket } from 'ws';
import { messageEmitter } from './controllers/messageController.js';
import { roomsRouter } from './routes/roomsRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(messagesRouter);
app.use(profileRouter);
app.use(roomsRouter);

const server = app.listen(PORT);
const wss = new WebSocketServer({ server });

messageEmitter.on('message', (data) => {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      if (!data.roomId || client.roomId === data.roomId) {
        client.send(JSON.stringify(data));
      }
    }
  }
});

wss.on('connection', (client) => {
  // eslint-disable-next-line no-console
  console.log('A new client connected');

  client.roomId = null;

  client.on('message', (data) => {
    try {
      const parsedData = JSON.parse(data.toString());

      if (parsedData.type === 'JOIN_ROOM') {
        client.roomId = parsedData.roomId;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Plain text message received');
    }
  });
});
