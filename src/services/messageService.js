import { messages } from '../controllers/messageController.js';

function normalize({ username, time, text }) {
  return { username, time, text };
}

function addMessage(username, text, roomId) {
  const message = {
    username: username,
    time: new Date().toISOString(),
    id: crypto.randomUUID(),
    text: text,
    ...(roomId && { roomId }),
  };

  messages.push(message);

  return message;
}

export const messageService = {
  normalize,
  addMessage,
};
