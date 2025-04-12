import type { components } from "@sendme/api";
import { SlAvatar } from "@shoelace-style/shoelace/dist/react";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const MessageCard = styled.div<{ isUser: boolean }>`
  display: grid;
  grid-template-columns: 0.5fr 3fr 1fr;
  grid-template-rows: auto auto;
  background-color: ${({ isUser }) => (isUser ? "#DCFFDB" : "#D9D9D9")};
  border-radius: 12px;
  margin: 10px 0;
  padding: 10px;
  max-width: 90%;
  margin-left: ${({ isUser }) => (isUser ? "auto" : "0")};
  margin-right: ${({ isUser }) => (isUser ? "0" : "auto")};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const AvatarWrapper = styled.div`
  grid-row: span 2;
  align-self: center;
  justify-self: center;
`;

const MessageText = styled.p`
  grid-column: 2 / span 1;
  margin: 0;
  word-break: break-word;
  color: #000;
`;

const Timestamp = styled.span`
  grid-column: 2 / span 2;
  font-size: 12px;
  color: var(--sl-color-text);
  align-self: end;
  justify-self: end;
  padding-right: 10px;
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
			<AvatarWrapper>
				<SlAvatar image={imagePath ?? ""} />
			</AvatarWrapper>
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
					imagePath={msg.user.profile_picture}
				/>
			))}
			<div ref={chatEndRef} />
		</>
	);
}
