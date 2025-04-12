import api from "@sendme/api";
import {
	SlIconButton,
	SlSpinner,
	SlTextarea,
} from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import styled from "styled-components";
import { MessageList } from "./-components/MessageList";

export const Route = createFileRoute("/messages/$conversationId")({
	component: RouteComponent,
});

const DisplayName = styled.h2`
  margin-top: -130px;
  color: var(--sl-color-text);
  @media (max-width: 768px) {
    margin-right: 130px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  background: var(--sl-color-neutral-50);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  overflow-x: hidden;
  height: 50vh;
`;

const SendMessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--sl-color-primary-500);
  border-radius: 20px;
  margin-top: 50px;

  @media (max-width: 768px) {
    width: 80%;
    margin-right: 130px;
  }
`;

const SendNewMessage = styled(SlTextarea)`
  width: 100%;
  &::part(base) {
    box-shadow: none;
    border: 1px solid var(--sl-color-primary-500);
    border-radius: 20px;
    border: none;
    background-color: var(--sl-color-neutral-50);
  }
`;

function RouteComponent() {
	const { conversationId } = Route.useParams();

	const { data: user } = api.auth.getMe.useQuery();

	const { data: conversation, refetch: refetchConversation } =
		api.conversations.getConversation.useQuery({
			path: { conversation_id: conversationId },
		});

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetchConversation();
		}, 30000); // 30000 milliseconds = 30 seconds

		// Cleanup function to clear the interval when component unmounts
		return () => clearInterval(intervalId);
	}, [refetchConversation]);

	const otherUser = conversation?.users.find(
		(conversationUser) => user?.id !== conversationUser.id,
	);

	return (
		<Container>
			{conversation ? (
				<>
					<DisplayName>
						{otherUser ? otherUser.display_name : "An error occured "})
					</DisplayName>
					<ChatContainer>
						{conversation.messages ? (
							<MessageList
								data={conversation.messages}
								currentUserId={user ? user.id : ""}
							/>
						) : (
							<SlSpinner />
						)}
					</ChatContainer>
					<SendMessageContainer>
						<SendNewMessage
							placeholder="Type a message..."
							spellCheck
							rows={1}
							resize="auto"
						/>
						<SlIconButton
							name="send"
							slot="suffix"
							style={{ fontSize: "20px", color: "var(--sl-color-text)" }}
						/>
					</SendMessageContainer>{" "}
				</>
			) : (
				<SlSpinner />
			)}
		</Container>
	);
}
