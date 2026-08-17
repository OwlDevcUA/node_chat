import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Room.scss';

type Props = {
  id: string;
  name: string;
  isJoined?: boolean;
  onJoin?: (id: string, username: string) => void;
  onRename?: (id: string, newName: string) => void;
  onDelete?: (id: string) => void;
};

export const Room: React.FC<Props> = ({
  id,
  name,
  isJoined = false,
  onJoin,
  onRename,
  onDelete,
}) => {
  const [editName, setEditName] = useState(name);

  const handleBlur = () => {
    const trimmed = editName.trim();
    if (trimmed && trimmed !== name && onRename) {
      onRename(id, trimmed);
    } else {
      setEditName(name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
    if (e.key === 'Escape') {
      setEditName(name);
      e.currentTarget.blur();
    }
  };

  return (
    <NavLink
      to={`/rooms/${id}`}
      className={({ isActive }) => `room-item ${isActive ? 'room-item--active' : ''}`}
    >
      <input
        type="text"
        value={editName}
        disabled={!onRename}
        onChange={(e) => setEditName(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="room-item__inline-input"
      />

      <div className="room-item__actions">
        {!isJoined ? (
          onJoin && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onJoin(id, name); }}
              className="room-item__btn room-item__btn--join"
            >
              Join
            </button>
          )
        ) : (
          onDelete && (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(id); }}
              className="room-item__btn room-item__btn--delete"
              title="Delete"
            >
              ✕
            </button>
          )
        )}
      </div>
    </NavLink>
  );
};
