import type React from 'react';
import { useState } from 'react';
import './CreateRoomForm.scss';
import type { Room } from '../../types/Room';
import { createRoom } from '../../services/roomApi';

type Props = {
  username: string,
  onSet: (rooms: Room[] | ((prev: Room[]) => Room[])) => void;
  onClose: (isOpen: boolean) => void,
};

export const CreateRoomForm: React.FC<Props> = ({ username, onSet, onClose }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = input.trim();

    if (!name) {
      setError('Enter room name');
      return;
    }

    try {
    const response = await createRoom(name, username);
    const newRoom = response.data;

      onSet((prevRooms) => [...prevRooms, newRoom]);


    onClose(false);
  } catch (error) {
    console.error("Failed to create room:", error);
  }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create Room</h2>
        <p className="modal-description">
          Enter a name for your new room
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-wrapper">
            <input
              type="text"
              autoFocus
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError('');
              }}
              placeholder="Room name"
              className={`modal-input ${error ? 'has-error' : ''}`}
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="modal-actions">
            {onClose && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => onClose(false)}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="submit-btn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
