import api from "@sendme/api";
import {
	SlIconButton,
	SlSpinner,
	SlTextarea,
} from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProtectRoute from "../-preloaders/ProtectRoute";
import CreateMessage from "./-components/CreateMessage";
import MessageHeader from "./-components/MessageHeader";
import { MessageList } from "./-components/MessageList";

export const Route = createFileRoute("/messages/$conversationId")({
	component: RouteComponent,
	beforeLoad: ProtectRoute,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  padding: 0 10px 10px 10px; /* 👈 removed top spacing */
  box-sizing: border-box;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100vw;
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
  height: 60vh;

  
  scrollbar-width: none; 
  -ms-overflow-style: none;  

  &::-webkit-scrollbar {
    display: none; 
  }

  @media (max-width: 1024px) {
    height: 55vh;
  }

  @media (max-width: 768px) {
    height: 50vh;
    padding: 6px;
    width: 100vw;
  }

  @media (max-width: 480px) {
    height: 45vh;
    padding: 4px;
  }
`;

function RouteComponent() {
	const { conversationId } = Route.useParams();

	const { data: user } = api.auth.getMe.useQuery();

	const { mutateAsync: createMessage, isError: isCreateMessageError } =
		api.conversations.createMessage.useMutation();

	const { data: conversation, refetch: refetchConversation } =
		api.conversations.getConversation.useQuery({
			path: { conversation_id: conversationId },
		});

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetchConversation();
		}, 30000);
		return () => clearInterval(intervalId);
	}, [refetchConversation]);

	const otherUser = conversation?.users.find(
		(conversationUser) => user?.id !== conversationUser.id,
	);

	return (
		<Container>
			<MessageHeader conversationId={conversationId} />
			<ChatContainer>
				{conversation ? (
					<MessageList
						data={conversation.messages}
						currentUserId={user ? user.id : ""}
					/>
				) : (
					<SlSpinner />
				)}
			</ChatContainer>
			<CreateMessage conversationId={conversationId} />
		</Container>
	);
}
