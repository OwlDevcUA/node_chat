function createRoom(name, username) {
  const room = {
    name: name,
    id: crypto.randomUUID(),
    users: [username],
  };

  return room;
}

function findById(id, rooms) {
  return rooms.find((r) => r.id === id) || null;
}

function renameRoom(room, newName) {
  const updatedRoom = {
    ...room,
    name: newName,
  };

  return updatedRoom;
}

function deleteRoom(id, rooms) {
  return rooms.filter((r) => r.id !== id);
}

function joinRoom(id, username, rooms) {
  const room = findById(id, rooms);

  if (!room) {
    return null;
  }

  if (!room.users.includes(username)) {
    room.users.push(username);
  }

  return room;
}

export const roomService = {
  createRoom,
  findById,
  renameRoom,
  deleteRoom,
  joinRoom,
};
