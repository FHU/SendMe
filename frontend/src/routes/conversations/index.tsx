import api from "@sendme/api";
import {
	SlIcon,
	SlIconButton,
	SlInput,
	SlSpinner,
} from "@shoelace-style/shoelace/dist/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import styled from "styled-components";
import { ConversationList } from "./-components/ConversationList";

export const Route = createFileRoute("/conversations/")({
	component: RouteComponent,
});

const MessageHeader = styled.h1`
  color: var(--sl-color-primary-500);
  margin-top: -150px;
  margin-left: 20px;
`;

function RouteComponent() {
	const { data: conversations } =
		api.conversations.getAllConversations.useQuery();

	//This useEffect is to seed the database to test conversations. Remove in the future.

	useEffect(() => {
		fetch("/api/conversations/seed", { method: "POST" });
	}, []);

	return (
		<div>
			<MessageHeader>Messages</MessageHeader>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					className="messages"
					style={{
						display: "flex",
						flexDirection: "column",
						textDecoration: "none",
						color: "black",
					}}
				>
					{conversations ? (
						<ConversationList data={conversations} />
					) : (
						<SlSpinner />
					)}
				</div>
			</div>
		</div>
	);
}
