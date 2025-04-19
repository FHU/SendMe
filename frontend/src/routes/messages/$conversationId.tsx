import api from "@sendme/api";
import {
	SlIconButton,
	SlSpinner,
	SlTextarea,
} from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MessageList } from "./-components/MessageList";

export const Route = createFileRoute("/messages/$conversationId")({
	component: RouteComponent,
});

const DisplayName = styled.h2`
  color: var(--sl-color-text);
  text-align: center;
  width: 50%;
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

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
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--sl-color-neutral-50);
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  max-width: 100%;
  height: 60vh;

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

const SendMessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--sl-color-primary-500);
  border-radius: 20px;
  margin-top: 20px;
  background-color: var(--sl-input-background-color);

  @media (max-width: 768px) {
    width: 90%;
    margin-right: 0;
  }
`;

const MessageInput = styled(SlTextarea)`
  width: 100%;
  &::part(base) {
    box-shadow: none;
    border: 1px solid var(--sl-color-primary-500);
    border-radius: 20px;
    border: none;
  }
` as typeof SlTextarea;

const ErrorMessage = styled.div`
  color: var(--sl-color-danger-500);
  font-size: 14px;
  margin-top: 10px;
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

	const [message, setMessage] = useState("");
	const [isNoMessageBody, setIsNoMessageBody] = useState(false);

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetchConversation();
		}, 30000);
		return () => clearInterval(intervalId);
	}, [refetchConversation]);

	const otherUser = conversation?.users.find(
		(conversationUser) => user?.id !== conversationUser.id,
	);

	const handleInputChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		setMessage(target.value);
	};

	const handleKeyDown = (event: Event) => {
		const keyboardEvent = event as KeyboardEvent;
		if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey) {
			keyboardEvent.preventDefault();
			sendMessage();
		}
	};

	const sendMessage = async () => {
		if (!message) {
			setIsNoMessageBody(true);
			return;
		}

		try {
			await createMessage({
				body: { content: message },
				path: { conversation_id: conversationId },
			});
		} catch (error) {
			console.error(error);
		}

		setIsNoMessageBody(false);
		setMessage("");
		refetchConversation();
	};

	return (
		<Container>
			<DisplayName>
				{otherUser
					? `${otherUser.first_name} ${otherUser.last_name}`
					: "An error occurred"}
			</DisplayName>
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
			<SendMessageContainer>
				<MessageInput
					placeholder="Type a message..."
					value={message}
					spellCheck
					rows={1}
					resize="auto"
					onSlInput={handleInputChange}
					// @ts-ignore
					onKeyDown={handleKeyDown}
				/>
				<SlIconButton
					onClick={sendMessage}
					name="send"
					slot="suffix"
					style={{
						fontSize: "20px",
						color: "var(--sl-color-text)",
						marginRight: "5px",
					}}
				/>
			</SendMessageContainer>
			{isCreateMessageError && (
				<ErrorMessage>Error sending message</ErrorMessage>
			)}
			{isNoMessageBody && (
				<ErrorMessage>Message must contain text</ErrorMessage>
			)}
		</Container>
	);
}
