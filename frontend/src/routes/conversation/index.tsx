import React, { useState } from "react";
import styled from "styled-components";
import { SlButton, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";

const Conversation = () => {
  const [messages, setMessages] = useState(messagesData);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: messages.length, text: input, isUser: true }]);
    setInput("");
  };

  return (
    <Container>
      <ChatContainer>
        {messages.map((msg) => (
          <Message key={msg.id} $isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
      </ChatContainer>
      <InputContainer>
        <SlTextarea value={input} onSlInput={(e) => setInput(e.detail.value)} placeholder="Type a message..." filled />
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
  height: 100vh;
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
  background: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  margin-top: 0;
`;

const Message = styled.div<{ $isUser: boolean }> `
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
  max-width: 75%;
  background: ${(props) => (props.$isUser ? "#d97706" : "#e5e7eb")};
  color: ${(props) => (props.$isUser ? "#fff" : "#000")};
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
  max-width: 500px;
`;

const ConversationHeader = styled.div`
  width: 100%;
  text-align: center;
  background: #d97706;
  color: white;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px 10px 0 0;
  margin-top: 0;
`;

const messagesData = [
  {
    id: 0,
    text: "Hey! I heard about Servant’s Day and I would love to contribute. Do you have any open projects?",
    isUser: false,
  },
  {
    id: 1,
    text: "We desperately need people to paint Bradfield Hall’s lobby if you’re interested.",
    isUser: true,
  },
  {
    id: 2,
    text: "That sounds great! I have lots of experience painting so I think I could be a good fit. What’s the next step?",
    isUser: false,
  },
  {
    id: 3,
    text: "We just have to get you a date to...",
    isUser: true,
  },
];

export default Conversation;
