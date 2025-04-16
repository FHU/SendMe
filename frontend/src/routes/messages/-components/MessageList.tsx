import type { components } from "@sendme/api";
import { SlAvatar } from "@shoelace-style/shoelace/dist/react";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const MessageCard = styled.div<{ isUser: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  background-color: ${({ isUser }) => (isUser ? "#DCFFDB" : "#D9D9D9")};
  border-radius: 12px;
  margin: 10px 0;
  padding: 10px;
  max-width: 90%;
  margin-left: ${({ isUser }) => (isUser ? "auto" : "0")};
  margin-right: ${({ isUser }) => (isUser ? "0" : "auto")}; 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  word-break: break-word;
  border: 2px solid red; /* Red border added for visibility */

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr;
    max-width: 100%;
    padding: 8px;
  }
`;

const AvatarWrapper = styled.div`
  grid-row: span 2;
  align-self: center;
  justify-self: center;

  sl-avatar::part(base) {
    --size: 36px;
  }

  @media (max-width: 768px) {
    sl-avatar::part(base) {
      --size: 28px;
    }
  }
`;

const MessageText = styled.p`
  grid-column: 2 / 3;
  margin: 0;
  color: #000;
  font-size: 1rem;
  word-break: break-word;
  overflow-wrap: anywhere;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Timestamp = styled.span`
  grid-column: 2 / 3;
  font-size: 12px;
  color: black;
  align-self: end;
  justify-self: end;
  padding-right: 10px; ///// FIX time stamp 

  @media (max-width: 768px) {
    font-size: 10px;
    padding-right: 5px;
  }
`;

interface MessageProps {
	message: components["schemas"]["Message"];
	isUser: boolean;
	imagePath: string | null;
}

function Message({ message, isUser, imagePath }: MessageProps) {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		}).format(date);
	};

	return (
		<MessageCard isUser={isUser}>
			<AvatarWrapper></AvatarWrapper>
			<MessageText>{message.content}</MessageText>
			<Timestamp>{formatDate(message.created_at)}</Timestamp>
		</MessageCard>
	);
}

export function MessageList({
	data,
	currentUserId,
}: {
	data: components["schemas"]["Message"][];
	currentUserId: string;
}) {
	const chatEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	return (
		<>
			{data.map((msg) => (
				<Message
					key={msg.id}
					message={msg}
					isUser={msg.sender_id === currentUserId}
					imagePath={msg.sender.profile_picture}
				/>
			))}
			<div ref={chatEndRef} />
		</>
	);
}
