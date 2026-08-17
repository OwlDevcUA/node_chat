import React, { useEffect } from "react"
import { deleteRoom, getRooms, joinRoom, renameRoom } from "../../services/roomApi";
import type { Room as RoomType } from "../../types/Room";
import { Room } from "../Room/Room";

type Props = {
  username: string,
  rooms: RoomType[],
  onOpen: (isOpen: boolean) => void,
  onSet: (rooms: RoomType[] | ((prev: RoomType[]) => RoomType[])) => void;
}

export const RoomList: React.FC<Props> = ({ username, rooms, onOpen, onSet }) => {
  useEffect(() => {
    getRooms().then((response) => onSet(response.data));
  })

  async function handleJoin(username: string, id: string) {
    await joinRoom(id, username)

    onSet(rooms.map(room => room.id === id ? { ...room, users: [...room.users, username] } : room))
  }

  async function handleRename(id: string, newName: string) {
    await renameRoom(id, newName);

    onSet(rooms.map(room => room.id === id ? { ...room, name: newName } : room))
  }

  async function handleDelete(id: string) {
    await deleteRoom(id)

    onSet((prevRooms) => prevRooms.filter((room) => room.id !== id));
  }

  return (
    <div className="roomList">
      <button className="roomList__create" onClick={() => onOpen(true)}>Create</button>

      <ul className="roomList__list">
        {rooms.map((room) => (
          <li key={room.id} className="roomList__room">
            <Room
              id={room.id}
              name={room.name}
              isJoined={room.users.includes(username)}
              onJoin={handleJoin}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
