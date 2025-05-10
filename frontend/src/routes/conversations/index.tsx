import api from "@sendme/api";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProtectRoute from "../-preloaders/ProtectRoute";
import CreateMessage from "../messages/-components/CreateMessage";
import MessageHeader from "../messages/-components/MessageHeader";
import { MessageList } from "../messages/-components/MessageList";
import { ConversationList } from "./-components/ConversationList";

export const Route = createFileRoute("/conversations/")({
	component: RouteComponent,
	beforeLoad: ProtectRoute,
});

const Container = styled.div`
	display: flex;
	height: 100vh;
	padding-top: 50px;
	z-index: -1;

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
	padding-left: 20px;

	
	@media screen and (max-width: 1500px) {
		width: 40%;
  }

  	
	@media screen and (max-width: 1200px) {
		width: 50%;
  }

  @media screen and (max-width: 900px) {
		width: 60%;
  }


	@media (max-width: 800px) {
		width: 100%;
		border-right: none;
		padding-left: 0px;
	}
`;

const RightPane = styled.div`
	flex: 1;
	overflow-y: auto;
	margin-top: 20px;
	height: 100vh;

	@media (max-width: 800px) {
		display: none;
	}
	
   scrollbar-width: none; 
  -ms-overflow-style: none;  

  &::-webkit-scrollbar {
    display: none; 
  }
`;

const ChatContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow-x: hidden;
  background: var(--sl-color-neutral-50);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-width: 100%;
  height: 70vh;

  
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

	useEffect(() => {
		if (!selectedId && conversations && conversations.length > 0) {
			setSelectedId(conversations[0].id);
		}
	}, [conversations, selectedId]);

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
		<>
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
							<ChatContainer>
								<MessageList
									data={conversation?.messages ?? []}
									currentUserId={user ? user.id : ""}
								/>
							</ChatContainer>
							<CreateMessage conversationId={selectedId} />
						</>
					) : (
						<p style={{ padding: "20px" }}>Select a conversation</p>
					)}
				</RightPane>
			</Container>
		</>
	);
}
