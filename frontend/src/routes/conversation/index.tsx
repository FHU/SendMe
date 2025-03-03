import React, { useState } from "react";
import styled from "styled-components";
import { SlButton, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";

const Conversation = () => {
  const [messages, setMessages] = useState(messagesData);
  const [input, setInput] = useState("");

  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length, text: input, timestamp: getCurrentTime(), isUser: true },
    ]);
    setInput("");
  };

  return (
    <Container>
      <ChatContainer>
        {messages.map((msg) => (
          <MessageContainer key={msg.id} $isUser={msg.isUser}>
            <Message $isUser={msg.isUser}>{msg.text}</Message>
            <Timestamp>{msg.timestamp}</Timestamp>
          </MessageContainer>
        ))}
      </ChatContainer>
      <InputContainer>
        <SlTextarea
          value={input}
          onSlInput={(e) => setInput(e.detail.value)}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  width: 100%;
  overflow-x: hidden;
  height: 80vh;
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
`;

const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  margin: 5px;
`;

const Message = styled.div<{ $isUser: boolean }>`
  padding: 10px;
  border-radius: 10px;
  max-width: 75%;
  background: ${(props) => (props.$isUser ? "#F6CFB1" : "#D9D9D9")};
  color: #000;
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 2px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
  max-width: 500px;
`;



const messagesData = [
  {
    id: 0,
    text: "Hey! I heard about Servant’s Day and I would love to contribute. Do you have any open projects?",
    timestamp: "3:50 PM",
    isUser: false,
  },
  {
    id: 1,
    text: "We desperately need people to paint Bradfield Hall’s lobby if you’re interested.",
    timestamp: "3:52 PM",
    isUser: true,
  },
  {
    id: 2,
    text: "That sounds great! I have lots of experience painting so I think I could be a good fit. What’s the next step?",
    timestamp: "3:53 PM",
    isUser: false,
  },
];

export default Conversation;
