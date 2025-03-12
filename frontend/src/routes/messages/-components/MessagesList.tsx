import { Message, MessageProps } from "./Message";

interface MessagesListProps {
  messages: { 
    id: number;
    user: {
      profilePicture: string;
      userName: string;
      userID: number;
    };
    timestamp: string;
    messagePreview: string;
    readMessage: boolean;
    conversation: { 
      id: number; 
      text: string; 
      timestamp: string; 
      isUser: boolean; 
    }[];
  }[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <p>No messages available.</p>;
  }

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
