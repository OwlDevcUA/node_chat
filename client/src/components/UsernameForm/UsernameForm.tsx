import type React from "react";
import { useState } from "react";
import './UsernameForm.scss';

type Props = {
  onSet: (username: string) => void;
}

export const UsernameFrom: React.FC<Props> = ({ onSet }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.SubmitEvent) => {
      e.preventDefault();

      const name = input.trim()

      if (!name) {
        setError('Enter username')
        return
      }

      localStorage.setItem('chat_username', name);
      onSet(name);
    }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-title">Name</h2>
        <p className="modal-description">
          Enter username
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
              placeholder="Username"
              className={`modal-input ${error ? 'has-error' : ''}`}
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
