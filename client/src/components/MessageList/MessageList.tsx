import classNames from "classnames";
import type { Message } from "../../types/Message";
import { format } from 'date-fns';
import './MessageList.scss';

type Props = {
  messages: Message[],
  username: string,
}

export const MessageList: React.FC<Props> = ({ messages, username }) => {
  return (
    <ul>
    {messages.map(message => (
      <li className={classNames('message', { 'messageLeft': username !== message.username})} key={message.id}>
        <p>{message.username}</p>
        {message.text}

        <span className="message__time">
                {format(new Date(message.time), 'HH:mm')}
                </span>
      </li>
    ))}
  </ul>
  )
};
