// MessagesList.tsx
import React from 'react';
import { Message } from "./Message"; // Import Message component

interface Message {
  id: number;
  user: { name: string; profilePicture: string; userName: string; userID: number };
  timestamp: string;
  messagePreview: string;
  readMessage: boolean;
  conversation: { 
    id: number;
    text: string;
    timestamp: string;
    isUser: boolean;
  }[];
}

interface MessagesListProps {
  messages: Message[];
}

export const MessagesList: React.FC<MessagesListProps> = ({ messages = [] }) => {
  // Ensure messages is always an array
  if (!Array.isArray(messages)) {
    console.error('Expected "messages" to be an array, but got:', messages);
    return <p>No messages available.</p>;
  }

  if (messages.length === 0) {
    return <p>No messages available.</p>;
  }

  console.log(messages); // Check the type of `messages`

  return (
    <>
      {messages.map((msg) => (
        <Message
          key={msg.id}
          imagePath={msg.user.profilePicture}
          userName={msg.user.userName}
          lastReadMessage={msg.messagePreview}
          lastReadTime={msg.timestamp}
          showReadButton={msg.readMessage}
        />
      ))}
    </>
  );
};

export default MessagesList;
