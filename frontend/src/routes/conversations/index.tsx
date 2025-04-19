import api from "@sendme/api";
import {
	SlIcon,
	SlIconButton,
	SlInput,
	SlSpinner,
} from "@shoelace-style/shoelace/dist/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ConversationList } from "./-components/ConversationList";
import { MessageList } from "../messages/-components/MessageList";

export const Route = createFileRoute("/conversations/")({
	component: RouteComponent,
});

const MessageHeader = styled.h1`
  color: var(--sl-color-primary-500);
  margin-top: -150px;
  margin-left: 20px;
`;

// const ConversationsContainer = styled.div`

// 	display: flex;
// 	flex-direction: column;
// 	margin-left: 20px;

// 	@media screen and (max-width: 700px) {
// 		justify-content: center;
// 		align-items: center;
// 		margin-left: 0px;
//   	}

// `;

const Container = styled.div`
	display: flex;
	height: 100vh;

	@media (max-width: 700px) {
		flex-direction: column;
	}
`;

const LeftPane = styled.div`
	width: 30%;
	border-right: 1px solid #ccc;
	overflow-y: auto;
	margin-top: 20px;

	@media (max-width: 700px) {
		width: 100%;
		border-right: none;
	}
`;

const RightPane = styled.div`
	flex: 1;
	overflow-y: auto;
	margin-top: 20px;

	@media (max-width: 700px) {
		display: none;
	}
`;

function RouteComponent() {

	const [selectedId, setSelectedId] = useState<string | null>(null);

	const handleSelect = (id: string) => setSelectedId(id);
	
	const { data: conversations } = api.conversations.getAllConversations.useQuery();

	const selectedConversation = conversations?.find(
		(convo) => convo.id === selectedId
	);

	
	const { data: user } = api.auth.getMe.useQuery();

	//This useEffect is to seed the database to test conversations. Remove in the future.

	useEffect(() => {
		fetch("/api/conversations/seed", { method: "POST" });
	}, []);

	return (
		<div>
			<MessageHeader>Messages</MessageHeader>
			<Container>
			<LeftPane>
			{conversations ? (
						<ConversationList data={conversations} 
						onSelect={(id) => {
							if (window.innerWidth > 700) setSelectedId(id);
						}}/>
					) : (
						<SlSpinner />
					)}
			</LeftPane>
			<RightPane>
				{selectedId ? (
					<MessageList 
						data={selectedConversation?.messages ?? []}
						currentUserId={user ? user.id : ""} />
				) : (
					<p style={{ padding: "20px" }}>Select a conversation</p>
				)}
			</RightPane>
		</Container>
		</div>
	);
}
