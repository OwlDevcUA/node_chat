import React, { useState } from 'react';
import { sendMessage } from '../../services/messagesApi';
import './MessageForm.scss'

type Props = {
  username: string,
  roomId?: string,
};

export const MessageForm: React.FC<Props> = ({ username, roomId }) => {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    if (!text.trim() || isSending) return;

    try {
      setIsSending(true);
      await sendMessage(text, username, roomId);
      setText('');
    } catch (error) {
      console.error('Error', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="message-form__input"
        placeholder="Type a message..."
        value={text}
        disabled={isSending}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        type="submit"
        className="message-form__button"
        disabled={!text.trim() || isSending}
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};
