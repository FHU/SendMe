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
  width: 450px;
  margin-left: ${({ isUser }) => (isUser ? "auto" : "10px")};
  margin-right: ${({ isUser }) => (isUser ? "10px" : "auto")};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  word-break: break-word;

  @media (max-width: 1100px) {
    grid-template-columns: auto 1fr;
	width: 200px;
    padding: 8px;
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

const Timestamp = styled.span<{ isUser: boolean }>`
  grid-column: 2 / 3;
  font-size: 12px;
  color: black;
  align-self: start;
  justify-self: ${({ isUser }) => (isUser ? "end" : "start")};
  padding-top: 5px;
  padding-left: ${({ isUser }) => (isUser ? "0" : "2px")};
  padding-right: ${({ isUser }) => (isUser ? "2px" : "0")};

  @media (max-width: 768px) {
    font-size: 10px;
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
			<MessageText>{message.content}</MessageText>
			<Timestamp isUser={isUser}>{formatDate(message.created_at)}</Timestamp>
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
		</>
	);
}
