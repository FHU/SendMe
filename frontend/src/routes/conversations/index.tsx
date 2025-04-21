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
import ProtectRoute from "../-preloaders/ProtectRoute";
import CreateMessage from "../messages/-components/CreateMessage";
import MessageHeader from "../messages/-components/MessageHeader";
import { MessageList } from "../messages/-components/MessageList";
import { ConversationList } from "./-components/ConversationList";

export const Route = createFileRoute("/conversations/")({
	component: RouteComponent,
	// beforeLoad: ProtectRoute,
});

const ConversationHeader = styled.h1`
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
	overflow-x: hidden;

	
	@media screen and (max-width: 1400px) {
		width: 40%;
  }

  	
	@media screen and (max-width: 1200px) {
		width: 45%;
  }

  @media screen and (max-width: 900px) {
		width: 60%;
  }


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
	
   scrollbar-width: none; 
  -ms-overflow-style: none;  

  &::-webkit-scrollbar {
    display: none; 
  }
`;

function RouteComponent() {
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const handleSelect = (id: string) => setSelectedId(id);

	const { data: conversations } =
		api.conversations.getAllConversations.useQuery();

	const selectedConversation = conversations?.find(
		(convo) => convo.id === selectedId,
	);

	const { data: user } = api.auth.getMe.useQuery();

	//This useEffect is to seed the database to test conversations. Remove in the future.

	useEffect(() => {
		fetch("/api/conversations/seed", { method: "POST" });
	}, []);

	const { data: conversation, refetch: refetchConversation } =
		api.conversations.getConversation.useQuery({
			path: { conversation_id: selectedId ?? "" },
		});

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetchConversation();
		}, 30000);
		return () => clearInterval(intervalId);
	}, [refetchConversation]);

	return (
		<div>
			<ConversationHeader>Messages</ConversationHeader>
			<Container>
				<LeftPane>
					{conversations ? (
						<ConversationList
							data={conversations}
							onSelect={(id) => {
								if (window.innerWidth > 700) setSelectedId(id);
							}}
						/>
					) : (
						<SlSpinner />
					)}
				</LeftPane>
				<RightPane>
					{selectedId ? (
						<>
							<MessageHeader conversationId={selectedId} />
							<MessageList
								data={conversation?.messages ?? []}
								currentUserId={user ? user.id : ""}
							/>
							<CreateMessage conversationId={selectedId} />
						</>
					) : (
						<p style={{ padding: "20px" }}>Select a conversation</p>
					)}
				</RightPane>
			</Container>
		</div>
	);
}
