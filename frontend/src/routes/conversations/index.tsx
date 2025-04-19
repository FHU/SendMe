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

const ConversationsContainer = styled.div`

	display: flex;
	flex-direction: column;
	margin-left: 20px;

	@media screen and (max-width: 700px) {
		justify-content: center;
		align-items: center;
		margin-left: 0px;
  	}

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
			<ConversationsContainer>
				<div
					className="messages"
					style={{
						textDecoration: "none",
						color: "black",
						marginTop: "10px",
						marginBottom: "10px",
					}}
				>
					{conversations ? (
						<ConversationList data={conversations} />
					) : (
						<SlSpinner />
					)}
				</div>
			</ConversationsContainer>
		</div>
	);
}
