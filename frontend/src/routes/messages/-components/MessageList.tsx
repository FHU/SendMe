import api, { type components } from "@sendme/api";
import { SlIconButton, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(date);
};

const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  margin: 5px;
  width: 80%;
  @media (max-width: 768px) {
	margin-right: 120px;
  }

`;

const MessageDisplay = styled.div<{ isUser: boolean }>`
  padding: 10px;
  border-radius: 10px;
  max-width: 75%;
  background: ${({ isUser }) => (isUser ? "#DCFFDB" : "#D9D9D9")};
  color: #000;
  height: 100%;
  word-wrap: break-word; 
  overflow-wrap: break-word; 
  margin-right: 10px;
`;

const Timestamp = styled.div<{ isUser: boolean }>`
  font-size: 12px;
  color: var(--sl-color-text);
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  margin-left: ${({ isUser }) => (isUser ? "0px" : "65px")};
  margin-right: ${({ isUser }) => (isUser ? "80px" : "0px")};
  margin-top: 2px;
  @media (max-width: 768px) {
	margin-left: ${({ isUser }) => (isUser ? "0px" : "10px")};
	margin-right: ${({ isUser }) => (isUser ? "130px" : "0px")};
  }
`;

interface MessageProps {
	text: string;
	timestamp: string;
	isUser: boolean;
}

export function MessageList({
	data,
}: {
	data: components["schemas"]["Message"][];
}): JSX.Element {
	const chatEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	});

	return (
		<>
			{data.map((msg) => (
				<>
					<MessageContainer key={msg.id} isUser={true}>
						<MessageDisplay isUser={true}>{null}</MessageDisplay>
					</MessageContainer>
					<Timestamp key={msg.created_at} isUser={true}>
						{formatDate(msg.created_at)}
					</Timestamp>
				</>
			))}
			<div ref={chatEndRef} />
		</>
	);
}
