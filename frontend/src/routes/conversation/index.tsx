import { SlButton, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface MessageType {
	id: number;
	text: string;
	timestamp: string;
	isUser: boolean;
}

const messagesData: MessageType[] = [
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

const Conversation = () => {
	const [messages, setMessages] = useState<MessageType[]>(messagesData);
	const [input, setInput] = useState<string>("");
	const chatEndRef = useRef<HTMLDivElement | null>(null);

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
					<>
						<MessageContainer key={msg.id} $isUser={msg.isUser}>
							<Message $isUser={msg.isUser}>{msg.text}</Message>
							{/* <Timestamp>{msg.timestamp}</Timestamp> */}
						</MessageContainer>
						<Timestamp $isUser={msg.isUser}>{msg.timestamp}</Timestamp>
					</>
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
  background: ${({ $isUser }) => ($isUser ? "#F6CFB1" : "#D9D9D9")};
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
