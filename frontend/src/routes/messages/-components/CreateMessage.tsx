import api from "@sendme/api";
import { SlIconButton, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SendMessageContainer = styled.div`
  width: 99%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  border: 1px solid var(--sl-color-primary-500);
  border-radius: 20px;
  margin-top: 20px;
  background-color: var(--sl-input-background-color);
  position: sticky;

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

type CreateMessageProps = {
	conversationId: string;
};

function CreateMessage({ conversationId }: CreateMessageProps) {
	const { mutateAsync: createMessage, isError: isCreateMessageError } =
		api.conversations.createMessage.useMutation();

	const [message, setMessage] = useState("");
	const [isNoMessageBody, setIsNoMessageBody] = useState(false);
	const { refetch: refetchConversations } =
		api.conversations.getAllConversations.useQuery();

	const { data: conversation, refetch: refetchConversation } =
		api.conversations.getConversation.useQuery({
			path: { conversation_id: conversationId },
		});

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
		refetchConversations();
	};

	return (
		<>
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
		</>
	);
}

export default CreateMessage;
