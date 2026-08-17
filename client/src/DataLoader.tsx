import { useEffect } from "react"
import type { Message } from "./types/Message"

type Props = {
  onData: (message: Message) => void,
  roomId?: string;
}

export const DataLoader: React.FC<Props> = ({ onData, roomId }) => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');

    socket.addEventListener('open', () => {
      if (roomId) {
        socket.send(
          JSON.stringify({
            type: 'JOIN_ROOM',
            roomId: roomId || null,
          })
        )
      }
    });

  socket.addEventListener('message', (event: { data: string }) => {
    onData(JSON.parse(event.data) as Message);
  });

  return () => socket.close();
}, [roomId]);
}
