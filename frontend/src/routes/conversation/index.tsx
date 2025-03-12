import {
	SlButton,
	SlIconButton,
	SlInput,
	SlTextarea,
} from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
	});

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
			<DisplayName>John Smith</DisplayName>
			<ChatContainer>
				{messages.map((msg) => (
					<>
						<MessageContainer key={msg.id} $isUser={msg.isUser}>
							<Message $isUser={msg.isUser}>{msg.text}</Message>
						</MessageContainer>
						<Timestamp key={msg.id} $isUser={msg.isUser}>
							{msg.timestamp}
						</Timestamp>
					</>
				))}
				<div ref={chatEndRef} />
			</ChatContainer>

			<SendNewMessage
				value={input}
				onInput={(e) => setInput((e.target as HTMLTextAreaElement).value)}
				placeholder="Type a message..."
				spellCheck
			>
				<SlIconButton
					name="send"
					slot="suffix"
					onClick={handleSend}
					style={{ fontSize: "20px" }}
				/>
			</SendNewMessage>
		</Container>
	);
};

export const Route = createFileRoute("/conversation/")({
	component: Conversation,
});

const DisplayName = styled.h2`
 @media (max-width: 768px) {
	margin-right: 130px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: auto;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  overflow-x: hidden;
  height: 50vh;

`;

const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  margin: 5px;
  width: 80%;
  @media (max-width: 768px) {
	margin-right: 120px;
  }

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
  margin-left: ${({ $isUser }) => ($isUser ? "0px" : "65px")};
  margin-right: ${({ $isUser }) => ($isUser ? "80px" : "0px")};
  margin-top: 2px;
  @media (max-width: 768px) {
	margin-left: ${({ $isUser }) => ($isUser ? "0px" : "10px")};
	margin-right: ${({ $isUser }) => ($isUser ? "130px" : "0px")};
  }
`;

const SendNewMessage = styled(SlInput)`
	width: 100%;
	margin-top: 20px;

	&::part(base) {
		box-shadow: none;
		border: 1px solid #2E8B57;
		border-radius: 20px;
		
  }

	@media (max-width: 768px) {
		margin-right: 125px;
		width: 80%;
  }
`;

export default Conversation;
