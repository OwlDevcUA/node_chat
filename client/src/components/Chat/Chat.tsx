  import { useState } from "react";
  import type { Message } from "../../types/Message";
  import { UsernameFrom } from "../UsernameForm";
  import { DataLoader } from "../../DataLoader";
  import { MessageForm } from "../MessageForm";
  import { MessageList } from "../MessageList";
  import { useParams } from "react-router-dom";
import { RoomList } from "../RoomList";
import type { Room } from "../../types/Room";
import { CreateRoomForm } from "../CreateRoomForm/CreateRoomForm";

  export const Chat = () => {
    const { roomId } = useParams()

    const [messgaes, setMeassages] = useState<Message[]>([])
    const [rooms, setRooms] = useState<Room[]>([]);
    const [username, setUsername] = useState<string | null>(() => {
      return localStorage.getItem('chat_username');
    });
    const [createRoomIsOpen, setCreateRoomIsOpen] = useState(false);

      const saveData = (message: Message) => {
        setMeassages(messages => [message, ...messages]);
      }

      return (
        <div className="content">
          {!username && <UsernameFrom onSet={setUsername} />}
          {createRoomIsOpen && username && <CreateRoomForm username={username} onSet={setRooms} onClose={setCreateRoomIsOpen}/>}

          {username && (
            <section className="section content">
              <DataLoader onData={saveData} roomId={roomId} />

              <MessageForm username={username} />
              <MessageList messages={messgaes} username={username} />
              <RoomList username={username} rooms={rooms} onOpen={setCreateRoomIsOpen} onSet={setRooms}/>
            </section>
          )}
        </div>
      )
  }
