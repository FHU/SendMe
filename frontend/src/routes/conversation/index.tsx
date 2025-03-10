import React, { useEffect, useRef, useState } from 'react'; // Add React import
import { SlButton, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

interface MessageType {
  id: number;
  text: string;
  timestamp: string;
  isUser: boolean;
}

interface ConversationType {
  id: number;
  user: {
    profilePicture: string;
    userName: string;
    userID: number;
  };
  timestamp: string;
  messagePreview: string;
  readMessage: boolean;
  conversation: MessageType[];
}

const Conversation = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch data from JSON file when the component mounts
  useEffect(() => {
	const fetchData = async () => {
	  try {
		const response = await fetch('/conversation.json');
		const data = await response.json();
		console.log(data);  // Log the fetched data
  
		const conversationData = data.find((conv: ConversationType) => conv.id === 0);
		if (conversationData) {
		  setMessages(conversationData.conversation);
		}
	  } catch (error) {
		console.error("Error fetching data:", error);
	  }
	};
  
	fetchData();
  }, []);
  

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: MessageType = {
      id: messages.length + 1, // Ensure unique ID
      text: input,
      timestamp: getCurrentTime(),
      isUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
  };

  return (
    <Container>
      <ChatContainer>
        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            <MessageContainer $isUser={msg.isUser}>
              <Message $isUser={msg.isUser}>{msg.text}</Message>
            </MessageContainer>
            <Timestamp $isUser={msg.isUser}>{msg.timestamp}</Timestamp>
          </React.Fragment>
        ))}
        <div ref={chatEndRef} />
      </ChatContainer>
      <InputContainer>
        <SlTextarea
          value={input}
          onInput={(e) => setInput((e.target as HTMLTextAreaElement).value)} // Corrected event handler
          placeholder="Type a message..."
          filled
        />
        <SlButton onClick={handleSend}>Send</SlButton>
      </InputContainer>
    </Container>
  );
};

export const Route = createFileRoute("/conversation/")({
  component: Conversation,
});

// Styled components remain unchanged
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  width: 100%;
  overflow-x: hidden;
  height: 75vh;
  justify-content: flex-start;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 80vh;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  max-width: 100%;
`;

const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  margin: 5px;
  max-width: 80%;
`;

const Message = styled.div<{ $isUser: boolean }>`
  padding: 10px;
  border-radius: 10px;
  max-width: 75%;
  background: ${({ $isUser }) => ($isUser ? "#DCFFDB" : "#D9D9D9")};
  color: #000;
  height: 100%;
  word-wrap: break-word; 
  overflow-wrap: break-word; 
  margin-right: 10px;
`;

const Timestamp = styled.div<{ $isUser: boolean }>`
  font-size: 12px;
  color: #555;
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  margin-left: ${({ $isUser }) => ($isUser ? "0px" : "10px")};
  margin-right: ${({ $isUser }) => ($isUser ? "125px" : "0px")};
  margin-top: 2px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
  max-width: 500px;
  
  @media (max-width: 768px) {
    margin-right: 105px;
  }
`;

export default Conversation;
