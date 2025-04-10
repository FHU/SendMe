import api from "@sendme/api";
import {
	SlIcon,
	SlIconButton,
	SlInput,
	SlSpinner,
	SlTextarea,
} from "@shoelace-style/shoelace/dist/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { MessageList } from "./-components/MessageList";

export const Route = createFileRoute("/messages/")({
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
	const { data: conversations, refetch: refetchOrg } =
		api.conversations.getAllConversations.useQuery();
	const { data, refetch } = api.conversations.getAllConversations.useQuery();
	return (
		<Container>
			<DisplayName>John Smith</DisplayName>
			<ChatContainer>
				{/* {!data ? <SlSpinner /> : <MessageList data={data} />} */}
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
			</SendMessageContainer>
		</Container>
	);
}
